import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import {
  generateBulkTemplateCsv,
  parseBulkProductCsv,
  validateBulkProductRecords,
  importBulkProductsTransaction,
} from '../services/bulkProductService';
import { mapProductResponse } from './productController';

const prisma = new PrismaClient();

/**
 * Extracts raw CSV text from multipart file upload or text/json body
 */
function extractCsvContent(req: Request): string | null {
  if (req.file && req.file.buffer) {
    return req.file.buffer.toString('utf8');
  }
  if (req.file && req.file.path) {
    try {
      return fs.readFileSync(req.file.path, 'utf8');
    } catch {
      return null;
    }
  }
  if (req.files && typeof req.files === 'object') {
    const filesMap = req.files as Record<string, Express.Multer.File[]>;
    const f = (filesMap.file && filesMap.file[0]) || (filesMap.csv && filesMap.csv[0]);
    if (f && f.buffer) return f.buffer.toString('utf8');
    if (f && f.path) {
      try {
        return fs.readFileSync(f.path, 'utf8');
      } catch {
        return null;
      }
    }
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    return req.body;
  }
  if (req.body && typeof req.body.csv === 'string' && req.body.csv.trim()) {
    return req.body.csv;
  }
  if (req.body && typeof req.body.file === 'string' && req.body.file.trim()) {
    return req.body.file;
  }
  return null;
}

/**
 * GET /products/bulk/template
 * Downloads a UTF-8 CSV template with complete fields from all 5 product sections
 * and 1 reference sample row (starting with SAMPLE - DELETE, and without default image URLs).
 */
export const getBulkProductTemplate = (req: Request, res: Response): void => {
  const csvContent = generateBulkTemplateCsv();

  if (req.query.format === 'json') {
    res.status(200).json({
      success: true,
      message: 'Bulk product CSV template generated successfully',
      csv: csvContent,
    });
    return;
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="products_bulk_template.csv"');
  res.status(200).send(csvContent);
};

/**
 * POST /products/bulk/validate
 * Validates the entire CSV file before any database writes.
 * Checks required fields, status, numeric display order, category resolution, image URLs, and duplicate detection.
 */
export const validateBulkProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const csvContent = extractCsvContent(req);

    if (!csvContent || !csvContent.trim()) {
      res.status(400).json({
        success: false,
        message: "CSV file is required. Please upload a .csv file using form field 'file'.",
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        duplicates: 0,
        createdRows: 0,
        skippedRows: 0,
        errors: [{ row: 0, field: 'file', error: "Missing uploaded file. Form field name must be 'file'." }],
      });
      return;
    }

    const { records, parseErrors } = parseBulkProductCsv(csvContent);

    if (parseErrors.length > 0 && records.length === 0) {
      res.status(400).json({
        success: false,
        message: parseErrors[0].error || 'Failed to parse CSV file.',
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        duplicates: 0,
        createdRows: 0,
        skippedRows: 0,
        errors: parseErrors,
      });
      return;
    }

    const validationResult = await validateBulkProductRecords(records, prisma);

    if (!validationResult.isValid || validationResult.invalidRows > 0) {
      res.status(400).json({
        success: false,
        message: `Validation failed with ${validationResult.errors.length} error(s). Please correct them and re-upload.`,
        totalRows: validationResult.totalRows,
        validRows: validationResult.validRows,
        invalidRows: validationResult.invalidRows,
        duplicates: validationResult.duplicates,
        createdRows: 0,
        skippedRows: validationResult.skippedRows,
        errors: validationResult.errors,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Validation passed: ${validationResult.validRows} valid product row(s) ready for import.`,
      totalRows: validationResult.totalRows,
      validRows: validationResult.validRows,
      invalidRows: 0,
      duplicates: 0,
      createdRows: 0,
      skippedRows: validationResult.skippedRows,
      errors: [],
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /products/bulk/import
 * Atomic bulk import using a database transaction.
 * Validates the entire file first. If any non-sample row is invalid, imports 0 rows.
 * Converts CSV data into the exact product database structure across all five sections.
 */
export const importBulkProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const csvContent = extractCsvContent(req);

    if (!csvContent || !csvContent.trim()) {
      res.status(400).json({
        success: false,
        message: "CSV file is required. Please upload a .csv file using form field 'file'.",
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        duplicates: 0,
        createdRows: 0,
        skippedRows: 0,
        errors: [{ row: 0, field: 'file', error: "Missing uploaded file. Form field name must be 'file'." }],
      });
      return;
    }

    const { records, parseErrors } = parseBulkProductCsv(csvContent);

    if (parseErrors.length > 0 && records.length === 0) {
      res.status(400).json({
        success: false,
        message: parseErrors[0].error || 'Failed to parse CSV file.',
        totalRows: 0,
        validRows: 0,
        invalidRows: 0,
        duplicates: 0,
        createdRows: 0,
        skippedRows: 0,
        errors: parseErrors,
      });
      return;
    }

    // 1. Full validation pass before any database writes
    const validationResult = await validateBulkProductRecords(records, prisma);

    if (!validationResult.isValid || validationResult.invalidRows > 0) {
      res.status(400).json({
        success: false,
        message: `Import rejected: ${validationResult.errors.length} validation error(s) found. No products were imported.`,
        totalRows: validationResult.totalRows,
        validRows: validationResult.validRows,
        invalidRows: validationResult.invalidRows,
        duplicates: validationResult.duplicates,
        createdRows: 0,
        skippedRows: validationResult.skippedRows,
        errors: validationResult.errors,
      });
      return;
    }

    if (validationResult.validatedProducts.length === 0) {
      res.status(400).json({
        success: false,
        message: 'No valid products found to import (sample rows are ignored).',
        totalRows: validationResult.totalRows,
        validRows: 0,
        invalidRows: 0,
        duplicates: 0,
        createdRows: 0,
        skippedRows: validationResult.skippedRows,
        errors: [{ row: 0, field: 'file', error: 'No non-sample product rows found to import.' }],
      });
      return;
    }

    // 2. Atomic Database Transaction
    const createdProducts = await importBulkProductsTransaction(validationResult.validatedProducts, prisma);

    res.status(200).json({
      success: true,
      message: `Bulk import completed: ${createdProducts.length} product(s) imported successfully.`,
      totalRows: validationResult.totalRows,
      validRows: validationResult.validRows,
      invalidRows: 0,
      duplicates: 0,
      createdRows: createdProducts.length,
      skippedRows: validationResult.skippedRows,
      errors: [],
      products: createdProducts.map(mapProductResponse),
    });
  } catch (error: any) {
    console.error('[Bulk Import] Transaction failed:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Bulk import failed during database transaction. No changes were saved.',
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      duplicates: 0,
      createdRows: 0,
      skippedRows: 0,
      errors: [{ row: 0, field: 'transaction', error: error.message || 'Transaction rollback' }],
    });
  }
};

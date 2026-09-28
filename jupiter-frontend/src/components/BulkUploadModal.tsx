import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
  Loader2,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  validateBulkProductsApi,
  importBulkProductsApi,
  downloadCsvTemplate,
  BulkValidationResult,
  BulkImportResponse,
  BulkSummary,
} from '../services/productService';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRefresh: () => Promise<void> | void;
  triggerToast?: (message: string) => void;
}

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccessRefresh,
  triggerToast,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [isValidating, setIsValidating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const [validationResult, setValidationResult] = useState<BulkValidationResult | null>(null);
  const [importResult, setImportResult] = useState<BulkImportResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const [isErrorListExpanded, setIsErrorListExpanded] = useState(true);
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setFile(null);
    setFileError(null);
    setValidationResult(null);
    setImportResult(null);
    setApiError(null);
    setIsValidating(false);
    setIsImporting(false);
    setIsErrorListExpanded(true);
  };

  const handleClose = () => {
    if (isValidating || isImporting) return;
    handleReset();
    onClose();
  };

  const selectFile = (selected: File) => {
    setFileError(null);
    setApiError(null);
    setValidationResult(null);
    setImportResult(null);

    const name = selected.name.toLowerCase();
    if (!name.endsWith('.csv') && selected.type !== 'text/csv' && selected.type !== 'application/vnd.ms-excel') {
      setFileError('Invalid file format. Only CSV (.csv) spreadsheet files are accepted.');
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      selectFile(selected);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      selectFile(droppedFile);
    }
  };

  const handleDownloadTemplate = async () => {
    setIsDownloadingTemplate(true);
    try {
      await downloadCsvTemplate();
      if (triggerToast) {
        triggerToast('CSV template downloaded successfully.');
      }
    } catch (err: any) {
      setApiError('Unable to download CSV template. Please try again.');
    } finally {
      setIsDownloadingTemplate(false);
    }
  };

  const handleValidate = async () => {
    if (!file) return;

    setIsValidating(true);
    setApiError(null);
    setValidationResult(null);
    setImportResult(null);

    try {
      const result = await validateBulkProductsApi(file);
      setValidationResult(result);
      if (result.errors.length > 0) {
        setIsErrorListExpanded(true);
      }
      if (result.isValid && triggerToast) {
        triggerToast(`Validation passed: ${result.summary.validRows} valid rows detected.`);
      }
    } catch (err: any) {
      setApiError(err.message || 'Validation request failed.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleImport = async () => {
    if (!file || !canImport) return;

    setIsImporting(true);
    setApiError(null);

    try {
      const result = await importBulkProductsApi(file);
      setImportResult(result);

      const created = result.summary.createdRows || result.summary.validRows;
      const successMsg = `Successfully imported ${created} product${created === 1 ? '' : 's'} into catalog!`;

      if (triggerToast) {
        triggerToast(successMsg);
      }

      // Automatically refresh the products list from the backend
      await onSuccessRefresh();
      window.dispatchEvent(new Event('jupiter_products_updated'));
    } catch (err: any) {
      setApiError(err.message || 'Failed to import products from CSV.');
    } finally {
      setIsImporting(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Determine if Import can be triggered:
  // Must have validated successfully and have at least 1 valid row, and no fatal validation block
  const canImport = Boolean(
    file &&
    validationResult &&
    validationResult.isValid &&
    validationResult.summary.validRows > 0 &&
    !isValidating &&
    !isImporting &&
    !importResult
  );

  const activeSummary: BulkSummary | null =
    importResult?.summary || validationResult?.summary || null;

  const activeErrors = importResult?.errors || validationResult?.errors || [];

  return (
    <div className="modal-backdrop-overlay" onClick={handleClose}>
      <div
        className="modal-content-card"
        style={{
          maxWidth: '680px',
          width: '94%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '14px',
          boxShadow: '0 25px 60px rgba(0, 24, 39, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="modal-header-bar"
          style={{
            background: '#001827',
            color: '#FFFFFF',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            padding: '20px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(255, 146, 0, 0.15)',
                color: '#FF9200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 146, 0, 0.3)',
              }}
            >
              <Upload size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                Bulk Upload Products via CSV
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                Validate and batch-import machinery models and specifications
              </span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            disabled={isValidating || isImporting}
            style={{ color: '#94A3B8' }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          className="modal-body-content"
          style={{
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Download Template Action Card */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#E2E8F0',
                  color: '#00233D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '0.88rem', color: '#0F172A', display: 'block' }}>
                  Standard CSV Format Template
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Includes required column headers and sample machinery specifications
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              disabled={isDownloadingTemplate}
              className="btn btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#001827',
                cursor: isDownloadingTemplate ? 'wait' : 'pointer',
              }}
            >
              {isDownloadingTemplate ? (
                <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Download size={15} style={{ color: '#FF9200' }} />
              )}
              <span>Download CSV Template</span>
            </button>
          </div>

          {/* Drag & Drop Upload Area */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.86rem',
                fontWeight: 700,
                color: '#001827',
                marginBottom: '8px',
              }}
            >
              Select or Drop CSV File <span style={{ color: '#EF4444' }}>*</span>
            </label>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                if (!isValidating && !isImporting && fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
              style={{
                border: isDragOver
                  ? '2px dashed #FF9200'
                  : file
                  ? '2px solid #10B981'
                  : '2px dashed #CBD5E1',
                background: isDragOver
                  ? '#FFF7ED'
                  : file
                  ? '#F0FDF4'
                  : '#FAFAFA',
                borderRadius: '12px',
                padding: '30px 20px',
                textAlign: 'center',
                cursor: isValidating || isImporting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                disabled={isValidating || isImporting}
              />

              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: file ? '#DCFCE7' : '#EFF6FF',
                  color: file ? '#15803D' : '#0284C7',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}
              >
                {file ? <FileCheck size={28} /> : <Upload size={28} />}
              </div>

              {file ? (
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#166534', margin: '0 0 4px' }}>
                    {file.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#15803D', margin: 0 }}>
                    {formatFileSize(file.size)} • Click or drop to replace file
                  </p>
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>
                    Click to browse or drag and drop CSV file here
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                    Accepts <strong>.csv</strong> spreadsheets only
                  </p>
                </div>
              )}
            </div>

            {/* Selected File Details Bar */}
            {file && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#F1F5F9',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  marginTop: '10px',
                  fontSize: '0.82rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <FileText size={18} style={{ color: '#0284C7', flexShrink: 0 }} />
                  <span style={{ color: '#1E293B', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Selected: <strong>{file.name}</strong> ({formatFileSize(file.size)})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                  disabled={isValidating || isImporting}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '4px',
                  }}
                  title="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Inline File Format Error */}
            {fileError && (
              <div
                style={{
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#DC2626',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={16} />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          {/* Loading State Banner */}
          {(isValidating || isImporting) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px',
                background: '#FFF7ED',
                border: '1px solid #FFEDD5',
                borderRadius: '10px',
                color: '#C2410C',
                fontWeight: 600,
                fontSize: '0.88rem',
              }}
            >
              <Loader2 size={20} className="admin-spinner" style={{ animation: 'spin 1s linear infinite' }} />
              <span>
                {isValidating
                  ? 'Validating CSV records and columns on backend...'
                  : 'Importing verified products into machinery catalog... Please wait.'}
              </span>
            </div>
          )}

          {/* API Error Alert */}
          {apiError && (
            <div
              style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#991B1B',
                padding: '12px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '0.86rem',
                lineHeight: 1.4,
              }}
            >
              <AlertTriangle size={18} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '2px' }}>Operation Failed</strong>
                <span>{apiError}</span>
              </div>
            </div>
          )}

          {/* Successful Import Banner */}
          {importResult && (
            <div
              style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                padding: '14px 18px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.9rem',
                fontWeight: 700,
              }}
            >
              <CheckCircle size={22} style={{ color: '#10B981', flexShrink: 0 }} />
              <div>
                <div>{importResult.message || 'Bulk Import Completed!'}</div>
                <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 500, marginTop: '2px' }}>
                  {importResult.summary.createdRows} new machine model(s) successfully created.
                </div>
              </div>
            </div>
          )}

          {/* Validation Status Banner (before import) */}
          {validationResult && !importResult && (
            <div
              style={{
                background: validationResult.isValid ? '#F0FDF4' : '#FEF2F2',
                border: `1px solid ${validationResult.isValid ? '#BBF7D0' : '#FECACA'}`,
                color: validationResult.isValid ? '#166534' : '#991B1B',
                padding: '14px 18px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.88rem',
              }}
            >
              {validationResult.isValid ? (
                <CheckCircle size={22} style={{ color: '#16A34A', flexShrink: 0 }} />
              ) : (
                <AlertCircle size={22} style={{ color: '#DC2626', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block' }}>
                  {validationResult.isValid
                    ? 'CSV Validation Passed'
                    : 'Validation Issues Found'}
                </strong>
                <span style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                  {validationResult.isValid
                    ? `All rows passed schema checks. Ready to import ${validationResult.summary.validRows} products.`
                    : `${validationResult.summary.invalidRows} row(s) failed validation. Please review error details below.`}
                </span>
              </div>
            </div>
          )}

          {/* Import / Validation Summary: All 6 required metrics */}
          {activeSummary && (
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  color: '#001827',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <Layers size={16} style={{ color: '#FF9200' }} />
                <span>Import & Validation Summary</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                  gap: '10px',
                }}
              >
                {/* Total Rows */}
                <div
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, display: 'block' }}>
                    Total Rows
                  </span>
                  <strong style={{ fontSize: '1.25rem', color: '#0F172A', fontWeight: 900 }}>
                    {activeSummary.totalRows}
                  </strong>
                </div>

                {/* Valid Rows */}
                <div
                  style={{
                    background: '#DCFCE7',
                    border: '1px solid #BBF7D0',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700, display: 'block' }}>
                    Valid Rows
                  </span>
                  <strong style={{ fontSize: '1.25rem', color: '#15803D', fontWeight: 900 }}>
                    {activeSummary.validRows}
                  </strong>
                </div>

                {/* Invalid Rows */}
                <div
                  style={{
                    background: activeSummary.invalidRows > 0 ? '#FEE2E2' : '#F8FAFC',
                    border: `1px solid ${activeSummary.invalidRows > 0 ? '#FECACA' : '#E2E8F0'}`,
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: activeSummary.invalidRows > 0 ? '#991B1B' : '#64748B',
                      fontWeight: 700,
                      display: 'block',
                    }}
                  >
                    Invalid Rows
                  </span>
                  <strong
                    style={{
                      fontSize: '1.25rem',
                      color: activeSummary.invalidRows > 0 ? '#DC2626' : '#64748B',
                      fontWeight: 900,
                    }}
                  >
                    {activeSummary.invalidRows}
                  </strong>
                </div>

                {/* Duplicates */}
                <div
                  style={{
                    background: activeSummary.duplicates > 0 ? '#FEF3C7' : '#F8FAFC',
                    border: `1px solid ${activeSummary.duplicates > 0 ? '#FDE68A' : '#E2E8F0'}`,
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: activeSummary.duplicates > 0 ? '#92400E' : '#64748B',
                      fontWeight: 700,
                      display: 'block',
                    }}
                  >
                    Duplicates
                  </span>
                  <strong
                    style={{
                      fontSize: '1.25rem',
                      color: activeSummary.duplicates > 0 ? '#D97706' : '#64748B',
                      fontWeight: 900,
                    }}
                  >
                    {activeSummary.duplicates}
                  </strong>
                </div>

                {/* Created Rows */}
                <div
                  style={{
                    background: activeSummary.createdRows > 0 ? '#D1FAE5' : '#F8FAFC',
                    border: `1px solid ${activeSummary.createdRows > 0 ? '#A7F3D0' : '#E2E8F0'}`,
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: activeSummary.createdRows > 0 ? '#065F46' : '#64748B',
                      fontWeight: 700,
                      display: 'block',
                    }}
                  >
                    Created Rows
                  </span>
                  <strong
                    style={{
                      fontSize: '1.25rem',
                      color: activeSummary.createdRows > 0 ? '#059669' : '#64748B',
                      fontWeight: 900,
                    }}
                  >
                    {activeSummary.createdRows}
                  </strong>
                </div>

                {/* Skipped Rows */}
                <div
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, display: 'block' }}>
                    Skipped Rows
                  </span>
                  <strong style={{ fontSize: '1.25rem', color: '#475569', fontWeight: 900 }}>
                    {activeSummary.skippedRows}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* Expandable Row-Level Error List */}
          {activeErrors.length > 0 && (
            <div
              style={{
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => setIsErrorListExpanded(!isErrorListExpanded)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={18} style={{ color: '#D97706' }} />
                  <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#92400E' }}>
                    Row-Level Validation Errors ({activeErrors.length})
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B45309', fontSize: '0.78rem', fontWeight: 700 }}>
                  <span>{isErrorListExpanded ? 'Hide Details' : 'Show Details'}</span>
                  {isErrorListExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {isErrorListExpanded && (
                <div
                  style={{
                    borderTop: '1px solid #FDE68A',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    padding: '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  {activeErrors.map((errItem, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #FED7AA',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '0.8rem',
                      }}
                    >
                      <span
                        style={{
                          background: '#FEE2E2',
                          color: '#DC2626',
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          flexShrink: 0,
                        }}
                      >
                        Row {errItem.row}
                      </span>

                      <div style={{ flex: 1 }}>
                        {errItem.name && (
                          <strong style={{ color: '#0F172A', marginRight: '6px' }}>
                            "{errItem.name}":
                          </strong>
                        )}
                        {errItem.field && (
                          <span style={{ color: '#64748B', fontStyle: 'italic', marginRight: '6px' }}>
                            [{errItem.field}]
                          </span>
                        )}
                        <span style={{ color: '#B45309', fontWeight: 500 }}>
                          {errItem.message}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #E2E8F0',
            background: '#F8FAFC',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <button
              type="button"
              onClick={handleClose}
              disabled={isValidating || isImporting}
              className="btn btn-outline"
              style={{
                padding: '9px 18px',
                fontWeight: 600,
                fontSize: '0.86rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#475569',
                cursor: isValidating || isImporting ? 'not-allowed' : 'pointer',
              }}
            >
              Cancel / Close
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Validate CSV Button */}
            <button
              type="button"
              onClick={handleValidate}
              disabled={!file || isValidating || isImporting}
              className="btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                fontWeight: 700,
                fontSize: '0.86rem',
                borderRadius: '8px',
                border: '1px solid #00233D',
                background: '#00233D',
                color: '#FFFFFF',
                opacity: !file || isValidating || isImporting ? 0.6 : 1,
                cursor: !file || isValidating || isImporting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
              title={!file ? 'Select a CSV file first' : 'Validate CSV with backend'}
            >
              {isValidating ? (
                <>
                  <Loader2 size={16} className="admin-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Validating...</span>
                </>
              ) : (
                <>
                  <FileCheck size={16} style={{ color: '#FF9200' }} />
                  <span>Validate CSV</span>
                </>
              )}
            </button>

            {/* Import Products Button (Enabled only after successful validation) */}
            <button
              type="button"
              onClick={handleImport}
              disabled={!canImport}
              className="btn btn-orange"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 22px',
                fontWeight: 800,
                fontSize: '0.88rem',
                borderRadius: '8px',
                opacity: !canImport ? 0.5 : 1,
                cursor: !canImport ? 'not-allowed' : 'pointer',
                boxShadow: canImport ? '0 4px 14px rgba(255, 146, 0, 0.4)' : 'none',
                transition: 'all 0.2s ease',
              }}
              title={
                !canImport
                  ? 'Import is enabled only after successful validation'
                  : 'Import validated products into catalog'
              }
            >
              {isImporting ? (
                <>
                  <Loader2 size={16} className="admin-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Importing...</span>
                </>
              ) : (
                <>
                  <ArrowRight size={16} />
                  <span>Import Products</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

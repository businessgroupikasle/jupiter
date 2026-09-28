import { PrismaClient, Prisma } from '@prisma/client';

export const CSV_TEMPLATE_HEADERS = [
  'headerSubtitle',
  'productTitle',
  'slug',
  'category',
  'status',
  'displayOrder',
  'productionCapacity',
  'totalConnectedPower',
  'brickMoldSize',
  'mainImageUrl',
  'primaryMachinePhotoUrl',
  'galleryThumbnail1Url',
  'galleryThumbnail2Url',
  'galleryThumbnail3Url',
  'featureBadge1',
  'featureBadge2',
  'featureBadge3',
  'featureBadge4',
  'overviewDescription',
  'highlight1Title',
  'highlight1Description',
  'highlight2Title',
  'highlight2Description',
  'highlight3Title',
  'highlight3Description',
  'highlight4Title',
  'highlight4Description',
  'highlight5Title',
  'highlight5Description',
  'highlight6Title',
  'highlight6Description',
  'technicalSpecHeader1',
  'technicalSpecHeader2',
  'spec1Parameter',
  'spec1Details',
  'spec2Parameter',
  'spec2Details',
  'spec3Parameter',
  'spec3Details',
  'spec4Parameter',
  'spec4Details',
  'spec5Parameter',
  'spec5Details',
  'spec6Parameter',
  'spec6Details',
  'spec7Parameter',
  'spec7Details',
  'spec8Parameter',
  'spec8Details',
  'spec9Parameter',
  'spec9Details',
  'spec10Parameter',
  'spec10Details',
  'keyFeature1',
  'keyFeature2',
  'keyFeature3',
  'keyFeature4',
  'keyFeature5',
  'keyFeature6',
  'keyFeature7',
  'keyFeature8',
  'keyFeature9',
  'keyFeature10',
  'advantage1Title',
  'advantage1Description',
  'advantage2Title',
  'advantage2Description',
  'advantage3Title',
  'advantage3Description',
  'advantage4Title',
  'advantage4Description',
  'advantage5Title',
  'advantage5Description',
  'advantage6Title',
  'advantage6Description',
] as const;

export const CANONICAL_CATEGORIES = [
  'Fly Ash Brick Machine',
  'Hollow and Solid Block Machine',
  'Inter Block Making Machine',
  'Paver Block Machine',
  'Batching Plant',
  'Storage Silo',
  'Machine Spares',
] as const;

export const CATEGORY_ALIASES: Record<string, string> = {
  'fly ash brick machine': 'Fly Ash Brick Machine',
  'fly ash machine': 'Fly Ash Brick Machine',
  'fly ash brick machines': 'Fly Ash Brick Machine',
  'fly-ash-brick-machine': 'Fly Ash Brick Machine',
  'fly-ash-making-machine': 'Fly Ash Brick Machine',
  'fly-ash-brick-making-machine': 'Fly Ash Brick Machine',
  'hollow and solid block machine': 'Hollow and Solid Block Machine',
  'hollow & solid block machine': 'Hollow and Solid Block Machine',
  'hollow and solid block making machine': 'Hollow and Solid Block Machine',
  'block machines': 'Hollow and Solid Block Machine',
  'block machine': 'Hollow and Solid Block Machine',
  'hollow-and-solid-block-machine': 'Hollow and Solid Block Machine',
  'hollow-and-solid-block-making-machine': 'Hollow and Solid Block Machine',
  'inter block making machine': 'Inter Block Making Machine',
  'inter-block-making-machine': 'Inter Block Making Machine',
  'interlock machine': 'Inter Block Making Machine',
  'inter-lock machine': 'Inter Block Making Machine',
  'interlocking brick making machine': 'Inter Block Making Machine',
  'inter-locking-brick-making-machine': 'Inter Block Making Machine',
  'paver block machine': 'Paver Block Machine',
  'paver machines': 'Paver Block Machine',
  'paver machine': 'Paver Block Machine',
  'paver-block-machine': 'Paver Block Machine',
  'batching plant': 'Batching Plant',
  'batching & mixing': 'Batching Plant',
  'batching-plant': 'Batching Plant',
  'patching-plant': 'Batching Plant',
  'concrete-batching-plant': 'Batching Plant',
  'storage silo': 'Storage Silo',
  'cement silo': 'Storage Silo',
  'storage-silo': 'Storage Silo',
  'material handling': 'Fly Ash Brick Machine',
  'machine spares': 'Machine Spares',
  'all genuine machine spares': 'Machine Spares',
  'machine-spares': 'Machine Spares',
};

/**
 * Resolves any alias or case variation to canonical product category name
 */
export function resolveCategory(rawCategory: string): string | null {
  if (!rawCategory || typeof rawCategory !== 'string') return null;
  const normalized = rawCategory.trim().toLowerCase();
  if (CATEGORY_ALIASES[normalized]) {
    return CATEGORY_ALIASES[normalized];
  }
  for (const canonical of CANONICAL_CATEGORIES) {
    if (canonical.toLowerCase() === normalized) {
      return canonical;
    }
  }
  return null;
}

/**
 * Escapes a single CSV value compliant with RFC 4180
 */
export function escapeCsvField(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generates the UTF-8 CSV Template with Header and a Reference Sample Row
 * Note: Sample row productTitle begins with "SAMPLE - DELETE" and has NO default/placeholder image URLs.
 */
export function generateBulkTemplateCsv(): string {
  const headerLine = CSV_TEMPLATE_HEADERS.join(',');

  const sampleRowData: Record<string, string> = {
    headerSubtitle: 'High Performance Concrete Machinery',
    productTitle: 'SAMPLE - DELETE - Fully Automatic Fly Ash Brick Machine',
    slug: 'sample-delete-fully-automatic-fly-ash-brick-machine',
    category: 'Fly Ash Brick Machine',
    status: 'Active',
    displayOrder: '1',
    productionCapacity: '10000 to 12000 Bricks / Shift',
    totalConnectedPower: '25 HP (18.5 kW)',
    brickMoldSize: '230 x 110 x 75 mm',
    mainImageUrl: '',
    primaryMachinePhotoUrl: '',
    galleryThumbnail1Url: '',
    galleryThumbnail2Url: '',
    galleryThumbnail3Url: '',
    featureBadge1: 'ISO 9001 Certified',
    featureBadge2: 'Heavy Duty Steel',
    featureBadge3: 'PLC Automated',
    featureBadge4: 'Energy Efficient',
    overviewDescription:
      'Industrial heavy-duty hydraulic brick making plant engineered for continuous high-density compression and automated pallet feeding.',
    highlight1Title: 'High Compaction Hydraulic Power Pack',
    highlight1Description: 'Generates up to 160-200 bar compaction for superior brick compressive strength.',
    highlight2Title: 'Integrated PLC Touchscreen Control',
    highlight2Description: 'User-friendly interface with automatic cycle monitoring and diagnostic fault detection.',
    highlight3Title: 'Heavy Gauge Structural Frame',
    highlight3Description: 'Fabricated with premium structural steel to withstand rigorous high-frequency vibration.',
    highlight4Title: 'Automated Pallet Stacker System',
    highlight4Description: 'Streamlines plant logistics and minimizes manual labor overhead during continuous production.',
    highlight5Title: 'Precision Alloy Moulds',
    highlight5Description: 'CNC-machined with hardened wear liners for sharp dimensional edges.',
    highlight6Title: 'Multi-Stage Oil Filtration',
    highlight6Description: 'Preserves hydraulic valves and pump longevity with minimal scheduled maintenance.',
    technicalSpecHeader1: 'Parameter',
    technicalSpecHeader2: 'Details',
    spec1Parameter: 'Production Output',
    spec1Details: '10,000 - 12,000 Bricks / 8 hr shift',
    spec2Parameter: 'Total Power Requirement',
    spec2Details: '25 HP / 18.5 kW, 415V 50Hz',
    spec3Parameter: 'Operating Hydraulic Pressure',
    spec3Details: '160 - 200 Bar',
    spec4Parameter: 'Cycle Time',
    spec4Details: '15 - 20 Seconds',
    spec5Parameter: 'Pallet Dimensions',
    spec5Details: '750 x 550 x 20 mm',
    spec6Parameter: 'Raw Material Suitability',
    spec6Details: 'Fly Ash, Cement, Lime, Gypsum, Quarry Dust',
    spec7Parameter: 'Vibration Technology',
    spec7Details: 'Dual Synchronized Rotary Table Vibrators',
    spec8Parameter: 'Feeder Capacity',
    spec8Details: '350 Liters Automated Feed Box',
    spec9Parameter: 'Automation Grade',
    spec9Details: 'Fully Automated with Manual Override',
    spec10Parameter: 'Machine Weight',
    spec10Details: 'Approx. 4,500 kg',
    keyFeature1: 'Automatic aggregate feeding with synchronized rotary agitator blades',
    keyFeature2: 'Hydraulic double-acting cylinders with hardened chrome-plated shafts',
    keyFeature3: 'Modular quick-change mould system supporting pavers and solid blocks',
    keyFeature4: 'High-efficiency energy-saving motor compliant with industrial standards',
    keyFeature5: 'Centralized manual lubrication points for easy daily maintenance',
    keyFeature6: 'Safety light curtains and emergency stop push buttons',
    keyFeature7: 'Wear-resistant manganese alloy bottom and tamper head plates',
    keyFeature8: 'Auto-leveling pallet conveyor and ejection mechanism',
    keyFeature9: 'Comprehensive digital batch production reporting',
    keyFeature10: 'Rigid vibration-damping rubber mounts isolating the chassis',
    advantage1Title: 'Up to 20% Cement Savings',
    advantage1Description: 'High vibration density and optimum compaction reduces binder requirement while maintaining strength.',
    advantage2Title: 'Zero Downtime Architecture',
    advantage2Description: 'Engineered with standardized industrial components and readily available spare parts.',
    advantage3Title: 'Uniform Edges & Smooth Texture',
    advantage3Description: 'Eliminates thick plastering requirements, reducing on-site construction costs.',
    advantage4Title: 'Fast Investment Break-Even',
    advantage4Description: 'High production output with low labor dependency enables rapid return on capital.',
    advantage5Title: 'Eco-Friendly Fly Ash Utilization',
    advantage5Description: 'Converts industrial thermal power waste into high-grade green construction materials.',
    advantage6Title: 'Turnkey Commissioning & Support',
    advantage6Description: 'Backed by factory technical installation, operator training, and reliable after-sales service.',
  };

  const sampleRowLine = CSV_TEMPLATE_HEADERS.map((h) => escapeCsvField(sampleRowData[h] || '')).join(',');
  return `${headerLine}\r\n${sampleRowLine}\r\n`;
}

export interface RawCsvRecord {
  rowNumber: number;
  data: Record<string, string>;
  isSampleRow: boolean;
}

/**
 * Robust RFC 4180 CSV parser that tracks accurate 1-indexed row numbers in the CSV file
 */
export function parseBulkProductCsv(content: string): {
  headers: string[];
  records: RawCsvRecord[];
  parseErrors: Array<{ row: number; field: string; error: string }>;
} {
  const parseErrors: Array<{ row: number; field: string; error: string }> = [];
  const cleanContent = content.replace(/^\uFEFF/, ''); // strip UTF-8 BOM if present

  const lines: Array<{ rowNumber: number; cells: string[] }> = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  let startRowNumber = 1;
  let currentRowNumber = 1;

  for (let i = 0; i < cleanContent.length; i++) {
    const char = cleanContent[i];
    const nextChar = cleanContent[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i++; // skip escaped double quote
        } else {
          inQuotes = false;
        }
      } else {
        if (char === '\n') {
          currentRowNumber++;
        }
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // ignore CR
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        if (currentRow.length > 0 && currentRow.some((c) => c.length > 0)) {
          lines.push({ rowNumber: startRowNumber, cells: currentRow });
        }
        currentRowNumber++;
        startRowNumber = currentRowNumber;
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  // Push trailing record if any
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((c) => c.length > 0)) {
      lines.push({ rowNumber: startRowNumber, cells: currentRow });
    }
  }

  if (lines.length === 0) {
    return { headers: [], records: [], parseErrors: [{ row: 0, field: 'file', error: 'CSV file is empty' }] };
  }

  // First line is headers
  const headerLine = lines[0];
  const normalizedHeaders = headerLine.cells.map((h) => h.trim());

  // Map each header string to our canonical header name (case-insensitive & alphanumeric)
  const canonicalLookup = new Map<string, string>();
  CSV_TEMPLATE_HEADERS.forEach((h) => {
    canonicalLookup.set(h.toLowerCase().replace(/[^a-z0-9]/g, ''), h);
  });

  const resolvedHeaders = normalizedHeaders.map((raw) => {
    const key = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
    return canonicalLookup.get(key) || raw;
  });

  const records: RawCsvRecord[] = [];
  for (let idx = 1; idx < lines.length; idx++) {
    const line = lines[idx];
    const data: Record<string, string> = {};

    resolvedHeaders.forEach((h, colIdx) => {
      data[h] = line.cells[colIdx] !== undefined ? line.cells[colIdx].trim() : '';
    });

    // Check if sample row
    const productTitle = data.productTitle || '';
    const isSampleRow = productTitle.toUpperCase().startsWith('SAMPLE - DELETE');

    records.push({
      rowNumber: line.rowNumber,
      data,
      isSampleRow,
    });
  }

  return { headers: resolvedHeaders, records, parseErrors };
}

/**
 * Helper to validate image URLs
 * Allows http://, https://, and relative /uploads/... or /images/...
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return true;
  const trimmed = url.trim();
  if (trimmed.startsWith('/') || trimmed.startsWith('data:image/')) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export interface ProductDetailItemInput {
  type: string;
  title: string;
  description?: string;
  value?: string;
  order: number;
}

export interface ValidatedProductData {
  rowNumber: number;
  productTitle: string;
  finalSlug: string;
  canonicalCategory: string;
  status: 'Active' | 'Inactive';
  isActive: boolean;
  displayOrder: number;
  productionCapacity: string;
  totalConnectedPower: string;
  brickMoldSize: string | null;
  overviewDescription: string;
  coverImage: string;
  productImages: Array<{ url: string; isPrimary: boolean; order: number }>;
  specsPayload: Record<string, any>;
  detailItems: ProductDetailItemInput[];
}

export interface BulkValidationResult {
  isValid: boolean;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicates: number;
  createdRows: number;
  skippedRows: number;
  errors: Array<{ row: number; field: string; error: string }>;
  validatedProducts: ValidatedProductData[];
}

/**
 * Validates all records in the CSV file against business and database integrity rules.
 * Performs in-file and database duplicate detection without writing any data.
 */
export async function validateBulkProductRecords(
  records: RawCsvRecord[],
  prisma: PrismaClient
): Promise<BulkValidationResult> {
  const errors: Array<{ row: number; field: string; error: string }> = [];
  const validatedProducts: ValidatedProductData[] = [];

  let skippedRows = 0;
  let duplicateCount = 0;

  // In-file deduplication trackers (slug, and title + category)
  const seenFileSlugs = new Map<string, number>(); // slug -> rowNumber
  const seenFileTitleCats = new Map<string, number>(); // title|category -> rowNumber

  // Fetch all existing product slugs and title/category from database for fast duplicate checks
  const existingDbProducts = await prisma.product.findMany({
    select: { id: true, name: true, slug: true, category: true },
  });

  const existingDbSlugs = new Set(existingDbProducts.map((p) => p.slug.toLowerCase().trim()));
  const existingDbTitleCats = new Set(
    existingDbProducts.map((p) => `${p.name.toLowerCase().trim()}|${p.category.toLowerCase().trim()}`)
  );

  const nonSampleRecords = records.filter((r) => {
    if (r.isSampleRow) {
      skippedRows++;
      return false;
    }
    return true;
  });

  for (const record of nonSampleRecords) {
    const rowNum = record.rowNumber;
    const d = record.data;
    let rowHasError = false;

    // 1. Mandatory Fields: productTitle, category, status
    const productTitle = (d.productTitle || '').trim();
    if (!productTitle) {
      errors.push({ row: rowNum, field: 'productTitle', error: 'Product title is required' });
      rowHasError = true;
    }

    const rawCategory = (d.category || '').trim();
    if (!rawCategory) {
      errors.push({ row: rowNum, field: 'category', error: 'Category is required' });
      rowHasError = true;
    }

    const rawStatus = (d.status || '').trim();
    if (!rawStatus) {
      errors.push({ row: rowNum, field: 'status', error: 'Status is required' });
      rowHasError = true;
    }

    // 2. Status Validation: must only allow 'Active' or 'Inactive'
    if (rawStatus && rawStatus !== 'Active' && rawStatus !== 'Inactive') {
      errors.push({
        row: rowNum,
        field: 'status',
        error: `Status must only allow "Active" or "Inactive" (received "${rawStatus}")`,
      });
      rowHasError = true;
    }

    // 3. Category Validation against existing category system
    let canonicalCategory = '';
    if (rawCategory) {
      const resolved = resolveCategory(rawCategory);
      if (!resolved) {
        errors.push({
          row: rowNum,
          field: 'category',
          error: `Invalid category "${rawCategory}". Allowed categories: ${CANONICAL_CATEGORIES.join(', ')}`,
        });
        rowHasError = true;
      } else {
        canonicalCategory = resolved;
      }
    }

    // 4. Display Order Validation: must be numeric when provided
    const rawDisplayOrder = (d.displayOrder || '').trim();
    let displayOrder = 0;
    if (rawDisplayOrder) {
      const num = Number(rawDisplayOrder);
      if (isNaN(num) || !Number.isInteger(num) || num < 0) {
        errors.push({
          row: rowNum,
          field: 'displayOrder',
          error: `Display order must be a valid positive integer (received "${rawDisplayOrder}")`,
        });
        rowHasError = true;
      } else {
        displayOrder = num;
      }
    }

    // 5. Image URLs validation when supplied
    const imageFields = [
      'mainImageUrl',
      'primaryMachinePhotoUrl',
      'galleryThumbnail1Url',
      'galleryThumbnail2Url',
      'galleryThumbnail3Url',
    ] as const;

    for (const f of imageFields) {
      const val = (d[f] || '').trim();
      if (val && !isValidImageUrl(val)) {
        errors.push({
          row: rowNum,
          field: f,
          error: `Invalid URL format for ${f}: "${val}". Must be a valid HTTP/HTTPS URL or /uploads/ path.`,
        });
        rowHasError = true;
      }
    }

    // 6. Duplicate detection using slug or title + category
    let candidateSlug = (d.slug || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!candidateSlug && productTitle) {
      candidateSlug = productTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    if (candidateSlug) {
      // Check in-file duplicate by slug
      if (seenFileSlugs.has(candidateSlug)) {
        const prevRow = seenFileSlugs.get(candidateSlug);
        errors.push({
          row: rowNum,
          field: 'slug',
          error: `Duplicate slug "${candidateSlug}" detected in CSV (already in row ${prevRow})`,
        });
        duplicateCount++;
        rowHasError = true;
      } else {
        seenFileSlugs.set(candidateSlug, rowNum);
      }

      // Check DB duplicate by slug
      if (existingDbSlugs.has(candidateSlug)) {
        errors.push({
          row: rowNum,
          field: 'slug',
          error: `Duplicate product: A product with slug "${candidateSlug}" already exists in the database`,
        });
        duplicateCount++;
        rowHasError = true;
      }
    }

    // Check title + category duplicate
    if (productTitle && canonicalCategory) {
      const titleCatKey = `${productTitle.toLowerCase()}|${canonicalCategory.toLowerCase()}`;
      if (seenFileTitleCats.has(titleCatKey)) {
        const prevRow = seenFileTitleCats.get(titleCatKey);
        errors.push({
          row: rowNum,
          field: 'productTitle',
          error: `Duplicate product: "${productTitle}" in category "${canonicalCategory}" appears again in CSV (already in row ${prevRow})`,
        });
        duplicateCount++;
        rowHasError = true;
      } else {
        seenFileTitleCats.set(titleCatKey, rowNum);
      }

      if (existingDbTitleCats.has(titleCatKey)) {
        errors.push({
          row: rowNum,
          field: 'productTitle',
          error: `Duplicate product: A product with title "${productTitle}" already exists in category "${canonicalCategory}" in the database`,
        });
        duplicateCount++;
        rowHasError = true;
      }
    }

    // If no errors so far for this row, prepare validated product object across all 5 sections
    if (!rowHasError) {
      const headerSubtitle = (d.headerSubtitle || '').trim();
      const productionCapacity = (d.productionCapacity || '').trim();
      const totalConnectedPower = (d.totalConnectedPower || '').trim();
      const brickMoldSize = (d.brickMoldSize || '').trim() || null;
      const overviewDescription = (d.overviewDescription || '').trim();

      // Media resolution (Never use default images or placeholders!)
      const mainImageUrl = (d.mainImageUrl || '').trim();
      const primaryPhotoUrl = (d.primaryMachinePhotoUrl || '').trim();
      const thumb1 = (d.galleryThumbnail1Url || '').trim();
      const thumb2 = (d.galleryThumbnail2Url || '').trim();
      const thumb3 = (d.galleryThumbnail3Url || '').trim();

      const coverImage = mainImageUrl || primaryPhotoUrl || '';
      const allImageUrls = [mainImageUrl, primaryPhotoUrl, thumb1, thumb2, thumb3].filter(Boolean);
      const uniqueImageUrls = Array.from(new Set(allImageUrls));

      const galleryImages = [thumb1, thumb2, thumb3].filter(Boolean);

      // Section 1 Badges
      const featureBadges = [
        (d.featureBadge1 || '').trim(),
        (d.featureBadge2 || '').trim(),
        (d.featureBadge3 || '').trim(),
        (d.featureBadge4 || '').trim(),
      ].filter(Boolean);

      // Section 2 Highlights (up to 6)
      const highlights: Array<{ title: string; description: string }> = [];
      const detailItems: ProductDetailItemInput[] = [];

      for (let hIdx = 1; hIdx <= 6; hIdx++) {
        const title = (d[`highlight${hIdx}Title`] || '').trim();
        const description = (d[`highlight${hIdx}Description`] || '').trim();
        if (title || description) {
          highlights.push({ title: title || `Highlight ${hIdx}`, description });
          detailItems.push({
            type: 'Highlight',
            title: title || `Highlight ${hIdx}`,
            description: description || undefined,
            order: highlights.length - 1,
          });
        }
      }

      // Section 3 Technical Specs (up to 10)
      const header1 = (d.technicalSpecHeader1 || '').trim() || 'Parameter';
      const header2 = (d.technicalSpecHeader2 || '').trim() || 'Details';
      const specRows: Array<Record<string, string>> = [];
      const specsList: Array<{ label: string; value: string }> = [];

      for (let sIdx = 1; sIdx <= 10; sIdx++) {
        const param = (d[`spec${sIdx}Parameter`] || '').trim();
        const details = (d[`spec${sIdx}Details`] || '').trim();
        if (param || details) {
          const rowObj: Record<string, string> = {
            [header1]: param,
            [header2]: details,
          };
          specRows.push(rowObj);
          specsList.push({ label: param, value: details });
          detailItems.push({
            type: 'Specification',
            title: param || `Spec ${sIdx}`,
            value: details,
            description: details || undefined,
            order: specRows.length - 1,
          });
        }
      }

      // Section 4 Key Features (up to 10)
      const keyFeatures: string[] = [];
      for (let kIdx = 1; kIdx <= 10; kIdx++) {
        const feat = (d[`keyFeature${kIdx}`] || '').trim();
        if (feat) {
          keyFeatures.push(feat);
          detailItems.push({
            type: 'KeyFeature',
            title: feat,
            order: keyFeatures.length - 1,
          });
        }
      }

      // Section 5 Advantages (up to 6)
      const advantages: Array<{ title: string; description: string }> = [];
      for (let aIdx = 1; aIdx <= 6; aIdx++) {
        const title = (d[`advantage${aIdx}Title`] || '').trim();
        const description = (d[`advantage${aIdx}Description`] || '').trim();
        if (title || description) {
          advantages.push({ title: title || `Advantage ${aIdx}`, description });
          detailItems.push({
            type: 'Advantage',
            title: title || `Advantage ${aIdx}`,
            description: description || undefined,
            order: advantages.length - 1,
          });
        }
      }

      const specsPayload: Record<string, any> = {
        category: canonicalCategory,
        capacity: productionCapacity || 'Standard Production Output',
        power: totalConnectedPower || 'Standard Connected Load',
        brickSize: brickMoldSize,
        brandTag: headerSubtitle || 'JUPITER',
        ...(featureBadges.length > 0 ? { featureBadges } : {}),
        ...(galleryImages.length > 0 ? { galleryImages } : {}),
        ...(highlights.length > 0 ? { highlights } : {}),
        ...(specRows.length > 0
          ? {
              specTableColumns: [header1, header2],
              specTableRows: specRows,
              specs: specsList,
            }
          : {}),
        ...(keyFeatures.length > 0 ? { keyFeatures } : {}),
        ...(advantages.length > 0 ? { advantages } : {}),
      };

      const productImages = uniqueImageUrls.map((url, idx) => ({
        url,
        isPrimary: idx === 0,
        order: idx,
      }));

      validatedProducts.push({
        rowNumber: rowNum,
        productTitle,
        finalSlug: candidateSlug,
        canonicalCategory,
        status: rawStatus as 'Active' | 'Inactive',
        isActive: rawStatus === 'Active',
        displayOrder,
        productionCapacity: productionCapacity || 'Standard Production Output',
        totalConnectedPower: totalConnectedPower || 'Standard Connected Load',
        brickMoldSize,
        overviewDescription,
        coverImage,
        productImages,
        specsPayload,
        detailItems,
      });
    }
  }

  const totalRows = records.length;
  const invalidRows = nonSampleRecords.length - validatedProducts.length;
  const validRows = validatedProducts.length;

  return {
    isValid: errors.length === 0,
    totalRows,
    validRows,
    invalidRows,
    duplicates: duplicateCount,
    createdRows: 0,
    skippedRows,
    errors,
    validatedProducts,
  };
}

/**
 * Imports validated products atomically inside a single database transaction.
 * If any error occurs or if validation had failed, nothing is written to the database.
 */
export async function importBulkProductsTransaction(
  validatedProducts: ValidatedProductData[],
  prisma: PrismaClient
): Promise<any[]> {
  return await prisma.$transaction(async (tx) => {
    const created: any[] = [];

    for (const item of validatedProducts) {
      // Calculate order if not provided or 0
      let finalOrder = item.displayOrder;
      if (finalOrder <= 0) {
        const maxOrderProd = await tx.product.findFirst({
          where: { category: item.canonicalCategory },
          orderBy: { order: 'desc' },
        });
        finalOrder = (maxOrderProd?.order ?? 0) + 1;
      }

      const product = await tx.product.create({
        data: {
          name: item.productTitle,
          slug: item.finalSlug,
          category: item.canonicalCategory,
          description: item.overviewDescription || null,
          capacity: item.productionCapacity,
          power: item.totalConnectedPower,
          brickSize: item.brickMoldSize,
          image: item.coverImage || '',
          specifications: item.specsPayload,
          isActive: item.isActive,
          order: finalOrder,
          ...(item.productImages.length > 0
            ? {
                images: {
                  create: item.productImages,
                },
              }
            : {}),
          ...(item.detailItems.length > 0
            ? {
                details: {
                  create: item.detailItems.map((det) => ({
                    type: det.type,
                    title: det.title,
                    description: det.description || null,
                    value: det.value || null,
                    order: det.order,
                  })),
                },
              }
            : {}),
        },
        include: {
          images: { orderBy: { order: 'asc' } },
          details: { orderBy: { order: 'asc' } },
        },
      });

      created.push(product);
    }

    return created;
  });
}

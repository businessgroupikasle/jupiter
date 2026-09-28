/**
 * Lightweight, robust RFC 4180 compliant CSV parser.
 * Handles commas inside quotes, escaped quotes (""), multiline records, and UTF-8 BOM.
 */
export function parseCSV(content: string): Array<Record<string, string>> {
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  // Clean initial BOM if present
  const cleanContent = content.replace(/^\uFEFF/, '');

  for (let i = 0; i < cleanContent.length; i++) {
    const char = cleanContent[i];
    const nextChar = cleanContent[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // ignore carriage return
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        if (currentRow.length > 0 && currentRow.some((val) => val.length > 0)) {
          lines.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  // Push final trailing field/row if any
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((val) => val.length > 0)) {
      lines.push(currentRow);
    }
  }

  if (lines.length < 2) return [];

  // Extract headers and normalize: lowercase, remove non-alphanumeric except underscore
  const headers = lines[0].map((h) => h.trim());
  const records: Array<Record<string, string>> = [];

  for (let r = 1; r < lines.length; r++) {
    const row = lines[r];
    // Skip empty lines
    if (!row || row.every((c) => !c || c.trim().length === 0)) continue;

    const record: Record<string, string> = {};
    headers.forEach((header, idx) => {
      record[header] = row[idx] !== undefined ? row[idx].trim() : '';
    });
    records.push(record);
  }

  return records;
}

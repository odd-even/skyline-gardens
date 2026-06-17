export type ProductRow = {
  type: string;
  specie: string;
  variety: string;
};

export function parseCsv(text: string): ProductRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ",") {
      row.push(field.trim());
      field = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(field.trim());
      field = "";
      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    if (row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const [header, ...dataRows] = rows;
  const typeIndex = findColumnIndex(header, ["type"]);
  const specieIndex = findColumnIndex(header, ["specie", "species"]);
  const varietyIndex = findColumnIndex(header, ["variety", "varieties"]);

  if (typeIndex === -1 || specieIndex === -1) {
    return dataRows
      .filter((cells) => cells.some((cell) => cell.length > 0))
      .map((cells) => ({
        type: cells[0] ?? "",
        specie: cells[1] ?? "",
        variety: cells[2] ?? "",
      }));
  }

  return dataRows
    .filter((cells) => cells.some((cell) => cell.length > 0))
    .map((cells) => ({
      type: cells[typeIndex] ?? "",
      specie: cells[specieIndex] ?? "",
      variety: varietyIndex === -1 ? "" : (cells[varietyIndex] ?? ""),
    }))
    .filter((item) => item.type || item.specie || item.variety);
}

function findColumnIndex(header: string[], names: string[]) {
  const normalized = header.map((cell) => cell.trim().toLowerCase());
  return normalized.findIndex((cell) => names.includes(cell));
}

import type { ProductRow } from "./csv";

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").trim();
}

export function parseTablePressHtml(html: string, tableId = "tablepress-5"): ProductRow[] {
  const marker = `id="${tableId}"`;
  const start = html.indexOf(marker);
  if (start === -1) {
    return [];
  }

  const tableStart = html.lastIndexOf("<table", start);
  const tableEnd = html.indexOf("</table>", start);
  if (tableStart === -1 || tableEnd === -1) {
    return [];
  }

  const tableHtml = html.slice(tableStart, tableEnd);
  const rowMatches = tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  const rows: string[][] = [];

  for (const match of rowMatches) {
    const cells = [...match[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) =>
      stripHtml(cell[1]),
    );

    if (cells.some((cell) => cell.length > 0)) {
      rows.push(cells);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const [header, ...dataRows] = rows;
  const normalizedHeader = header.map((cell) => cell.toLowerCase());
  const typeIndex = normalizedHeader.indexOf("type");
  const specieIndex = normalizedHeader.findIndex((cell) => cell === "specie" || cell === "species");
  const varietyIndex = normalizedHeader.findIndex(
    (cell) => cell === "variety" || cell === "varieties",
  );

  return dataRows
    .map((cells) => ({
      type: cells[typeIndex >= 0 ? typeIndex : 0] ?? "",
      specie: cells[specieIndex >= 0 ? specieIndex : 1] ?? "",
      variety: varietyIndex >= 0 ? (cells[varietyIndex] ?? "") : (cells[2] ?? ""),
    }))
    .filter((row) => row.type || row.specie || row.variety);
}

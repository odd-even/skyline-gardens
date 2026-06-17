import fallbackProducts from "@/data/products-fallback.json";
import { parseCsv, type ProductRow } from "./csv";
import { parseTablePressHtml } from "./tablepress";

export type ProductsSource = "google-sheets" | "wordpress" | "fallback";

export type ProductsData = {
  rows: ProductRow[];
  source: ProductsSource;
  updatedAt: string;
};

const DEFAULT_WORDPRESS_PRODUCTS_URL = "https://www.skylinegardens.ca/products/";

function getRevalidateSeconds(): number {
  return Number(process.env.PRODUCTS_REVALIDATE_SECONDS ?? 300);
}

function getGoogleSheetsCsvUrl(): string | null {
  if (process.env.GOOGLE_SHEETS_PRODUCTS_CSV_URL) {
    return process.env.GOOGLE_SHEETS_PRODUCTS_CSV_URL;
  }

  const spreadsheetId = process.env.GOOGLE_SHEETS_PRODUCTS_ID;
  if (!spreadsheetId) {
    return null;
  }

  const gid = process.env.GOOGLE_SHEETS_PRODUCTS_GID ?? "0";
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
}

function getWordPressProductsUrl(): string | null {
  const url = process.env.WORDPRESS_PRODUCTS_URL?.trim();
  if (url === "false" || url === "0") {
    return null;
  }

  return url || DEFAULT_WORDPRESS_PRODUCTS_URL;
}

async function fetchGoogleSheetsProducts(): Promise<ProductRow[] | null> {
  const csvUrl = getGoogleSheetsCsvUrl();
  if (!csvUrl) {
    return null;
  }

  const response = await fetch(csvUrl, {
    next: { revalidate: getRevalidateSeconds() },
  });

  if (!response.ok) {
    throw new Error(`Google Sheets fetch failed: ${response.status}`);
  }

  const csv = await response.text();
  const rows = parseCsv(csv);

  if (rows.length === 0) {
    throw new Error("Google Sheets returned no product rows");
  }

  return rows;
}

async function fetchWordPressProducts(): Promise<ProductRow[] | null> {
  const pageUrl = getWordPressProductsUrl();
  if (!pageUrl) {
    return null;
  }

  const response = await fetch(pageUrl, {
    next: { revalidate: getRevalidateSeconds() },
    headers: {
      "User-Agent": "SkylineGardensSite/1.0 (+https://www.skylinegardens.ca)",
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress products fetch failed: ${response.status}`);
  }

  const html = await response.text();
  const tableId = process.env.WORDPRESS_TABLEPRESS_ID ?? "tablepress-5";
  const rows = parseTablePressHtml(html, tableId);

  if (rows.length === 0) {
    throw new Error("WordPress products page returned no TablePress rows");
  }

  return rows;
}

export async function getProducts(): Promise<ProductsData> {
  const updatedAt = new Date().toISOString();

  try {
    const sheetRows = await fetchGoogleSheetsProducts();
    if (sheetRows) {
      return {
        rows: sheetRows,
        source: "google-sheets",
        updatedAt,
      };
    }
  } catch (error) {
    console.error("Products sheet fetch failed:", error);
  }

  try {
    const wordpressRows = await fetchWordPressProducts();
    if (wordpressRows) {
      return {
        rows: wordpressRows,
        source: "wordpress",
        updatedAt,
      };
    }
  } catch (error) {
    console.error("WordPress products fetch failed:", error);
  }

  return {
    rows: fallbackProducts as ProductRow[],
    source: "fallback",
    updatedAt,
  };
}

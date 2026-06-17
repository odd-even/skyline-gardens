import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { isSanityConfigured, projectId as sanityProjectId } from "@/sanity/client";

function getResendApiKey() {
  return process.env.RESEND_API_KEY ?? process.env.SkylineEmailKey;
}

export async function GET() {
  const products = await getProducts();

  return NextResponse.json({
    maps: {
      configured: Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
    },
    products: {
      source: products.source,
      rowCount: products.rows.length,
      updatedAt: products.updatedAt,
      googleSheets: Boolean(
        process.env.GOOGLE_SHEETS_PRODUCTS_CSV_URL || process.env.GOOGLE_SHEETS_PRODUCTS_ID,
      ),
      wordpress: Boolean(
        process.env.WORDPRESS_PRODUCTS_URL !== "false" &&
          process.env.WORDPRESS_PRODUCTS_URL !== "0",
      ),
    },
    sanity: {
      configured: isSanityConfigured,
      projectId: sanityProjectId,
    },
    contact: {
      configured: Boolean(getResendApiKey()),
      recipient: process.env.CONTACT_EMAIL ?? "info@skylinegardens.ca",
    },
  });
}

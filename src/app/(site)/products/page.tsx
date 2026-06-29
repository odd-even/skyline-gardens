import type { Metadata } from "next";
import { ProductsListing } from "@/components/ProductsListing";
import { getProducts } from "@/lib/products";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Skyline Gardens seasonal plant inventory in Keswick Ridge, NB — annuals, perennials, vegetables, herbs, hanging baskets, succulents, and greenhouse-grown plants.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: `Products – ${SITE_NAME}`,
    description:
      "Seasonal plant inventory and pricing from Skyline Gardens garden centre in Keswick Ridge, New Brunswick.",
  },
};

export const revalidate = 300;

export default async function ProductsPage() {
  const data = await getProducts();

  return <ProductsListing data={data} />;
}

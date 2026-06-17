import type { Metadata } from "next";
import { ProductsListing } from "@/components/ProductsListing";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products – Skyline Gardens",
  description:
    "Browse Skyline Gardens seasonal product selection including annuals, perennials, vegetables, herbs, and hanging baskets.",
};

export const revalidate = 300;

export default async function ProductsPage() {
  const data = await getProducts();

  return <ProductsListing data={data} />;
}

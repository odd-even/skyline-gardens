import Link from "next/link";
import { ProductsTable } from "@/components/ProductsTable";
import type { ProductsData } from "@/lib/products";

type ProductsListingProps = {
  data: ProductsData;
};

export function ProductsListing({ data }: ProductsListingProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h1 className="section-heading mb-4">Products Listing</h1>
          <p className="text-lg leading-relaxed text-skyline-gray-light">
            Here&apos;s some of our seasonal product selection. If you are looking for something
            custom, don&apos;t hesitate to{" "}
            <Link href="/#contact" className="text-skyline-pink hover:underline">
              reach out to us
            </Link>
            !
          </p>
        </div>

        <ProductsTable rows={data.rows} />
      </div>
    </section>
  );
}

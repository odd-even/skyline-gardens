import Link from "next/link";
import { ProductsTable } from "@/components/ProductsTable";
import type { ProductsData } from "@/lib/products";

type ProductsListingProps = {
  data: ProductsData;
};

export function ProductsListing({ data }: ProductsListingProps) {
  return (
    <section className="section-padding bg-white">
      <div className="content-max px-5 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <h1 className="section-heading mb-3 sm:mb-4">Products Listing</h1>
          <p className="section-lead">
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

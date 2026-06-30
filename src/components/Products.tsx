import Image from "next/image";
import Link from "next/link";
import type { ProductCategory, ProductHighlight } from "@/sanity/types";
import { highlightImages } from "@/sanity/fallback";

type ProductsProps = {
  intro: string;
  categories: ProductCategory[];
  highlights: ProductHighlight[];
};

function getHighlightImage(title: string) {
  return highlightImages[title] ?? "/images/beddingplants.png";
}

export function Products({ intro, categories, highlights }: ProductsProps) {
  return (
    <section id="products" className="section-padding bg-white">
      <div className="content-max px-5 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-8 text-center sm:mb-10 lg:mb-12">Our Products</h2>

        <div className="mb-12 grid gap-6 sm:mb-14 sm:gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-12">
          <p className="section-lead text-center lg:text-left">{intro}</p>

          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
            {categories.map((category) => (
              <span
                key={category._id}
                className="inline-flex items-center rounded-button bg-[#333333] px-3 py-1.5 text-[11px] font-medium uppercase leading-none tracking-wide text-white"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-5">
          {highlights.map((item) => (
            <article key={item._id} className="text-center">
              <div className="mx-auto mb-4 flex h-32 w-full max-w-[140px] items-center justify-center">
                <Image
                  src={getHighlightImage(item.title)}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="h-auto max-h-28 w-auto object-contain"
                />
              </div>
              <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold leading-tight text-skyline-gray sm:text-xl lg:text-2xl">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm leading-relaxed text-skyline-gray-light">
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center lg:mt-16">
          <Link href="/products" className="hero-cta">
            View Product Listing
          </Link>
        </div>
      </div>
    </section>
  );
}

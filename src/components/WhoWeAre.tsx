import Image from "next/image";
import type { ValueProp } from "@/sanity/types";
import { valuePropIcons } from "@/sanity/fallback";

type WhoWeAreProps = {
  valueProps: ValueProp[];
};

function getIcon(title: string) {
  return valuePropIcons[title] ?? "/images/shed.png";
}

export function WhoWeAre({ valueProps }: WhoWeAreProps) {
  return (
    <section id="who-we-are" className="section-padding bg-skyline-teal text-white">
      <div className="content-max px-5 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-8 text-center !text-white sm:mb-10 lg:mb-12">
          Who We Are
        </h2>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((item) => (
            <article key={item._id} className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                <Image
                  src={getIcon(item.title)}
                  alt=""
                  width={80}
                  height={80}
                  className="h-auto w-auto object-contain"
                  aria-hidden
                />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/90">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

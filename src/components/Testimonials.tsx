"use client";

import Image from "next/image";
import { ElfsightEmbed } from "@/components/elfsight/ElfsightEmbed";
import { ELFSIGHT_WIDGETS } from "@/components/elfsight/constants";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="pointer-events-none absolute right-0 top-0 opacity-10">
        <Image src="/images/gardener-01.png" alt="" width={400} height={300} aria-hidden />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 opacity-10">
        <Image
          src="/images/snail-1-e1654719877259.png"
          alt=""
          width={200}
          height={200}
          aria-hidden
        />
      </div>

      <div className="content-max relative px-6 lg:px-8">
        <h2 className="section-heading mb-12 text-center">
          What our customers are saying…
        </h2>

        <ElfsightEmbed appId={ELFSIGHT_WIDGETS.reviews} lazy />
      </div>
    </section>
  );
}

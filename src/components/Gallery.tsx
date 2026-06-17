import type { GalleryImage as GalleryImageType } from "@/sanity/types";
import { galleryImages as fallbackGallery } from "@/sanity/fallback";
import { GalleryGrid } from "./GalleryGrid";

type GalleryProps = {
  title: string;
  text: string;
  images: GalleryImageType[];
};

export function Gallery({ title, text, images }: GalleryProps) {
  const imageList =
    images.length > 0
      ? images.map((img, i) => ({
          src: fallbackGallery[i] ?? `/images/greenhouse${i === 0 ? "" : i + 1}.jpg`,
          alt: img.alt ?? `Skyline Gardens ${i + 1}`,
        }))
      : fallbackGallery.map((src, i) => ({
          src,
          alt: `Skyline Gardens greenhouse ${i + 1}`,
        }));

  return (
    <section className="section-padding bg-white">
      <div className="content-max px-5 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-3 text-center sm:mb-4">{title}</h2>
        <p className="section-lead mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          {text}
        </p>

        <GalleryGrid images={imageList} />
      </div>
    </section>
  );
}

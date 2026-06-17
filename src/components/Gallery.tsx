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
    <section className="bg-white py-16 lg:py-20">
      <div className="content-max px-6 lg:px-8">
        <h2 className="section-heading mb-4 text-center">{title}</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-skyline-gray-light">
          {text}
        </p>

        <GalleryGrid images={imageList} />
      </div>
    </section>
  );
}

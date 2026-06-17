import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { WhoWeAre } from "@/components/WhoWeAre";
import { ContactSection } from "@/components/ContactSection";
import { getHomepageData } from "@/sanity/fetch";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getHomepageData();
  const { settings, categories, highlights, valueProps, gallery } = data;

  return (
    <>
      <Hero settings={settings} />
      <Products
        intro={settings.productsIntro}
        categories={categories}
        highlights={highlights}
      />
      <Gallery
        title={settings.galleryTitle}
        text={settings.galleryText}
        images={gallery}
      />
      <Testimonials />
      <WhoWeAre valueProps={valueProps} />
      <ContactSection settings={settings} />
    </>
  );
}

import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    heroTitle,
    heroText,
    heroImage,
    productsIntro,
    galleryTitle,
    galleryText,
    socialTitle,
    socialText,
    phone,
    email,
    address,
    fullAddress,
    facebookUrl,
    instagramUrl,
    seasonOpensOn,
    seasonClosesOn,
    aprilHours,
    mayJuneHours,
    mapsUrl,
    familyCentreTitle,
    familyCentreText
  }
`;

export const productCategoriesQuery = groq`
  *[_type == "productCategory"] | order(order asc) {
    _id,
    name,
    order
  }
`;

export const productHighlightsQuery = groq`
  *[_type == "productHighlight"] | order(order asc) {
    _id,
    title,
    description,
    image,
    size,
    order
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    author,
    quote,
    rating,
    order
  }
`;

export const valuePropsQuery = groq`
  *[_type == "valueProp"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    order
  }
`;

export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(order asc) {
    _id,
    image,
    alt,
    order
  }
`;

export const homepageQuery = groq`
{
  "settings": ${siteSettingsQuery},
  "categories": ${productCategoriesQuery},
  "highlights": ${productHighlightsQuery},
  "testimonials": ${testimonialsQuery},
  "valueProps": ${valuePropsQuery},
  "gallery": ${galleryImagesQuery}
}
`;

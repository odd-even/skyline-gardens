export type SiteSettings = {
  title: string;
  heroTitle: string;
  heroText: string;
  heroImage?: { asset: { _ref: string } };
  productsIntro: string;
  galleryTitle: string;
  galleryText: string;
  socialTitle: string;
  socialText: string;
  phone: string;
  email: string;
  address: string;
  fullAddress: string;
  facebookUrl: string;
  instagramUrl: string;
  seasonOpensOn: string;
  seasonClosesOn: string;
  aprilHours: string;
  mayJuneHours: string;
  mapsUrl: string;
  familyCentreTitle: string;
  familyCentreText: string;
};

export type ProductCategory = {
  _id: string;
  name: string;
  order?: number;
};

export type ProductHighlight = {
  _id: string;
  title: string;
  description?: string;
  image?: { asset: { _ref: string } };
  size?: "small" | "large";
  order?: number;
};

export type Testimonial = {
  _id: string;
  author: string;
  quote: string;
  rating?: number;
  order?: number;
};

export type ValueProp = {
  _id: string;
  title: string;
  description?: string;
  icon?: { asset: { _ref: string } };
  order?: number;
};

export type GalleryImage = {
  _id: string;
  image: { asset: { _ref: string } };
  alt?: string;
  order?: number;
};

export type HomepageData = {
  settings: SiteSettings;
  categories: ProductCategory[];
  highlights: ProductHighlight[];
  testimonials: Testimonial[];
  valueProps: ValueProp[];
  gallery: GalleryImage[];
};

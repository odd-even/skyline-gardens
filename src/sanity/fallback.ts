import type { HomepageData } from "./types";

export const fallbackData: HomepageData = {
  settings: {
    title: "Skyline Gardens – Your local family garden center",
    heroTitle: "Welcome to Skyline!",
    heroText:
      "Welcome to Skyline Gardens – your local family garden centre! From hanging baskets to custom designed planters, vegetables, seeds, succulents, and myriads of flowers, we've got your gardening needs covered!",
    productsIntro:
      "We have bedding plants, perennials, seedling starter trays, houseplants, succulents, cacti, hanging baskets, patio planters, vegetables, herbs, and ornamental grasses for all your garden and landscape needs! Looking for something specific? Message us and we'll tell you if we have it.",
    galleryTitle: "Take a look around!",
    galleryText:
      "Our selections are always changing, but here's what you'll find around the garden centre.",
    socialTitle: "We're on social media",
    socialText:
      "Follow us on Facebook or Instagram to get live updates, special offers and much more!",
    phone: "(506) 323-0506",
    email: "info@skylinegardens.ca",
    address: "644 Route 616 Keswick, NB",
    fullAddress: "644 Route 616, Keswick Ridge, NB E6L 1S8",
    facebookUrl: "https://www.facebook.com/skylinegardenskeswickridge",
    instagramUrl: "https://www.instagram.com/skyline_gardens/",
    seasonOpensOn: "2026-04-27",
    seasonClosesOn: "2026-09-15",
    hoursSchedules: [
      {
        title: "April",
        startsOn: "2026-04-27",
        endsOn: "2026-04-30",
        hours: "APRIL\nSaturday: 10AM-3PM",
      },
      {
        title: "May–June",
        startsOn: "2026-05-01",
        endsOn: "2026-06-25",
        hours:
          "MAY-JUNE\nMonday – Friday: 10AM-7PM\nSaturday: 10AM-5PM\nSunday: 10AM-4PM",
      },
      {
        title: "Summer",
        startsOn: "2026-06-26",
        hours:
          "SUMMER\nMonday – Friday: 10AM-5PM\nSaturday: 10AM-5PM\nSunday: 10AM-4PM",
        noticeBefore:
          "Starting Friday, June 26, we will close at 5 pm weekdays until closing day. Thank you.",
        noticeDuring: "We close at 5 pm weekdays until closing day. Thank you.",
      },
    ],
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=644+Route+616,+Keswick+Ridge,+NB+E6L+1S8",
    familyCentreTitle: "Your Local Family Garden Centre",
    familyCentreText:
      "We're family owned and operated and we love to interact with our customers! Stop by and experience your local garden centre.",
  },
  categories: [
    { _id: "1", name: "Bedding Plants", order: 1 },
    { _id: "2", name: "Annuals", order: 2 },
    { _id: "3", name: "Vegetables", order: 3 },
    { _id: "4", name: "Herbs", order: 4 },
    { _id: "5", name: "Perennials", order: 5 },
    { _id: "6", name: "Succulents", order: 6 },
    { _id: "7", name: "Cacti", order: 7 },
    { _id: "8", name: "Grasses", order: 8 },
    { _id: "9", name: "Ferns", order: 9 },
    { _id: "10", name: "Houseplants", order: 10 },
    { _id: "11", name: "Foliage", order: 11 },
    { _id: "12", name: "Planters", order: 12 },
    { _id: "13", name: "Hangers", order: 13 },
    { _id: "14", name: "Seedlings", order: 14 },
    { _id: "15", name: "Seeds", order: 15 },
    { _id: "16", name: "Patio Containers", order: 16 },
    { _id: "17", name: "Ceramic Pots", order: 17 },
    { _id: "18", name: "Potting Soil", order: 18 },
    { _id: "19", name: "Peat Moss", order: 19 },
    { _id: "20", name: "Fertilizer", order: 20 },
  ],
  highlights: [
    {
      _id: "h1",
      title: "Hanging Baskets",
      description: "Beautiful hangers in every imaginable color!",
      size: "small",
      order: 1,
    },
    {
      _id: "h2",
      title: "Bedding Plants",
      description: "Bedding plants are perfect for mass plantings and landscaping.",
      size: "large",
      order: 2,
    },
    {
      _id: "h3",
      title: "Planters",
      description: "Looking for the perfect patio accent? Check out Skyline's planter selection!",
      size: "small",
      order: 3,
    },
    {
      _id: "h4",
      title: "Perennials",
      description: "We have a selection of cold hardy plants for enjoyment year after year.",
      size: "small",
      order: 4,
    },
    {
      _id: "h5",
      title: "Vegetables & Herbs",
      description: "From tomatoes to thyme, we've got your garden covered!",
      size: "small",
      order: 5,
    },
    {
      _id: "h6",
      title: "Custom Containers",
      description:
        "Bring us your empty containers and we'll custom design beautiful combinations!",
      size: "small",
      order: 6,
    },
    {
      _id: "h7",
      title: "Succulents & Houseplants",
      description: "Don't miss our selection of succulents, cacti, and indoor plants.",
      size: "large",
      order: 7,
    },
    {
      _id: "h8",
      title: "Seed Packages",
      description: "We have a selection of seed packets for your garden.",
      size: "small",
      order: 8,
    },
    {
      _id: "h9",
      title: "Seed Starting Trays",
      description: "Try our seedling trays for cost effective starter plants.",
      size: "small",
      order: 9,
    },
    {
      _id: "h10",
      title: "Potting Soil",
      description: "Pick up a couple bags of our potting soil to get your plants off to a good start.",
      size: "small",
      order: 10,
    },
  ],
  testimonials: [
    {
      _id: "t1",
      author: "T F",
      quote:
        "Beautiful plants and friendly service! We always stop by when we're in the area.",
      rating: 5,
      order: 1,
    },
    {
      _id: "t2",
      author: "Robert Henry",
      quote: "Great selection and knowledgeable staff. Highly recommend Skyline Gardens!",
      rating: 5,
      order: 2,
    },
    {
      _id: "t3",
      author: "Lindsay Robichaud",
      quote: "Our go-to garden centre. The hanging baskets are always stunning.",
      rating: 5,
      order: 3,
    },
  ],
  valueProps: [
    {
      _id: "v1",
      title: "We're your local garden centre",
      description:
        "We're located in the beautiful Keswick Ridge area of New Brunswick, Canada.",
      order: 1,
    },
    {
      _id: "v2",
      title: "We're Family Owned & Operated",
      description:
        "Our garden centre is owned and operated all within the Pinter family. Stop by and say hello!",
      order: 2,
    },
    {
      _id: "v3",
      title: "We're passionate about plants!",
      description:
        "Our love for growing things is only surpassed by our commitment to our customers.",
      order: 3,
    },
  ],
  gallery: [],
};

export const highlightImages: Record<string, string> = {
  "Hanging Baskets": "/images/hanger.png",
  "Bedding Plants": "/images/beddingplants.png",
  Planters: "/images/planters.png",
  Perennials: "/images/perennial.png",
  "Vegetables & Herbs": "/images/veggies.png",
  "Custom Containers": "/images/customcontainers.png",
  "Succulents & Houseplants": "/images/succulents.png",
  "Seed Packages": "/images/seeds.png",
  "Seed Starting Trays": "/images/seedtrays.png",
  "Potting Soil": "/images/soil.png",
};

export const valuePropIcons: Record<string, string> = {
  "We're your local garden centre": "/images/shed.png",
  "We're Family Owned & Operated": "/images/glove-1.png",
  "We're passionate about plants!": "/images/tools.png",
};

export const galleryImages = [
  "/images/greenhouse.jpg",
  "/images/greenhouse2.jpg",
  "/images/greenhouse3.jpg",
  "/images/greenhouse4.jpg",
  "/images/greenhouse5.jpg",
];

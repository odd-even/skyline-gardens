import { defineField, defineType } from "sanity";

export const productHighlight = defineType({
  name: "productHighlight",
  title: "Product Highlight",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "size",
      title: "Card Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Large", value: "large" },
        ],
      },
      initialValue: "small",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});

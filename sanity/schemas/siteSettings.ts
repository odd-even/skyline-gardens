import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroText",
      title: "Hero Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "productsIntro",
      title: "Products Section Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "galleryTitle",
      title: "Gallery Title",
      type: "string",
    }),
    defineField({
      name: "galleryText",
      title: "Gallery Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "socialTitle",
      title: "Social Media Title",
      type: "string",
    }),
    defineField({
      name: "socialText",
      title: "Social Media Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "fullAddress",
      title: "Full Address (for maps)",
      type: "string",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "seasonOpensOn",
      title: "Season Opens On",
      type: "date",
      description: "First day of the season (e.g. April 27, 2027). The site shows daily hours from this date.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seasonClosesOn",
      title: "Season Closes On",
      type: "date",
      description: "Last day of the season (e.g. September 15, 2026). After this date the site shows closed for the season.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hoursSchedules",
      title: "Hours Schedules",
      type: "array",
      description:
        "Dated hour blocks in chronological order. Each schedule becomes active on its start date and runs until its end date, the next schedule begins, or the season closes.",
      of: [
        {
          type: "object",
          name: "hoursSchedule",
          title: "Schedule",
          fields: [
            defineField({
              name: "title",
              title: "Label",
              type: "string",
              description: 'Shown above the hours list (e.g. "May–June", "Summer").',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "startsOn",
              title: "Starts On",
              type: "date",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "endsOn",
              title: "Ends On",
              type: "date",
              description: "Optional. Leave empty to run until the next schedule starts or the season ends.",
            }),
            defineField({
              name: "hours",
              title: "Hours",
              type: "text",
              rows: 5,
              description:
                'One line per day range, e.g. "Monday – Friday: 10AM-7PM". Optional first line can repeat the label.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "noticeBefore",
              title: "Notice (before start)",
              type: "text",
              rows: 2,
              description: "Optional banner shown during the start month before this schedule begins.",
            }),
            defineField({
              name: "noticeDuring",
              title: "Notice (while active)",
              type: "text",
              rows: 2,
              description: "Optional banner shown while this schedule is in effect.",
            }),
          ],
          preview: {
            select: { title: "title", startsOn: "startsOn", endsOn: "endsOn" },
            prepare({ title, startsOn, endsOn }) {
              return {
                title: title || "Schedule",
                subtitle: [startsOn, endsOn].filter(Boolean).join(" → "),
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "mapsUrl",
      title: "Google Maps URL",
      type: "url",
    }),
    defineField({
      name: "familyCentreTitle",
      title: "Family Centre Title",
      type: "string",
    }),
    defineField({
      name: "familyCentreText",
      title: "Family Centre Text",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});

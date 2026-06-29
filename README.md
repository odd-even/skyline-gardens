# Skyline Gardens

A modern rebuild of [skylinegardens.ca](https://www.skylinegardens.ca) using **Next.js**, **Sanity CMS**, and **Vercel**.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Sanity** (content management — text, images, hours, testimonials)
- **Tailwind CSS** (styling)
- **Vercel** (hosting)

The site works immediately with built-in fallback content. Connect Sanity when you're ready to edit content in a CMS.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Sanity setup

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` to `.env.local` and add your project ID:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

3. Open the embedded studio at [http://localhost:3000/studio](http://localhost:3000/studio)
4. Add content using the schemas (Site Settings, Products, Testimonials, etc.)

## Contact form

The contact form posts to `/api/contact` and sends via [Resend](https://resend.com). Without an API key, submissions are logged to the server console.

1. Sign up at [resend.com](https://resend.com) and create an API key
2. Verify your domain (`skylinegardens.ca`) in Resend
3. Add to `.env.local`:

```env
RESEND_API_KEY=re_...
CONTACT_EMAIL=info@skylinegardens.ca
RESEND_FROM_EMAIL=Skyline Gardens <noreply@skylinegardens.ca>
```

Check configuration at `/api/integrations` — `contact.configured` should be `true`.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add environment variables from `.env.example`
4. Deploy

Sanity Studio will be available at `yoursite.vercel.app/studio`.

## What I still need from you

For a **pixel-perfect** match to the WordPress/Divi site:

1. **Screenshots** of each section (especially mobile) — helpful for fine-tuning spacing and colors
2. **WordPress export** (optional) — theme files or Divi layout JSON for exact layout reference
3. **Real testimonials** — the live site uses an Elfsight Google Reviews widget; I added placeholder quotes
4. **Sanity project ID** — so we can wire up live CMS editing
5. **Logo/fonts** — if you have original vector logo or custom font files beyond Google Fonts

## Project structure

```
src/
  app/           # Next.js pages & API routes
  components/    # UI sections matching the live site
  sanity/        # Sanity client, queries, fallback data
sanity/
  schemas/       # CMS content models
public/images/   # Assets pulled from WordPress (replace via Sanity later)
```

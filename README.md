# Extreme Studios

Next.js App Router portfolio for Extreme Studios. Built for Vercel deployment with a dark tech product-studio visual direction.

## Included

- Next.js App Router structure
- Tailwind CSS visual system
- Component-based sections
- 4 featured projects and 6 other projects
- Dynamic detail pages for every app
- 10 PNG mockup assets in `public/mockups`
- Vercel-ready config

## Local Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Open Vercel and import the GitHub repository.
3. Vercel detects Next.js automatically.
4. Do not run `npx plugins add vercel/vercel-plugin`; it is not needed for Next.js.

## Domain Notes

You can use many Vercel projects under one account. A `.vercel.app` subdomain can be changed in:

`Project Settings -> Domains`

Add the new domain, set it as primary, and remove the old one if needed. The subdomain must still be available globally.

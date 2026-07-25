# GitHub and Vercel Deployment

## GitHub

```bash
git init
git add .
git commit -m "init extreme studios portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/extreme-studios.git
git push -u origin main
```

## Vercel

1. Go to https://vercel.com
2. Import the GitHub repository.
3. Framework preset: Next.js.
4. Build command: `next build` or default.
5. Output directory: default.

No Vercel plugin command is required.

## DIANA chat assistant

In Vercel, open `Project Settings -> Environment Variables`, then add these values
from `.env.example` for Production and Preview:

- `GEMINI_API_KEY` — create it in Google AI Studio.
- `TELEGRAM_BOT_TOKEN` — token for `@ExtremeStudiosDianaBot`.
- `TELEGRAM_ADMIN_CHAT_ID` — the Telegram chat ID that receives escalations.

Do not commit real API keys or Telegram tokens. DIANA uses `gemini-3.1-flash-lite`,
limits replies to ten words, and sends off-topic questions to the configured Telegram admin.

## Changing `.vercel.app` Subdomain

1. Open project dashboard in Vercel.
2. Go to `Settings -> Domains`.
3. Add the new subdomain, for example `extreme-studios.vercel.app`.
4. Set it as Primary Domain.
5. Remove the old generated subdomain if desired.

Changing the Vercel subdomain does not change the code or require buying new hosting.

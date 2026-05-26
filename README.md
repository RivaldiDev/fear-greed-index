<div align="center">

# Crypto Sentiment

**Bitcoin market sentiment tracker with Fear & Greed Index visualization and historical data.**

[![Tech Stack](https://skillicons.dev/icons?i=nextjs,typescript,tailwind,github&theme=dark&perline=4)](https://skillicons.dev)

![Next.js](https://img.shields.io/badge/Next.js_16-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?style=for-the-badge)
![alternative.me-API-yellow](https://img.shields.io/badge/alternative.me--API--yellow)

[![GitHub](https://img.shields.io/badge/Source_Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RivaldiDev/fear-greed-index)

[Overview](#overview) · [Features](#features) · [Tech Stack](#tech-stack) · [API](#api) · [Getting Started](#getting-started) · [Architecture](#architecture)

</div>

---

## Overview

Bitcoin market sentiment tracker with Fear & Greed Index visualization and historical data.

Built with **Next.js 16** (App Router, TypeScript), **shadcn/ui** component library, **Tailwind CSS**, and **Framer Motion** for animations. All data is fetched client-side from free public APIs — no API keys required, no backend server.

## Features

| Area | What it does |
| --- | --- |
| **Gauge Visualization** | Semi-circular gauge showing current sentiment score (0-100). |
| **7-Day Trend** | Color-coded cards showing sentiment for the past 7 days. |
| **Sentiment Zones** | Extreme Fear (0-25) to Extreme Greed (76-100) with emoji indicators. |
| **Indicator Breakdown** | 9 sub-indicators with animated progress bars. |
| **UI/UX** | Amber/blue gradient dark theme with animated gauge and transitions. |

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **UI Components** | shadcn/ui (Radix + Tailwind) |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **API** | alternative.me API (Free, No API Key) |
| **Deployment** | Vercel |

## API

This project uses **alternative.me API** — completely free, no authentication required.

| Endpoint | Purpose |
| --- | --- |
| Free tier | No rate limiting for reasonable usage |
| No API key | Direct fetch from browser |
| CORS | Enabled for client-side requests |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/RivaldiDev/fear-greed-index.git
cd fear-greed-index

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main dashboard page (client component)
│   └── globals.css       # Tailwind CSS globals with dark theme
├── components/
│   └── ui/               # shadcn/ui components (Card, Button, Badge)
└── lib/
    └── utils.ts          # Utility functions (cn helper)
```

## Deployment

This project is deployed on **Vercel** with automatic deployments from the `main` branch.

```bash
# Deploy to Vercel
npx vercel --prod
```

---

<div align="center">

![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

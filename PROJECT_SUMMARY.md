# Project Summary — Alex Dorj's Portfolio

## What It Does

A personal portfolio website for Alex Dorj, a DevOps / Cloud Engineer based in Ulaanbaatar, Mongolia. It presents his profile, skills, projects, work experience, and contact info in a clean single-page layout with smooth scroll-based navigation.

The site has five sections:
- **About** — intro, skills list
- **Projects** — 5 personal/professional projects with GitHub links
- **Experience** — 2 jobs with role details and bullet points
- **Contact** — email and LinkedIn

## Technologies Used

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.1 | React framework, static export (`out/`) |
| React | 19.2.4 | UI rendering |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Base CSS reset / utility layer |
| Georgia serif font | — | Editorial typographic style |

### Infrastructure & Deployment
| Technology | Purpose |
|---|---|
| AWS S3 | Static site hosting (serves the `out/` build) |
| AWS CloudFront | CDN — global delivery + HTTPS |
| AWS Route 53 | DNS management |
| GitHub Actions | CI/CD — auto-deploy on every push to `main` |
| AWS IAM (OIDC) | Keyless auth — GitHub Actions assumes an IAM role via `id-token: write`, no long-lived secrets |

### Architecture
```
git push → GitHub Actions → npm build → S3 sync → CloudFront invalidation
```
Every push to `main` triggers a full build, uploads the static output to S3, and invalidates the CloudFront cache — so the live site updates within seconds.

## What Makes It Impressive

1. **Zero-credential deployment** — uses AWS OIDC federation (`id-token: write`) so GitHub Actions assumes an IAM role without any stored AWS access keys. This is the modern, secure way to do it and most junior portfolios don't bother.

2. **Real production infrastructure** — S3 + CloudFront + Route 53 is the same stack used by large-scale static sites. Not Vercel, not Netlify — built from scratch on AWS primitives.

3. **The portfolio is itself a project demo** — the site demonstrates exactly the skills it claims: automated deployments, CDN delivery, IAM best practices. It's self-referential proof of work.

4. **Lean, zero-dependency frontend** — no UI libraries, no animation frameworks, no component kits. The entire layout is hand-written inline styles in a single `page.tsx` file (~180 lines). Fast, readable, no bloat.

5. **Content/code separation** — all text content lives in `data/content.ts`, cleanly separated from layout logic. Easy to update without touching the UI.

6. **Scroll-aware navigation** — the nav highlights the active section as you scroll, implemented with a lightweight `useEffect` + `scrollY` check. No scroll library needed.

## File Structure

```
portfolio/
├── app/
│   ├── page.tsx        # Entire single-page UI (~180 lines)
│   ├── layout.tsx      # HTML shell + font setup
│   ├── globals.css     # Tailwind import + base styles
│   └── favicon.ico
├── data/
│   └── content.ts      # All text content (name, projects, experience, etc.)
├── public/             # Static SVG assets
├── out/                # Static build output (deployed to S3)
├── .github/
│   └── workflows/
│       └── deploy.yaml # CI/CD pipeline
└── package.json
```

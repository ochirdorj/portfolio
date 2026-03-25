# portfolio

Personal portfolio website built with Next.js and deployed to AWS — fully automated from git push to live site in under 2 minutes.

**Live:** [tugsuu.click](https://tugsuu.click)

---

## Pipeline

```
git push
    ↓
GitHub Actions — install deps, build Next.js
    ↓
Upload static files to AWS S3
    ↓
Invalidate CloudFront cache
    ↓
Live at https://tugsuu.click
```

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 + TypeScript |
| Hosting | AWS S3 static website |
| CDN | AWS CloudFront |
| SSL | AWS Certificate Manager (free) |
| DNS | AWS Route 53 |
| CI/CD | GitHub Actions + OIDC |
| Auth | OIDC — no long-lived credentials |
| Cost | ~$0.50/month |

---

## How to update content

All content lives in one file. To add a project, update skills, or change your bio — edit `data/content.ts` and push.

```bash
# Edit content
code data/content.ts

# Deploy
git add .
git commit -m "update portfolio"
git push
```

GitHub Actions handles the rest automatically.

---

## Project structure

```
portfolio/
├── app/
│   ├── page.tsx          ← main page
│   ├── layout.tsx        ← HTML wrapper
│   └── globals.css       ← global styles
├── data/
│   └── content.ts        ← all content — edit this to update
├── .github/
│   └── workflows/
│       └── deploy.yaml   ← CI/CD pipeline
└── next.config.ts        ← static export config
```

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## AWS setup

**S3** — static website hosting, public read access, us-east-1 region

**ACM** — free SSL certificate, DNS validated via Route 53, us-east-1 region

**CloudFront** — HTTPS termination, global CDN, connected to S3 origin

**Route 53** — A and AAAA alias records pointing to CloudFront

---

## GitHub Actions secrets required

| Secret | Value |
|---|---|
| `AWS_ROLE_ARN` | IAM role for OIDC authentication |
| `AWS_REGION` | `us-east-1` |
| `S3_BUCKET` | S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |

---

## Why S3 over Kubernetes

A portfolio is static files — no server, no database. S3 + CloudFront costs $0.50/month vs $5-7/day for EKS. Same HTTPS, better global performance via CDN, zero maintenance.

---

## Related

- [my-app](https://github.com/ochirdorj/my-app) — Node.js app deployed to AWS EKS via GitOps pipeline
- [my-app-infra](https://github.com/ochirdorj/my-app-infra) — Kubernetes infrastructure repo managed by ArgoCD

export const content = {
  name: "Erdenetugs Enkhchuluun",
  title: "DevOps / Cloud Engineer",
  location: "Schaumburg, IL",
  about: "I'm a DevOps / Cloud Engineer who likes working on the infrastructure side of things. Mostly Kubernetes, AWS, and CI/CD — making deploys fast and boring is kind of my thing. Looking for a team where that work actually matters.",

  skills: [
    "Kubernetes", "Docker", "AWS EKS", "AWS ECR", "AWS S3",
    "AWS CloudFront", "AWS Route 53", "Helm", "ArgoCD",
    "GitHub Actions", "Terraform", "Linux", "Node.js", "Python", "Git"
  ],

  skillCategories: [
    {
      name: "Kubernetes & GitOps",
      subskills: ["AWS EKS", "Helm Charts", "ArgoCD", "HPA", "RBAC", "Rolling deploys", "Readiness probes"]
    },
    {
      name: "AWS",
      subskills: ["EKS", "ECR", "S3", "CloudFront", "Route 53", "ACM", "IAM", "API Gateway", "Lambda", "SQS"]
    },
    {
      name: "CI/CD & Automation",
      subskills: ["GitHub Actions", "OIDC auth", "ECR push", "ArgoCD sync", "Multi-env promotion", "Self-hosted runners"]
    },
    {
      name: "Infrastructure as Code",
      subskills: ["Terraform", "Reusable modules", "Remote state", "AWS Organizations", "SCP"]
    },
    {
      name: "Docker & Containers",
      subskills: ["Multi-stage builds", "Non-root user", "Layer caching", "dockerignore", "ECR"]
    },
    {
      name: "Languages & Tools",
      subskills: ["Node.js", "Python", "Bash", "Git", "Linux", "FastAPI", "PostgreSQL"]
    },
  ],

  projects: [
    {
      title: "Production GitOps Pipeline on AWS EKS",
      description: "Two-repo GitOps system for a Node.js 20 Express API. A git push triggers GitHub Actions: it authenticates to AWS via OIDC (no stored credentials), builds a Docker image tagged with the exact git SHA, pushes to ECR, then commits the new image tag into the infra repo. ArgoCD detects the commit, runs Helm, and issues a rolling update — old pod stays alive until the new one passes its readiness probe. Zero downtime, full audit trail, git revert = instant rollback. HPA auto-scales 1–5 replicas on CPU. Containers run as non-root; secrets never baked into images.",
      tags: ["Kubernetes", "AWS EKS", "ArgoCD", "Helm", "GitHub Actions", "Docker", "OIDC", "HPA"],
      github: "https://github.com/ochirdorj/my-app",
      infra: "https://github.com/ochirdorj/my-app-infra"
    },
    {
      title: "Event-Driven Self-Hosted GitHub Actions Runners on AWS",
      description: "Terraform monorepo that eliminates always-on CI/CD servers. When a GitHub workflow job is queued, a webhook hits API Gateway → a Node.js Lambda validates the HMAC-SHA256 signature → SQS buffers the event → a runner manager Lambda authenticates via GitHub App, tries Spot pricing first (on-demand fallback), and launches an ephemeral EC2 instance that registers as a runner, completes the job, and self-terminates. Pre-baked AMI cuts cold-start to under 60 seconds. Hash-based multi-AZ subnet selection spreads Spot capacity risk. DRY: one reusable GitHub Actions workflow drives all 5 Terraform modules via OIDC — no static AWS keys anywhere.",
      tags: ["Terraform", "AWS Lambda", "SQS", "API Gateway", "EC2 Spot", "GitHub Actions", "OIDC", "AWS Organizations", "SCP"],
      github: "https://github.com/ochirdorj/root_modules"
    },
    {
      title: "Portfolio Site on AWS",
      description: "Static Next.js export deployed to S3, served globally via CloudFront CDN with HTTPS, DNS on Route 53. GitHub Actions builds and syncs on every push to main using OIDC federation — no AWS access keys stored anywhere. The pipeline: git push → npm build → S3 sync → CloudFront cache invalidation → live in seconds.",
      tags: ["Next.js", "AWS S3", "CloudFront", "Route 53", "GitHub Actions", "OIDC"],
      github: "https://github.com/ochirdorj/portfolio"
    },
    {
      title: "Infrastructure as Code with Terraform",
      description: "Automated AWS infrastructure provisioning using Terraform. Created reusable modules for VPC, EKS cluster, RDS, and S3 buckets with remote state management.",
      tags: ["Terraform", "AWS", "EKS", "VPC", "RDS"],
      github: "https://github.com/ochirdorj/terraform-aws"
    },
  ],

  experience: [
    {
      company: "Akumo Solutions LLC",
      role: "DevOps Engineer",
      period: "2022 — Present",
      points: [
        "Migrated monolithic application to Kubernetes reducing deployment time by 70%",
        "Built CI/CD pipelines using GitHub Actions for 5 development teams",
        "Reduced AWS infrastructure costs by 40% through right-sizing and reserved instances"
      ],
      tags: ["Kubernetes", "GitHub Actions", "AWS", "Helm", "ArgoCD"]
    },
  ],

  certifications: [
    "AWS Cloud Practitioner",
    "AWS Solutions Architect",
    "Kubernetes — KCNA",
    "HashiCorp Terraform Associate",
    "GitHub Actions Certified",
    "Python — PCEP",
    "Linux Essentials Certificate",
  ],

  contact: {
    email: "erdenetugs@gmail.com",
    github: "https://github.com/ochirdorj",
    linkedin: "https://linkedin.com/in/tugsuucloud"
  }
}
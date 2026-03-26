type ProjectLink = { label: string; url: string };

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  infra?: string;
  links?: ProjectLink[];
}

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
      description: "I got tired of manual deploys so I automated the whole thing. Push to main, GitHub Actions builds and pushes the image to ECR, ArgoCD deploys it to EKS with a rolling update so nothing goes down. Rollback is just git revert. Scales automatically under load.",
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
      title: "Reusable Terraform Module for AWS Service Control Policies",
      description: "Two-repo Terraform setup — a reusable child module that deploys any SCP to any AWS Organization target, and a root module that consumes it. To enforce a new policy across the org you write a JSON file and pass it as a variable — no repeated boilerplate. The child module is pinned to a specific git commit so every environment gets the exact same code. Ships with tag enforcement, region restriction, and root account lockdown policies.",
      tags: ["Terraform", "AWS Organizations", "SCP", "Reusable Module", "IaC"],
      github: "https://github.com/ochirdorj/service_control_policy"
    },
    {
      title: "Reusable Terraform Module Library — AWS Infrastructure",
      description: "A collection of three production-ready Terraform modules, each in its own repo and pinned to a specific git commit for safe consumption across teams. VPC module provisions a full network stack — public and private subnets across two AZs, NAT gateway, internet gateway, and route tables, with Kubernetes ELB tags baked in. S3 module covers everything a production bucket needs — encryption, versioning, object lock for WORM compliance, lifecycle rules, access logging, cross-region replication, and static website hosting — all toggled via variables. SCP module deploys any Service Control Policy to any AWS Organization target — OUs, accounts, or root — just by pointing it at a policy JSON file. All three follow the same pattern: child module handles the logic, root module handles the config, nothing is hardcoded.",
      tags: ["Terraform", "AWS VPC", "AWS S3", "AWS Organizations", "SCP", "Reusable Modules", "IaC"],
      links: [
        { label: "VPC Module", url: "https://github.com/ochirdorj/vpc_module" },
        { label: "S3 Module", url: "https://github.com/ochirdorj/infra-core-storage-s3-bucket-template" },
        { label: "SCP Module", url: "https://github.com/ochirdorj/service_control_policy" },
      ]
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
  ] as Project[],

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
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential/349b770d63294faf887d4038c2ebb19b"
    },
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      verifyUrl: "https://cp.certmetrics.com/amazon/en/public/verify/credential/ea83c9656d784a12822168412060c061"
    },
    {
      name: "Kubernetes — KCNA",
      issuer: "Cloud Native Computing Foundation",
      verifyUrl: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/0b0b577c-5bbc-4953-b37e-90e69d01de22-erdenetugs-enkhchuluun-caa0da87-3f96-4d79-a36d-1d9a101d76b1-certificate.pdf"
    },
    {
      name: "HashiCorp Terraform Associate",
      issuer: "HashiCorp",
      verifyUrl: "https://www.credly.com/badges/1a4fca9b-18a0-4bad-9ae8-066b10dd17c6"
    },
    {
      name: "GitHub Actions Certified",
      issuer: "GitHub",
      verifyUrl: "https://learn.microsoft.com/en-us/users/erdenetugsenkhchuluun-0002/credentials/430946f81a1050ab?ref=https%3A%2F%2Fwww.linkedin.com%2F"
    },
    {
      name: "Python — PCEP",
      issuer: "Python Institute",
      verifyUrl: "https://verify.openedg.org/?id=tOgT.XR1s.zs0j"
    },
    {
      name: "Linux Essentials Certificate",
      issuer: "LPI",
      verifyUrl: "https://cs.lpi.org/caf/Xamman/certification/verify/LPI000656039/n57wht7htd"
    },
  ],

  contact: {
    email: "erdenetugs@gmail.com",
    github: "https://github.com/ochirdorj",
    linkedin: "https://linkedin.com/in/tugsuucloud"
  }
}

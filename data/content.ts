import { FcManager } from "react-icons/fc";

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
      subskills: ["Node.js", "Python", "Bash", "Git", "Linux"]
    },
  ],

  projects: [
    {
      title: "Production GitOps Pipeline on AWS EKS",
      description: "When developer pushes the code to main branch, GitHub Actions builds and pushes the image to ECR, ArgoCD deploys it to EKS with a rolling update so nothing goes down. Rollback is just git revert. Scales automatically under load.",
      tags: ["Kubernetes", "AWS EKS", "ArgoCD", "Helm", "GitHub Actions", "Docker", "OIDC", "HPA"],
      github: "https://github.com/ochirdorj/my-app",
      infra: "https://github.com/ochirdorj/my-app-infra"
    },
{
  title: "Event-Driven Self-Hosted GitHub Actions Runners on AWS",
  description: "I got tired of paying for CI servers that sit idle between jobs, so I built a system where runners only exist when there is actual work to do. When a GitHub Actions job is triggered, a webhook hits API Gateway, a Lambda validates the signature, and SQS buffers the event. A second Lambda then picks it up, tries Spot pricing first, and launches a fresh EC2 instance that registers as a runner, does the job, and terminates itself. No always-on servers, no wasted compute. Cold start is under 60 seconds because runners boot from a pre-baked AMI. A dedicated Terraform module builds that image — it spins up a temporary EC2 instance, installs everything via SSM without any SSH or open ports, snapshots it into an AMI, stores the ID in SSM Parameter Store, and terminates the builder. One reusable GitHub Actions workflow drives all five Terraform modules via OIDC. No static AWS keys stored anywhere.",
  tags: ["Terraform", "AWS Lambda", "SQS", "API Gateway", "EC2 Spot", "GitHub Actions", "OIDC", "AWS Secrets Manager", "Packer", "Docker", "Node.js"],
  links: [
    { label: "Root Modules", url: "https://github.com/ochirdorj/root_modules" },
    { label: "Runner Module", url: "https://github.com/ochirdorj/self_hosted_runner" },
    { label: "AMI Builder", url: "https://github.com/ochirdorj/ami_builder" },
  ]
},
{
  title: "Reusable Terraform Module Library — AWS Infrastructure",
  description: "A collection of three production-ready Terraform modules, each in its own repo and pinned to a specific git commit for safe consumption across teams. VPC module provisions a full network stack — public and private subnets across two AZs, NAT gateway, internet gateway, and route tables, with Kubernetes ELB tags baked in. S3 module covers everything a production bucket needs — encryption, versioning, object lock for WORM compliance, lifecycle rules, access logging, cross-region replication, and static website hosting — all toggled via variables. SCP module deploys any Service Control Policy to any AWS Organization target — OUs, accounts, or root — just by pointing it at a policy JSON file. All three follow the same pattern: child module handles the logic, root module handles the config, nothing is hardcoded.",
  tags: ["Terraform", "AWS VPC", "AWS S3", "AWS Organizations", "SCP", "Reusable Modules", "IaC"],
  links: [
    { label: "Root Modules", url: "https://github.com/ochirdorj/root_modules" },
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

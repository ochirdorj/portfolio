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
      description: "Every push to main kicks off GitHub Actions — it builds a fresh Docker image, tags it with the git SHA, and pushes it to ECR. ArgoCD detects the new tag in the infra repo and rolls it out to EKS with a rolling update — old pods stay alive until the new ones pass their health checks, so there is zero downtime. Rolling back is just a git revert. When traffic spikes, HPA scales the pods up automatically and brings them back down when things quiet down.",
      tags: ["Kubernetes", "AWS EKS", "ArgoCD", "Helm", "GitHub Actions", "Docker", "OIDC", "HPA"],
      github: "https://github.com/ochirdorj/my-app",
      infra: "https://github.com/ochirdorj/my-app-infra"
    },
{
  title: "Event-Driven Self-Hosted GitHub Actions Runners on AWS",
  description: "No always-on CI servers. Runners spin up when a job is queued and terminate the moment it finishes. A GitHub webhook triggers API Gateway → Lambda validates it → SQS buffers it → another Lambda launches a Spot EC2 instance. The runner does the job and kills itself. Cold start is under 60 seconds thanks to a pre-baked AMI that has everything installed. No SSH, no open ports — SSM handles it all.",
  tags: ["Terraform", "AWS Lambda", "SQS", "API Gateway", "EC2 Spot", "GitHub Actions", "OIDC", "AWS Secrets Manager", "Packer", "Docker", "Node.js"],
  links: [
    { label: "Root Modules", url: "https://github.com/ochirdorj/root_modules" },
    { label: "Runner Module", url: "https://github.com/ochirdorj/self_hosted_runner" },
    { label: "AMI Builder", url: "https://github.com/ochirdorj/ami_builder" },
  ]
},
{
  title: "Reusable Terraform Module Library — AWS Infrastructure",
  description: "Three Terraform modules, each in its own repo and pinned to a specific commit. The VPC module sets up a full network stack across two AZs with Kubernetes-ready subnet tags. The S3 module handles everything a production bucket needs — encryption, object lock, lifecycle rules — all toggled via variables, nothing hardcoded. The SCP module attaches any policy JSON to any AWS Organization target — OUs, accounts, or root — just by changing a variable.",
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
      description: "This is a static Next.js exported website deployed automatically whenever I push code to the main branch. GitHub Actions builds the app and syncs it to S3, then invalidates the CloudFront cache so changes go live in seconds. For security, OIDC is used to authenticate to AWS instead of storing long-lived access keys in the repo. Route 53 manages DNS and CloudFront serves the site globally over HTTPS.",
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
        "Built and managed secure, reliable AWS core infrastructures using Terraform and CloudFormation",
        "Designed and managed multi-account and multi-region AWS environments through AWS Control tower and Organization",
        "Created,  containerized docker image and deployed to Kubernetes",
        "Built and optimized CI/CD pipelines for application deployment",
        "Designed and implemented secure authentication between AWS infrastructure and other platforms"
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
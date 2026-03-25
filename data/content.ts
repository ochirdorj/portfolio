export const content = {
  name: "Alex Dorj",
  title: "DevOps / Cloud Engineer * AWS * Kubernetes",
  location: "Ulaanbaatar, Mongolia",
  about: "I'm a DevOps / Cloud Engineer who likes working on the infrastructure side of things. Mostly Kubernetes, AWS, and CI/CD — making deploys fast and boring is kind of my thing. Looking for a team where that work actually matters.",

  skills: [
    "Kubernetes", "Docker", "AWS EKS", "AWS ECR", "AWS S3",
    "AWS CloudFront", "AWS Route 53", "Helm", "ArgoCD",
    "GitHub Actions", "Terraform", "Linux", "Node.js", "Python", "Git"
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
      title: "Portfolio Site on AWS (S3 + CloudFront + Route 53)",
      description: "This site. Static Next.js export deployed to S3, served globally via CloudFront CDN with HTTPS, DNS on Route 53. GitHub Actions builds and syncs on every push to main using OIDC federation — no AWS access keys stored anywhere. The pipeline: git push → npm build → S3 sync → CloudFront cache invalidation → live in seconds. The site itself proves the skills it lists.",
      tags: ["Next.js", "AWS S3", "CloudFront", "Route 53", "GitHub Actions", "OIDC"],
      github: "https://github.com/ochirdorj/portfolio"
    },
    {
      title: "Microservices Monitoring Stack",
      description: "Set up Prometheus and Grafana monitoring for a microservices application running on Kubernetes. Configured alerting rules and dashboards for CPU, memory, and request latency.",
      tags: ["Prometheus", "Grafana", "Kubernetes", "Helm"],
      github: "https://github.com/ochirdorj/monitoring-stack"
    },
    {
      title: "Infrastructure as Code with Terraform",
      description: "Automated AWS infrastructure provisioning using Terraform. Created reusable modules for VPC, EKS cluster, RDS, and S3 buckets with remote state management.",
      tags: ["Terraform", "AWS", "EKS", "VPC", "RDS"],
      github: "https://github.com/ochirdorj/terraform-aws"
    },
    {
      title: "Dockerized Python API",
      description: "Containerized a Python FastAPI application with PostgreSQL database. Includes docker-compose for local development and Kubernetes manifests for production deployment.",
      tags: ["Python", "FastAPI", "Docker", "PostgreSQL", "Kubernetes"],
      github: "https://github.com/ochirdorj/python-api"
    }
  ],

  experience: [
    {
      company: "Tech Solutions LLC",
      role: "DevOps Engineer",
      period: "2023 — Present",
      points: [
        "Migrated monolithic application to Kubernetes reducing deployment time by 70%",
        "Built CI/CD pipelines using GitHub Actions for 5 development teams",
        "Reduced AWS infrastructure costs by 40% through right-sizing and reserved instances"
      ]
    },
    {
      company: "Cloud Startup Inc",
      role: "Junior DevOps Engineer",
      period: "2022 — 2023",
      points: [
        "Maintained and monitored AWS infrastructure including EC2, RDS, and S3",
        "Wrote Ansible playbooks to automate server configuration",
        "Set up centralized logging using ELK stack"
      ]
    }
  ],

  contact: {
    email: "alex.dorj@email.com",
    github: "https://github.com/ochirdorj",
    linkedin: "https://linkedin.com/in/alexdorj"
  }
}
export const content = {
  name: "Alex Dorj",
  title: "DevOps / Cloud Engineer * AWS * Kubernetes",
  location: "Ulaanbaatar, Mongolia",
  about: "I am a DevOps and Cloud Engineer passionate about building reliable, automated infrastructure. I specialize in Kubernetes, AWS, and CI/CD pipelines. Currently looking for opportunities to help teams ship faster and more reliably.",

  skills: [
    "Kubernetes", "Docker", "AWS EKS", "AWS ECR", "AWS S3",
    "AWS CloudFront", "AWS Route 53", "Helm", "ArgoCD",
    "GitHub Actions", "Terraform", "Linux", "Node.js", "Python", "Git"
  ],

  projects: [
    {
      title: "Production CI/CD Pipeline on AWS EKS",
      description: "Built a complete GitOps-based deployment pipeline for a Node.js application. Every git push automatically builds a Docker image, pushes to ECR, and deploys to Kubernetes via ArgoCD — with zero downtime rolling deploys and instant rollback capability.",
      tags: ["Kubernetes", "Docker", "AWS EKS", "ArgoCD", "Helm", "GitHub Actions"],
      github: "https://github.com/ochirdorj/my-app",
      infra: "https://github.com/ochirdorj/my-app-infra"
    },
    {
      title: "Portfolio Website testing",
      description: "Personal portfolio website built with Next.js and deployed to AWS S3 with CloudFront CDN and Route 53 DNS. Fully automated deployment pipeline via GitHub Actions.",
      tags: ["Next.js", "AWS S3", "CloudFront", "Route 53", "GitHub Actions"],
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
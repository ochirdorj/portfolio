"use client";
import { useEffect, useState, useRef } from "react";
import { content, type Project } from "@/data/content";
import {
  SiKubernetes, SiHelm, SiArgo, SiDocker, SiTerraform,
  SiGithubactions, SiNodedotjs, SiPython, SiLinux, SiGit,
  SiFastapi, SiGnubash, SiHashicorp, SiLinuxprofessionalinstitute,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

type IconComponent = React.ComponentType<{ size?: number; color?: string }>;

// Map skill names → icon component
const SKILL_ICONS: Record<string, IconComponent> = {
  // Kubernetes ecosystem
  "Kubernetes":       SiKubernetes,
  "AWS EKS":          SiKubernetes,
  "EKS":              SiKubernetes,
  "HPA":              SiKubernetes,
  "RBAC":             SiKubernetes,
  "Rolling deploys":  SiKubernetes,
  "Readiness probes": SiKubernetes,
  // Helm
  "Helm Charts":      SiHelm,
  "Helm":             SiHelm,
  // ArgoCD
  "ArgoCD":           SiArgo,
  "ArgoCD sync":      SiArgo,
  // Docker
  "Docker":           SiDocker,
  "Multi-stage builds": SiDocker,
  "Non-root user":    SiDocker,
  "Layer caching":    SiDocker,
  "dockerignore":     SiDocker,
  "ECR":              SiDocker,
  "ECR push":         SiDocker,
  // Terraform
  "Terraform":        SiTerraform,
  "Reusable modules": SiTerraform,
  "Remote state":     SiTerraform,
  // GitHub Actions
  "GitHub Actions":   SiGithubactions,
  "Self-hosted runners": SiGithubactions,
  // AWS
  "AWS":              FaAws,
  "S3":               FaAws,
  "CloudFront":       FaAws,
  "Route 53":         FaAws,
  "ACM":              FaAws,
  "IAM":              FaAws,
  "API Gateway":      FaAws,
  "Lambda":           FaAws,
  "SQS":              FaAws,
  "AWS S3":           FaAws,
  "AWS CloudFront":   FaAws,
  "AWS Route 53":     FaAws,
  "AWS Organizations": FaAws,
  "SCP":              FaAws,
  // Languages & Tools
  "Node.js":          SiNodedotjs,
  "Python":           SiPython,
  "Linux":            SiLinux,
  "Git":              SiGit,
  "FastAPI":          SiFastapi,
  "Bash":             SiGnubash,
};

// ─── Intersection Observer hook ───────────────────────────────────────────────
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────
const LOADING_LINES = [
  "Initializing cloud infrastructure...",
  "Loading CI/CD pipeline...",
  "Configuring Kubernetes cluster...",
  "Deploying portfolio...",
];

const skillCategories = [
  { name: "Kubernetes & GitOps", subskills: ["AWS EKS", "Helm Charts", "ArgoCD", "HPA", "RBAC", "Rolling deploys"] },
  { name: "AWS", subskills: ["EKS", "ECR", "S3", "CloudFront", "Route 53", "ACM", "IAM", "API Gateway", "Lambda", "SQS"] },
  { name: "CI/CD & Automation", subskills: ["GitHub Actions", "OIDC auth", "ECR push", "ArgoCD sync", "Multi-env promotion", "Self-hosted runners"] },
  { name: "Infrastructure as Code", subskills: ["Terraform", "Reusable modules", "Remote state", "AWS Organizations", "SCP"] },
  { name: "Docker & Containers", subskills: ["Multi-stage builds", "Non-root user", "Layer caching", "dockerignore"] },
  { name: "Languages & Tools", subskills: ["Node.js", "Python", "Bash", "Git", "Linux", "FastAPI"] },
];

// certifications now come from content.certifications

const CERT_ICONS: Record<string, IconComponent> = {
  "AWS Cloud Practitioner":        FaAws,
  "AWS Solutions Architect":       FaAws,
  "Kubernetes — KCNA":             SiKubernetes,
  "HashiCorp Terraform Associate": SiHashicorp,
  "GitHub Actions Certified":      SiGithubactions,
  "Python — PCEP":                 SiPython,
  "Linux Essentials Certificate":  SiLinuxprofessionalinstitute,
};

// ─── AstroWind-inspired dark color palette ────────────────────────────────────
const C = {
  bg:          "#030620",               // very dark navy
  card:        "#0f172a",               // slate-900
  border:      "rgba(255,255,255,0.10)",
  borderHover: "rgba(255,255,255,0.22)",
  primary:     "#0161ef",               // AstroWind primary blue
  primaryHov:  "#0154cf",
  heading:     "#f7f8f8",
  text:        "#e5ecf6",
  muted:       "rgba(229,236,246,0.60)",
  blue200:     "#bfdbfe",
  tagBg:       "rgba(1,97,239,0.12)",
  tagBorder:   "rgba(1,97,239,0.35)",
  nav:         "rgba(3,6,32,0.88)",
};

// ─── Section header (AstroWind Headline pattern) ──────────────────────────────
function SectionHeader({
  tagline, title, subtitle,
}: { tagline: string; title: string; subtitle?: string }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px", padding: "0 16px" }}>
      <p style={{
        color: C.blue200, fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", fontSize: 13, marginBottom: 14, marginTop: 0,
      }}>
        {tagline}
      </p>
      <h2 style={{
        fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: C.heading,
        margin: "0 0 16px", letterSpacing: -0.5, lineHeight: 1.2,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 17, color: C.muted, margin: 0, lineHeight: 1.75 }}>{subtitle}</p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded]           = useState(false);
  const [progress, setProgress]       = useState(0);
  const [lineIndex, setLineIndex]     = useState(0);
  const [displayedLine, setDisplayedLine] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  // Loading screen typewriter
  useEffect(() => {
    let charIndex = 0;
    let currentLine = 0;

    const typeNextLine = () => {
      if (currentLine >= LOADING_LINES.length) {
        setTimeout(() => setLoaded(true), 400);
        return;
      }
      const line = LOADING_LINES[currentLine];
      charIndex = 0;
      setLineIndex(currentLine);
      setDisplayedLine("");
      const iv = setInterval(() => {
        charIndex++;
        setDisplayedLine(line.slice(0, charIndex));
        if (charIndex >= line.length) {
          clearInterval(iv);
          setProgress(Math.round(((currentLine + 1) / LOADING_LINES.length) * 100));
          currentLine++;
          setTimeout(typeNextLine, 300);
        }
      }, 28);
    };
    typeNextLine();
  }, []);

  // Active section tracking
  useEffect(() => {
    if (!loaded) return;
    const sections = ["home","about","skills","projects","experience","certifications","contact"];
    const handleScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaded]);

  const navItems = [
    { id: "home",           label: "Home" },
    { id: "about",          label: "About" },
    { id: "skills",         label: "Skills" },
    { id: "projects",       label: "Projects" },
    { id: "experience",     label: "Experience" },
    { id: "certifications", label: "Certs" },
    { id: "contact",        label: "Contact" },
  ];

  // ── Loading screen ──────────────────────────────────────────────────────────
  if (!loaded) {
    return (
      <div style={{
        background: C.bg, minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace",
      }}>
        <div style={{ width: "min(460px, 88vw)" }}>
          <p style={{ color: C.blue200, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 28, marginTop: 0 }}>
            Initializing
          </p>
          <div style={{ marginBottom: 28, minHeight: 110 }}>
            {LOADING_LINES.slice(0, lineIndex).map((line, i) => (
              <div key={i} style={{ color: "#86efac", fontSize: 13, marginBottom: 8, display: "flex", gap: 10 }}>
                <span style={{ color: "#4ade80" }}>✓</span>{line}
              </div>
            ))}
            {lineIndex < LOADING_LINES.length && (
              <div style={{ color: C.text, fontSize: 13, display: "flex", gap: 10 }}>
                <span style={{ color: C.primary }}>▶</span>
                <span>{displayedLine}<span style={{ animation: "blink 1s infinite", color: C.primary }}>|</span></span>
              </div>
            )}
          </div>
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 9999, height: 4, overflow: "hidden", marginBottom: 10 }}>
            <div style={{
              background: `linear-gradient(90deg, ${C.primary}, #6d28d9)`,
              height: "100%", width: `${progress}%`,
              transition: "width 0.5s ease", borderRadius: 9999,
            }} />
          </div>
          <p style={{ color: C.muted, fontSize: 12, margin: 0 }}>{progress}%</p>
        </div>
        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </div>
    );
  }

  // ── Main page ───────────────────────────────────────────────────────────────
  return (
    <div style={{
      background: C.bg, color: C.text, minHeight: "100vh",
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .nav-link:hover { color: ${C.text} !important; }
        .btn-ghost:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(229,236,246,0.45) !important; }
        .card-hover:hover { border-color: ${C.borderHover} !important; box-shadow: 0 8px 40px rgba(1,97,239,0.1) !important; }
        .card-lift:hover { border-color: ${C.borderHover} !important; transform: translateY(-3px) !important; box-shadow: 0 12px 48px rgba(1,97,239,0.12) !important; }
        .project-link:hover { background: rgba(191,219,254,0.08) !important; border-color: rgba(191,219,254,0.5) !important; }
        .verify-link:hover { background: rgba(1,97,239,0.25) !important; border-color: rgba(1,97,239,0.7) !important; }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .nav-full { display: none !important; }
          .hero-pad { padding: 100px 20px 48px !important; }
          .section-pad { padding: 60px 20px 72px !important; }
          .hero-layout { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .hero-photo { margin-bottom: 28px; }
          .hero-text { align-items: center !important; }
          .hero-buttons { justify-content: center !important; }
        }
        @media (max-width: 900px) {
          .nav-label { display: none; }
        }
      `}</style>

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        background: C.nav, borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(14px)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center", height: 64,
        }}>
          <a href="#home" style={{ color: C.heading, fontWeight: 700, fontSize: 16, textDecoration: "none", letterSpacing: -0.3 }}>
            {content.name}
          </a>
          <div className="nav-full" style={{ display: "flex", gap: 2 }}>
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                style={{
                  fontSize: 14, padding: "6px 14px",
                  color: activeSection === item.id ? "#fff" : C.muted,
                  textDecoration: "none", borderRadius: 9999,
                  background: activeSection === item.id ? C.primary : "transparent",
                  fontWeight: activeSection === item.id ? 600 : 400,
                  transition: "all 0.2s",
                  letterSpacing: "0.01em",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section id="home" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(1,97,239,0.18) 0%, transparent 60%)",
        }} />
        <div
          className="hero-pad"
          style={{ maxWidth: 1280, margin: "0 auto", padding: "128px 24px 64px", position: "relative" }}
        >
          <FadeIn>
            <div
              className="hero-layout"
              style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 64 }}
            >
              {/* Left: profile photo */}
              <div
                className="hero-photo"
                style={{ flexShrink: 0 }}
              >
                <img
                  src="/profile.jpg"
                  alt="Profile photo"
                  style={{
                    width: 240,
                    height: 240,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `3px solid ${C.primary}`,
                    boxShadow: `0 0 24px rgba(1,97,239,0.3)`,
                    display: "block",
                  }}
                />
              </div>

              {/* Right: text + buttons */}
              <div
                className="hero-text"
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}
              >
                <p style={{
                  color: C.blue200, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", fontSize: 13, marginBottom: 20, marginTop: 0,
                }}>
                  {content.title}
                </p>
                <h1 style={{
                  fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 800, color: C.heading,
                  margin: "0 0 24px", lineHeight: 1.05, letterSpacing: -2,
                }}>
                  {content.name}
                </h1>
                <p style={{
                  fontSize: "clamp(16px, 2vw, 19px)", color: C.muted,
                  maxWidth: 580, margin: "0 0 44px", lineHeight: 1.8,
                }}>
                  {content.about}
                </p>
                <div className="hero-buttons" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <a
                    href="#experience"
                    style={{
                      padding: "13px 32px", background: C.primary, color: "#fff",
                      fontWeight: 600, fontSize: 15, textDecoration: "none",
                      borderRadius: 9999, border: `1px solid ${C.primary}`, transition: "background 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryHov}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.primary}
                  >
                    View Experience
                  </a>
                  <a
                    href={content.contact.github}
                    target="_blank" rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{
                      padding: "13px 32px", background: "transparent", color: C.text,
                      fontWeight: 600, fontSize: 15, textDecoration: "none",
                      borderRadius: 9999, border: "1px solid rgba(229,236,246,0.22)", transition: "all 0.2s",
                    }}
                  >
                    GitHub Profile ↗
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────────── */}
      <section id="about" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 24px 96px" }}>
          <FadeIn>
            <SectionHeader tagline="Who I am" title="About Me" />
            <div
              className="about-grid"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", maxWidth: 960, margin: "0 auto" }}
            >
              <div>
                <p style={{ fontSize: 16, color: C.text, lineHeight: 1.9, marginBottom: 20, marginTop: 0 }}>{content.about}</p>
                <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.9, margin: 0 }}>
                  Based in {content.location}. Focused on automation, cloud infrastructure, and making deployments fast and reliable.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: "Projects",       value: `${content.projects.length}+` },
                  { label: "Certifications", value: `${content.certifications.length}` },
                  { label: "Cloud",          value: "AWS" },
                  { label: "Orchestration",  value: "K8s" },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="card-hover"
                    style={{
                      background: C.card, border: `1px solid ${C.border}`,
                      borderRadius: 8, padding: "24px 16px", textAlign: "center",
                      backdropFilter: "blur(8px)", boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <div style={{ fontSize: 30, fontWeight: 800, color: C.primary, marginBottom: 6 }}>{stat.value}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────────────────────── */}
      <section id="skills" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.012)" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 24px 96px" }}>
          <FadeIn>
            <SectionHeader
              tagline="What I work with"
              title="Technical Expertise"
              subtitle="Deep hands-on experience across modern cloud and DevOps tooling"
            />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {skillCategories.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 60}>
                <div
                  className="card-hover"
                  style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: 24, height: "100%",
                    backdropFilter: "blur(8px)", boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.heading, marginBottom: 16, marginTop: 0, letterSpacing: "0.01em" }}>
                    {cat.name}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cat.subskills.map(s => {
                      const Icon = SKILL_ICONS[s];
                      return (
                        <span
                          key={s}
                          style={{
                            fontSize: 12, padding: "4px 12px",
                            background: C.tagBg, color: C.blue200,
                            border: `1px solid ${C.tagBorder}`, borderRadius: 9999,
                            display: "inline-flex", alignItems: "center", gap: 5,
                          }}
                        >
                          {Icon && <Icon size={12} />}
                          {s}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────────────────────── */}
      <section id="projects" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 24px 96px" }}>
          <FadeIn>
            <SectionHeader
              tagline="What I've built"
              title="Projects"
              subtitle="Real infrastructure powering production workloads"
            />
          </FadeIn>
          <div style={{ display: "grid", gap: 20 }}>
            {content.projects.map((project: Project, i: number) => (
              <FadeIn key={project.title} delay={i * 70}>
                <div
                  className="card-lift"
                  style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: "28px 32px",
                    backdropFilter: "blur(8px)", boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                    transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: C.heading, margin: 0 }}>{project.title}</h3>
                    <div style={{ display: "flex", gap: 10 }}>
                      {project.links && project.links.map(link => (
                        <a
                          key={link.label}
                          href={link.url} target="_blank" rel="noopener noreferrer"
                          className="project-link"
                          style={{
                            fontSize: 13, color: C.blue200, textDecoration: "none",
                            border: "1px solid rgba(191,219,254,0.22)", padding: "5px 14px",
                            borderRadius: 9999, transition: "all 0.2s",
                          }}
                        >
                          {link.label} ↗
                        </a>
                      ))}
                      {project.github && (
                        <a
                          href={project.github} target="_blank" rel="noopener noreferrer"
                          className="project-link"
                          style={{
                            fontSize: 13, color: C.blue200, textDecoration: "none",
                            border: "1px solid rgba(191,219,254,0.22)", padding: "5px 14px",
                            borderRadius: 9999, transition: "all 0.2s",
                          }}
                        >
                          GitHub ↗
                        </a>
                      )}
                      {project.infra && (
                        <a
                          href={project.infra} target="_blank" rel="noopener noreferrer"
                          className="project-link"
                          style={{
                            fontSize: 13, color: C.blue200, textDecoration: "none",
                            border: "1px solid rgba(191,219,254,0.22)", padding: "5px 14px",
                            borderRadius: 9999, transition: "all 0.2s",
                          }}
                        >
                          Infra ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 18px" }}>{project.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {project.tags.map(tag => {
                      const Icon = SKILL_ICONS[tag];
                      return (
                        <span
                          key={tag}
                          style={{
                            fontSize: 12, padding: "3px 12px",
                            background: C.tagBg, color: C.blue200,
                            border: `1px solid ${C.tagBorder}`, borderRadius: 9999,
                            display: "inline-flex", alignItems: "center", gap: 5,
                          }}
                        >
                          {Icon && <Icon size={11} />}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────────────────────────── */}
      <section id="experience" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.012)" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 24px 96px" }}>
          <FadeIn>
            <SectionHeader tagline="Where I've worked" title="Work Experience" />
          </FadeIn>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gap: 24 }}>
            {(content.experience as Array<typeof content.experience[0] & { tags?: string[] }>).map((job, i) => (
              <FadeIn key={job.company} delay={i * 80}>
                <div
                  className="card-hover"
                  style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: "28px 32px",
                    backdropFilter: "blur(8px)", boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: C.heading, margin: 0 }}>{job.role}</h3>
                    <span style={{
                      fontSize: 13, color: C.blue200, background: C.tagBg,
                      padding: "4px 14px", borderRadius: 9999, border: `1px solid ${C.tagBorder}`,
                    }}>
                      {job.period}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: C.primary, marginBottom: 18, marginTop: 4, fontWeight: 500 }}>{job.company}</p>
                  <ul style={{ margin: "0 0 18px", padding: 0, listStyle: "none" }}>
                    {job.points.map(point => (
                      <li
                        key={point}
                        style={{ fontSize: 14, color: C.text, lineHeight: 1.85, paddingLeft: 20, position: "relative", marginBottom: 8 }}
                      >
                        <span style={{ position: "absolute", left: 0, color: C.primary, fontSize: 10, top: 6 }}>◆</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  {job.tags && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {job.tags.map(tag => {
                        const Icon = SKILL_ICONS[tag];
                        return (
                          <span
                            key={tag}
                            style={{
                              fontSize: 12, padding: "3px 12px",
                              background: C.tagBg, color: C.blue200,
                              border: `1px solid ${C.tagBorder}`, borderRadius: 9999,
                              display: "inline-flex", alignItems: "center", gap: 5,
                            }}
                          >
                            {Icon && <Icon size={11} />}
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ──────────────────────────────────────────────────── */}
      <section id="certifications" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 24px 96px" }}>
          <FadeIn>
            <SectionHeader
              tagline="Credentials"
              title="Certifications"
              subtitle="Industry-recognized certifications across cloud, DevOps, and infrastructure"
            />
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {content.certifications.map((cert, i) => (
              <FadeIn key={cert.name} delay={i * 50}>
                <div
                  className="card-hover"
                  style={{
                    background: C.card, border: `1px solid ${C.border}`,
                    borderRadius: 8, padding: 20,
                    display: "flex", alignItems: "flex-start", gap: 16,
                    backdropFilter: "blur(8px)", boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: C.tagBg, border: `1px solid ${C.tagBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {(() => { const Icon = CERT_ICONS[cert.name]; return Icon ? <Icon size={22} color={C.blue200} /> : <span style={{ color: C.primary, fontSize: 18, fontWeight: 700 }}>✓</span>; })()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.heading, marginBottom: 4, marginTop: 0 }}>{cert.name}</p>
                    <p style={{ fontSize: 12, color: C.muted, margin: "0 0 10px" }}>{cert.issuer}</p>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="verify-link"
                      style={{
                        fontSize: 11, color: C.blue200,
                        background: C.tagBg, display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "3px 10px", borderRadius: 9999, border: `1px solid ${C.tagBorder}`,
                        textDecoration: "none", transition: "all 0.2s",
                      }}
                    >
                      ↗ Verify
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.012)" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 24px 128px", textAlign: "center" }}>
          <FadeIn>
            <SectionHeader
              tagline="Let's connect"
              title="Get in Touch"
              subtitle="Open to new opportunities. Whether you have a role in mind or just want to talk infrastructure — reach out."
            />
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={`mailto:${content.contact.email}`}
                style={{
                  padding: "13px 32px", background: C.primary, color: "#fff",
                  fontWeight: 600, fontSize: 15, textDecoration: "none",
                  borderRadius: 9999, border: `1px solid ${C.primary}`, transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = C.primaryHov}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = C.primary}
              >
                Email me
              </a>
              <a
                href={content.contact.github}
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{
                  padding: "13px 32px", background: "transparent", color: C.text,
                  fontWeight: 600, fontSize: 15, textDecoration: "none",
                  borderRadius: 9999, border: "1px solid rgba(229,236,246,0.22)", transition: "all 0.2s",
                }}
              >
                GitHub
              </a>
              <a
                href={content.contact.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{
                  padding: "13px 32px", background: "transparent", color: C.text,
                  fontWeight: 600, fontSize: 15, textDecoration: "none",
                  borderRadius: 9999, border: "1px solid rgba(229,236,246,0.22)", transition: "all 0.2s",
                }}
              >
                LinkedIn
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
          Built with Next.js · Deployed on AWS S3 + CloudFront · {content.name}
        </p>
      </footer>

    </div>
  );
}

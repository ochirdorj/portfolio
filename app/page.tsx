"use client";
import { content } from "@/data/content";
import { useEffect, useState } from "react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const MONO =
  "var(--font-geist-mono), 'Courier New', monospace";
const CYAN    = "#00bfff";        // accent — links, tags, highlights
const BG      = "#0d1117";        // main background — dark navy
const CARD    = "#161b22";        // card background — slightly lighter navy
const BORDER  = "#30363d";        // card borders — subtle gray-blue
const TAG_BG  = "#0d2137";        // tech pill background — dark blue tint
const TAG_BRD = "#1e4976";        // tech pill border — subtle cyan border
const WHITE   = "#ffffff";        // primary text — headings, titles, name
const TEXT    = "#c9d1e0";        // secondary text — body, descriptions
const DIM     = "#8b949e";        // muted text — dates, labels, company
const FAINT   = "#6a7585";        // very muted — footer

// ── Static data ───────────────────────────────────────────────────────────────
const LOAD_LINES = [
  "Initializing cloud infrastructure...",
  "Loading CI/CD pipeline...",
  "Configuring Kubernetes cluster...",
  "Deploying portfolio...",
];

const CERT_ISSUERS: Record<string, string> = {
  "AWS Cloud Practitioner":        "Amazon Web Services",
  "AWS Solutions Architect":       "Amazon Web Services",
  "Kubernetes — KCNA":             "Cloud Native Computing Foundation",
  "HashiCorp Terraform Associate": "HashiCorp",
  "GitHub Actions Certified":      "GitHub",
  "Python — PCEP":                 "Python Institute",
  "Linux Essentials Certificate":  "Linux Professional Institute",
};

// ── Types ─────────────────────────────────────────────────────────────────────
type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  infra?: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  points: string[];
  tags?: string[];
};

// ── Loading screen ────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentText, setCurrentText]       = useState("");
  const [phase, setPhase]                   = useState<"typing" | "progress" | "fadeout">("typing");
  const [progress, setProgress]             = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    let lineIdx = 0;
    let charIdx = 0;

    const typeChar = () => {
      if (cancelled) return;
      const line = LOAD_LINES[lineIdx];
      if (charIdx < line.length) {
        charIdx++;
        setCurrentText(line.slice(0, charIdx));
        timer = setTimeout(typeChar, 22);
      } else {
        const done = line;
        setCompletedLines(prev => [...prev, done]);
        setCurrentText("");
        lineIdx++;
        charIdx = 0;
        if (lineIdx < LOAD_LINES.length) {
          timer = setTimeout(typeChar, 180);
        } else {
          timer = setTimeout(startProgress, 220);
        }
      }
    };

    const startProgress = () => {
      if (cancelled) return;
      setPhase("progress");
      let p = 0;
      interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        p += 1.4;
        const capped = Math.min(p, 100);
        setProgress(capped);
        if (capped >= 100) {
          clearInterval(interval);
          timer = setTimeout(() => {
            if (cancelled) return;
            setPhase("fadeout");
            timer = setTimeout(onDone, 500);
          }, 280);
        }
      }, 10);
    };

    timer = setTimeout(typeChar, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "0 24px",
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Window chrome */}
        <div
          style={{
            background: CARD,
            border: `1px solid ${BORDER}`,
            borderRadius: "10px 10px 0 0",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
          <span style={{ marginLeft: 8, fontSize: 13, color: FAINT, fontFamily: MONO }}>
            alex@portfolio:~
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            background: "#090d12",
            border: `1px solid ${BORDER}`,
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            padding: "20px 22px",
            minHeight: 168,
            fontFamily: MONO,
            fontSize: 14,
          }}
        >
          {completedLines.map((line, i) => (
            <div key={i} style={{ marginBottom: 8, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: CYAN, flexShrink: 0 }}>$</span>
              <span style={{ color: TEXT, flex: 1 }}>{line}</span>
              <span style={{ color: "#22c55e", fontSize: 13, flexShrink: 0 }}>✓</span>
            </div>
          ))}

          {phase === "typing" && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: CYAN, flexShrink: 0 }}>$</span>
              <span style={{ color: WHITE }}>
                {currentText}
                <span
                  style={{
                    display: "inline-block",
                    width: 7,
                    height: "1em",
                    background: CYAN,
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                    animation: "termCursor 1s step-end infinite",
                  }}
                />
              </span>
            </div>
          )}

          {(phase === "progress" || phase === "fadeout") && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: CYAN, fontSize: 13 }}>$ npm run deploy --prod</span>
                <span style={{ color: DIM, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>
                  {Math.floor(progress)}%
                </span>
              </div>
              <div style={{ background: "#1c2128", borderRadius: 4, height: 4, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${CYAN}, #0080cc)`,
                    borderRadius: 4,
                    transition: "width 0.04s linear",
                    boxShadow: `0 0 10px ${CYAN}55`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
      <span style={{ whiteSpace: "nowrap" as const, fontFamily: MONO, letterSpacing: "1.5px" }}>
        <span style={{ color: CYAN, fontSize: 13, fontWeight: 600 }}>{"// "}</span>
        <span style={{ color: WHITE, fontSize: 13, fontWeight: 700 }}>{label.toUpperCase()}</span>
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${CYAN}55, transparent)` }} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded]               = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [typedName, setTypedName]         = useState("");
  const [showCursor, setShowCursor]       = useState(true);

  // Active section on scroll
  useEffect(() => {
    if (!loaded) return;
    const sections = ["about", "skills", "projects", "experience", "certifications", "contact"];
    const handleScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaded]);

  // Hero typewriter
  useEffect(() => {
    if (!loaded) return;
    const name = content.name;
    let i = 0;
    setTypedName("");
    const timer = setInterval(() => {
      i++;
      setTypedName(name.slice(0, i));
      if (i >= name.length) {
        clearInterval(timer);
        setShowCursor(true);
      }
    }, 65);
    return () => clearInterval(timer);
  }, [loaded]);

  // Scroll-based fade-in via IntersectionObserver
  useEffect(() => {
    if (!loaded) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  const projects   = content.projects as ProjectItem[];
  const experience = content.experience as ExperienceItem[];

  const tagPill = (color: string, bg: string, border: string): React.CSSProperties => ({
    fontSize: 13,
    color,
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: 4,
    padding: "2px 8px",
    fontWeight: 500,
    fontFamily: MONO,
    whiteSpace: "nowrap" as const,
  });

  const divider = <div style={{ borderTop: `1px solid ${BORDER}` }} />;

  return (
    <>
      <style>{`
        @keyframes termCursor { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }

        .fade-in {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }

        /* Project cards */
        .p-card {
          border: 1px solid ${BORDER};
          border-radius: 12px;
          padding: 24px;
          background: ${CARD};
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .p-card:hover {
          border-color: rgba(0,191,255,0.45);
          box-shadow: 0 0 0 1px rgba(0,191,255,0.08),
                      0 8px 32px rgba(0,191,255,0.1);
        }

        /* Skill cards */
        .s-card {
          border: 1px solid ${BORDER};
          border-radius: 12px;
          padding: 20px 22px;
          background: ${CARD};
        }

        /* Experience cards */
        .e-card {
          border: 1px solid ${BORDER};
          border-radius: 12px;
          padding: 24px;
          background: ${CARD};
        }

        /* Cert cards */
        .c-card {
          border: 1px solid ${BORDER};
          border-radius: 10px;
          padding: 16px 18px;
          background: ${CARD};
          display: flex;
          align-items: center;
          gap: 14px;
          transition: border-color 0.2s;
        }
        .c-card:hover { border-color: rgba(0,191,255,0.4); }

        /* Nav links */
        .nav-a {
          text-decoration: none;
          padding: 5px 9px;
          border-radius: 6px;
          font-size: 14px;
          transition: color 0.15s, background 0.15s;
        }
        .nav-a:hover {
          color: ${WHITE} !important;
          background: rgba(0,191,255,0.08) !important;
        }

        /* Project links */
        .proj-a {
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          color: ${DIM};
          transition: color 0.15s;
          white-space: nowrap;
        }
        .proj-a:hover { color: ${CYAN} !important; }

        /* Primary button — outline style, fills on hover */
        .btn-cyan {
          transition: background 0.18s, color 0.18s, border-color 0.18s;
        }
        .btn-cyan:hover {
          background: ${CYAN} !important;
          color: #000 !important;
          border-color: ${CYAN} !important;
        }

        /* Ghost / secondary button */
        .btn-ghost {
          transition: background 0.15s, border-color 0.15s;
        }
        .btn-ghost:hover {
          background: rgba(0,191,255,0.06) !important;
          border-color: ${BORDER} !important;
        }

        /* Contact / CTA rows */
        .contact-row {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 22px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
        }

        @media (max-width: 600px) {
          .nav-a    { padding: 4px 6px !important; font-size: 12px !important; }
          .hero-h1  { font-size: 38px !important; letter-spacing: -1.2px !important; }
          .skills-g { grid-template-columns: 1fr !important; }
          .certs-g  { grid-template-columns: 1fr !important; }
          .hero-cta { flex-direction: column; }
          .hero-cta a { justify-content: center; }
        }
      `}</style>

      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {loaded && (
        <main
          style={{
            fontFamily: FONT,
            background: BG,
            color: TEXT,
            minHeight: "100vh",
            fontSize: 15,
            lineHeight: 1.8,
          }}
        >
          {/* ── Nav ───────────────────────────────────────────── */}
          <nav
            style={{
              position: "fixed",
              top: 0,
              width: "100%",
              zIndex: 50,
              background: "rgba(13,17,23,0.9)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <div
              style={{
                maxWidth: 800,
                margin: "0 auto",
                padding: "0 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 52,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: WHITE, fontFamily: MONO }}>
                {content.name}{" "}
                <span style={{ color: CYAN }}>~</span>
              </span>
              <div style={{ display: "flex", gap: 2 }}>
                {(
                  [
                    ["about",          "About"],
                    ["skills",         "Skills"],
                    ["projects",       "Projects"],
                    ["experience",     "Experience"],
                    ["certifications", "Certs"],
                    ["contact",        "Contact"],
                  ] as [string, string][]
                ).map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="nav-a"
                    style={{
                      color: activeSection === id ? CYAN : DIM,
                      fontWeight: activeSection === id ? 500 : 400,
                      background:
                        activeSection === id
                          ? "rgba(0,191,255,0.08)"
                          : "transparent",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>

            {/* ── Hero ──────────────────────────────────────────── */}
            <section id="about" style={{ paddingTop: 120, paddingBottom: 88 }}>
              {/* Status badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  border: "1px solid rgba(0,191,255,0.22)",
                  background: "rgba(0,191,255,0.05)",
                  borderRadius: 20,
                  padding: "4px 14px",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                    boxShadow: "0 0 6px #22c55e88",
                  }}
                />
                <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 500, fontFamily: MONO }}>
                  open to new roles
                </span>
              </div>

              <h1
                className="hero-h1"
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  color: WHITE,
                  margin: "0 0 12px",
                  letterSpacing: "-2.5px",
                  lineHeight: 1.1,
                  minHeight: "1.1em",
                }}
              >
                {typedName}
                {showCursor && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 3,
                      height: "0.75em",
                      background: CYAN,
                      marginLeft: 5,
                      verticalAlign: "baseline",
                      borderRadius: 1,
                      animation: "termCursor 1s step-end infinite",
                    }}
                  />
                )}
              </h1>

              <p style={{ fontSize: 18, color: DIM, margin: "0 0 22px", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
                {content.title}
              </p>
              <p style={{ fontSize: 15, color: TEXT, margin: 0, lineHeight: 1.8, maxWidth: 580 }}>
                {content.about}
              </p>

              <div
                className="hero-cta"
                style={{ display: "flex", gap: 10, flexWrap: "wrap" as const, marginTop: 36 }}
              >
                {/* Primary — cyan outline, fills on hover */}
                <a
                  href="#projects"
                  className="btn-cyan contact-row"
                  style={{
                    background: "transparent",
                    color: CYAN,
                    border: `1px solid ${CYAN}`,
                    fontWeight: 700,
                  }}
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="btn-ghost contact-row"
                  style={{
                    background: "transparent",
                    color: WHITE,
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  Get in touch
                </a>
              </div>
            </section>

            {divider}

            {/* ── Skills ────────────────────────────────────────── */}
            <section id="skills" style={{ paddingTop: 64, paddingBottom: 72 }}>
              <div className="fade-in">
                <SectionHeader label="Skills" />
                <div
                  className="skills-g"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 12,
                    marginTop: 28,
                  }}
                >
                  {content.skillCategories.map(cat => (
                    <div key={cat.name} className="s-card">
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: CYAN,
                          margin: "0 0 12px",
                          fontFamily: MONO,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {cat.name}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                        {cat.subskills.map(s => (
                          <span
                            key={s}
                            style={{
                              fontSize: 13,
                              color: CYAN,
                              background: TAG_BG,
                              border: `1px solid ${TAG_BRD}`,
                              borderRadius: 4,
                              padding: "3px 9px",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {divider}

            {/* ── Projects ──────────────────────────────────────── */}
            <section id="projects" style={{ paddingTop: 64, paddingBottom: 72 }}>
              <div className="fade-in">
                <SectionHeader label="Projects" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: 12,
                    marginTop: 28,
                  }}
                >
                  {projects.map(project => (
                    <div key={project.title} className="p-card">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 16,
                          marginBottom: 12,
                        }}
                      >
                        <h3
                          style={{
                            fontSize: 17,
                            fontWeight: 600,
                            color: WHITE,
                            margin: 0,
                            lineHeight: 1.2,
                          }}
                        >
                          {project.title}
                        </h3>
                        <div style={{ display: "flex", gap: 14, flexShrink: 0, paddingTop: 2 }}>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="proj-a"
                            >
                              Code ↗
                            </a>
                          )}
                          {project.infra && (
                            <a
                              href={project.infra}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="proj-a"
                            >
                              Infra ↗
                            </a>
                          )}
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: 15,
                          color: TEXT,
                          margin: "0 0 16px",
                          lineHeight: 1.8,
                        }}
                      >
                        {project.description}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                        {project.tags.map(tag => (
                          <span key={tag} style={tagPill(CYAN, TAG_BG, TAG_BRD)}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {divider}

            {/* ── Experience ────────────────────────────────────── */}
            <section id="experience" style={{ paddingTop: 64, paddingBottom: 72 }}>
              <div className="fade-in">
                <SectionHeader label="Experience" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: 14,
                    marginTop: 28,
                  }}
                >
                  {experience.map(job => (
                    <div key={job.company} className="e-card">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap" as const,
                          gap: 8,
                          marginBottom: 14,
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontSize: 17,
                              fontWeight: 600,
                              color: WHITE,
                              margin: 0,
                              lineHeight: 1.2,
                            }}
                          >
                            {job.role}
                          </h3>
                          <p style={{ fontSize: 15, color: DIM, margin: "4px 0 0" }}>
                            {job.company}
                          </p>
                        </div>
                        <span
                          style={{
                            fontSize: 13,
                            color: DIM,
                            fontFamily: MONO,
                            border: `1px solid ${BORDER}`,
                            borderRadius: 4,
                            padding: "3px 9px",
                            flexShrink: 0,
                          }}
                        >
                          {job.period}
                        </span>
                      </div>

                      <ul
                        style={{
                          margin: 0,
                          padding: 0,
                          listStyle: "none",
                          display: "flex",
                          flexDirection: "column" as const,
                          gap: 7,
                        }}
                      >
                        {job.points.map(point => (
                          <li
                            key={point}
                            style={{
                              fontSize: 15,
                              color: TEXT,
                              lineHeight: 1.8,
                              display: "flex",
                              gap: 10,
                              alignItems: "flex-start",
                            }}
                          >
                            <span
                              style={{
                                color: CYAN,
                                flexShrink: 0,
                                marginTop: "0.35em",
                                fontSize: 9,
                              }}
                            >
                              ▸
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>

                      {job.tags && job.tags.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap" as const,
                            gap: 6,
                            marginTop: 16,
                            paddingTop: 16,
                            borderTop: `1px solid ${BORDER}`,
                          }}
                        >
                          {job.tags.map(tag => (
                            <span key={tag} style={tagPill(DIM, CARD, BORDER)}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {divider}

            {/* ── Certifications ────────────────────────────────── */}
            <section id="certifications" style={{ paddingTop: 64, paddingBottom: 72 }}>
              <div className="fade-in">
                <SectionHeader label="Certifications" />
                <div
                  className="certs-g"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 10,
                    marginTop: 28,
                  }}
                >
                  {content.certifications.map(cert => (
                    <div key={cert} className="c-card">
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: TAG_BG,
                          border: `1px solid ${TAG_BRD}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: 15,
                          color: CYAN,
                        }}
                      >
                        ✓
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            color: WHITE,
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          {cert}
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            color: DIM,
                            margin: "3px 0 0",
                            fontFamily: MONO,
                          }}
                        >
                          {CERT_ISSUERS[cert] ?? ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {divider}

            {/* ── Contact ───────────────────────────────────────── */}
            <section id="contact" style={{ paddingTop: 64, paddingBottom: 120 }}>
              <div className="fade-in">
                <SectionHeader label="Contact" />
                <p
                  style={{
                    fontSize: 15,
                    color: TEXT,
                    lineHeight: 1.8,
                    margin: "20px 0 32px",
                    maxWidth: 500,
                  }}
                >
                  Open to new DevOps / Cloud Engineering roles. I respond quickly — feel free to reach out through any of the channels below.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="btn-cyan contact-row"
                    style={{
                      background: "transparent",
                      color: CYAN,
                      border: `1px solid ${CYAN}`,
                      fontWeight: 700,
                    }}
                  >
                    {content.contact.email}
                  </a>
                  <a
                    href={content.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost contact-row"
                    style={{
                      background: "transparent",
                      color: WHITE,
                      border: `1px solid ${BORDER}`,
                    }}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={content.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost contact-row"
                    style={{
                      background: "transparent",
                      color: WHITE,
                      border: `1px solid ${BORDER}`,
                    }}
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* ── Footer ────────────────────────────────────────── */}
          <footer
            style={{
              borderTop: `1px solid ${BORDER}`,
              padding: "20px 24px",
              textAlign: "center" as const,
            }}
          >
            <p style={{ fontSize: 13, color: FAINT, margin: 0, fontFamily: MONO }}>
              Built with Next.js · Deployed on AWS S3 + CloudFront
            </p>
          </footer>
        </main>
      )}
    </>
  );
}

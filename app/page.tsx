"use client";
import { content } from "@/data/content";
import { useEffect, useState } from "react";

type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  infra?: string;
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "experience", "contact"];
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
  }, []);

  const font =
    "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  const outlineBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    background: "transparent",
    color: "#0a0a0a",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    letterSpacing: "-0.01em",
  };

  const primaryBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    background: "#0a0a0a",
    color: "#fff",
    border: "1px solid transparent",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    letterSpacing: "-0.01em",
  };

  const inlineLink: React.CSSProperties = {
    color: "#0a0a0a",
    textDecoration: "underline",
    textDecorationColor: "#d1d5db",
    textUnderlineOffset: "3px",
  };

  const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    margin: 0,
  };

  const divider: React.CSSProperties = {
    border: "none",
    borderTop: "1px solid #e5e7eb",
    margin: 0,
  };

  const projects = content.projects as ProjectItem[];

  return (
    <main
      style={{
        fontFamily: font,
        background: "#fafafa",
        color: "#0a0a0a",
        minHeight: "100vh",
        fontSize: 15,
        lineHeight: 1.75,
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        .project-card {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 22px 24px;
          background: #fff;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .project-card:hover {
          border-color: #c7c7c7;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .project-link { color: #555; text-decoration: none; font-size: 13px; font-weight: 500; white-space: nowrap; }
        .project-link:hover { color: #0a0a0a; }
        .btn-outline:hover { background: #f5f5f5 !important; }
        .btn-primary:hover { background: #222 !important; }
        .nav-item { transition: color 0.15s, background 0.15s; }
        .nav-item:hover { color: #0a0a0a !important; }
        @media (max-width: 520px) {
          .nav-item { padding: 4px 7px !important; font-size: 12px !important; }
          .hero-h1 { font-size: 28px !important; letter-spacing: -0.8px !important; }
          .hero-btns { flex-direction: column; }
          .hero-btns a { text-align: center; justify-content: center; }
        }
      `}</style>

      {/* ── Nav ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(250,250,250,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 52,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#0a0a0a",
              letterSpacing: "-0.3px",
            }}
          >
            {content.name}
          </span>
          <div style={{ display: "flex", gap: 2 }}>
            {["about", "projects", "experience", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="nav-item"
                style={{
                  fontSize: 13,
                  color: activeSection === s ? "#0a0a0a" : "#888",
                  textDecoration: "none",
                  fontWeight: activeSection === s ? 500 : 400,
                  padding: "5px 10px",
                  borderRadius: 6,
                  background: activeSection === s ? "#efefef" : "transparent",
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Page content ── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Hero / About ── */}
        <section id="about" style={{ paddingTop: 112, paddingBottom: 72 }}>
          {/* "Open to roles" badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: 20,
              padding: "3px 12px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>
              Open to new roles
            </span>
          </div>

          <h1
            className="hero-h1"
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#0a0a0a",
              margin: "0 0 8px",
              letterSpacing: "-1.2px",
              lineHeight: 1.15,
            }}
          >
            {content.name}
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#888",
              margin: "0 0 20px",
              letterSpacing: "-0.2px",
            }}
          >
            {content.title}
          </p>
          <p
            style={{
              fontSize: 15,
              color: "#555",
              margin: 0,
              lineHeight: 1.8,
              maxWidth: 560,
            }}
          >
            {content.about}
          </p>

          <div
            className="hero-btns"
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 28,
            }}
          >
            <a
              href={content.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={outlineBtn}
            >
              GitHub ↗
            </a>
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={outlineBtn}
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${content.contact.email}`}
              className="btn-outline"
              style={outlineBtn}
            >
              {content.contact.email}
            </a>
          </div>
        </section>

        <hr style={divider} />

        {/* ── Skills ── */}
        <section id="skills" style={{ paddingTop: 48, paddingBottom: 64 }}>
          <p style={sectionLabel}>Skills</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 20,
            }}
          >
            {content.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: 13,
                  color: "#374151",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  padding: "5px 11px",
                  fontWeight: 500,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <hr style={divider} />

        {/* ── Projects ── */}
        <section id="projects" style={{ paddingTop: 48, paddingBottom: 64 }}>
          <p style={sectionLabel}>Projects</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginTop: 24,
            }}
          >
            {projects.map((project) => (
              <div key={project.title} className="project-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 16,
                    marginBottom: 10,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#0a0a0a",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {project.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      flexShrink: 0,
                      paddingTop: 2,
                    }}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Code ↗
                      </a>
                    )}
                    {project.infra && (
                      <a
                        href={project.infra}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Infra ↗
                      </a>
                    )}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#555",
                    margin: "0 0 14px",
                    lineHeight: 1.75,
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12,
                        color: "#555",
                        background: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                        borderRadius: 4,
                        padding: "2px 8px",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr style={divider} />

        {/* ── Experience ── */}
        <section id="experience" style={{ paddingTop: 48, paddingBottom: 64 }}>
          <p style={sectionLabel}>Experience</p>
          <div style={{ marginTop: 28 }}>
            {content.experience.map((job, i) => (
              <div
                key={job.company}
                style={{
                  marginBottom:
                    i < content.experience.length - 1 ? 40 : 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 4,
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#0a0a0a",
                        margin: 0,
                      }}
                    >
                      {job.role}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#888",
                        margin: "3px 0 0",
                      }}
                    >
                      {job.company}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: "#aaa",
                      paddingTop: 2,
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
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  {job.points.map((point) => (
                    <li
                      key={point}
                      style={{
                        fontSize: 14,
                        color: "#555",
                        lineHeight: 1.75,
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          color: "#d1d5db",
                          flexShrink: 0,
                          marginTop: "0.35em",
                          fontSize: 10,
                        }}
                      >
                        ▸
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr style={divider} />

        {/* ── Contact ── */}
        <section id="contact" style={{ paddingTop: 48, paddingBottom: 120 }}>
          <p style={sectionLabel}>Contact</p>
          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.8,
              margin: "16px 0 28px",
              maxWidth: 480,
            }}
          >
            Open to new roles — feel free to reach out via{" "}
            <a href={`mailto:${content.contact.email}`} style={inlineLink}>
              email
            </a>{" "}
            or connect on{" "}
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={inlineLink}
            >
              LinkedIn
            </a>
            .
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a
              href={`mailto:${content.contact.email}`}
              className="btn-primary"
              style={primaryBtn}
            >
              Send an email
            </a>
            <a
              href={content.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={outlineBtn}
            >
              LinkedIn ↗
            </a>
            <a
              href={content.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={outlineBtn}
            >
              GitHub ↗
            </a>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "20px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "#ccc", margin: 0 }}>
          Built with Next.js · Deployed on AWS S3 + CloudFront
        </p>
      </footer>
    </main>
  );
}

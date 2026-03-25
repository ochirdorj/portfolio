"use client";
import { content } from "@/data/content";
import { useEffect, useState } from "react";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLink = (s: string) => ({
    fontSize: 14,
    color: activeSection === s ? "#000" : "#888",
    textDecoration: "none",
    fontWeight: activeSection === s ? 500 : 400,
    transition: "color 0.15s",
  } as React.CSSProperties);

  return (
    <main style={{
      fontFamily: "Georgia, 'Times New Roman', serif",
      background: "#fff",
      color: "#1a1a1a",
      minHeight: "100vh",
      fontSize: 15,
      lineHeight: 1.7,
    }}>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>{content.name}</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["about", "projects", "experience", "contact"].map(s => (
              <a key={s} href={`#${s}`} style={navLink(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* About */}
      <section id="about" style={{ maxWidth: 640, margin: "0 auto", padding: "120px 24px 80px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#111", margin: "0 0 20px", letterSpacing: -0.5 }}>
          {content.name}
        </h1>
        <p style={{ color: "#444", marginBottom: 16, lineHeight: 1.8 }}>
          I'm a <strong style={{ color: "#111", fontWeight: 500 }}>DevOps / Cloud Engineer</strong> based in {content.location}. I mostly work with Kubernetes and AWS — setting up CI/CD pipelines, wiring up GitOps workflows, making deploys boring. That last part is genuinely the goal.
        </p>
        <p style={{ color: "#444", marginBottom: 32, lineHeight: 1.8 }}>
          Currently open to new roles. You can{" "}
          <a href={content.contact.github} target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textDecorationColor: "#ccc" }}>
            view my code
          </a>
          {", "}
          <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textDecorationColor: "#ccc" }}>
            connect on LinkedIn
          </a>
          {", or "}
          <a href={`mailto:${content.contact.email}`} style={{ color: "#111", textDecoration: "underline", textDecorationColor: "#ccc" }}>
            reach out via email
          </a>
          .
        </p>

        {/* Skills inline */}
        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 24 }}>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Skills</p>
          <p style={{ color: "#444", lineHeight: 2, fontSize: 14 }}>
            {content.skills.join(" · ")}
          </p>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 80px", borderTop: "1px solid #f0f0f0" }}>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 24, paddingTop: 32, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Projects</p>
        <div>
          {content.projects.map((project) => (
            <div key={project.title} style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <h3 style={{ fontSize: 15, fontWeight: 500, color: "#111", margin: 0 }}>
                  {project.title}
                </h3>
                <div style={{ display: "flex", gap: 12, flexShrink: 0, marginLeft: 16 }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, color: "#888", textDecoration: "underline", textDecorationColor: "#ddd" }}>
                      GitHub
                    </a>
                  )}
                  {project.infra && (
                    <a href={project.infra} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, color: "#888", textDecoration: "underline", textDecorationColor: "#ddd" }}>
                      Infra
                    </a>
                  )}
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#666", margin: "0 0 8px", lineHeight: 1.7 }}>
                {project.description}
              </p>
              <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>
                {project.tags.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 80px", borderTop: "1px solid #f0f0f0" }}>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 24, paddingTop: 32, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Experience</p>
        <div>
          {content.experience.map((job) => (
            <div key={job.company} style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <h3 style={{ fontSize: 15, fontWeight: 500, color: "#111", margin: 0 }}>{job.role}</h3>
                <span style={{ fontSize: 13, color: "#aaa", flexShrink: 0, marginLeft: 16 }}>{job.period}</span>
              </div>
              <p style={{ fontSize: 14, color: "#888", margin: "0 0 12px" }}>{job.company}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {job.points.map(point => (
                  <li key={point} style={{ fontSize: 14, color: "#666", lineHeight: 1.7, paddingLeft: 16, position: "relative" as const, marginBottom: 4 }}>
                    <span style={{ position: "absolute" as const, left: 0, color: "#ccc" }}>—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 120px", borderTop: "1px solid #f0f0f0" }}>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 24, paddingTop: 32, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Contact</p>
        <p style={{ fontSize: 15, color: "#444", lineHeight: 1.8, marginBottom: 20 }}>
          Open to new roles — feel free to reach out via{" "}
          <a href={`mailto:${content.contact.email}`} style={{ color: "#111", textDecoration: "underline", textDecorationColor: "#ccc" }}>
            email
          </a>
          {" "}or connect on{" "}
          <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#111", textDecoration: "underline", textDecorationColor: "#ccc" }}>
            LinkedIn
          </a>
          .
        </p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f0f0f0", padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>
          Built with Next.js · Deployed on AWS S3 + CloudFront
        </p>
      </footer>

    </main>
  );
}

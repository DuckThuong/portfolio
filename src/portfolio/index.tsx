import { useState, useEffect, useRef } from "react";
import portfolioData, {
  type Profile,
  type Project,
  type TechnicalSkill,
  type TimelineItem,
} from "@/data/data";
import TechBackground from "./TechBackground";
import "./style.scss";

const AVATAR_FALLBACK = "/avatar.svg";

function resolveAssetUrl(path: string): string {
  if (!path) return "";
  if (
    path.startsWith("http") ||
    path.startsWith("data:") ||
    path.includes("/static/")
  ) {
    return path;
  }
  const base = process.env.PUBLIC_URL ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

interface ProfileAvatarProps {
  className: string;
  profile?: Profile;
}

function ProfileAvatar({ className, profile = portfolioData.profile }: ProfileAvatarProps) {
  const { avatar, avatarInitials, name, avatarColor } = profile;
  const primarySrc = resolveAssetUrl(avatar);
  const fallbackSrc = resolveAssetUrl(AVATAR_FALLBACK);
  const [src, setSrc] = useState(primarySrc);

  useEffect(() => {
    setSrc(primarySrc);
  }, [primarySrc]);

  return (
    <div
      className={className}
      style={{ ["--avatar-accent" as string]: avatarColor }}
    >
      {src ? (
        <img
          src={src}
          alt={`Ảnh đại diện ${name}`}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (src === primarySrc && primarySrc !== fallbackSrc) {
              setSrc(fallbackSrc);
            } else {
              setSrc("");
            }
          }}
        />
      ) : (
        <span className="profile-avatar__initials">{avatarInitials}</span>
      )}
    </div>
  );
}

function useActiveSection(sections: string[]): string {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function useIntersectionObserver(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const NAV_ITEMS = [
  "hero",
  "about",
  "skills",
  "projects",
  "timeline",
  "contact",
] as const;
const NAV_LABELS: Record<string, string> = {
  hero: "Trang chủ",
  about: "Về tôi",
  skills: "Kỹ năng",
  projects: "Dự án",
  timeline: "Kinh nghiệm",
  contact: "Liên hệ",
};

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

interface SectionTitleProps {
  tag: string;
  title: string;
}

function SectionTitle({ tag, title }: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="section-title__tag">{tag}.</div>
      <h2 className="section-title__heading">{title}</h2>
      <div className="section-title__divider" />
    </div>
  );
}

interface NavBarProps {
  activeSection: string;
}

function NavBar({ activeSection }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar__inner">
        <button
          type="button"
          className="navbar__brand"
          onClick={() => scrollToSection("hero")}
        >
          <ProfileAvatar className="navbar__avatar" />
          <span className="navbar__logo">
            &lt;{portfolioData.profile.name.split(" ").pop()} /&gt;
          </span>
        </button>
        <div className="navbar__links">
          {NAV_ITEMS.slice(1).map((id) => (
            <button
              key={id}
              className={`navbar__btn ${activeSection === id ? "active" : ""}`}
              onClick={() => scrollToSection(id)}
            >
              {NAV_LABELS[id]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const fullText = portfolioData.profile.title;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero">
      <TechBackground variant="hero" />
      <div className="hero__bg-dots" />
      <div className="hero__glow hero__glow--left" />
      <div className="hero__glow hero__glow--right" />

      <div className="hero__content">
        <ProfileAvatar className="hero__avatar" />

        <p className="hero__greeting">Xin chào, mình là</p>

        <h1 className="hero__name">{portfolioData.profile.name}</h1>

        <h2 className="hero__title">
          {typed}
          <span className="hero__cursor">|</span>
        </h2>

        <p className="hero__tagline">"{portfolioData.profile.tagline}"</p>

        <div className="hero__stats">
          {portfolioData.stats.map((stat) => (
            <div key={stat.label} className="hero__stat-card">
              <div className="hero__stat-card-value">{stat.value}</div>
              <div className="hero__stat-card-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="hero__actions">
          <button
            className="hero__btn-primary"
            onClick={() => scrollToSection("contact")}
          >
            Liên hệ ngay →
          </button>
          <a
            href={portfolioData.profile.cvLink}
            className="hero__btn-secondary"
          >
            Tải CV ↓
          </a>
        </div>

        <div className="hero__social">
          {(
            [
              ["GitHub", "⌥", portfolioData.profile.social.github],
              ["LinkedIn", "in", portfolioData.profile.social.linkedin],
              ["Facebook", "f", portfolioData.profile.social.facebook],
            ] as [string, string, string][]
          ).map(([name, icon, href]) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hero__social-link"
            >
              <span className="hero__social-link-icon">{icon}</span>
              {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────

function AboutSection() {
  const { profile, skills } = portfolioData;

  const infoRows: [string, string, string][] = [
    ["📧 Email", "Email", profile.email],
    ["📱 Phone", "Điện thoại", profile.phone],
    ["📍 Location", "Vị trí", profile.location],
    ["🕐 Status", "Trạng thái", "Đang tìm việc"],
  ];

  return (
    <section id="about" className="about">
      <div className="about__inner">
        <SectionTitle tag="02" title="Về tôi" />
        <div className="about__grid">
          <div className="about__photo">
            <ProfileAvatar className="about__photo-avatar about__photo-avatar--large" />
            <div className="about__photo-location">📍 {profile.location}</div>
            <div className="about__photo-status">Available for work ✓</div>
          </div>

          <div>
            <p className="about__bio">{profile.bio}</p>

            <div className="about__info-grid">
              {infoRows.map(([key, label, value]) => (
                <div key={key} className="about__info-card">
                  <div className="about__info-card-label">{label}</div>
                  <div className="about__info-card-value">{value}</div>
                </div>
              ))}
            </div>

            <div className="about__soft-skills">
              <div className="about__soft-skills-label">Soft Skills</div>
              <div className="about__soft-skills-tags">
                {skills.soft.map((skill) => (
                  <span key={skill} className="about__soft-skills-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILL BAR ────────────────────────────────────────────────────────────────

interface SkillBarProps {
  skill: TechnicalSkill;
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div ref={ref} className="skills__bar-item">
      <div className="skills__bar-item-header">
        <span className="skills__bar-item-name">{skill.name}</span>
        <span className="skills__bar-item-percent">{skill.level}%</span>
      </div>
      <div className="skills__bar-item-track">
        <div
          className="skills__bar-item-fill"
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
            boxShadow: `0 0 8px ${skill.color}66`,
            transition: `width 0.8s ease ${index * 0.08}s`,
          }}
        />
      </div>
    </div>
  );
}

// ─── SKILLS SECTION ───────────────────────────────────────────────────────────

const LEARNING_ITEMS = ["Next.js", "Node.js", "Docker"];

function SkillsSection() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="skills">
      <div className="skills__inner">
        <SectionTitle tag="03" title="Kỹ năng" />
        <div className="skills__grid">
          <div>
            <h3 className="skills__subtitle">Kỹ năng kỹ thuật</h3>
            {skills.technical.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          <div>
            <h3 className="skills__subtitle">Công cụ & Khác</h3>
            <div className="skills__tools">
              {skills.tools.map((tool) => (
                <div key={tool} className="skills__tool-tag">
                  {tool}
                </div>
              ))}
            </div>

            <div className="skills__learning">
              <div className="skills__learning-label">Đang học</div>
              {LEARNING_ITEMS.map((item) => (
                <div key={item} className="skills__learning-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? `${project.color}44` : "rgba(255,255,255,0.08)",
      }}
    >
      {project.featured && (
        <span
          className="project-card__badge"
          style={{
            background: `${project.color}22`,
            border: `1px solid ${project.color}44`,
            color: project.color,
          }}
        >
          ⭐ Featured
        </span>
      )}

      <div className="project-card__image">{project.image}</div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__tech">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="project-card__tech-tag"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              color: project.color,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="project-card__links">
        <a
          href={project.demo}
          className="project-card__link project-card__link--demo"
        >
          🔗 Demo
        </a>
        <a
          href={project.github}
          className="project-card__link project-card__link--github"
        >
          ⌥ GitHub
        </a>
      </div>
    </div>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <SectionTitle tag="04" title="Dự án nổi bật" />
        <div className="projects__grid">
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TIMELINE SECTION ─────────────────────────────────────────────────────────

function TimelineSection() {
  return (
    <section id="timeline" className="timeline">
      <div className="timeline__inner">
        <SectionTitle tag="05" title="Kinh nghiệm & Học vấn" />
        <div className="timeline__list">
          <div className="timeline__line" />
          {portfolioData.timeline.map((item: TimelineItem, i: number) => (
            <div key={i} className="timeline__item">
              <div className="timeline__dot">{item.icon}</div>
              <div className="timeline__card">
                <div className="timeline__card-header">
                  <h3 className="timeline__card-title">{item.title}</h3>
                  <span className="timeline__card-year">{item.year}</span>
                </div>
                <div className="timeline__card-org">{item.organization}</div>
                <p className="timeline__card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  message: string;
}

function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  const { profile } = portfolioData;

  const infoRows: [string, string, string][] = [
    ["📧", "Email", profile.email],
    ["📱", "Điện thoại", profile.phone],
    ["📍", "Vị trí", profile.location],
  ];

  const socialIcons: [string, string][] = [
    ["GitHub", "⌥"],
    ["LinkedIn", "in"],
    ["Facebook", "f"],
  ];

  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <SectionTitle tag="06" title="Liên hệ" />
        <p className="contact__subtitle">
          Bạn có cơ hội hợp tác? Mình rất vui được lắng nghe! 🚀
        </p>

        <div className="contact__grid">
          {/* Form */}
          <div>
            <div className="contact__form-group">
              <label htmlFor="name">Tên của bạn</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>
            <div className="contact__form-group">
              <label htmlFor="message">Tin nhắn</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Xin chào, mình có dự án..."
              />
            </div>
            <button
              className={`contact__submit ${sent ? "sent" : ""}`}
              onClick={handleSubmit}
            >
              {sent ? "✓ Đã gửi thành công!" : "Gửi tin nhắn →"}
            </button>
          </div>

          {/* Info */}
          <div>
            <h3 className="contact__info-title">Thông tin liên hệ</h3>
            {infoRows.map(([key, label, value]) => (
              <div key={key} className="contact__info-row">
                <span className="contact__info-row-icon">{key}</span>
                <div>
                  <div className="contact__info-row-label">{label}</div>
                  <div className="contact__info-row-value">{value}</div>
                </div>
              </div>
            ))}

            <div className="contact__social">
              <h3 className="contact__social-title">Mạng xã hội</h3>
              <div className="contact__social-icons">
                {socialIcons.map(([name, icon]) => (
                  <div key={name} className="contact__social-icon" title={name}>
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 {portfolioData.profile.name} · Built with ⚛️ ReactJS</p>
    </footer>
  );
}

const SECTIONS = ["hero", "about", "skills", "projects", "timeline", "contact"];

export default function App() {
  const activeSection = useActiveSection(SECTIONS);

  return (
    <div className="portfolio">
      <TechBackground variant="page" />
      <NavBar activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

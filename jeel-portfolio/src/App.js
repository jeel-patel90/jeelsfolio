import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// ─── Utility: useInView hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Nav ───────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];
  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__logo">
        <span className="nav__logo-text">JB</span>
        <span className="nav__logo-dot">.</span>
      </div>
      <ul className="nav__links">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className="nav__link">{l}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav__cta">Hire Me</a>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg-strokes" aria-hidden="true">
        <svg viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M 0 520 Q 200 480 400 510 Q 600 540 900 490" stroke="#1c1c1c" strokeWidth="0.7" strokeDasharray="4 8" opacity="0.12"/>
          <path d="M 0 540 Q 300 510 500 535 Q 700 560 900 515" stroke="#1c1c1c" strokeWidth="0.5" opacity="0.08"/>
          <circle cx="820" cy="80" r="180" stroke="#1c1c1c" strokeWidth="0.6" opacity="0.06" strokeDasharray="3 10"/>
          <circle cx="820" cy="80" r="130" stroke="#1c1c1c" strokeWidth="0.4" opacity="0.05"/>
          <line x1="50" y1="0" x2="50" y2="600" stroke="#1c1c1c" strokeWidth="0.4" opacity="0.05" strokeDasharray="2 12"/>
          <line x1="150" y1="0" x2="150" y2="600" stroke="#1c1c1c" strokeWidth="0.3" opacity="0.04" strokeDasharray="2 12"/>
        </svg>
      </div>

      <div className="hero__content">
        <div className="hero__left">
          <div className="hero__portrait-wrap">
            <div className="hero__portrait-sketch">
              <img
                src="/jeel_sketch.png"
                alt="Jeel Bhalu"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
              />
            </div>
            <div className="hero__portrait-label">Frontend Developer</div>
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-line"></span>
            <span className="hero__eyebrow-text">Available for Work · 2026</span>
          </div>

          <h1 className="hero__name">
            <span className="hero__name-first">Jeel</span>
            <span className="hero__name-last">Bhalu</span>
            <span className="hero__name-underline" aria-hidden="true">
              <svg viewBox="0 0 380 14" fill="none">
                <path d="M 4 8 Q 95 4 190 8 Q 285 12 376 7" stroke="#1c1c1c" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 20 11 Q 100 8 200 11 Q 300 14 360 10" stroke="#1c1c1c" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p className="hero__tagline">
            Building scalable SaaS systems, real-time dashboards,<br />
            and architecture-driven interfaces.
          </p>

          <p className="hero__sub">
            Focused on <em>React.js</em>, <em>Next.js</em>, RBAC systems,<br />
            WebSockets, and performance optimization.
          </p>

          <div className="hero__stack-row">
            {['React.js','Next.js','WebSockets','RBAC','MQTT'].map(s => (
              <span key={s} className="hero__stack-pill">{s}</span>
            ))}
          </div>

          <div className="hero__ctas">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href="mailto:bhalujeel9@gmail.com" className="btn btn--outline">Contact Me</a>
            <a href="jeel_resume.pdf" download="jeel-resume.pdf" className="btn btn--ghost">Download CV</a>
          </div>

          <div className="hero__meta">
            <span className="hero__meta-item">📍 Rajkot, Gujarat</span>
            <br />
            <span className="hero__meta-sep">·</span>
            <span className="hero__meta-item">1+ yr experience</span>
            <span className="hero__meta-sep">·</span>
            <span className="hero__meta-item">B.Voc IT</span>
          </div>
        </div>
      </div>

      {/* <div className="hero__scroll-hint">
        <span>scroll</span>
        <svg viewBox="0 0 20 40" fill="none">
          <path d="M10 4 L10 36 M4 28 L10 36 L16 28" stroke="#5c5c5c" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div> */}
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────
function About() {
  const [ref, visible] = useInView();
  const cards = [
    {
      icon: '◈',
      label: 'Architecture',
      text: 'I design frontend systems that scale cleanly under real operational complexity — multi-tenant, RBAC-driven, performance-first.'
    },
    {
      icon: '◉',
      label: 'Real-Time',
      text: 'Experience with WebSocket & MQTT-based live dashboards, streaming data, and real-time operational monitoring.'
    },
    {
      icon: '◫',
      label: 'Engineering',
      text: 'Focused on maintainability, code splitting, memoization, and turning complex workflows into intuitive interfaces.'
    }
  ];

  return (
    <section className="about" id="about" ref={ref}>
      <div className={`section-header ${visible ? 'visible' : ''}`}>
        <span className="section-number">01</span>
        <h2 className="section-title">About</h2>
        <div className="section-rule"></div>
      </div>

      <div className={`about__grid ${visible ? 'visible' : ''}`}>
        <div className="about__prose-card">
          <div className="notebook-lines" aria-hidden="true"></div>
          <p className="about__prose">
            I enjoy designing frontend systems that scale cleanly under real operational complexity.
          </p>
          <p className="about__prose">
            My experience includes multi-tenant SaaS platforms, industrial monitoring systems, RBAC architecture,
            and real-time communication systems using WebSockets and MQTT.
          </p>
          <p className="about__prose">
            I focus on performance, maintainability, structured architecture, and turning complex workflows
            into intuitive interfaces.
          </p>
          <div className="about__signature">
            <svg viewBox="0 0 160 40" fill="none">
              <path d="M 10 30 Q 30 10 50 25 Q 70 40 90 20 Q 110 5 130 22 Q 145 32 155 28" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M 10 33 Q 50 28 90 33 Q 130 38 155 31" stroke="#1c1c1c" strokeWidth="0.6" opacity="0.4" strokeLinecap="round" fill="none"/>
            </svg>
            <span>Jeel Bhalu</span>
          </div>
        </div>

        <div className="about__cards">
          {cards.map((c, i) => (
            <div key={c.label} className={`about__card about__card--${i}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="about__card-icon">{c.icon}</div>
              <div className="about__card-label">{c.label}</div>
              <p className="about__card-text">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about__stats">
        {[
          { n: '1+', l: 'Years Experience' },
          { n: '25+', l: 'APIs Integrated' },
          { n: '2', l: 'Production SaaS' },
          { n: '∞', l: 'Problems Solved' }
        ].map(s => (
          <div key={s.l} className="about__stat">
            <div className="about__stat-n">{s.n}</div>
            <div className="about__stat-l">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────
function Experience() {
  const [ref, visible] = useInView();
  const jobs = [
    {
      company: 'Wzero Infotech',
      role: 'Frontend Developer',
      period: '2026 — Present',
      location: 'Rajkot, Gujarat',
      tag: 'Current',
      projects: [
        {
          name: 'IoTrope',
          type: 'Multi-Tenant SaaS',
          points: [
            'Built scalable multi-tenant organization management systems with hierarchical RBAC architecture.',
            'Integrated 25+ REST APIs and WebSocket-based real-time monitoring systems.',
            'Migrated frontend architecture from React.js to Next.js while improving rendering performance using lazy loading, memoization, and code splitting.'
          ]
        },
        {
          name: 'S-Square',
          type: 'Solar Monitoring Platform',
          points: [
            'Developed industrial solar monitoring dashboards for live TCU/NCU tracking and configuration systems.',
            'Integrated MQTT communication workflows and built modular route-based configuration architecture with precision validation systems.'
          ]
        }
      ]
    }
  ];

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className={`section-header ${visible ? 'visible' : ''}`}>
        <span className="section-number">02</span>
        <h2 className="section-title">Experience</h2>
        <div className="section-rule"></div>
      </div>

      <div className={`experience__timeline ${visible ? 'visible' : ''}`}>
        {jobs.map((job) => (
          <div key={job.company} className="exp__entry">
            <div className="exp__line-col">
              <div className="exp__dot"></div>
              <div className="exp__line"></div>
            </div>
            <div className="exp__content">
              <div className="exp__header">
                <div className="exp__company-block">
                  <h3 className="exp__company">{job.company}</h3>
                  <span className="exp__tag">{job.tag}</span>
                </div>
                <div className="exp__meta">
                  <span className="exp__role">{job.role}</span>
                  <span className="exp__period">{job.period}</span>
                  <span className="exp__location">{job.location}</span>
                </div>
              </div>

              <div className="exp__projects">
                {job.projects.map((proj) => (
                  <div key={proj.name} className="exp__proj-card">
                    <div className="exp__proj-header">
                      <span className="exp__proj-name">{proj.name}</span>
                      <span className="exp__proj-type">{proj.type}</span>
                    </div>
                    <ul className="exp__points">
                      {proj.points.map((p, i) => (
                        <li key={i} className="exp__point">
                          <span className="exp__point-mark">—</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="exp__entry exp__entry--edu">
          <div className="exp__line-col">
            <div className="exp__dot exp__dot--open"></div>
          </div>
          <div className="exp__content">
            <div className="exp__edu-card">
              <div className="exp__edu-label">Education</div>
              <h3 className="exp__edu-title">Bachelor of Vocation — Information Technology</h3>
              <div className="exp__edu-school">RK University City Campus</div>
              <div className="exp__edu-cgpa">CGPA: 7.82</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────
function Projects() {
  const [ref, visible] = useInView();
  const projects = [
    {
      index: '01',
      name: 'IoTrope',
      tagline: 'Multi-Tenant Organization SaaS',
      desc: 'A scalable multi-tenant SaaS platform designed for organization management and real-time operational monitoring. Built dynamic RBAC systems, protected routing architecture, subscription-based access control, and real-time dashboards using WebSockets.',
      stack: ['React.js','Next.js','RBAC','WebSockets','REST APIs','Context API'],
      highlights: [
        'Hierarchical RBAC with dynamic permission resolution',
        'WebSocket real-time dashboards with live calculations',
        'Next.js migration with 40%+ render performance gain',
        'Subscription-based feature access control system',
        '25+ REST API integrations with Axios interceptors'
      ],
      arch: 'Multi-tenant · Protected Routes · Lazy Loading',
      rotate: '-1.2deg'
    },
    {
      index: '02',
      name: 'S-Square',
      tagline: 'Industrial Solar Monitoring Platform',
      desc: 'Industrial solar monitoring and control platform for live device tracking and configuration management. Developed MQTT-integrated communication systems, real-time monitoring dashboards, and modular configuration interfaces with precision validation architecture.',
      stack: ['React.js','MQTT','REST APIs','Modular CSS','Role-Based UI'],
      highlights: [
        'Live TCU/NCU device tracking dashboards',
        'MQTT communication for real-time system operations',
        'Precision numeric validation system',
        'Modular route-based configuration architecture',
        'Role-based access control for device parameters'
      ],
      arch: 'MQTT · Modular · RBAC · Validation Engine',
      rotate: '0.8deg'
    },
    {
      index: '03',
      name: 'Currency Converter',
      tagline: 'React.js · API Integration',
      desc: 'Real-time currency exchange application with external API integration, controlled state management, and dynamic UI updates.',
      stack: ['React.js','REST API','Custom Hooks','CSS3'],
      highlights: [
        'Real-time exchange rate fetching',
        'Controlled state management with hooks',
        'Dynamic UI updates on conversion'
      ],
      arch: 'Hooks · API · State Management',
      rotate: '-0.5deg'
    }
  ];

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className={`section-header ${visible ? 'visible' : ''}`}>
        <span className="section-number">03</span>
        <h2 className="section-title">Featured Projects</h2>
        <div className="section-rule"></div>
      </div>

      <div className={`projects__grid ${visible ? 'visible' : ''}`}>
        {projects.map((p, i) => (
          <article
            key={p.name}
            className={`proj__card ${i === 0 ? 'proj__card--featured' : ''}`}
            style={{ '--rotate': p.rotate }}
          >
            <div className="proj__card-inner">
              <div className="proj__top">
                <span className="proj__index">{p.index}</span>
                <span className="proj__arch-note">{p.arch}</span>
              </div>

              <div className="proj__title-block">
                <h3 className="proj__name">{p.name}</h3>
                <div className="proj__name-underline">
                  <svg viewBox="0 0 200 8" fill="none">
                    <path d="M2 5 Q50 2 100 5 Q150 8 198 4" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="proj__tagline">{p.tagline}</p>
              </div>

              <p className="proj__desc">{p.desc}</p>

              <div className="proj__highlights">
                <div className="proj__highlights-label">Key Engineering</div>
                <ul className="proj__hl-list">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="proj__hl-item">
                      <span className="proj__hl-mark">◆</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="proj__stack">
                {p.stack.map(s => (
                  <span key={s} className="proj__pill">{s}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, visible] = useInView();
  const skillGroups = [
    {
      category: 'Frontend',
      icon: '◱',
      skills: ['React.js','Next.js','AngularJS','JavaScript ES6+','HTML5','CSS3']
    },
    {
      category: 'Architecture',
      icon: '◈',
      skills: ['Multi-Tenant SaaS','RBAC Systems','Protected Routing','Authentication','Context API','Custom Hooks']
    },
    {
      category: 'Real-Time',
      icon: '◉',
      skills: ['WebSockets','MQTT','REST APIs','Axios','Fetch API','Live Dashboards']
    },
    {
      category: 'Optimization',
      icon: '◎',
      skills: ['Memoization','Lazy Loading','Code Splitting','Render Optimization','State Management']
    },
    {
      category: 'Tools',
      icon: '◫',
      skills: ['Git','GitHub','Swagger','VS Code','Python OOP']
    }
  ];

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className={`section-header ${visible ? 'visible' : ''}`}>
        <span className="section-number">04</span>
        <h2 className="section-title">Skills</h2>
        <div className="section-rule"></div>
      </div>

      <div className={`skills__grid ${visible ? 'visible' : ''}`}>
        {skillGroups.map((group, i) => (
          <div key={group.category} className="skill__group" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="skill__group-header">
              <span className="skill__group-icon">{group.icon}</span>
              <h3 className="skill__group-title">{group.category}</h3>
            </div>
            <div className="skill__pills">
              {group.skills.map(s => (
                <span key={s} className="skill__pill">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Architecture Showcase ─────────────────────────────────────────────────
// function Architecture() {
//   const [ref, visible] = useInView();
//   return (
//     <section className="arch-section" id="architecture" ref={ref}>
//       <div className={`section-header ${visible ? 'visible' : ''}`}>
//         <span className="section-number">05</span>
//         <h2 className="section-title">Architecture</h2>
//         <div className="section-rule"></div>
//       </div>

//       <div className={`arch__diagrams ${visible ? 'visible' : ''}`}>
//         {/* RBAC Diagram */}
//         <div className="arch__diagram-card arch__diagram-card--1">
//           <div className="arch__diagram-label">RBAC Hierarchy</div>
//           <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="arch__svg">
//             {/* Super Admin */}
//             <rect x="115" y="8" width="110" height="32" rx="8" stroke="#1c1c1c" strokeWidth="1.4" fill="#f5f3ee"/>
//             <text x="170" y="28" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fill="#1c1c1c">Super Admin</text>
//             {/* lines down */}
//             <line x1="170" y1="40" x2="170" y2="58" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="3 3"/>
//             <line x1="80" y1="58" x2="260" y2="58" stroke="#1c1c1c" strokeWidth="1"/>
//             <line x1="80" y1="58" x2="80" y2="72" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="3 3"/>
//             <line x1="170" y1="58" x2="170" y2="72" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="3 3"/>
//             <line x1="260" y1="58" x2="260" y2="72" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="3 3"/>
//             {/* Org Admin */}
//             <rect x="30" y="72" width="100" height="28" rx="7" stroke="#1c1c1c" strokeWidth="1.2" fill="#f5f3ee"/>
//             <text x="80" y="90" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="#1c1c1c">Org Admin</text>
//             {/* Manager */}
//             <rect x="120" y="72" width="100" height="28" rx="7" stroke="#1c1c1c" strokeWidth="1.2" fill="#f5f3ee"/>
//             <text x="170" y="90" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="#1c1c1c">Manager</text>
//             {/* Member */}
//             <rect x="210" y="72" width="100" height="28" rx="7" stroke="#1c1c1c" strokeWidth="1.2" fill="#f5f3ee"/>
//             <text x="260" y="90" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="#1c1c1c">Member</text>
//             {/* lines down */}
//             <line x1="80" y1="100" x2="80" y2="118" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="3 3"/>
//             <line x1="170" y1="100" x2="170" y2="118" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="3 3"/>
//             {/* Permission blocks */}
//             <rect x="18" y="118" width="124" height="24" rx="6" stroke="#5c5c5c" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
//             <text x="80" y="133" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8.5" fill="#5c5c5c">Full Access</text>
//             <rect x="110" y="118" width="120" height="24" rx="6" stroke="#5c5c5c" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
//             <text x="170" y="133" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8.5" fill="#5c5c5c">Write + Read</text>
//             {/* arrows */}
//             <path d="M 170 152 L 170 165 M 165 160 L 170 166 L 175 160" stroke="#5c5c5c" strokeWidth="0.8" strokeLinecap="round"/>
//             <rect x="90" y="166" width="160" height="24" rx="6" stroke="#5c5c5c" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
//             <text x="170" y="181" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8.5" fill="#5c5c5c">Protected Routes ✓</text>
//           </svg>
//         </div>

//         {/* WebSocket Flow */}
//         <div className="arch__diagram-card arch__diagram-card--2">
//           <div className="arch__diagram-label">WebSocket Flow</div>
//           <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="arch__svg">
//             <rect x="10" y="80" width="80" height="36" rx="8" stroke="#1c1c1c" strokeWidth="1.4" fill="#f5f3ee"/>
//             <text x="50" y="101" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="#1c1c1c">Browser</text>

//             <rect x="130" y="62" width="80" height="36" rx="8" stroke="#1c1c1c" strokeWidth="1.4" fill="#f5f3ee"/>
//             <text x="170" y="83" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="#1c1c1c">WS Server</text>

//             <rect x="250" y="80" width="80" height="36" rx="8" stroke="#1c1c1c" strokeWidth="1.4" fill="#f5f3ee"/>
//             <text x="290" y="101" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="#1c1c1c">IoT Device</text>

//             {/* connection line */}
//             <path d="M 90 98 Q 110 80 130 80" stroke="#1c1c1c" strokeWidth="1.2" strokeDasharray="5 3"/>
//             <path d="M 210 80 Q 230 80 250 95" stroke="#1c1c1c" strokeWidth="1.2" strokeDasharray="5 3"/>

//             {/* labels */}
//             <text x="110" y="72" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#5c5c5c">ws://connect</text>
//             <text x="230" y="72" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#5c5c5c">push events</text>

//             {/* live data box */}
//             <rect x="95" y="135" width="150" height="50" rx="8" stroke="#1c1c1c" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
//             <text x="170" y="155" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8" fill="#1c1c1c">Live Dashboard</text>
//             <text x="170" y="170" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#5c5c5c">{'{ real-time: true }'}</text>

//             <line x1="170" y1="98" x2="170" y2="135" stroke="#1c1c1c" strokeWidth="0.8" strokeDasharray="3 3"/>

//             {/* pulse dots */}
//             <circle cx="50" cy="130" r="3" fill="#1c1c1c" opacity="0.3"/>
//             <circle cx="50" cy="142" r="3" fill="#1c1c1c" opacity="0.5"/>
//             <circle cx="50" cy="154" r="3" fill="#1c1c1c" opacity="0.7"/>
//             <text x="70" y="133" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#5c5c5c">reconnect</text>
//             <text x="70" y="145" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#5c5c5c">heartbeat</text>
//             <text x="70" y="157" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#5c5c5c">event stream</text>
//           </svg>
//         </div>

//         {/* Multi-Tenant Structure */}
//         <div className="arch__diagram-card arch__diagram-card--3">
//           <div className="arch__diagram-label">Multi-Tenant Architecture</div>
//           <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="arch__svg">
//             <rect x="100" y="8" width="140" height="30" rx="7" stroke="#1c1c1c" strokeWidth="1.4" fill="#f5f3ee"/>
//             <text x="170" y="27" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="#1c1c1c">SaaS Platform</text>

//             <line x1="170" y1="38" x2="170" y2="56" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="3 3"/>
//             <line x1="60" y1="56" x2="280" y2="56" stroke="#1c1c1c" strokeWidth="1"/>
//             {[60,170,280].map(x => (
//               <line key={x} x1={x} y1="56" x2={x} y2="72" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="3 3"/>
//             ))}

//             {['Tenant A','Tenant B','Tenant C'].map((t,i) => {
//               const x = [10,120,230][i];
//               return (
//                 <g key={t}>
//                   <rect x={x} y="72" width="100" height="28" rx="6" stroke="#1c1c1c" strokeWidth="1.2" fill="#f5f3ee"/>
//                   <text x={x+50} y="89" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="#1c1c1c">{t}</text>
//                   <line x1={x+50} y1="100" x2={x+50} y2="115" stroke="#5c5c5c" strokeWidth="0.8" strokeDasharray="3 3"/>
//                   <rect x={x+10} y="115" width="80" height="22" rx="5" stroke="#5c5c5c" strokeWidth="0.8" fill="none" strokeDasharray="4 3"/>
//                   <text x={x+50} y="129" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="7.5" fill="#5c5c5c">isolated data</text>
//                 </g>
//               );
//             })}

//             <rect x="50" y="155" width="240" height="28" rx="7" stroke="#1c1c1c" strokeWidth="1" fill="none" strokeDasharray="5 3"/>
//             <text x="170" y="173" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8.5" fill="#5c5c5c">Shared Infrastructure · RBAC Layer</text>
//           </svg>
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Contact ───────────────────────────────────────────────────────────────
function Contact() {
  const [ref, visible] = useInView();
  return (
    <section className="contact" id="contact" ref={ref}>
      <div className={`contact__inner ${visible ? 'visible' : ''}`}>
        <div className="contact__header">
          <span className="section-number">05</span>
          <div className="contact__heading-wrap">
            <h2 className="contact__heading">Let's build systems that are</h2>
            <h2 className="contact__heading contact__heading--em">
              <em>clean, scalable,</em>
            </h2>
            <h2 className="contact__heading">and meaningful.</h2>
          </div>
        </div>

        <div className="contact__links">
          <a href="https://github.com/jeel-patel90" target="_blank" rel="noreferrer" className="contact__link-card">
            <div className="contact__link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>
            <span className="contact__link-label">GitHub</span>
            <span className="contact__link-arrow">→</span>
          </a>

          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="contact__link-card">
            <div className="contact__link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </div>
            <span className="contact__link-label">LinkedIn</span>
            <span className="contact__link-arrow">→</span>
          </a>

          <a href="mailto:bhalujeel9@gmail.com" className="contact__link-card">
            <div className="contact__link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <span className="contact__link-label">bhalujeel9@gmail.com</span>
            <span className="contact__link-arrow">→</span>
          </a>

          <a href="tel:+919016161086" className="contact__link-card">
            <div className="contact__link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.87-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <span className="contact__link-label">+91-90161 61086</span>
            <span className="contact__link-arrow">→</span>
          </a>
        </div>

        <div className="contact__cta-row">
          <a href="jeel_resume.pdf" download="jeel-resume.pdf" className="btn btn--primary btn--lg">Download Resume</a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__rule"></div>
      <div className="footer__inner">
        <div className="footer__left">
          <span className="footer__logo">Jeel Bhalu</span>
          <span className="footer__tagline">Frontend Developer · Rajkot, India</span>
        </div>
        <div className="footer__right">
          <span className="footer__copy">© 2026 · Crafted with precision</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <div className="paper-texture" aria-hidden="true"></div>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        {/* <Architecture /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

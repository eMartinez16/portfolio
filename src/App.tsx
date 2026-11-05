import { useEffect, useMemo, useState } from 'react'
import { education, experience, profile, projects, skills, type Tag } from './data'
import { ChatDemo } from './ChatDemo'

type Theme = 'light' | 'dark'
const ALL = 'Todos'
const tags: (Tag | typeof ALL)[] = [ALL, 'IA', 'Automatización', 'n8n', 'Web', 'IoT', 'Juegos', 'Python']

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) || 'dark',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [filter, setFilter] = useState<Tag | typeof ALL>(ALL)
  const [open, setOpen] = useState<string | null>('bot-pedidos')
  const [menuOpen, setMenuOpen] = useState(false)
  useReveal()

  const visible = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  )

  const nav = [
    ['#sobre-mi', 'Sobre mí'],
    ['#proyectos', 'Proyectos personales'],
    ['#experiencia', 'Experiencia'],
    ['#contacto', 'Contacto'],
  ]

  return (
    <>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#inicio" className="brand" aria-label="Inicio">
            <span className="logo">EM</span>
            <span className="brand-name">Emiliano Martínez</span>
          </a>
          <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Principal">
            {nav.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              title="Cambiar tema"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="inicio" className="hero container">
          <div className="hero-text">
            <p className="eyebrow">📍 {profile.location}</p>
            <h1>
              Hola, soy Emiliano.
              <br />
              <span className="grad">{profile.title}</span>
            </h1>
            <p className="lead">
              Desarrollo aplicaciones web y backend desde 2021. Hoy me enfoco en{' '}
              <strong>automatización e IA aplicada</strong>: bots que atienden clientes por WhatsApp,
              flujos con n8n y asistentes que responden con datos reales del negocio.
            </p>
            <div className="hero-cta">
              <a className="btn primary" href="#proyectos">
                Ver proyectos
              </a>
              <a className="btn" href="#contacto">
                Contactame
              </a>
            </div>
          </div>
          <ChatDemo />
        </section>

        <section id="sobre-mi" className="container section reveal">
          <h2>Sobre mí</h2>
          <div className="about">
            <div>
              <p>
                Soy desarrollador full stack con experiencia en empresas de software desde 2021: empecé
                como backend junior y hoy trabajo en todo el stack, con <strong>PHP</strong> (Laravel,
                CakePHP), <strong>Node.js</strong> (NestJS), <strong>Angular</strong> (y también Vue y
                React), APIs REST, monorepos y bases de datos relacionales, usando <strong>Docker</strong> y CI/CD en el día a día.
              </p>
              <p>
                En paralelo me estoy especializando en <strong>IA aplicada</strong>: armo bots y
                automatizaciones con n8n y modelos de lenguaje, y trabajo con agentes de IA en mis
                propios proyectos. En el desarrollo uso Claude y Grok como herramientas de apoyo. Estoy preparando la certificación{' '}
                <strong>AWS Certified Developer – Associate</strong>.
              </p>
              <p>
                Me interesa especialmente ayudar a comercios a automatizar la atención y la toma de
                pedidos.
              </p>
            </div>
            <ul className="facts">
              <li>
                <span>💼</span> Desarrollador desde 2021
              </li>
              <li>
                <span>🎓</span> Técnico Universitario en Programación (UTN)
              </li>
              <li>
                <span>🤖</span> Foco en IA y automatización
              </li>
              <li>
                <span>🗣️</span> Español nativo · Inglés intermedio
              </li>
            </ul>
          </div>
        </section>

        <section id="proyectos" className="container section reveal">
          <h2>Proyectos personales</h2>
          <div className="filters" role="group" aria-label="Filtrar proyectos">
            {tags.map((t) => (
              <button
                key={t}
                className={filter === t ? 'chip active' : 'chip'}
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid">
            {visible.map((p) => {
              const isOpen = open === p.id
              return (
                <article key={p.id} className={isOpen ? 'card open' : 'card'}>
                  <div className="card-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="stack">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="details" id={`det-${p.id}`} hidden={!isOpen}>
                    <ul>
                      {p.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    {p.note && <p className="note">{p.note}</p>}
                    {p.repo && (
                      <a className="repo-link" href={p.repo} target="_blank" rel="noopener noreferrer">
                        Ver código en GitHub ↗
                      </a>
                    )}
                  </div>
                  <div className="card-actions">
                    <button
                      className="link-btn"
                      aria-expanded={isOpen}
                      aria-controls={`det-${p.id}`}
                      onClick={() => setOpen(isOpen ? null : p.id)}
                    >
                      {isOpen ? 'Ver menos ↑' : 'Ver detalles ↓'}
                    </button>
                    {p.cta && (
                      <a className="btn primary small" href={p.cta.href}>
                        {p.cta.label}
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="experiencia" className="container section reveal">
          <h2>Experiencia</h2>
          <ol className="timeline">
            {experience.map((j) => (
              <li key={j.company}>
                <div className="tl-head">
                  <h3>
                    {j.role} · <span className="muted">{j.company}</span>
                  </h3>
                  <span className="period">{j.period}</span>
                </div>
                <p>{j.description}</p>
                {j.highlights && (
                  <ul className="tl-points">
                    {j.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                <div className="stack">
                  {j.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="two-col">
            <div>
              <h3 className="sub">Habilidades</h3>
              <div className="skills">
                {skills.map((g) => (
                  <div key={g.group} className="skill-group">
                    <span className="skill-title">{g.group}</span>
                    <div className="stack">
                      {g.items.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="sub">Formación</h3>
              <ul className="edu">
                {education.map((e) => (
                  <li key={e.title}>
                    <strong>{e.title}</strong>
                    <span className="muted">
                      {e.place} · {e.year}
                    </span>
                  </li>
                ))}
                <li>
                  <strong>AWS Certified Developer – Associate</strong>
                  <span className="muted">En preparación</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contacto" className="container section reveal">
          <div className="contact">
            <h2>¿Querés automatizar la atención de tu negocio?</h2>
            <p>
              Si tenés un local gastronómico y querés tomar pedidos por WhatsApp sin estar pendiente del
              celular, o necesitás un desarrollo web o una automatización, escribime.
            </p>
            <div className="hero-cta center">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                ✉️ {profile.email}
              </a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="btn" href={profile.workana} target="_blank" rel="noopener noreferrer">
                Workana
              </a>
              <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={profile.workana} target="_blank" rel="noopener noreferrer">Workana</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          © {new Date().getFullYear()} {profile.fullName} · {profile.location}
        </div>
      </footer>
    </>
  )
}

import { certifications, projects } from '../data'
import Reveal from './Reveal'

export default function Projects() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-10vw))] py-[72px]" id="projects">
      <Reveal>
        <p className="mb-[8px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">03 — Selected work</p>
        <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[var(--text)]">Projects</h2>
      </Reveal>

      <div className="mt-[28px] grid gap-[18px]">
        <div className="grid gap-[18px]">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 100} direction={index % 2 === 0 ? 'right' : 'left'}>
              <article className="grid overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1 md:h-[260px] md:grid-cols-[280px_1fr]">
                <div className={`relative h-[210px] min-h-0 overflow-hidden md:h-auto md:min-h-[210px] ${project.tone === 'solar' ? 'bg-[var(--solar)]' : project.tone === 'book' ? 'bg-[var(--book)]' : 'bg-[var(--ai)]'}`}>
                  {project.image ? (
                    <img className="h-full min-h-0 w-full object-cover object-top" src={project.image} alt={`${project.title} screenshot`} />
                  ) : null}
                  <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/30 px-[10px] py-[6px] text-[0.82rem] text-white">{project.year}</span>
                </div>
                <div className="p-7">
                  <h3 className="mb-[14px] text-[1.2rem] font-bold text-[var(--text)]">{project.title}</h3>
                  <p className="mb-[16px] text-[var(--muted)] leading-[1.65]">{project.blurb}</p>
                  <ul className="flex flex-wrap gap-2 p-0">
                    {project.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-[11px] py-[7px] text-[0.88rem] text-[var(--text)]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-[16px] flex items-center gap-[14px]">
                    {project.live ? (
                      <a className="font-bold text-[var(--accent)]" href={project.live} target="_blank" rel="noreferrer">
                        Live
                      </a>
                    ) : (
                      <span className="text-[var(--muted)]">Live soon</span>
                    )}
                    {project.github ? (
                      <a className="font-bold text-[var(--accent)]" href={project.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    ) : (
                      <span className="text-[var(--muted)]">GitHub soon</span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-[8px]">
          <Reveal direction="left">
            <div className="mb-[16px]">
              <p className="mb-[8px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">04 — Credentials</p>
              <h3 className="text-[clamp(1.8rem,3vw,2.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[var(--text)]">Certifications</h3>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <Reveal key={cert.name} delay={index * 110} direction={index % 2 === 0 ? 'right' : 'down'}>
                <article className="h-full rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1 hover:border-[color:color-mix(in_srgb,var(--accent)_45%,var(--line))]">
                  <div className="mb-[10px] inline-flex rounded-full border border-[color:color-mix(in_srgb,var(--accent)_40%,var(--line))] bg-[color:color-mix(in_srgb,var(--accent)_10%,transparent)] px-[10px] py-[6px] text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                    Certified
                  </div>
                  <h4 className="mb-[10px] text-[1.05rem] font-bold text-[var(--text)]">{cert.name}</h4>
                  <p className="text-[var(--muted)]">{cert.org}</p>
                  <p className="mt-2 text-[0.84rem] font-medium uppercase tracking-[0.08em] text-[var(--accent)]">{cert.year}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

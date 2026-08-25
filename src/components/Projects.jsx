import { projects } from '../data'
import Reveal from './Reveal'

export default function Projects() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-10vw))] py-[72px]" id="projects">
      <Reveal>
        <p className="mb-[8px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">03 — Selected work</p>
        <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[var(--text)]">Projects</h2>
      </Reveal>

      <div className="mt-[28px] grid gap-[18px]">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 90}>
            <article className="grid overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1 md:h-[260px] md:grid-cols-[280px_1fr]">
              <div className={`relative min-h-[210px] overflow-hidden ${project.tone === 'solar' ? 'bg-[var(--solar)]' : project.tone === 'book' ? 'bg-[var(--book)]' : 'bg-[var(--ai)]'}`}>
                {project.image ? (
                  <img className="h-full min-h-[210px] w-full object-cover object-top" src={project.image} alt={`${project.title} screenshot`} />
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
    </section>
  )
}

import { certifications, skills } from '../data'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-10vw))] py-[72px]" id="skills">
      <Reveal>
        <p className="mb-[8px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">01 — Capabilities</p>
        <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[var(--text)]">Skills</h2>
      </Reveal>

      <div className="mt-[28px] grid gap-4 md:grid-cols-3">
        {skills.map((group, index) => (
          <Reveal key={group.title} delay={index * 90}>
            <article className="h-full rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1.5 hover:border-[color:color-mix(in_srgb,var(--accent)_45%,var(--line))]">
              <h3 className="mb-[14px] text-[1.2rem] font-bold text-[var(--text)]">{group.title}</h3>
              <ul className="flex flex-wrap gap-2 p-0">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-[11px] py-[7px] text-[0.88rem] text-[var(--text)] transition-transform duration-200 hover:-translate-y-0.5">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-[18px] flex flex-wrap gap-3">
          {certifications.map((cert) => (
            <p key={cert.name} className="flex min-w-[180px] flex-col gap-1 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-[var(--text)] shadow-[var(--card-shadow)]">
              <strong className="font-bold">{cert.name}</strong>
              <span className="text-[0.88rem] text-[var(--muted)]">
                {cert.org}, {cert.year}
              </span>
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

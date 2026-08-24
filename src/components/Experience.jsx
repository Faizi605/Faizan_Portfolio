import { education, experience } from '../data'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-10vw))] py-[72px]" id="experience">
      <Reveal>
        <p className="mb-[8px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">02 — Career</p>
        <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[var(--text)]">Experience</h2>
      </Reveal>

      <div className="mt-[28px] grid gap-4">
        {experience.map((job, index) => (
          <Reveal key={job.company} delay={index * 80}>
            <article className="grid gap-4 md:grid-cols-[18px_1fr]">
              <div className="mt-[28px] h-[14px] w-[14px] rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_var(--glow)]" />
              <div className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1.5 hover:border-[color:color-mix(in_srgb,var(--accent)_45%,var(--line))]">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <h3 className="mb-[4px] text-[1.2rem] font-bold text-[var(--text)]">{job.role}</h3>
                    <p className="text-[var(--muted)]">{job.company}</p>
                  </div>
                  <p className="text-[var(--muted)]">
                    {job.period}
                    {job.current ? <span className="ml-2 inline-flex rounded-full bg-[var(--accent)] px-2 py-1 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[var(--accent-ink)]">Now</span> : null}
                  </p>
                </div>
                <ul className="mt-[14px] list-disc space-y-[6px] pl-5 text-[var(--muted)] leading-[1.65]">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-[18px] grid gap-4 md:grid-cols-3">
        {education.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <article className="h-full rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1.5 hover:border-[color:color-mix(in_srgb,var(--accent)_45%,var(--line))]">
              <p className="mb-[6px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Education</p>
              <h3 className="mb-[14px] text-[1.2rem] font-bold text-[var(--text)]">{item.title}</h3>
              <p className="text-[var(--muted)]">{item.school}</p>
              <p className="mt-2 text-[var(--muted)]">
                {item.period}
                {item.meta ? ` · ${item.meta}` : ''}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

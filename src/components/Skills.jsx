import { skills } from '../data'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section className="mx-auto w-[min(1120px,calc(100%-10vw))] py-[72px]" id="skills">
      <Reveal>
        <p className="mb-[8px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">01 — Capabilities</p>
        <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[var(--text)]">Skills</h2>
      </Reveal>

      <div className="mt-[28px] grid gap-5 md:grid-cols-3">
        {skills.map((group, index) => (
          <Reveal key={group.title} delay={index * 120} direction={index % 2 === 0 ? 'right' : 'down'}>
            <article className="group relative h-full overflow-hidden rounded-[26px] border border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_92%,transparent),var(--surface))] p-6 shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[color:color-mix(in_srgb,var(--accent)_45%,var(--line))]">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--accent),transparent)] opacity-90" />
              <h3 className="mb-[18px] text-[1.2rem] font-bold text-[var(--text)]">{group.title}</h3>
              <ul className="flex flex-wrap gap-2.5 p-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-[12px] py-[7px] text-[0.82rem] font-medium tracking-[0.02em] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--accent)_55%,var(--line))]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

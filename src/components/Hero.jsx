import { useEffect, useState } from 'react'
import { profile } from '../data'
import fallbackHero from '../assets/hero.png'

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % profile.roles.length)
    }, 2500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="relative mx-auto grid w-[min(1120px,calc(100%-10vw))] items-center gap-8 py-[54px] md:min-h-[calc(100vh-70px)] md:grid-cols-[1.1fr_0.9fr] md:gap-6 md:py-[32px]" id="top">
      <div className="pointer-events-none absolute -top-10 right-[-8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)]" aria-hidden="true" />
      <div className="relative z-10">
        <p className="mb-[14px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] opacity-0 animate-[fade-up_0.85s_ease_forwards] [animation-delay:0.05s]">Hello, I&apos;m</p>
        <h1 className="max-w-[14ch] text-[clamp(3.4rem,8vw,6.4rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[var(--text)] opacity-0 animate-[fade-up_0.85s_ease_forwards] [animation-delay:0.12s]">{profile.name}</h1>
        <p className="mt-[22px] min-h-[1.25em] text-[clamp(1.45rem,3vw,2.15rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-[var(--text)] opacity-0 animate-[fade-up_0.85s_ease_forwards] [animation-delay:0.22s]">
          I&apos;m a{' '}
          <span className="relative inline-block h-[1.25em] overflow-hidden align-bottom text-[var(--accent)]" aria-live="polite">
            <span
              className="block transition-transform duration-900 ease-[cubic-bezier(0.34,1.65,0.64,1)]"
              style={{ transform: `translateY(-${index * 1.25}em)` }}
            >
              {profile.roles.map((role) => (
                <span key={role} className="block h-[1.25em] leading-[1.25em] font-bold">
                  {role}
                </span>
              ))}
            </span>
          </span>
        </p>
        <p className="mt-[18px] max-w-[62ch] text-[1.02rem] leading-[1.6] text-[var(--muted)] opacity-0 animate-[fade-up_0.85s_ease_forwards] [animation-delay:0.32s]">{profile.summary}</p>
        <div className="mt-[28px] flex flex-wrap gap-3 opacity-0 animate-[fade-up_0.85s_ease_forwards] [animation-delay:0.42s]">
          <a
            className="inline-flex min-h-[48px] items-center justify-center rounded-full px-5 font-semibold text-[var(--accent-ink)] shadow-[0_12px_32px_var(--glow)] transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--accent)', position: 'relative', overflow: 'hidden' }}
            href={profile.cvFile}
            download="Faizan_Resume.pdf"
          >
            Download CV
          </a>
          <a
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 font-semibold text-[var(--text)] shadow-[0_8px_24px_var(--shadow-color)] transition-transform duration-200 hover:-translate-y-0.5"
            href="#projects"
          >
            View work
          </a>
        </div>
        <p className="mt-[18px] text-[0.9rem] text-[var(--muted)] opacity-0 animate-[fade-up_0.85s_ease_forwards] [animation-delay:0.52s]">{profile.location} · Available for work</p>
      </div>

      <div className="relative mx-auto w-full max-w-[440px] opacity-0 animate-[fade-up_0.85s_ease_forwards] [animation-delay:0.2s]">
        <div className="absolute inset-6 rounded-[32px] bg-[var(--accent)] opacity-20 blur-3xl" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[28px] border border-[color:color-mix(in_srgb,var(--accent)_35%,var(--line))] bg-[var(--surface)] p-2 shadow-[0_24px_70px_var(--portrait-shadow)]">
          <img
            className="aspect-[4/5] w-full rounded-[22px] object-cover object-top"
            src={fallbackHero}
            alt="Faizan Yousaf portfolio graphic"
          />
        </div>
      </div>
    </section>
  )
}

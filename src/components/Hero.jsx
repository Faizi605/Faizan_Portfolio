import { useEffect, useState } from 'react'
import { profile } from '../data'

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
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <p className="eyebrow hero-fade">Hello, I&apos;m</p>
      <h1 className="hero-fade">{profile.name}</h1>
      <p className="hero-role hero-fade">
        I&apos;m a{' '}
        <span className="role-window" aria-live="polite">
          <span
            className="role-track"
            style={{ transform: `translateY(-${index * 1.25}em)` }}
          >
            {profile.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </span>
        </span>
      </p>
      <p className="hero-copy hero-fade">{profile.summary}</p>
      <div className="hero-actions hero-fade">
        <a className="btn btn-primary" href={profile.cvFile} download="Faizan_Resume.pdf">
          Download CV
        </a>
        <a className="btn btn-ghost" href="#projects">
          View work
        </a>
      </div>
      <p className="hero-meta hero-fade">{profile.location} · Available for work</p>
    </section>
  )
}

import { useState } from 'react'
import { messagesEnabled, profile } from '../data'
import Reveal from './Reveal'

const links = [
  {
    label: 'LinkedIn',
    href: profile.linkedinUrl,
    text: 'Faizan Yousaf',
  },
  {
    label: 'GitHub',
    href: profile.githubUrl,
    text: `@${profile.githubUsername}`,
  },
  {
    label: 'Gmail',
    href: `mailto:${profile.email}`,
    text: profile.email,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${profile.whatsapp}`,
    text: profile.phone,
  },
]

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendWhatsApp = (event) => {
    event.preventDefault()
    if (!messagesEnabled) return

    const text = `Hello Faizan, I am ${name}.\nEmail: ${email}\n\n${message}`
    window.open(
      `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-10vw))] py-[72px]" id="contact">
      <Reveal>
        <p className="mb-[8px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">05 — Contact</p>
        <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[var(--text)]">Get in touch</h2>
      </Reveal>

      <div className="mt-[28px] grid gap-[18px] md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="grid gap-3">
            {links.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex flex-col gap-1 rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-[18px_20px] shadow-[var(--card-shadow)] transition-transform duration-300 hover:-translate-y-1 hover:border-[color:color-mix(in_srgb,var(--accent)_45%,var(--line))]">
                <span className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">{link.label}</span>
                <strong className="text-[var(--text)]">{link.text}</strong>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          {messagesEnabled ? (
            <form className="grid gap-[14px] rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--card-shadow)]" onSubmit={sendWhatsApp}>
              <label className="grid gap-2 font-semibold text-[var(--text)]">
                Name
                <input
                  className="w-full rounded-[14px] border border-[var(--line)] bg-[var(--bg-soft)] p-[12px_14px] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 font-semibold text-[var(--text)]">
                Email
                <input
                  className="w-full rounded-[14px] border border-[var(--line)] bg-[var(--bg-soft)] p-[12px_14px] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                />
              </label>
              <label className="grid gap-2 font-semibold text-[var(--text)]">
                Message
                <textarea
                  className="w-full resize-y rounded-[14px] border border-[var(--line)] bg-[var(--bg-soft)] p-[12px_14px] text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                  rows="5"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write a message..."
                />
              </label>
              <button className="inline-flex min-h-[48px] w-fit items-center justify-center rounded-full border-0 bg-[var(--accent)] px-5 font-semibold text-[var(--accent-ink)] shadow-[0_10px_30px_var(--glow)] transition-transform duration-200 hover:-translate-y-0.5" type="submit">
                Send on WhatsApp
              </button>
            </form>
          ) : (
            <div className="grid min-h-[220px] place-items-center rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-6 text-center text-[var(--muted)] shadow-[var(--card-shadow)]">
              <p>Messaging is currently turned off.</p>
              <p>Use LinkedIn, GitHub, Gmail, or WhatsApp instead.</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

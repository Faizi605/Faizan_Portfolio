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
    <section className="section" id="contact">
      <Reveal>
        <p className="eyebrow">05 — Contact</p>
        <h2>Get in touch</h2>
      </Reveal>

      <div className="contact-grid">
        <Reveal>
          <div className="contact-links">
            {links.map((link) => (
              <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <span>{link.label}</span>
                <strong>{link.text}</strong>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          {messagesEnabled ? (
            <form className="contact-form" onSubmit={sendWhatsApp}>
              <label>
                Name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                />
              </label>
              <label>
                Message
                <textarea
                  required
                  rows="5"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write a message..."
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Send on WhatsApp
              </button>
            </form>
          ) : (
            <div className="contact-form is-disabled">
              <p>Messaging is currently turned off.</p>
              <p>Use LinkedIn, GitHub, Gmail, or WhatsApp instead.</p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

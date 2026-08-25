import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contributions', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between gap-[18px] px-[6vw] py-3 transition-all duration-300 ${
        scrolled ? 'border-b border-[var(--line)] shadow-[0_10px_30px_rgba(0,0,0,0.14)]' : 'border-b border-transparent'
      }`}
      style={{
        background: 'color-mix(in srgb, var(--bg) 72%, transparent)',
        backdropFilter: 'blur(20px) saturate(1.2)',
      }}
    >
      <a className="flex shrink-0 items-center no-underline" href="#top">
        <img
          className={`h-[72px] w-auto shadow-[0_6px_18px_var(--glow)] md:h-[96px] ${
            theme === 'dark'
              ? 'mix-blend-screen brightness-110 invert hue-rotate-180 saturate-150'
              : 'mix-blend-multiply'
          }`}
          src="/assets/logo.png"
          alt="Faizan Yousaf"
        />
      </a>

      <button
        className="grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] md:hidden"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mb-[5px] block h-[1.5px] w-4 bg-current" />
        <span className="block h-[1.5px] w-4 bg-current" />
      </button>

      <nav
        id="mobile-navigation"
        className={`absolute right-[7vw] left-[7vw] top-full ${open ? 'flex' : 'hidden'} flex-col items-stretch gap-2 rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-4 md:static md:left-auto md:right-auto md:top-auto md:flex md:flex-row md:items-center md:rounded-full md:border md:bg-[color:color-mix(in_srgb,var(--surface)_80%,transparent)] md:p-2`}
        style={{ display: open ? 'flex' : undefined }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="rounded-full px-[14px] py-[8px] text-[0.92rem] font-semibold text-[var(--muted)] transition-colors duration-200 hover:bg-[color:color-mix(in_srgb,var(--logo-gold)_18%,transparent)] hover:text-[var(--text)]"
          >
            {link.label}
          </a>
        ))}
        <button
          className="ml-1 grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition-transform duration-300 hover:rotate-[18deg] hover:scale-105"
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.8]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  )
}

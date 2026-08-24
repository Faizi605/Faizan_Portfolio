import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="mx-auto mt-2 flex w-[min(1120px,calc(100%-10vw))] flex-wrap justify-center gap-4 border-t border-[var(--line)] py-[28px] pb-[64px]">
      <p className="text-[var(--muted)]">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  )
}

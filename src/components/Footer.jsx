import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copy">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  )
}

import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contributions from './components/Contributions'
import Contact from './components/Contact'
import Footer from './components/Footer'
import OnekoCat from './components/OnekoCat'

function App() {
  return (
    <ThemeProvider>
      <div className="relative overflow-x-clip">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(var(--line)_0.8px,transparent_0.8px)] bg-[length:22px_22px] opacity-35"
        />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <Experience />
            <Projects />
            <Contributions />
            <Contact />
          </main>
          <Footer />
          <OnekoCat />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

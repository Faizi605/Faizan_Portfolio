import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contributions from './components/Contributions'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorPanda from './components/CursorPanda'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <div className="page">
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
        <CursorPanda />
      </div>
    </ThemeProvider>
  )
}

export default App

import { certifications, skills } from '../data'
import Reveal from './Reveal'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <Reveal>
        <p className="eyebrow">01 — Capabilities</p>
        <h2>Skills</h2>
      </Reveal>

      <div className="skill-grid">
        {skills.map((group, index) => (
          <Reveal key={group.title} delay={index * 90}>
            <article className="skill-card">
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="certs">
          {certifications.map((cert) => (
            <p key={cert.name}>
              <strong>{cert.name}</strong>
              <span>
                {cert.org}, {cert.year}
              </span>
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

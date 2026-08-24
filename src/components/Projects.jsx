import { projects } from '../data'
import Reveal from './Reveal'

export default function Projects() {
  return (
    <section className="section" id="projects">
      <Reveal>
        <p className="eyebrow">03 — Selected work</p>
        <h2>Projects</h2>
      </Reveal>

      <div className="project-list">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 90}>
            <article className={`project-card tone-${project.tone}`}>
              <div className={`project-visual ${project.image ? 'has-image' : ''}`}>
                {project.image ? (
                  <img src={project.image} alt={`${project.title} screenshot`} />
                ) : null}
                <span className="project-year">{project.year}</span>
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.blurb}</p>
                <ul className="tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  ) : (
                    <span>Live soon</span>
                  )}
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  ) : (
                    <span>GitHub soon</span>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

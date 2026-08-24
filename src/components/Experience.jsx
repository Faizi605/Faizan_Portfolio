import { education, experience } from '../data'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <section className="section" id="experience">
      <Reveal>
        <p className="eyebrow">02 — Career</p>
        <h2>Experience</h2>
      </Reveal>

      <div className="timeline">
        {experience.map((job, index) => (
          <Reveal key={job.company} delay={index * 80}>
            <article className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="company">{job.company}</p>
                  </div>
                  <p className="period">
                    {job.period}
                    {job.current ? <span className="pill">Now</span> : null}
                  </p>
                </div>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="edu-grid">
        {education.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <article className="edu-card">
              <p className="eyebrow">Education</p>
              <h3>{item.title}</h3>
              <p>{item.school}</p>
              <p className="period">
                {item.period}
                {item.meta ? ` · ${item.meta}` : ''}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

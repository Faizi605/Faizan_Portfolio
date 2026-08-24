import { GitHubCalendar } from 'react-github-calendar'
import { profile } from '../data'
import { useTheme } from '../context/ThemeContext'
import Reveal from './Reveal'

export default function Contributions() {
  const { theme } = useTheme()
  const username = profile.githubUsername.trim()

  return (
    <section className="section" id="contributions">
      <Reveal>
        <div className="contrib-heading">
          <div>
            <p className="eyebrow">04 — GitHub</p>
            <h2>Activity</h2>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="contrib-card">
          {username ? (
            <div className="contrib-calendar">
              <GitHubCalendar
                username={username}
                colorScheme={theme}
                blockSize={12}
                blockMargin={4}
                fontSize={14}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
              />
              <a className="contrib-profile" href={profile.githubUrl} target="_blank" rel="noreferrer">
                github.com/{username}
              </a>
            </div>
          ) : (
            <div className="contrib-empty">
              <div className="contrib-skeleton" aria-hidden="true">
                {Array.from({ length: 53 }).map((_, week) => (
                  <div key={week}>
                    {Array.from({ length: 7 }).map((__, day) => (
                      <span key={day} />
                    ))}
                  </div>
                ))}
              </div>
              <p className="contrib-note">
                Add your GitHub username in <code>src/data.js</code> to load this contribution graph.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}

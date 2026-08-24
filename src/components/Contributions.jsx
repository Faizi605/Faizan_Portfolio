import { GitHubCalendar } from 'react-github-calendar'
import { profile } from '../data'
import { useTheme } from '../context/ThemeContext'
import Reveal from './Reveal'

export default function Contributions() {
  const { theme } = useTheme()
  const username = profile.githubUsername.trim()

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-10vw))] py-[72px]" id="contributions">
      <Reveal>
        <div className="mb-[8px] flex items-end justify-between gap-4">
          <div>
            <p className="mb-[8px] text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">04 — GitHub</p>
            <h2 className="text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[var(--text)]">Activity</h2>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--card-shadow)]">
          {username ? (
            <div className="flex w-full flex-col items-center gap-3 overflow-x-auto">
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
              <a className="font-semibold text-[var(--accent)]" href={profile.githubUrl} target="_blank" rel="noreferrer">
                github.com/{username}
              </a>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex justify-center gap-1 overflow-x-auto rounded-xl p-3 shadow-[var(--card-shadow)]" aria-hidden="true">
                {Array.from({ length: 53 }).map((_, week) => (
                  <div key={week}>
                    {Array.from({ length: 7 }).map((__, day) => (
                      <span key={day} className="mb-1 block h-3 w-3 rounded-[2px] bg-[var(--cell-0)] animate-pulse" />
                    ))}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-center text-[var(--muted)]">
                Add your GitHub username in <code>src/data.js</code> to load this contribution graph.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, className = '', delay = 0, direction = 'down' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const directionClass = {
    down: 'reveal-down',
    up: 'reveal-up',
    left: 'reveal-left',
    right: 'reveal-right',
  }[direction] ?? 'reveal-down'

  return (
    <div
      ref={ref}
      className={`reveal ${directionClass} ${visible ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, willChange: 'transform, opacity, filter' }}
    >
      {children}
    </div>
  )
}

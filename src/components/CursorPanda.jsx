import { useEffect } from 'react'

const SPRITE = 32
const SPEED = 4.2

const CAT_SVG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <path d="M9 10 L12 2 L15 10 Z" fill="#f7d9a6" stroke="#3a2d2d" stroke-width="1"/>
  <path d="M23 10 L20 2 L17 10 Z" fill="#f7d9a6" stroke="#3a2d2d" stroke-width="1"/>
  <ellipse cx="16" cy="18" rx="11" ry="9" fill="#f7d9a6" stroke="#3a2d2d" stroke-width="1"/>
  <ellipse cx="11" cy="17" rx="1.5" ry="2.2" fill="#3a2d2d"/>
  <ellipse cx="21" cy="17" rx="1.5" ry="2.2" fill="#3a2d2d"/>
  <path d="M15 18 L16 20 L17 18" fill="none" stroke="#3a2d2d" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 20 Q14 24 13 21" fill="none" stroke="#3a2d2d" stroke-width="1" stroke-linecap="round"/>
  <path d="M24 20 Q18 24 19 21" fill="none" stroke="#3a2d2d" stroke-width="1" stroke-linecap="round"/>
  <path d="M7 15 Q4 16 4 18" fill="none" stroke="#3a2d2d" stroke-width="1" stroke-linecap="round"/>
  <path d="M25 15 Q28 16 28 18" fill="none" stroke="#3a2d2d" stroke-width="1" stroke-linecap="round"/>
  <path d="M7 22 Q12 27 15 24" fill="none" stroke="#3a2d2d" stroke-width="1" stroke-linecap="round"/>
  <path d="M25 22 Q20 27 17 24" fill="none" stroke="#3a2d2d" stroke-width="1" stroke-linecap="round"/>
</svg>
`)}`

export default function CursorCat() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    document.getElementById('oneko')?.remove()

    const neko = document.createElement('div')
    neko.id = 'oneko'
    neko.ariaHidden = 'true'
    Object.assign(neko.style, {
      width: `${SPRITE}px`,
      height: `${SPRITE}px`,
      position: 'fixed',
      pointerEvents: 'none',
      left: '16px',
      top: '16px',
      zIndex: 2147483647,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible',
    })

    const cat = document.createElement('img')
    cat.src = CAT_SVG
    cat.alt = ''
    cat.width = SPRITE
    cat.height = SPRITE
    cat.style.display = 'block'
    cat.style.userSelect = 'none'
    cat.style.pointerEvents = 'none'
    neko.appendChild(cat)
    document.body.appendChild(neko)

    let nekoX = 32
    let nekoY = 32
    let mouseX = 32
    let mouseY = 32
    let frameCount = 0
    let idleTime = 0
    let idleAnimation = null
    let idleAnimationFrame = 0
    let last = 0
    let raf = 0

    const setSprite = (name, frame) => {
      const pose = frame % 2 === 0 ? 1 : -1
      cat.style.transform = `scaleX(${pose})`
    }

    const resetIdle = () => {
      idleAnimation = null
      idleAnimationFrame = 0
    }

    const idle = () => {
      idleTime += 1
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
        const options = ['sleeping', 'scratchSelf']
        if (nekoX < 32) options.push('scratchWallW')
        if (nekoY < 32) options.push('scratchWallN')
        if (nekoX > window.innerWidth - 32) options.push('scratchWallE')
        if (nekoY > window.innerHeight - 32) options.push('scratchWallS')
        idleAnimation = options[Math.floor(Math.random() * options.length)]
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) setSprite('tired', 0)
          else setSprite('sleeping', Math.floor(idleAnimationFrame / 4))
          if (idleAnimationFrame > 192) resetIdle()
          break
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation, idleAnimationFrame)
          if (idleAnimationFrame > 9) resetIdle()
          break
        default:
          setSprite('idle', 0)
          return
      }
      idleAnimationFrame += 1
    }

    const frame = (timestamp) => {
      const delta = Math.min(Math.max((timestamp - last) / 16.67 || 1, 0.5), 2)
      frameCount += 1
      const diffX = nekoX - mouseX
      const diffY = nekoY - mouseY
      const distance = Math.hypot(diffX, diffY)

      if (distance < SPEED * delta || distance < 42) {
        idle()
        last = timestamp
        return
      }

      idleAnimation = null
      idleAnimationFrame = 0

      if (idleTime > 1) {
        setSprite('alert', 0)
        idleTime = Math.min(idleTime, 7) - 1
        last = timestamp
        return
      }

      let direction = diffY / distance > 0.5 ? 'N' : ''
      direction += diffY / distance < -0.5 ? 'S' : ''
      direction += diffX / distance > 0.5 ? 'W' : ''
      direction += diffX / distance < -0.5 ? 'E' : ''
      setSprite(direction || 'idle', frameCount)

      const step = SPEED * delta
      nekoX -= (diffX / distance) * step
      nekoY -= (diffY / distance) * step
      nekoX = Math.min(Math.max(16, nekoX), window.innerWidth - 16)
      nekoY = Math.min(Math.max(16, nekoY), window.innerHeight - 16)
      neko.style.left = `${nekoX - 16}px`
      neko.style.top = `${nekoY - 16}px`
      last = timestamp
    }

    const onMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const loop = (timestamp) => {
      if (!neko.isConnected) return
      frame(timestamp)
      raf = requestAnimationFrame(loop)
    }

    setSprite('idle', 0)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      neko.remove()
    }
  }, [])

  return null
}

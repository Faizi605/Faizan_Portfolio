import { useEffect } from 'react'

const SPRITE = 32
const SPEED = 10

const SPRITES = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
}

export default function CursorPanda() {
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
      imageRendering: 'pixelated',
      backgroundImage: 'url(/oneko/panda.png?v=4)',
      left: '16px',
      top: '16px',
      zIndex: 2147483647,
    })
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
      const sprite = SPRITES[name][frame % SPRITES[name].length]
      neko.style.backgroundPosition = `${sprite[0] * SPRITE}px ${sprite[1] * SPRITE}px`
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

    const frame = () => {
      frameCount += 1
      const diffX = nekoX - mouseX
      const diffY = nekoY - mouseY
      const distance = Math.hypot(diffX, diffY)

      if (distance < SPEED || distance < 48) {
        idle()
        return
      }

      idleAnimation = null
      idleAnimationFrame = 0

      if (idleTime > 1) {
        setSprite('alert', 0)
        idleTime = Math.min(idleTime, 7) - 1
        return
      }

      let direction = diffY / distance > 0.5 ? 'N' : ''
      direction += diffY / distance < -0.5 ? 'S' : ''
      direction += diffX / distance > 0.5 ? 'W' : ''
      direction += diffX / distance < -0.5 ? 'E' : ''
      setSprite(direction || 'idle', frameCount)

      nekoX -= (diffX / distance) * SPEED
      nekoY -= (diffY / distance) * SPEED
      nekoX = Math.min(Math.max(16, nekoX), window.innerWidth - 16)
      nekoY = Math.min(Math.max(16, nekoY), window.innerHeight - 16)
      neko.style.left = `${nekoX - 16}px`
      neko.style.top = `${nekoY - 16}px`
    }

    const onMove = (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const loop = (stamp) => {
      if (!neko.isConnected) return
      if (!last) last = stamp
      if (stamp - last > 100) {
        last = stamp
        frame()
      }
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

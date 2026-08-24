import { useEffect } from 'react'

export default function OnekoCat() {
  useEffect(() => {
    if (document.querySelector('script[data-oneko="true"]')) return undefined

    const script = document.createElement('script')
    script.src = '/oneko/oneko.js'
    script.setAttribute('data-oneko', 'true')
    script.setAttribute('data-cat', '/oneko/oneko.gif')
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return null
}

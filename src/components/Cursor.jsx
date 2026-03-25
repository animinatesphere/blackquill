import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  let lx = 0, ly = 0, mx = 0, my = 0

  useEffect(() => {
    const move = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    let raf
    const loop = () => {
      lx += (mx - lx) * 0.11
      ly += (my - ly) * 0.11
      if (dot.current)  { dot.current.style.left  = mx + 'px'; dot.current.style.top  = my + 'px' }
      if (ring.current) { ring.current.style.left = lx + 'px'; ring.current.style.top = ly + 'px' }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const grow = () => {
      if (!ring.current) return
      ring.current.style.width  = '64px'
      ring.current.style.height = '64px'
      ring.current.style.borderColor = 'rgba(255,140,0,0.8)'
      if (dot.current) dot.current.style.opacity = '0'
    }
    const shrink = () => {
      if (!ring.current) return
      ring.current.style.width  = '36px'
      ring.current.style.height = '36px'
      ring.current.style.borderColor = 'rgba(255,140,0,0.5)'
      if (dot.current) dot.current.style.opacity = '1'
    }

    const els = document.querySelectorAll('a,button,[role="button"]')
    els.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}

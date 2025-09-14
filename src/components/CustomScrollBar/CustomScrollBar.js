'use client'

import { useEffect, useState } from 'react'
import styles from './CustomScrollBar.module.scss'

export default function CustomScrollBar() {
  const [height, setHeight] = useState(0)
  const [top, setTop] = useState(0)
  const [isScrollable, setIsScrollable] = useState(false)

  useEffect(() => {
    const updateScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement

      const hasScroll = scrollHeight > clientHeight
      setIsScrollable(hasScroll)

      if (!hasScroll) return

      const visibleRatio = clientHeight / scrollHeight
      const barHeight = Math.max(visibleRatio * clientHeight, 30)
      const barTop = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - barHeight)

      setHeight(barHeight)
      setTop(barTop)
    }

    updateScroll()

    window.addEventListener('scroll', updateScroll)
    window.addEventListener('resize', updateScroll)

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [])

  if (!isScrollable) return null

  return (
    <div
      className={styles.scrollbar}
      style={{ height: `${height}px`, top: `${top}px` }}
    />
  )
}

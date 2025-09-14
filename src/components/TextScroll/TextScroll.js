import React from 'react'
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll'
import styles from './TextScroll.module.scss'

const TextScroll = ({ 
  text = "The text gradient scroll component is designed to enhance user interaction by providing a visually dynamic effect as the user scrolls through the text. Unlike static text, this effect offers a more engaging visual experience with smooth color transitions that change as the text is scrolled. The animated gradient shifts add a modern and interactive touch to the user experience.",
  type = "letter",
  textOpacity = "soft",
  className
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.fixedContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.textWrapper}>
            <TextGradientScroll 
              text={text}
              type={type}
              textOpacity={textOpacity}
              className={className}
            />
          </div>
        </div>
      </div>
      <div className={styles.spacer} aria-hidden="true" />
    </div>
  )
}

export default TextScroll

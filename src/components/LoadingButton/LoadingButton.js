import styles from './LoadingButton.module.scss'
import { TextShimmer } from '@/components/ui/text-shimmer'

const LoadingButton = ({ 
  isLoading = true, 
  duration = 3,
  className,
  onClick,
  ...props 
}) => {
  return (
    <button 
      className={`${styles.loadingButton} ${className || ''}`}
      disabled={isLoading}
      onClick={onClick}
      {...props}
    >
        <TextShimmer 
          duration={duration}
          className={styles.shimmerText}
        >
          Loading...
        </TextShimmer>
    </button>
  )
}

export default LoadingButton

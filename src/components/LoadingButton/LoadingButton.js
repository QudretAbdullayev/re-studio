import styles from './LoadingButton.module.scss'
import { TextShimmer } from '@/components/ui/text-shimmer'

const LoadingButton = ({ 
  isLoading = true, 
  duration = 3,
  className,
  ...props 
}) => {
  return (
    <div 
      className={`${styles.loadingButton} ${className || ''}`}
      disabled={isLoading}
      {...props}
    >
        <TextShimmer 
          duration={duration}
          className={styles.shimmerText}
        >
          Loading...
        </TextShimmer>
    </div>
  )
}

export default LoadingButton

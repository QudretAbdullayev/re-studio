import SafeImage from '../SafeImage/SafeImage'
import styles from './DetailMainImage.module.scss'

const DetailMainImage = ({image, title, onClick}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={styles.main} 
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
    >
      <SafeImage fill src={image} alt={title}/>
    </div>
  )
}

export default DetailMainImage

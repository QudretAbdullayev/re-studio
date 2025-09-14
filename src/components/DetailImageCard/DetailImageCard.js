import SafeImage from "../SafeImage/SafeImage";
import { TextGradientScroll } from "../ui/text-gradient-scroll";
import styles from "./DetailImageCard.module.scss";

const DetailImageCard = ({ imageSrc, alt = "", text = "", className, onClick }) => {
  return imageSrc ? (
    <div className={`${styles.main} ${className || ""}`} onClick={onClick}>
      <SafeImage fill src={imageSrc} alt={alt} />
    </div>
  ) : (
    <div className={`${styles.textContainer} ${className || ""}`}>
      <div className={styles.description}>
        <TextGradientScroll text={text} type="letter" textOpacity="soft" />
      </div>
    </div>
  );
};

export default DetailImageCard;

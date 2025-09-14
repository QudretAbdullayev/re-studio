import { TextShimmer } from '@/components/ui/text-shimmer';
import styles from './TextShimmerExamples.module.scss';

function TextShimmerBasic() {
  return (
    <TextShimmer className={styles.basic} duration={1}>
      Generating code...
    </TextShimmer>
  );
}

function TextShimmerColor() {
  return (
    <TextShimmer
      duration={1.2}
      className={styles.colored}
    >
      Hi, how are you?
    </TextShimmer>
  );
}

function TextShimmerLarge() {
  return (
    <TextShimmer
      duration={2}
      className={styles.large}
    >
      Loading amazing content...
    </TextShimmer>
  );
}

const TextShimmerExamples = () => {
  return (
    <div className={styles.container}>
      <div className={styles.example}>
        <h3>Basic Shimmer</h3>
        <TextShimmerBasic />
      </div>
      
      <div className={styles.example}>
        <h3>Colored Shimmer</h3>
        <TextShimmerColor />
      </div>
      
      <div className={styles.example}>
        <h3>Large Shimmer</h3>
        <TextShimmerLarge />
      </div>
    </div>
  );
};

export default TextShimmerExamples;
export { TextShimmerBasic, TextShimmerColor, TextShimmerLarge };

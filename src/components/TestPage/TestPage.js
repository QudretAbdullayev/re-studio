import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { TextShimmer } from '@/components/ui/text-shimmer';
import styles from './TestPage.module.scss';

const TestPage = () => {
  return (
    <div className={styles.container}>
      <h1>Loading Button Test</h1>
      
      <div className={styles.section}>
        <h2>LoadingButton Examples</h2>
        <div className={styles.buttons}>
          <LoadingButton isLoading={true}>
            Loading...
          </LoadingButton>
          
          <LoadingButton isLoading={true} duration={1}>
            Fast Loading...
          </LoadingButton>
          
          <LoadingButton isLoading={true} duration={3}>
            Slow Loading...
          </LoadingButton>
          
          <LoadingButton isLoading={false}>
            Not Loading
          </LoadingButton>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Direct TextShimmer Examples</h2>
        <div className={styles.shimmers}>
          <TextShimmer duration={1}>
            Basic shimmer text
          </TextShimmer>
          
          <TextShimmer duration={2} className={styles.customShimmer}>
            Custom styled shimmer
          </TextShimmer>
          
          <TextShimmer duration={1.5} as="h3">
            Heading shimmer
          </TextShimmer>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

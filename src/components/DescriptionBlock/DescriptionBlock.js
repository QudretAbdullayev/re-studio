import { dangerousProcessText } from '@/utils/dangerousProcessText';
import styles from './DescriptionBlock.module.scss';
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll';

export default function DescriptionBlock({footer, animation}) {


  return (
    <section className='g-container'>
      <div className={styles.container}>
      <div className={styles.left} dangerouslySetInnerHTML={{__html: dangerousProcessText(footer)}} />
      <div className={styles.right}>
        <TextGradientScroll 
          text={animation}
          type="letter"
          textOpacity="soft"
        />
      </div>
    </div>
    </section>
  );
}

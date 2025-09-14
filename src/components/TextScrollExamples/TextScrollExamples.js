import TextScroll from '@/components/TextScroll/TextScroll';
import styles from './TextScrollExample.module.scss';

function TextGradientScrollExample() {
  return (
    <TextScroll 
      text="The text gradient scroll component is designed to enhance user interaction by providing a visually dynamic effect as the user scrolls through the text. Unlike static text, this effect offers a more engaging visual experience with smooth color transitions that change as the text is scrolled. The animated gradient shifts add a modern and interactive touch to the user experience. This example was created using SCSS and Framer Motion."
      type="letter"
      textOpacity="soft"
    />
  );
}

function TextWordScrollExample() {
  return (
    <TextScroll 
      text="Bu örnekte kelime kelime animasyon efekti kullanılıyor. Her kelime ayrı ayrı beliriyor ve çok daha hızlı bir geçiş sağlıyor. Kullanıcı deneyimi için farklı bir yaklaşım sunuyor."
      type="word"
      textOpacity="medium"
    />
  );
}

const TextScrollExamples = () => {
  return (
    <div className={styles.container}>
      <section>
        <h2>Letter by Letter Animation</h2>
        <TextGradientScrollExample />
      </section>
      
      <section>
        <h2>Word by Word Animation</h2>
        <TextWordScrollExample />
      </section>
    </div>
  );
};

export default TextScrollExamples;
export { TextGradientScrollExample, TextWordScrollExample };

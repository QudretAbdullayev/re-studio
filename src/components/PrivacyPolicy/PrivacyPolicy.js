"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import styles from "./PrivacyPolicy.module.scss";
import ArrowCorner from "@/assets/icons/ArrowCorner";
import BackButton from "../BackButton/BackButton";
import { useSoundContext } from "@/contexts/SoundContext";
import { playMobileClickSound } from "@/utils/playMobileClickSound";

export default function PrivacyPolicy() {
  const { playClickSound } = useSoundContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRefs = useRef([]);
  const leftSidebarRef = useRef(null);
  const rightContentRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sections = [
    {
      title: "Introduction",
      content: `<p>Heats Design Agency ("Heats", "we", "us", "our") hörmətlə bildirir ki, sizin məxfiliyiniz bizim üçün önəmlidir.<br/><br/>Bu Privacy Policy, www.[sizin sayt domeniniz].com ünvanlı veb saytımızı ziyarət edərkən və xidmətlərimizdən istifadə edərkən hansı məlumatları toplayacağımızı, necə istifadə edəcəyimizi və qoruyacağımızı izah edir.</p>`,
    },
    {
      title: "What information we collect",
      content: `
        <p>We may collect and process the following types of information:</p>
        <ul>
          <li style="color: #FFFFFF;">Contact Information:<span style="color: #EBEBF599;"> Such as your name, email address, phone number, or any other details you provide when you contact us or submit a project inquiry.</span></li>
          <li style="color: #FFFFFF;">Project Information:<span style="color: #EBEBF599;"> Any project briefs, files, or additional information you choose to share with us related to our services.</span></li>
          <li style="color: #FFFFFF;">Technical Information:<span style="color: #EBEBF599;"> Including your IP address, browser type, device details, cookies, and usage data to help us analyze and improve our website performance.</span></li>
        </ul>
      `,
    },
    {
      title: "How we use your information",
      content: `
        <p>We use your information for the following purposes:
        <ul>
          <li>To respond to your inquiries and communicate with you.</li>
          <li>To deliver and improve our design and development services.</li>
          <li>To personalize and enhance your user experience.</li>
          <li>For internal analytics and marketing purposes.</li>
          <li>To comply with legal obligations or resolve disputes.</li>
        </ul></p>
      `,
    },
    {
      title: "How we share your information",
      content: `
        <p>
        We do not sell or rent your personal information. We may share it only in the following cases:
          <ul>
            <li style="color: #FFFFFF;">Service Providers:<span style="color: #EBEBF599;"> With trusted partners who help us operate our website or deliver our services (e.g., hosting, analytics).</span></li>
            <li style="color: #FFFFFF;">Legal Requirements:<span style="color: #EBEBF599;"> To comply with applicable laws, regulations, or legal processes.</span></li>
            <li style="color: #FFFFFF;">Business Transfers:<span style="color: #EBEBF599;"> In connection with a merger, acquisition, or sale of all or part of our business.</span></li>
          </ul>
        </p>
      `,
    },
    {
      title: "Cookies & tracking technologies",
      content: `
        <p>We use cookies and similar tracking technologies to enhance your browsing experience, understand website traffic, and analyze trends. You can control or disable cookies through your browser settings, but some features of the website may not function properly if you do so.</p>
      `,
    },
    {
      title: "Data security",
      content: `
        <p>We take reasonable technical and organizational measures to protect your personal data from unauthorized access, disclosure, or loss. However, please note that no method of transmission over the internet or electronic storage is 100% secure.</p>
      `,
    },
    {
      title: "Your rights",
      content: `
        <p>
        Depending on applicable data protection laws, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you.</li>
          <li>Request corrections or updates to your data.</li>
          <li>Request the deletion of your information, where applicable.</li>
        </ul>
        <p>
        To exercise these rights, please contact us using the details below.
        </p>
      `,
    },
    {
      title: "Changes to this Privacy Policy",
      content: `
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.</p>
      `,
    },
    {
      title: "Applicable Law",
      content: `
        <p>These terms are governed by the laws of the Republic of Azerbaijan.</p>
      `,
    },
  ];

  // Smooth scroll fonksiyonu - sticky header'ı dikkate alarak
  const scrollToSection = (index) => {
    const section = sectionRefs.current[index];
    if (section) {
      const headerOffset = 120; // sticky header height + biraz margin
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      // Eğer programmatik scroll işlemi devam ediyorsa, scroll event'ini ignore et
      if (isScrolling) return;
      
      // Debounce scroll events to avoid rapid updates
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const offsets = sectionRefs.current.map((ref) => {
          if (!ref) return Number.POSITIVE_INFINITY;
          const rect = ref.getBoundingClientRect();
          // Header altındaki alan için daha hassas hesaplama
          const topPosition = rect.top - 120; // header offset
          return Math.abs(topPosition);
        });

        const minIndex = offsets.indexOf(Math.min(...offsets));
        if (minIndex !== activeIndex) {
          setActiveIndex(minIndex);
        }
      }, 50); // 50ms debounce
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling, activeIndex]);

  useEffect(() => {
    const updatePadding = () => {
      if (leftSidebarRef.current && rightContentRef.current) {
        const leftHeight = leftSidebarRef.current.getBoundingClientRect().height;
        const paddingBottomRem = leftHeight;
        
        rightContentRef.current.style.paddingBottom = `${paddingBottomRem}rem`;
        
      } else {
        console.warn("Left sidebar or right content ref is not set.");
      }
    };

    const timer = setTimeout(() => {
      updatePadding();
    }, 500);
    
    const handleResize = () => {
      updatePadding();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (leftSidebarRef.current && rightContentRef.current) {
        const leftHeight = leftSidebarRef.current.getBoundingClientRect().height;
        const paddingBottomRem = leftHeight;
        rightContentRef.current.style.paddingBottom = `${paddingBottomRem}rem`;

      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    const updatePadding = () => {
      if (leftSidebarRef.current && rightContentRef.current) {
        const leftHeight = leftSidebarRef.current.getBoundingClientRect().height;
        const paddingBottomRem = leftHeight / 10;
        rightContentRef.current.style.paddingBottom = `${paddingBottomRem}rem`;
      }
    };

    const timer = setTimeout(updatePadding, 500);
    
    window.addEventListener('resize', updatePadding);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePadding);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <motion.div
        className={styles.progressBar}
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className={styles.header}>
        <BackButton />
        <div className={styles.texts}>
          <div className={styles.title}>Our Commitment</div>
          <div className={styles.description}>Privacy Policy</div>
          <div className={styles.updated}>Last updated: 28 June 2025</div>
        </div>
      </div>

      <div className={styles.innerContainer}>
        <aside className={styles.left} ref={leftSidebarRef}>
          {sections.map((section, index) => (
            <div
              key={index}
              onClick={() => {
                playMobileClickSound(playClickSound);
                setIsScrolling(true);
                setActiveIndex(index);
                scrollToSection(index);
                
                // Scroll işlemi tamamlandıktan sonra isScrolling'i false yap
                setTimeout(() => {
                  setIsScrolling(false);
                }, 1500); // Biraz daha uzun timeout
              }}
              className={`${
                index === activeIndex
                  ? styles.activeSidebarLink
                  : styles.sidebarLink
              }`}
            >
              {index === activeIndex && (
                <div className={styles.arrow}>
                  <ArrowCorner />
                </div>
              )}
              <div className={styles.buttonText}>{section.title}</div>
            </div>
          ))}
        </aside>

        <div className={styles.right} ref={rightContentRef}>
          {sections.map((section, index) => (
            <section
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={styles.section}
            >
              <h1>{section.title}</h1>
              <div
                className={styles.rich}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
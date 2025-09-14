"use client";
import Link from 'next/link';
import styles from './ContactUs.module.scss';
import BackButton from '../BackButton/BackButton';
import { useSoundContext } from '@/contexts/SoundContext';
import { TextStaggerHover, TextStaggerHoverActive, TextStaggerHoverHidden } from '@/components/TextStaggerHover/TextStaggerHover';
import { dangerousProcessText } from '@/utils/dangerousProcessText';

export default function ContactUs({data}) {
  const { playClickSound } = useSoundContext();

  return (
    <section className={styles.container}>
      <div className={`${styles.row} ${styles.contactInfo}`}>
        <BackButton style={"back"}/>
        <div className={styles.texts}>
          <div className={styles.title}>{data.contact_label}</div>
          <div className={`${styles.desc} ${styles.description}`}>
            {data.contact_title}
          </div>
        </div>
        <div className={styles.locationInfo}>
          <div className={styles.texts}>
            <div className={styles.title}>{data.location_label}</div>
            <div className={styles.description}>{data.address}</div>
          </div>
          <div className={styles.socialMediaInfo}>
            <div className={styles.sectionDescription}>{data.social_label}</div>
            <div className={styles.socialMediaLinks}>
              <Link 
                href={data.social.LinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialMediaLink}
                onMouseEnter={playClickSound}
              >
                <TextStaggerHover as="span" className={styles.socialMediaName}>
                  <TextStaggerHoverActive animation="top" text="LinkedIn" />
                  <TextStaggerHoverHidden animation="bottom" text="LinkedIn" />
                </TextStaggerHover>
              </Link>
              <Link 
                href={data.social.Instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialMediaLink}
                onMouseEnter={playClickSound}
              >
                <TextStaggerHover as="span" className={styles.socialMediaName}>
                  <TextStaggerHoverActive animation="top" text="Instagram" />
                  <TextStaggerHoverHidden animation="bottom" text="Instagram" />
                </TextStaggerHover>
              </Link>
              <Link 
                href={data.social.Behance} 
                className={styles.socialMediaLink}
                onMouseEnter={playClickSound}
              >
                <TextStaggerHover as="span" className={styles.socialMediaName}>
                  <TextStaggerHoverActive animation="top" text="Behance" />
                  <TextStaggerHoverHidden animation="bottom" text="Behance" />
                </TextStaggerHover>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.row} ${styles.contactMethods}`}>
        <div className={styles.texts}>
          <div className={styles.title}>{data.phone_label}</div>
          <Link 
            href={`tel:${data.phone.replaceAll(' ', '')}`} 
            className={`${styles.description} ${styles.big}`}
            onMouseEnter={playClickSound}
          >
            <TextStaggerHover as="span">
              <TextStaggerHoverActive animation="top" text={data.phone} />
              <TextStaggerHoverHidden animation="bottom" text={data.phone} />
            </TextStaggerHover>
          </Link>
        </div>
        <div className={styles.texts}>
          <div className={styles.title}>{data.email_label}</div>
          <Link  
            href={`mailto:${data.email}`} 
            className={`${styles.description} ${styles.big}`}
            onMouseEnter={playClickSound}
          >
            <TextStaggerHover as="span">
              <TextStaggerHoverActive animation="top" text={data.email}/>
              <TextStaggerHoverHidden animation="bottom" text={data.email}/>
            </TextStaggerHover>
          </Link>
        </div>
      </div>
      <div className={`${styles.row} ${styles.texts}`}>
        <div className={styles.title}>{data.career_label}</div>
        <div className={styles.sectionSubtitle}>{data.career_title}</div>
        <div className={styles.sectionDescription}>
          <span dangerouslySetInnerHTML={{__html: dangerousProcessText(data.career_description)}} /> {" "}
          <Link 
            href="mailto:careers@heats.com"
            onMouseEnter={playClickSound}
          >
            <TextStaggerHover as="span">
              <TextStaggerHoverActive animation="top" text="careers@heats.com" />
              <TextStaggerHoverHidden animation="bottom" text="careers@heats.com" />
            </TextStaggerHover>
          </Link>
        </div>
      </div>
    </section>
  );
}

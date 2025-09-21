"use client";

import styles from "./Footer.module.scss";
import Link from "next/link";
import { useState } from "react";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/TextStaggerHover/TextStaggerHover";
import { useSoundContext } from "@/contexts/SoundContext";
import { dangerousProcessText } from "@/utils/dangerousProcessText";
import ImageMarquee from "@/components/ui/image-marquee";

export default function Footer({ data, menu=false }) {
  const { playClickSound } = useSoundContext();
  const [buttonHovered, setButtonHovered] = useState(false);
  const [linkedinHovered, setLinkedinHovered] = useState(false);
  const [instagramHovered, setInstagramHovered] = useState(false);
  const [behanceHovered, setBehanceHovered] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [privacyHovered, setPrivacyHovered] = useState(false);
  const [reStudioHovered, setReStudioHovered] = useState(false);

  return (
    <footer className={`${styles.footer} ${menu ? styles.menuFooter : ''}`}>

      <div className="g-container">
        <div className={styles.projectInquiry}>
          <div className={styles.inquiryText}>
            <div className={styles.title}>{data.project_label}</div>

            <div className={styles.description}>
              {data.project_subtitle}
            </div>
            <div className={styles.descriptionMobile}>{data.project_subtitle_mobile}</div>
          </div>
          <Link
            href="/contact"
            className={styles.button}
            onMouseEnter={() => {
              playClickSound();
              setButtonHovered(true);
            }}
            onMouseLeave={() => setButtonHovered(false)}
          >
            <TextStaggerHover
              as="span"
              className={styles.buttonText}
              isMouseIn={buttonHovered}
            >
              <TextStaggerHoverActive animation="top" text={data.project_button} />
              <TextStaggerHoverHidden animation="bottom" text={data.project_button} />
            </TextStaggerHover>
          </Link>
        </div>

        <nav className={styles.footerNav}>
          <div className={styles.agencyDescription}>
            {data.agency_text}
          </div>
          <div className={styles.copyright}>
            {data.copyright_text} {" "}
            <Link
              href="/privacy-policy"
              onMouseEnter={() => {
                playClickSound();
                setPrivacyHovered(true);
              }}
              onMouseLeave={() => setPrivacyHovered(false)}
            >
              <TextStaggerHover
                as="span"
                isMouseIn={privacyHovered}
                className={styles.linkText}
              >
                <TextStaggerHoverActive animation="top" text="PRIVACY & TERMS" />
                <TextStaggerHoverHidden animation="bottom" text="PRIVACY & TERMS" />
              </TextStaggerHover>
            </Link>
          </div>
          <div className={styles.socialLinks}>
            <Link
              href={data.social_links.LinkedIn}
              className={styles.link}
              onMouseEnter={() => {
                playClickSound();
                setLinkedinHovered(true);
              }}
              onMouseLeave={() => setLinkedinHovered(false)}
            >
              <TextStaggerHover
                as="span"
                isMouseIn={linkedinHovered}
                className={styles.linkText}
              >
                <TextStaggerHoverActive animation="top" text="LinkedIn" />
                <TextStaggerHoverHidden animation="bottom" text="LinkedIn" />
              </TextStaggerHover>
            </Link>
            <Link
              href={data.social_links.Instagram}
              className={styles.link}
              onMouseEnter={() => {
                playClickSound();
                setInstagramHovered(true);
              }}
              onMouseLeave={() => setInstagramHovered(false)}
            >
              <TextStaggerHover
                as="span"
                isMouseIn={instagramHovered}
                className={styles.linkText}
              >
                <TextStaggerHoverActive animation="top" text="Instagram" />
                <TextStaggerHoverHidden animation="bottom" text="Instagram" />
              </TextStaggerHover>
            </Link>
            <Link
              href={data.social_links.Behance}
              className={styles.link}
              onMouseEnter={() => {
                playClickSound();
                setBehanceHovered(true);
              }}
              onMouseLeave={() => setBehanceHovered(false)}
            >
              <TextStaggerHover
                as="span"
                isMouseIn={behanceHovered}
                className={styles.linkText}
              >
                <TextStaggerHoverActive animation="top" text="Behance" />
                <TextStaggerHoverHidden animation="bottom" text="Behance" />
              </TextStaggerHover>
            </Link>
            <Link
              href={`mailto:${data.email}`}
              className={styles.link}
              onMouseEnter={() => {
                playClickSound();
                setEmailHovered(true);
              }}
              onMouseLeave={() => setEmailHovered(false)}
            >
              <TextStaggerHover
                as="span"
                isMouseIn={emailHovered}
                className={styles.linkText}
              >
                <TextStaggerHoverActive animation="top" text={data.email} />
                <TextStaggerHoverHidden animation="bottom" text={data.email} />
              </TextStaggerHover>
            </Link>
          </div>
          <div className={styles.collaborationOffer}>
            <span dangerouslySetInnerHTML={{ __html: dangerousProcessText(data.extra_text) }} />{" "}
            <Link
              href="#"
              onMouseEnter={() => {
                playClickSound();
                setReStudioHovered(true);
              }}
              onMouseLeave={() => setReStudioHovered(false)}
            >
              <TextStaggerHover
                as="span"
                isMouseIn={reStudioHovered}
                className={styles.linkText}
              >
                <TextStaggerHoverActive animation="top" text="RE STUDIO®" />
                <TextStaggerHoverHidden animation="bottom" text="RE STUDIO®" />
              </TextStaggerHover>
            </Link>
          </div>
        </nav>
      </div>
      <div className={styles.heatsTextContainer}>
        <ImageMarquee
          src={"/re studio-slider.svg"}
          alt="Re Studio"
          delay={2000}
          baseVelocity={-1}
          className={`${styles.heatsImage} ${styles.heatsImageFirst}`}
        />
      </div>
    </footer>
  );
}

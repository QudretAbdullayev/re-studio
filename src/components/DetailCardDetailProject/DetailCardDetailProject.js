"use client";

import { HoverPeek } from "../HoverPeek/HoverPeek";
import SafeLink from "../SafeLink/SafeLink";
import styles from "./DetailCardDetailProject.module.scss";
import { useState } from "react";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "@/components/TextStaggerHover/TextStaggerHover";
import { useSoundContext } from "@/contexts/SoundContext";
import { dangerousProcessText } from "@/utils/dangerousProcessText";

const DetailCardDetailProject = ({description, website, year, client}) => {
  const { playClickSound } = useSoundContext();
  const [visitButtonHovered, setVisitButtonHovered] = useState(false);
  const [webLinkHovered, setWebLinkHovered] = useState(false);

  return (
    <div className={styles.detail}>
      <div className={styles.projectInfo}>
        <ul className={styles.metas}>
          <li className={styles.meta}>YEAR: {String(year)}<span>•</span></li>
          <li className={styles.meta}>CLIENT: {client}<span>•</span></li>
          <li className={styles.meta}>
            WEB:
            <HoverPeek url={website}>
              <SafeLink
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  playClickSound();
                  setWebLinkHovered(true);
                }}
                onMouseLeave={() => setWebLinkHovered(false)}
              >
                <TextStaggerHover
                  as="span"
                  isMouseIn={webLinkHovered}
                >
                  <TextStaggerHoverActive animation="top" text={website.toUpperCase()} />
                  <TextStaggerHoverHidden animation="bottom" text={website.toUpperCase()} />
                </TextStaggerHover>
              </SafeLink>
            </HoverPeek>
          </li>
        </ul>
        <div className={styles.summary} dangerouslySetInnerHTML={{ __html: dangerousProcessText(description) }}/>
      </div>


      <SafeLink
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.visitButton}
        onMouseEnter={() => {
          playClickSound();
          setVisitButtonHovered(true);
        }}
        onMouseLeave={() => setVisitButtonHovered(false)}
      >
        <TextStaggerHover
          as="span"
          className={styles.buttonText}
          isMouseIn={visitButtonHovered}
        >
          <TextStaggerHoverActive animation="top" text="VISIT WEBSITE" />
          <TextStaggerHoverHidden animation="bottom" text="VISIT WEBSITE" />
        </TextStaggerHover>
      </SafeLink>
    </div>
  );
};

export default DetailCardDetailProject;

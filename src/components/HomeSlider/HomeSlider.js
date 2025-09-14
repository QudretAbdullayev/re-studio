"use client";
import SafeImage from "../SafeImage/SafeImage";
import styles from "./HomeSlider.module.scss";

function HomeSlider({
  gap = 24,
  duration = 180,
  direction = "horizontal",
  className,
  data
}) {
  
  const renderSliderItem = (item, index, keyPrefix) => (
    <div key={`${keyPrefix}-${item.id}-${index}`} className={styles.sliderItem}>
      <div className={styles.partnerLogo}>
        {item.logo ? (
          <div dangerouslySetInnerHTML={{ __html: item.logo }} />
        ) : (
          <SafeImage
            src={item.icon}
            alt={item.title || "logo"}
            fill
            sizes="auto"
            style={{ objectFit: "none" }}
          />
        )}
      </div>
    </div>
  );

  const renderSliderContent = () => {
    if (data.length > 24) {
      const midPoint = Math.ceil(data.length / 2);
      const firstHalf = data.slice(0, midPoint);
      const secondHalf = data.slice(midPoint);

      return (
        <>
          <div className={styles.sliderRow}>
            {firstHalf.map((item, index) => renderSliderItem(item, index, "first"))}
            {firstHalf.map((item, index) => renderSliderItem(item, index, "first-dup"))}
          </div>

          <div className={`${styles.sliderRow} ${styles.sliderRowReverse}`}>
            {secondHalf.map((item, index) => renderSliderItem(item, index, "second"))}
            {secondHalf.map((item, index) => renderSliderItem(item, index, "second-dup"))}
          </div>
        </>
      );
    }

    // Az veri olduğunda - smooth infinite scroll için yeterli kopyalama
    const repeatCount = Math.max(3, Math.ceil(50 / data.length)); // En az 3 kez tekrarla
    const repeatedData = [];
    
    for (let i = 0; i < repeatCount; i++) {
      data.forEach((item, index) => {
        repeatedData.push({...item, _copyIndex: i, _originalIndex: index});
      });
    }

    return (
      <>
        {repeatedData.map((item, index) => 
          renderSliderItem(item, index, `copy-${item._copyIndex}-${item._originalIndex}`)
        )}
      </>
    );
  };

  return (
    <section className={styles.container}>
      <div className={`${styles.sliderContainer} ${className || ""}`}>
        {data.length > 24 ? (
          <div
            className={styles.doubleSliderContainer}
            style={{
              "--animation-duration": `${duration}s`,
              "--gap": `${gap}px`,
            }}
          >
            {renderSliderContent()}
          </div>
        ) : (
          <div
            className={styles.sliderTrack}
            style={{
              "--animation-duration": `${duration}s`,
              "--gap": `${gap}px`,
            }}
          >
            {renderSliderContent()}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeSlider;
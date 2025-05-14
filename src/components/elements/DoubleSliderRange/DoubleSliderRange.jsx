import styles from "./DoubleSliderRange.module.css";
import { useState, useEffect, useRef } from "react";

export default function DoubleSliderRange({
  min,
  max,
  setFiltersData,
  graphic,
}) {
  const [currentMinVal, setCurrentMinVal] = useState(0);
  const [currentMaxVal, setCurrentMaxVal] = useState(0);
  const differenceValue = Math.floor((max - min) * 0.15);

  useEffect(() => {
    setCurrentMinVal(min);
    setCurrentMaxVal(max);
  }, [min, max]);

  const handleMinChange = (e) => {
    const value = Math.min(
      Number(e.target.value),
      currentMaxVal - differenceValue
    );
    setCurrentMinVal(value);
  };

  function handleMouseUp() {
    setFiltersData((prev) => ({
      ...prev,
      [graphic === true ? "currentPrice" : "currentYear"]: {
        min: currentMinVal,
        max: currentMaxVal,
      },
    }));
  }

  const handleMaxChange = (e) => {
    const value = Math.max(
      Number(e.target.value),
      currentMinVal + differenceValue
    );
    setCurrentMaxVal(value);
  };

  const trackRef = useRef(null);
  const graphicTrackRef = useRef(null);

  useEffect(() => {
    if (currentMinVal === 0 && currentMaxVal === 0 && (min !== 0 || max !== 0))
      return;
    else {
      const minPercent = ((currentMinVal - min) / (max - min)) * 100;
      const maxPercent = ((currentMaxVal - min) / (max - min)) * 100;
      const width = maxPercent - minPercent;

      if (trackRef.current) {
        // Per il track sotto
        trackRef.current.style.left = `${minPercent}%`;
        trackRef.current.style.width = `${width}%`;
      }
      if (graphicTrackRef.current) {
        // Per l'overlay grafico sopra
        graphicTrackRef.current.style.setProperty("--start", `${minPercent}%`);
        graphicTrackRef.current.style.setProperty("--end", `${maxPercent}%`);
      }
    }
  }, [currentMinVal, currentMaxVal, min, max]);

  return (
    <>
      {min != 0 && max != 0 ? (
        <div className={styles.doubleRangeContainer}>
          {graphic === true && (
            <div className={styles.graphicContainer}>
              <div ref={graphicTrackRef} className={styles.graphicTrack}></div>
              <div className={styles.graphicGhost}></div>
            </div>
          )}

          <div className={styles.rangeSliderContainer}>
            <input
              type="range"
              min={min}
              max={max}
              value={currentMinVal}
              onChange={handleMinChange}
              onMouseUp={handleMouseUp}
              className={`${styles.rangeSlider} ${styles.minRange}`}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={currentMaxVal}
              onChange={handleMaxChange}
              onMouseUp={handleMouseUp}
              className={`${styles.rangeSlider} ${styles.maxRange}`}
            />
            <div
              className={styles.thumbValue}
              style={{
                left: `${((currentMinVal - min) / (max - min)) * 100}%`,
              }}
            >
              {graphic && <span>€</span>}
              {currentMinVal}
            </div>
            <div
              className={styles.thumbValue}
              style={{
                left: `${((currentMaxVal - min) / (max - min)) * 100}%`,
              }}
            >
              {graphic && <span>€</span>}
              {currentMaxVal}
            </div>
            <div ref={trackRef} className={styles.sliderTrack}></div>
            <div className={styles.sliderGhost}></div>
          </div>
        </div>
      ) : (
        <span>Caricamento...</span>
      )}
    </>
  );
}

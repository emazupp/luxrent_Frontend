import styles from "./DoubleSliderRange.module.css";
import { useState, useEffect, useRef } from "react";

export default function DoubleSliderRange({ min, max, graphic }) {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const differenceValue = Math.floor((max - min) * 0.15);

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - differenceValue);
    setMinVal(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + differenceValue);
    setMaxVal(value);
  };

  const trackRef = useRef(null);
  const graphicTrackRef = useRef(null);

  useEffect(() => {
    if (minVal === 0 && maxVal === 0 && (min !== 0 || max !== 0)) return;
    else {
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
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
    console.log(
      `minVal: ${minVal}, maxVal: ${maxVal}, min: ${min}, max: ${max}`
    );
  }, [minVal, maxVal, min, max]);

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
              value={minVal}
              onChange={handleMinChange}
              className={`${styles.rangeSlider} ${styles.minRange}`}
            />
            <input
              type="range"
              min={min}
              max={max}
              value={maxVal}
              onChange={handleMaxChange}
              className={`${styles.rangeSlider} ${styles.maxRange}`}
            />
            <div
              className={styles.thumbValue}
              style={{ left: `${((minVal - min) / (max - min)) * 100}%` }}
            >
              {graphic && <span>€</span>}
              {minVal}
            </div>
            <div
              className={styles.thumbValue}
              style={{ left: `${((maxVal - min) / (max - min)) * 100}%` }}
            >
              {graphic && <span>€</span>}
              {maxVal}
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

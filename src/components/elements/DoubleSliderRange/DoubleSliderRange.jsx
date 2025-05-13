import styles from "./DoubleSliderRange.module.css";
import { useState, useEffect, useRef } from "react";

export default function DoubleSliderRange() {
  const min = 0;
  const max = 100;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  };

  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      trackRef.current.style.left = `${minPercent}%`;
      trackRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  return (
    <div className={styles.doubleRangeContainer}>
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
        €{minVal}
      </div>
      <div
        className={styles.thumbValue}
        style={{ left: `${((maxVal - min) / (max - min)) * 100}%` }}
      >
        €{maxVal}
      </div>
      <div ref={trackRef} className={styles.sliderTrack}></div>
      <div className={styles.sliderGhost}></div>
    </div>
  );
}

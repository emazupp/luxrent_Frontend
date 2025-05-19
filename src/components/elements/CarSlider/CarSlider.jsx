import { useState, useEffect, useRef, useContext } from "react";
import styles from "./CarSlider.module.css";
import gsap from "gsap";
import { GlobalContext } from "../../../contexts/GlobalContext";
import calendarIcon from "../../../assets/img/calendar.png";
import carEngineIcon from "../../../assets/img/car-engine.png";
import powerIcon from "../../../assets/img/power.png";
import Button from "../Button/Button";

export default function CarSlider() {
  const { cars } = useContext(GlobalContext);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showedCars, setShowedCars] = useState([]);
  const activeSlideRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  function mod(a, b) {
    return ((a % b) + b) % b;
  }

  function handleChangeSlide(newIndex, direction) {
    if (isAnimating || showedCars.length === 0) return;
    setIsAnimating(true);

    const toX = direction === "next" ? "-100%" : "100%";
    const fromX = direction === "next" ? "100%" : "-100%";

    // Slide out
    gsap.to(activeSlideRef.current, {
      x: toX,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setActiveSlideIndex(mod(newIndex, showedCars.length));

        // Slide in
        gsap.fromTo(
          activeSlideRef.current,
          { x: fromX, opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  }

  useEffect(() => {
    const filtered = cars.filter((car) => car.homepage === 1);
    setShowedCars(filtered);
    setActiveSlideIndex(0);
  }, [cars]);

  if (showedCars.length === 0) return null;

  const car = showedCars[activeSlideIndex];
  const prevIndex = mod(activeSlideIndex - 1, showedCars.length);
  const nextIndex = mod(activeSlideIndex + 1, showedCars.length);

  return (
    <div className={styles.sliderContainer}>
      <div className={`${styles.slide} ${styles.sideSlide}`}>
        <img
          onClick={() => handleChangeSlide(prevIndex, "prev")}
          src={`${import.meta.env.VITE_BACKEND_URL}/${
            showedCars[prevIndex].images.find((img) => img.is_main === 1).path
          }`}
          alt="previous car"
        />
      </div>

      <div ref={activeSlideRef} className={`${styles.slide} ${styles.active}`}>
        <div className={styles.upperActiveSlide}>
          <div className={styles.activeSlideModel}>
            <span>{car.model}</span>
          </div>
          <div className={styles.activeSlideLogo}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${car.brand.logo_path}`}
              alt={car.brand.name}
            />
          </div>
        </div>

        <div className={styles.imageContainerActiveSlide}>
          <div className={styles.activeSlideTitle}>
            <span>{car.brand.name}</span>
          </div>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${
              car.images.find((img) => img.is_main === 1).path
            }`}
            alt="active car"
          />
        </div>

        <div className={styles.lowerActiveSlide}>
          <div className={styles.activeSlideDescription}>
            <span>{car.description}</span>
          </div>
          <div className={styles.activeSlideInfo}>
            <div>
              <img src={carEngineIcon} alt="car engine" />
              <div className={styles.separatorLine}></div>
              <span>{car.engine_size} cc</span>
            </div>
            <div>
              <img src={powerIcon} alt="power" />
              <div className={styles.separatorLine}></div>
              <span>{car.horsepower} cv</span>
            </div>
            <div>
              <img src={calendarIcon} alt="calendar" />
              <div className={styles.separatorLine}></div>
              <span>{car.year}</span>
            </div>
          </div>
          <div className={styles.activeSlideButton}>
            <Button>Vedi dettagli</Button>
          </div>
        </div>
      </div>

      <div className={`${styles.slide} ${styles.sideSlide}`}>
        <img
          onClick={() => handleChangeSlide(nextIndex, "next")}
          src={`${import.meta.env.VITE_BACKEND_URL}/${
            showedCars[nextIndex].images.find((img) => img.is_main === 1).path
          }`}
          alt="next car"
        />
      </div>
    </div>
  );
}

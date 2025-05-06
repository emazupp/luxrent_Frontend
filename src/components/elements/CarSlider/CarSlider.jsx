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
  const [activeSlideIndex, setActiveSlideIndex] = useState(null);
  const [prevSlideIndex, setPrevSlideIndex] = useState(null);
  const [nextSlideIndex, setNextSlideIndex] = useState(null);
  const prevSlideRef = useRef(null);
  const nextSlideRef = useRef(null);
  const activeSlideRef = useRef(null);
  const [showedCars, setShowedCars] = useState([]);

  function mod(a, b) {
    return ((a % b) + b) % b;
  }

  function handleChangeSlide(index, direction) {
    if (direction === "prev") {
      gsap.to(prevSlideRef.current, {
        duration: 0.5,
        x: "100%",
        y: "5%",
        ease: "power2.in",
        onComplete: () => {
          setActiveSlideIndex(mod(index, showedCars.length));
          gsap.set(prevSlideRef.current, { x: 0, y: 0, opacity: 1 });
        },
      });
      gsap.to(activeSlideRef.current, {
        duration: 0.5,
        x: "100%",
        y: "-5%",
        ease: "power2.in",
        onComplete: () => {
          gsap.set(activeSlideRef.current, { x: 0, y: 0, opacity: 1 });
        },
      });
      gsap.to(nextSlideRef.current, {
        duration: 0.5,
        x: "100%",
        y: "5%",
        ease: "power2.in",
        onComplete: () => {
          gsap.set(nextSlideRef.current, { x: 0, y: 0, opacity: 1 });
        },
      });
    } else if (direction === "next") {
      gsap.to(nextSlideRef.current, {
        duration: 0.5,
        x: "-100%",
        y: "5%",
        ease: "power2.in",
        onComplete: () => {
          setActiveSlideIndex(mod(index, showedCars.length));
          gsap.set(nextSlideRef.current, { x: 0, y: 0, opacity: 1 });
        },
      });
      gsap.to(activeSlideRef.current, {
        duration: 0.5,
        x: "-100%",
        y: "5%",
        ease: "power2.in",
        onComplete: () => {
          gsap.set(activeSlideRef.current, { x: 0, y: 0, opacity: 1 });
        },
      });
      gsap.to(prevSlideRef.current, {
        duration: 0.5,
        x: "-100%",
        y: "5%",
        ease: "power2.in",
        onComplete: () => {
          gsap.set(prevSlideRef.current, { x: 0, y: 0, opacity: 1 });
        },
      });
    }
  }

  useEffect(() => {
    setShowedCars(cars.filter((car) => car.homepage === 1));
  }, [cars]);

  console.log("showedCars", showedCars);

  useEffect(() => {
    setActiveSlideIndex(0);
    console.log("showedCars", showedCars);
  }, [showedCars]);

  useEffect(() => {
    if (showedCars.length > 0 && activeSlideIndex !== null) {
      const newPrevSlideIndex = mod(activeSlideIndex - 1, showedCars.length);
      const newNextSlideIndex = mod(activeSlideIndex + 1, showedCars.length);
      setPrevSlideIndex(newPrevSlideIndex);
      setNextSlideIndex(newNextSlideIndex);
    }
  }, [activeSlideIndex, showedCars]);

  return (
    <div className={styles.sliderContainer}>
      {showedCars.length > 0 &&
        activeSlideIndex !== null &&
        prevSlideIndex !== null &&
        nextSlideIndex !== null && (
          <>
            <div
              ref={prevSlideRef}
              className={`${styles.slide} ${styles.prevSlide}`}
            >
              <img
                onClick={() => handleChangeSlide(prevSlideIndex, "prev")}
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  showedCars[prevSlideIndex].images.find(
                    (image) => image.is_main === 1
                  ).path
                }`}
                alt="activeslide-image"
              />
            </div>

            <div className={`${styles.slide} ${styles.active}`}>
              <div className={styles.upperActiveSlide}>
                <div className={styles.activeSlideModel}>
                  <span>{showedCars[activeSlideIndex].model}</span>
                </div>
                <div className={styles.activeSlideLogo}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      showedCars[activeSlideIndex].brand.logo_path
                    }`}
                    alt={`${showedCars[activeSlideIndex].brand.name}`}
                  />
                </div>
              </div>
              <div
                ref={activeSlideRef}
                className={styles.imageContainerActiveSlide}
              >
                <div className={styles.activeSlideTitle}>
                  <span>{showedCars[activeSlideIndex].brand.name}</span>
                </div>

                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    showedCars[activeSlideIndex].images.find(
                      (image) => image.is_main === 1
                    ).path
                  }`}
                  alt="activeslide-image"
                />
              </div>
              <div className={styles.lowerActiveSlide}>
                <div className={styles.activeSlideDescription}>
                  <span>{showedCars[activeSlideIndex].description}</span>
                </div>
                <div className={styles.activeSlideInfo}>
                  <div>
                    <img src={carEngineIcon} alt="car-engine" />
                    <div className={styles.separatorLine}></div>
                    <span>{showedCars[activeSlideIndex].engine_size} cc</span>
                  </div>
                  <div>
                    <img src={powerIcon} alt="power" />
                    <div className={styles.separatorLine}></div>
                    <span>{showedCars[activeSlideIndex].horsepower} cv</span>
                  </div>
                  <div>
                    <img src={calendarIcon} alt="calendar" />
                    <div className={styles.separatorLine}></div>
                    <span>{showedCars[activeSlideIndex].year}</span>
                  </div>
                </div>
                <div className={styles.activeSlideButton}>
                  <Button>Vedi dettagli</Button>
                </div>
              </div>
            </div>

            <div
              ref={nextSlideRef}
              className={`${styles.slide} ${styles.nextSlide}`}
            >
              <img
                onClick={() => handleChangeSlide(nextSlideIndex, "next")}
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  showedCars[nextSlideIndex].images.find(
                    (image) => image.is_main === 1
                  ).path
                }`}
                alt="activeslide-image"
              />
            </div>
          </>
        )}
    </div>
  );
}

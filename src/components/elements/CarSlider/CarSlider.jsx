import { useState, useEffect, useRef, useContext } from "react";
import styles from "./CarSlider.module.css";
import gsap from "gsap";
import { GlobalContext } from "../../../contexts/GlobalContext";

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
              onClick={() => handleChangeSlide(prevSlideIndex, "prev")}
              className={`${styles.slide} ${styles.prevSlide}`}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  showedCars[prevSlideIndex].images.find(
                    (image) => image.is_main === 1
                  ).path
                }`}
                alt="activeslide-image"
              />
            </div>

            <div className={`${styles.slide} ${styles.active}`}>
              <div ref={activeSlideRef} className={styles.upperActiveSlide}>
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
              <div className={styles.lowerActiveSlide}></div>
            </div>

            <div
              ref={nextSlideRef}
              onClick={() => handleChangeSlide(nextSlideIndex, "next")}
              className={`${styles.slide} ${styles.nextSlide}`}
            >
              <img
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

import jumbo from "../../assets/img/jumbo.jpg";
import jumboVideo from "../../assets/video/luxrent-jumbo.mp4";
import styles from "./HomePage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import { useRef, useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function HomePage() {
  const videoRef = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isTimeoutPaused, setIsTimeoutPaused] = useState(false);
  const { brands } = useContext(GlobalContext);
  const [idSelectedBrand, setIdSelectedBrand] = useState(0);
  const selectedBrand = brands[idSelectedBrand];

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsVideoPaused(false);
    } else {
      video.pause();
      setIsVideoPaused(true);
    }
  }

  function handleChangeBrand(index) {
    setIdSelectedBrand(index);
    clearInterval(timeoutID);
    setIsTimeoutPaused(true);
  }

  const timeoutID = setTimeout(() => {
    if (brands && brands.length > 0 && !isTimeoutPaused) {
      setIdSelectedBrand((prev) => {
        return (prev + 1) % brands.length;
      });
    }
  }, 3000);

  return (
    <>
      <MenuSidebar />

      {/* JUMBO HERO SECTION */}
      <section>
        <div className={styles.jumboWrapper}>
          <video
            autoPlay
            muted
            loop
            ref={videoRef}
            className={styles.jumboVideo}
          >
            <source src={jumboVideo} type="video/mp4" />
            Error
          </video>
          <div className={styles.jumboContent}>
            <div className={styles.upperSectionWrapper}>
              <div className={styles.upperSection}>
                <div className={styles.upperLeftSection}>
                  <span>SICILIA, ITALIA</span>
                  <div className={styles.separatorLine}></div>
                  <div className={styles.upperSectionTitles}>
                    <span>Dalla città ai circuiti</span>
                    <span>il lusso a noleggio per ogni occasione.</span>
                  </div>
                </div>
                <div className={styles.upperRightSection}>
                  <span>
                    Luxrent offre il noleggia auto di lusso e supersportive,
                  </span>
                  <span>
                    offrendo esperienze uniche su strada con un servizio
                  </span>
                  <span>clienti impeccabile, attento e dedicato.</span>
                </div>
              </div>
              <div className={styles.sloganSection}>
                <span>Noleggia il lusso</span>
                <span>Vivi l'emozione.</span>
              </div>
            </div>

            <div className={styles.jumboLowerButton}>
              <span>Affitta ora</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>

            <div className={styles.jumboStopButton} onClick={toggleVideo}>
              {isVideoPaused ? (
                <i className="fa-solid fa-play"></i>
              ) : (
                <i className="fa-solid fa-pause"></i>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}

      <section>
        <div className={styles.brandsSectionWrapper}>
          <div className={styles.upper_brandsSection}>
            {brands && selectedBrand && (
              <>
                <div className={styles.description_brandsSection}>
                  <div className={styles.description_brandSection_wrapper}>
                    <div className={styles.title_description_brandsSection}>
                      <h2>{selectedBrand.name}</h2>
                      <span>Dal {selectedBrand.founded_year}</span>
                    </div>
                    <div className={styles.content_description_brandsSection}>
                      <span>{selectedBrand.description}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.pattern_brandsSection}></div>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    selectedBrand.main_image_path
                  }`}
                  alt={selectedBrand.name}
                  className={styles.main_image_brandsSection}
                />
              </>
            )}
          </div>
          <div className={styles.lower_brandsSection}>
            <div className={styles.brandsWrapper_brandsSection}>
              {brands &&
                brands.map((brand, index) => {
                  return (
                    <div
                      key={brand.id}
                      className={
                        selectedBrand?.id === brand.id
                          ? `${styles.logoCard_brandsSection} ${styles.selected}`
                          : styles.logoCard_brandsSection
                      }
                      onClick={() => handleChangeBrand(index)}
                    >
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${
                          brand.logo_path
                        }`}
                        alt={brand.name}
                        className={styles.logo_brandsSection}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

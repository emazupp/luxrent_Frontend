import jumbo from "../../assets/img/jumbo.jpg";
import jumboVideo from "../../assets/video/luxrent-jumbo.mp4";
import styles from "./HomePage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import { useRef, useState, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function HomePage() {
  const videoRef = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const { brands } = useContext(GlobalContext);

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
            <div className={styles.description_brandsSection}>
              <div className={styles.title_description_brandsSection}>
                <h2>Marchio</h2>
                <span>Dal 1999</span>
              </div>
              <div className={styles.content_desctiption_brandsSection}>
                <span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Magnam expedita atque tenetur nemo magni facere incidunt.
                  Rerum, ipsa, error velit beatae dignissimos rem tempora qui
                  eos, esse magni dolor aspernatur.
                </span>
              </div>
            </div>
            <div className={styles.image_brandsSection}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.lower_brandsSection}>
            <div className={styles.brandsWrapper_brandsSection}>
              {brands &&
                brands.map((brand) => {
                  console.log(
                    `${import.meta.env.VITE_BACKEND_URL}/${brand.logo_path}`
                  );
                  return (
                    <div
                      key={brand.id}
                      className={styles.logoCard_brandsSection}
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

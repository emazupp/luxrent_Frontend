import jumbo from "../../assets/img/jumbo.jpg";
import jumboVideo from "../../assets/video/luxrent-jumbo.mp4";
import styles from "./HomePage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import { useRef, useState } from "react";

export default function HomePage() {
  const videoRef = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

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
      <div className={styles.jumboWrapper}>
        <video autoPlay muted loop ref={videoRef} className={styles.jumboVideo}>
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
            <i class="fa-solid fa-chevron-down"></i>
          </div>

          <div className={styles.jumboStopButton} onClick={toggleVideo}>
            {isVideoPaused ? (
              <i class="fa-solid fa-play"></i>
            ) : (
              <i class="fa-solid fa-pause"></i>
            )}
          </div>
        </div>
      </div>
      <div className={styles.jumboWrapper}>
        <img src={jumbo} alt="jumbo-image" />
      </div>
    </>
  );
}

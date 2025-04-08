import jumbo from "../../assets/img/jumbo.jpg";
import jumboVideo from "../../assets/video/luxrent-jumbo.mp4";
import styles from "./HomePage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import { useRef, useState, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function HomePage() {
  const videoRef = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const { brands, idSelectedBrand, setIdSelectedBrand, stopTimeout } =
    useContext(GlobalContext);
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
    stopTimeout();
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
          <div className={styles.titleSection}>
            <span>LE NOSTRE MARCHE</span>
          </div>
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

      {/* ABOUT US SECTION */}

      <section>
        <div className={styles.aboutUsSectionWrapper}>
          <div className={styles.titleSection}>
            <span>CHI SIAMO</span>
          </div>

          <div className={styles.upper_aboutUsSection}>
            <div className={styles.description_aboutUsSection}>
              <span>
                <strong>
                  Luxrent nasce dalla passione per l'automobile di prestigio e
                  l'eccellenza del servizio
                </strong>
                , offrendo esperienze su misura a bordo di vetture
                straordinarie, con un'attenzione costante ai dettagli e alle
                esigenze di ogni cliente.
              </span>
              <div className={styles.subDescriptionContainer_aboutUsSection}>
                <div
                  className={styles.subDescriptionSeparatorLine_aboutUsSection}
                ></div>
                <div className={styles.subDescription_aboutUsSection}>
                  <span>
                    Ogni noleggio è curato nei minimi dettagli, dalla selezione
                    del modello alla consegna personalizzata. Luxrent garantisce
                    puntualità, discrezione e massima flessibilità, trasformando
                    ogni viaggio in un'esperienza esclusiva pensata per chi ama
                    distinguersi.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.lower_aboutUsSection}>
            <div className={styles.button_aboutUsSection}>
              <span>Scopri di più</span>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER SERVICE SECTION */}
      <section>
        <div className={styles.customerServiceSectionWrapper}>
          <div className={styles.titleSection}>
            <span>ASSISTENZA E SERVIZI</span>
          </div>

          <div className={styles.content_customerServiceSection}>
            <div className={styles.image_customerServiceSection}></div>
            <div className={styles.description_customerServiceSection}>
              <div className={styles.titleDescription_customerServiceSection}>
                <h2>Affidabilità senza compromessi</h2>
              </div>
              <div className={styles.contentDescription_customerServiceSection}>
                <span>
                  Offriamo un servizio clienti disponibile 24/7, con consulenti
                  dedicati pronti a supportarti in ogni fase: dalla prenotazione
                  alla riconsegna. Consegna a domicilio, gestione documentale
                  veloce e assistenza personalizzata sono solo alcuni dei
                  servizi pensati per garantire un'esperienza impeccabile.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

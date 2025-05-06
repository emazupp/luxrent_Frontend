import jumboVideo from "../../assets/video/luxrent-jumbo.mp4";
import customerService from "../../assets/img/customer-service.jpg";
import styles from "./HomePage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import { useRef, useState, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import Logo from "../../components/elements/Logo/Logo";
import CarSlider from "../../components/elements/CarSlider/CarSlider";

export default function HomePage() {
  const videoRef = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const { brands, idSelectedBrand, setIdSelectedBrand, stopTimeout, cars } =
    useContext(GlobalContext);
  const selectedBrand = brands[idSelectedBrand];

  function handleScrollToTop() {
    const jumboSection = document.getElementById("jumboSection");
    if (jumboSection) {
      jumboSection.scrollIntoView({ behavior: "smooth" });
    }
  }

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

  function handleJumboButton() {
    const brandsSection = document.getElementById("brandsSection");
    if (brandsSection) {
      brandsSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <MenuSidebar />

      {/* JUMBO HERO SECTION */}
      <section id="jumboSection">
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

            <div
              onClick={handleJumboButton}
              className={styles.jumboLowerButton}
            >
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
      <section id="brandsSection">
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

      {/* CAR SLIDER SECTION */}
      <section>
        <CarSlider />
      </section>

      {/* CUSTOMER SERVICE SECTION */}
      <section>
        <div className={styles.customerServiceSectionWrapper}>
          <div className={styles.titleSection}>
            <span>ASSISTENZA E SERVIZI</span>
          </div>

          <div className={styles.content_customerServiceSection}>
            <div className={styles.image_customerServiceSection}>
              <img
                src={customerService}
                alt="customer-service-img"
                className={styles.fadedImage}
              />
            </div>
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

      {/* CONTACT US SECTION */}
      <section className={styles.halfSection}>
        <div className={styles.contactUsSectionWrapper}>
          <div className={styles.titleSection}>
            <span>CONTATTACI</span>
          </div>
          <div className={styles.content_contactUsSection}>
            <div className={styles.leftContent_contactUsSection}>
              <div className={styles.leftContentWrapper_contactUsSection}>
                <Logo dark={true} />
                <span>
                  Per richieste, preventivi o maggiori informazioni sui nostri
                  servizi di noleggio, contattaci: il nostro team è a tua
                  disposizione.
                </span>
                <button className={styles.contactButton_contactUsSection}>
                  Contattaci
                </button>
              </div>
            </div>
            <div className={styles.rightContent_contactUsSection}>
              <div className={styles.rightContentWrapper_contactUsSection}>
                <div className={styles.rightContentAddress_contactUsSection}>
                  <small>Indirizzo</small>
                  <span className={styles.contactUsInfo_contactUsSection}>
                    Via Roma 150, Milano 200019, Italia
                  </span>
                </div>

                <div className={styles.rightContentBackToTop_contactUsSection}>
                  <span>Ritorna in alto</span>
                  <div
                    onClick={handleScrollToTop}
                    className={styles.backToTop_contactUsSection}
                  >
                    <i class="fa-solid fa-arrow-up"></i>
                  </div>
                </div>

                <div className={styles.rightContentContact_contactUsSection}>
                  <small>Contattaci</small>
                  <span className={styles.contactUsInfo_contactUsSection}>
                    +39 02 12345678
                  </span>
                  <span className={styles.contactUsInfo_contactUsSection}>
                    info@luxrent.it
                  </span>
                </div>

                <div className={styles.rightContentSocial_contactUsSection}>
                  <div
                    className={
                      styles.rightContentSocialWrapper_contactUsSection
                    }
                  >
                    <small>Seguici</small>
                    <div className={styles.socialIcons_contactUsSection}>
                      <i className="fa-brands fa-instagram"></i>
                      <i className="fa-brands fa-facebook"></i>
                      <i className="fa-brands fa-twitter"></i>
                      <i className="fa-brands fa-linkedin"></i>
                      <i className="fa-brands fa-youtube"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

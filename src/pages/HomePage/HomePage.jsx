import jumbo from "../../assets/img/jumbo.jpg";
import styles from "./HomePage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";

export default function HomePage() {
  return (
    <>
      <MenuSidebar />
      <div className={styles.jumboWrapper}>
        <div className={styles.jumboContent}>
          <div className={styles.sectionTitle}>
            <h1>Il tuo viaggio inizia qui</h1>
          </div>
          <div className={styles.jumboLowerButton}>
            <span>Affita ora un'auto</span>
          </div>
        </div>
      </div>
      <div className={styles.jumboWrapper}>
        <img src={jumbo} alt="jumbo-image" />
      </div>
    </>
  );
}

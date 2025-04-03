import jumbo from "../../assets/img/jumbo.jpg";
import styles from "./HomePage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";

export default function HomePage() {
  return (
    <>
      <MenuSidebar />
      <div className={styles.jumboWrapper}>
        <img src={jumbo} alt="jumbo-image" />
      </div>
      <div className={styles.jumboWrapper}>
        <img src={jumbo} alt="jumbo-image" />
      </div>
    </>
  );
}

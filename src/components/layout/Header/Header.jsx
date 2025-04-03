import styles from "./Header.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";

export default function Header() {
  const { toggleSidebar } = useContext(GlobalContext);
  return (
    <header className={styles.header}>
      <div className={styles.menuContainer} onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
        <span>Menu</span>
      </div>
      <div className={styles.logoContainer}>
        <h1>LUXRENT</h1>
      </div>
      <div className={styles.userWrapper}>
        <div className={styles.userContainer}>
          <i className="fa-regular fa-user"></i>
        </div>
      </div>
    </header>
  );
}

import styles from "./Header.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import Logo from "../../elements/Logo/Logo";

export default function Header() {
  const { toggleSidebar } = useContext(GlobalContext);
  return (
    <header className={styles.header}>
      <div className={styles.menuContainer} onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <Logo />
      <div className={styles.userWrapper}>
        <div className={styles.userContainer}>
          <i className="fa-regular fa-user"></i>
        </div>
      </div>
    </header>
  );
}

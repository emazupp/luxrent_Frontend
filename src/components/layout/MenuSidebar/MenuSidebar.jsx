import styles from "./MenuSidebar.module.css";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { useContext } from "react";
import Overlay from "../../elements/Overlay/Overlay";

export default function MenuSidebar() {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);

  return (
    <>
      {isSidebarOpen && (
        <>
          <Overlay />
          <div className={styles.menuSidebarWrapper}>
            <div className={styles.menuSidebar}>
              <ul>
                <li>Home</li>
                <li>Flotta</li>
                <li>Le mie prenotazioni</li>
              </ul>
            </div>
            <div className={styles.menuSidebarClose} onClick={toggleSidebar}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </>
      )}
    </>
  );
}

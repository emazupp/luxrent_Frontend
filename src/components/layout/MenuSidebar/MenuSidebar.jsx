import styles from "./MenuSidebar.module.css";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { useContext } from "react";
import Overlay from "../../elements/Overlay/Overlay";
import { NavLink } from "react-router-dom";

export default function MenuSidebar() {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);

  return (
    <>
      {isSidebarOpen && (
        <>
          <Overlay />
          <div className={styles.menuSidebarWrapper}>
            <div className={styles.menuSidebar}>
              <NavLink to="/" className={styles.menuSidebarItem}>
                <span>Home</span>
                <i class="fa-solid fa-chevron-right"></i>
              </NavLink>
              <NavLink to="/search" className={styles.menuSidebarItem}>
                <span>Flotta</span>
                <i class="fa-solid fa-chevron-right"></i>
              </NavLink>
              <NavLink to="/mybooking" className={styles.menuSidebarItem}>
                <span>Le mie prenotazioni</span>
                <i class="fa-solid fa-chevron-right"></i>
              </NavLink>
              <NavLink to="#aboutus" className={styles.menuSidebarItem}>
                <span>Chi siamo</span>
                <i class="fa-solid fa-chevron-right"></i>
              </NavLink>
              <NavLink to="#contactus" className={styles.menuSidebarItem}>
                <span>Contatti</span>
                <i class="fa-solid fa-chevron-right"></i>
              </NavLink>
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

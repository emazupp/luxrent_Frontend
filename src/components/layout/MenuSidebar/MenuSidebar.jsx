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
            <div className={styles.menuSidebarClose} onClick={toggleSidebar}>
              <i className="fa-solid fa-xmark"></i>
            </div>
            <div className={styles.menuSidebar}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.menuSidebarItem} ${isActive ? styles.active : ""}`
                }
              >
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `${styles.menuSidebarItem} ${isActive ? styles.active : ""}`
                }
              >
                <span>Flotta</span>
              </NavLink>
              <NavLink
                to="/mybookings"
                className={({ isActive }) =>
                  `${styles.menuSidebarItem} ${isActive ? styles.active : ""}`
                }
              >
                <span>Le mie prenotazioni</span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
}

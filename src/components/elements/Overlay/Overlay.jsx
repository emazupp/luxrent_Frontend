import styles from "./Overlay.module.css";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { useContext } from "react";

export default function Overlay() {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);

  return (
    <>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
    </>
  );
}

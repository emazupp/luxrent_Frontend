import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import styles from "./DetailsPage.module.css";

export default function DetailsPage() {
  const carID = parseInt(useParams().id);
  const { cars } = useContext(GlobalContext);

  const car = cars.length > 0 ? cars.find((car) => car.id === carID) : null;
  return (
    <>
      <MenuSidebar />
      <div className={styles.detailsPage}>
        {car != null ? (
          <>
            <div className={styles.detailsPage_header}>
              <div className={styles.backArrow}>indietro</div>
              <h1>
                {car.brand.name} {car.model}
              </h1>
            </div>
            <div className={styles.detailsPage_content}></div>
            <div className={styles.detailsPage_footer}></div>
          </>
        ) : (
          <div className={styles.noCarFound}>Nessuna macchina trovata</div>
        )}
      </div>
    </>
  );
}

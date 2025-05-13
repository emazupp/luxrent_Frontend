import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ car }) {
  const primaryImagePath = car.images.find(
    (image) => image.is_main == true
  )?.path;
  let navigate = useNavigate();
  function handleCardClick(carID) {
    navigate(`/car/${carID}`);
  }

  return (
    <div
      className={styles.cardContainer}
      onClick={() => handleCardClick(car.id)}
    >
      <div className={styles.cardHeader}>
        <p className={styles.carBrand}>{car.brand.name}</p>
        <p className={styles.carModel}>{car.model}</p>
      </div>
      <div className={styles.cardImageContainer}>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${primaryImagePath}`}
          alt={car.model}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardFooter}>
        <p className={styles.carPricePerDayContainer}>
          <span className={styles.carPricePerDay}>
            €{Math.trunc(car.price_per_day)}
          </span>
          /giorno
        </p>
      </div>
    </div>
  );
}

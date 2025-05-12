import styles from "./SearchPage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import Button from "../../components/elements/Button/Button";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import Card from "../../components/elements/Card/Card";

export default function SearchPage() {
  const { cars, brands, categories } = useContext(GlobalContext);
  const [IDSelectedBrand, setIDSelectedBrand] = useState(1);
  const [showedCars, setShowedCars] = useState([]);

  useEffect(() => {
    setShowedCars(cars);
  }, [cars]);

  function handleBrandClick(currentBrandName) {
    if (currentBrandName === "reset") {
      setIDSelectedBrand(0);
      setShowedCars(cars);
    } else {
      const newIDSelectedBrand = brands.find(
        (brand) => currentBrandName === brand.name
      ).id;
      setIDSelectedBrand(newIDSelectedBrand);
      setShowedCars((prev) => {
        return cars.filter((car) => car.brand.id === newIDSelectedBrand);
      });
    }
  }

  function handleModelClick(currentModelName) {
    if (currentModelName === "reset") {
      setShowedCars((prev) => {
        return cars.filter((car) => car.brand.id === IDSelectedBrand);
      });
    } else {
      const newIDSelectedModel = cars.find(
        (car) => currentModelName === car.model
      ).id;
      setShowedCars((prev) => {
        return cars.filter((car) => car.id === newIDSelectedModel);
      });
    }
  }

  function handleResetFilters() {}

  return (
    <>
      <MenuSidebar />
      <div className={styles.searchPageContainer}>
        {/* UPPER FILTERS */}
        <div className={styles.upperSearchPage}>
          <div className={styles.upperFilterContainer}>
            <div className={styles.upperFilters}>
              <div className={styles.selectUpperFilter}>
                <label htmlFor="brand">Brand</label>
                <select
                  name="brand"
                  id="brand"
                  onChange={(e) => handleBrandClick(e.target.value)}
                >
                  <option value="reset">Seleziona brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.selectUpperFilter}>
                <label htmlFor="model">Modello</label>
                <select
                  name="model"
                  id="model"
                  onChange={(e) => handleModelClick(e.target.value)}
                >
                  <option value="reset">Seleziona modello</option>
                  {cars
                    .filter((car) => car.brand.id === IDSelectedBrand)
                    .map((car) => (
                      <option key={car.id} value={car.model}>
                        {car.model}
                      </option>
                    ))}
                </select>
              </div>

              <div className={styles.inputUpperFilter}>
                <label htmlFor="pickup_date">Data ritiro </label>
                <input type="date" id="pickup_date" name="pickup_date"></input>
              </div>

              <div className={styles.inputUpperFilter}>
                <label htmlFor="return_date">Data ritorno </label>
                <input type="date" id="return_date" name="return_date"></input>
              </div>
            </div>
          </div>
          <div className={styles.upperFilterButtonContainer}>
            <Button>Cerca</Button>
          </div>
        </div>
        {/* SIDE FILTERS AND CONTENT */}
        <div className={styles.contentSearchPage}>
          <div className={styles.contentWrapper}>
            {/* SIDE FILTERS */}
            <div className={styles.sideFilterContainer}>
              <div className={styles.sideFilterHeader}>
                <span>Filtri</span>
                <span
                  className={styles.clearAllFilters}
                  onClick={handleResetFilters}
                >
                  Cancella filtri
                </span>
              </div>
              <div className={styles.separatorLine}></div>

              <span>Prezzo</span>
              <div className={styles.priceRangeContainer}>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  defaultValue="500"
                ></input>
                <span>€ 0</span>
                <span>€ 1000</span>
              </div>

              <span>Trasmissione</span>
              <div>
                <button>Automatica</button>
                <button>Manuale</button>
              </div>

              <span>Carburante</span>
              <div>
                <button>Diesel</button>
                <button>Metano</button>
                <button>Gpl</button>
                <button>Ibrido</button>
                <button>Elettrica</button>
              </div>

              <span>Posti</span>
              <div>
                <button>2 posti</button>
                <button>4+ posti</button>
              </div>

              <span>Disponibilità</span>
              <div>
                <input type="checkbox" name="avaiable" id="avaiable" />
                <label htmlFor="avaiable">Mostra solo disponibili</label>
              </div>

              <span>Tipologia</span>
              <div>
                {categories.map((category) => (
                  <button key={category.id}>{category.name}</button>
                ))}
              </div>
            </div>

            {/* CONTENTS */}
            <div className={styles.contentContainer}>
              <span>Risultati trovati</span>
              <div className={styles.cardsContainer}>
                {showedCars.length > 0 ? (
                  showedCars.map((car) => <Card key={car.id} car={car} />)
                ) : (
                  <span>Nessun risultato trovato</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

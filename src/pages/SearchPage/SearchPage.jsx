import styles from "./SearchPage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import Button from "../../components/elements/Button/Button";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import Card from "../../components/elements/Card/Card";
import DoubleSliderRange from "../../components/elements/DoubleSliderRange/DoubleSliderRange";

export default function SearchPage() {
  const { cars, brands, categories } = useContext(GlobalContext);
  const [IDSelectedBrand, setIDSelectedBrand] = useState(1);
  const [showedCars, setShowedCars] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(0);
  const [sideFiltersData, setSideFiltersData] = useState({
    price: { min: 0, max: 0 },
    year: { min: 0, max: 0 },
    transmission: "",
    fuel: "",
    seats: "",
    available: false,
    category: "",
  });

  useEffect(() => {
    setShowedCars(cars);
  }, [cars]);

  useEffect(() => {
    getMinMaxPrice();
    getMinMaxYear();
  }, [showedCars]);

  function getMinMaxPrice() {
    const allPricesArray = [];
    cars.forEach((car) => {
      allPricesArray.push(car.price_per_day);
    });
    setMinPrice(Math.min(...allPricesArray));
    setMaxPrice(Math.max(...allPricesArray));
  }

  function getMinMaxYear() {
    const allYearsArray = [];
    cars.forEach((car) => {
      allYearsArray.push(car.year);
    });
    setMinYear(Math.min(...allYearsArray));
    setMaxYear(Math.max(...allYearsArray));
  }

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
      {cars.length > 0 && cars !== undefined ? (
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
                  <input
                    type="date"
                    id="pickup_date"
                    name="pickup_date"
                  ></input>
                </div>

                <div className={styles.inputUpperFilter}>
                  <label htmlFor="return_date">Data ritorno </label>
                  <input
                    type="date"
                    id="return_date"
                    name="return_date"
                  ></input>
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
              <form action="">
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

                  <div className={styles.sideFiltersSection}>
                    <span>Prezzo</span>
                    <div className={styles.priceRangeContainer}>
                      <DoubleSliderRange
                        min={minPrice}
                        max={maxPrice}
                        graphic={true}
                      />
                    </div>
                  </div>

                  <div className={styles.sideFiltersSection}>
                    <span>Anno</span>
                    <div className={styles.yearRangeContainer}>
                      <DoubleSliderRange
                        min={minYear}
                        max={maxYear}
                        graphic={false}
                      />
                    </div>
                  </div>

                  <div className={styles.sideFiltersSection}>
                    <span>Trasmissione</span>
                    <div>
                      <button>Automatica</button>
                      <button>Manuale</button>
                    </div>
                  </div>
                  <div className={styles.sideFiltersSection}>
                    <span>Carburante</span>
                    <div>
                      <button>Diesel</button>
                      <button>Metano</button>
                      <button>Gpl</button>
                      <button>Ibrido</button>
                      <button>Elettrica</button>
                    </div>
                  </div>
                  <div className={styles.sideFiltersSection}>
                    <span>Posti</span>
                    <div>
                      <button>2 posti</button>
                      <button>4+ posti</button>
                    </div>
                  </div>
                  <div className={styles.sideFiltersSection}>
                    <span>Disponibilità</span>
                    <div>
                      <input type="checkbox" name="avaiable" id="avaiable" />
                      <label htmlFor="avaiable">Mostra solo disponibili</label>
                    </div>
                  </div>

                  <div className={styles.sideFiltersSection}>
                    <span>Tipologia</span>
                    <div>
                      {categories.map((category) => (
                        <button key={category.id}>{category.name}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </form>

              {/* CONTENTS */}
              <div className={styles.contentContainer}>
                <span>Risultati trovati</span>
                <div className={styles.cardsContainer}>
                  {showedCars.length > 0 ? (
                    showedCars.map((car) => <Card key={car.id} car={car} />)
                  ) : (
                    <span>Nessun risultato trovato</span>
                  )}
                  <div className={styles.bottomSpaceCard}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <span>Caricamento...</span>
        </div>
      )}
    </>
  );
}

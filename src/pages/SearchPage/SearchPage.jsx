import styles from "./SearchPage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";
import Toggle from "../../components/elements/Toggle/Toggle";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useEffect, useState } from "react";
import Card from "../../components/elements/Card/Card";
import DoubleSliderRange from "../../components/elements/DoubleSliderRange/DoubleSliderRange";

export default function SearchPage() {
  const { cars, brands, categories } = useContext(GlobalContext);
  const defaultFilters = {
    carID: 0,
    brandID: 0,
    pickup_date: "",
    return_date: "",
    price: { min: 0, max: 0 },
    year: { min: 0, max: 0 },
    currentPrice: { min: 0, max: 0 },
    currentYear: { min: 0, max: 0 },
    transmission: "",
    fuel_type: "",
    seats: "",
    is_available: "",
    category: "",
  };

  const transmissionTypes = ["Manuale", "Automatica"];
  const fuelTypes = [
    "Benzina",
    "Diesel",
    "Metano",
    "Gpl",
    "Ibrido",
    "Elettrica",
  ];
  const seatsTypes = ["2 posti", "4+ posti"];

  const [filtersData, setFiltersData] = useState(defaultFilters);

  let showedCars =
    cars.length > 0 && cars != undefined
      ? cars.filter((car) => {
          const isBrandMatch =
            filtersData.brandID === 0 ||
            car.brand.id === parseInt(filtersData.brandID);

          const isCarMatch =
            filtersData.carID === 0 || car.id === parseInt(filtersData.carID);

          const isPriceMatch =
            filtersData.currentPrice.min === 0 &&
            filtersData.currentPrice.max === 0
              ? true
              : car.price_per_day >= filtersData.currentPrice.min &&
                car.price_per_day <= filtersData.currentPrice.max;

          const isYearMatch =
            filtersData.currentYear.min === 0 &&
            filtersData.currentYear.max === 0
              ? true
              : car.year >= filtersData.currentYear.min &&
                car.year <= filtersData.currentYear.max;

          const isTransmissionMatch =
            filtersData.transmission === "" ||
            car.transmission === filtersData.transmission;

          const isFuelTypeMatch =
            filtersData.fuel_type === "" ||
            car.fuel_type === filtersData.fuel_type;

          const isSeatsMatch =
            filtersData.seats === "" ||
            (parseInt(filtersData.seats[0]) <= 2
              ? car.seats <= parseInt(filtersData.seats[0])
              : car.seats >= parseInt(filtersData.seats[0]));

          const isAvailableMatch =
            filtersData.is_available === "" ||
            (filtersData.is_available === "true" && car.is_available);

          const isCategoryMatch =
            filtersData.category === "" ||
            car.category.name === filtersData.category;

          return (
            isBrandMatch &&
            isCarMatch &&
            isPriceMatch &&
            isYearMatch &&
            isTransmissionMatch &&
            isFuelTypeMatch &&
            isSeatsMatch &&
            isAvailableMatch &&
            isCategoryMatch
          );
        })
      : [];

  function initFiltersData() {
    if (cars.length === 0) return;

    const priceArray = cars.map((car) => car.price_per_day);
    const yearArray = cars.map((car) => car.year);

    const minPrice = Math.min(...priceArray);
    const maxPrice = Math.max(...priceArray);
    const minYear = Math.min(...yearArray);
    const maxYear = Math.max(...yearArray);

    setFiltersData((prev) => ({
      ...prev,
      price: { min: minPrice, max: maxPrice },
      year: { min: minYear, max: maxYear },
    }));
  }

  useEffect(() => {
    initFiltersData();
  }, [cars]);

  function handleUpdateFiltersData(e) {
    let currentValue =
      e.target.name === "carID" || e.target.name === "brandID"
        ? parseInt(e.target.value)
        : e.target.value;

    if (e.target.name === "brandID" && e.target.value !== filtersData.brandID) {
      setFiltersData({
        ...filtersData,
        brandID: currentValue,
        carID: 0,
      });
    } else {
      setFiltersData({
        ...filtersData,
        [e.target.name]: currentValue,
      });
    }
  }

  function handleResetFilters() {
    setFiltersData(defaultFilters);
    initFiltersData();
  }

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
                    name="brandID"
                    id="brand"
                    value={filtersData.brandID}
                    onChange={(e) => {
                      handleUpdateFiltersData(e);
                    }}
                  >
                    <option value="0">Qualsiasi</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.selectUpperFilter}>
                  <label htmlFor="model">Modello</label>
                  <select
                    name="carID"
                    id="model"
                    value={filtersData.carID}
                    disabled={filtersData.brandID === 0}
                    onChange={(e) => handleUpdateFiltersData(e)}
                  >
                    <option value="0">Qualsiasi</option>
                    {filtersData.brandID != 0 &&
                      cars
                        .filter(
                          (car) =>
                            car.brand.id === parseInt(filtersData.brandID)
                        )
                        .map((car) => (
                          <option key={car.id} value={car.id}>
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
                    value={filtersData.pickup_date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleUpdateFiltersData}
                  ></input>
                </div>

                <div className={styles.inputUpperFilter}>
                  <label htmlFor="return_date">Data ritorno </label>
                  <input
                    type="date"
                    id="return_date"
                    name="return_date"
                    disabled={
                      filtersData.pickup_date === "" ||
                      filtersData.pickup_date === undefined
                    }
                    min={filtersData.pickup_date}
                    value={filtersData.return_date}
                    onChange={handleUpdateFiltersData}
                  ></input>
                </div>
              </div>
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

                <div className={styles.sideFiltersSection}>
                  <span>Prezzo</span>
                  <div className={styles.priceRangeContainer}>
                    <DoubleSliderRange
                      min={filtersData.price.min}
                      max={filtersData.price.max}
                      setFiltersData={setFiltersData}
                      graphic={true}
                    />
                  </div>
                </div>

                <div className={styles.sideFiltersSection}>
                  <span>Anno</span>
                  <div className={styles.yearRangeContainer}>
                    <DoubleSliderRange
                      min={filtersData.year.min}
                      max={filtersData.year.max}
                      setFiltersData={setFiltersData}
                      graphic={false}
                    />
                  </div>
                </div>

                <div className={styles.sideFiltersSection}>
                  <span>Trasmissione</span>
                  <div className={styles.toggleContainer}>
                    {transmissionTypes.map((transmission) => (
                      <Toggle
                        key={transmission}
                        checked={filtersData.transmission === transmission}
                        onChange={(checked) =>
                          setFiltersData((prev) => ({
                            ...prev,
                            transmission: checked ? transmission : "",
                          }))
                        }
                      >
                        {transmission}
                      </Toggle>
                    ))}
                  </div>
                </div>
                <div className={styles.sideFiltersSection}>
                  <span>Carburante</span>
                  <div className={styles.toggleContainer}>
                    {fuelTypes.map((fuel_type) => (
                      <Toggle
                        key={fuel_type}
                        checked={filtersData.fuel_type === fuel_type}
                        onChange={(checked) =>
                          setFiltersData((prev) => ({
                            ...prev,
                            fuel_type: checked ? fuel_type : "",
                          }))
                        }
                      >
                        {fuel_type}
                      </Toggle>
                    ))}
                  </div>
                </div>
                <div className={styles.sideFiltersSection}>
                  <span>Posti</span>
                  <div className={styles.toggleContainer}>
                    {seatsTypes.map((seats) => (
                      <Toggle
                        key={seats}
                        checked={filtersData.seats === seats}
                        onChange={(checked) =>
                          setFiltersData((prev) => ({
                            ...prev,
                            seats: checked ? seats : "",
                          }))
                        }
                      >
                        {seats}
                      </Toggle>
                    ))}
                  </div>
                </div>
                <div className={styles.sideFiltersSection}>
                  <span>Disponibilità</span>
                  <div className={styles.toggleContainer}>
                    <Toggle
                      checked={filtersData.is_available}
                      onChange={(checked) =>
                        setFiltersData((prev) => ({
                          ...prev,
                          is_available: checked ? "true" : "",
                        }))
                      }
                    >
                      Mostra solo disponibili
                    </Toggle>
                  </div>
                </div>

                <div className={styles.sideFiltersSection}>
                  <span>Tipologia</span>
                  <div className={styles.toggleContainer}>
                    {categories.map((category) => (
                      <Toggle
                        key={category.id}
                        checked={filtersData.category === category.name}
                        onChange={(checked) =>
                          setFiltersData((prev) => ({
                            ...prev,
                            category: checked ? category.name : "",
                          }))
                        }
                      >
                        {category.name}
                      </Toggle>
                    ))}
                  </div>
                </div>
              </div>

              {/* CONTENTS */}
              <div className={styles.contentContainer}>
                <span>
                  Risultati trovati (
                  {showedCars.length === 1
                    ? showedCars.length + " veicolo"
                    : showedCars.length + " veicoli"}
                  )
                </span>
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
          <div
            className={`spinner-border ${styles.spinnerBootstrap}`}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

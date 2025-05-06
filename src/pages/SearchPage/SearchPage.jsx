import styles from "./SearchPage.module.css";
import MenuSidebar from "../../components/layout/MenuSidebar/MenuSidebar";

export default function SearchPage() {
  return (
    <>
      <MenuSidebar />
      <div className={styles.searchPageContainer}>
        <div className={styles.upperSearchPage}>
          <div className={styles.upperFilterContainer}>
            <div>
              <select
                className="form-select form-select-lg mb-3"
                name="brand"
                id="brand"
              >
                <option value="brand">Brand</option>
                <option value="brand1">Brand 1</option>
                <option value="brand2">Brand 2</option>
                <option value="brand3">Brand 3</option>
              </select>
            </div>
            <div>
              <select
                className="form-select form-select-lg mb-3"
                name="model"
                id="model"
              >
                <option value="brand">Modello</option>
                <option value="brand1">Modello 1</option>
                <option value="brand2">Modello 2</option>
                <option value="brand3">Modello 3</option>
              </select>
            </div>
            <div>
              <label for="pickup_date">Data ritiro:</label>
              <input type="date" id="pickup_date" name="pickup_date"></input>
            </div>
            <div>
              <label for="return_date">Data ritiro:</label>
              <input type="date" id="return_date" name="return_date"></input>
            </div>
          </div>
          <div className={styles.upperFilterButtonContainer}>
            <button className="btn btn-primary">Cerca</button>
          </div>
        </div>
        <div className={styles.contentSearchPage}></div>
      </div>
    </>
  );
}

import { createContext, useEffect, useState, useRef } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isTimeoutPaused, setIsTimeoutPaused] = useState(false);
  const [idSelectedBrand, setIdSelectedBrand] = useState(0);
  const timeoutRef = useRef(null);

  const scrollPosition = useRef(0);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newIsSidebarOpen = !prev;

      if (newIsSidebarOpen) {
        scrollPosition.current = window.scrollY;
        document.body.style.top = `-${scrollPosition.current}px`;
        document.body.classList.add("stopScroll");
      } else {
        const scrollY = document.body.style.top;
        document.body.style.top = "";
        document.body.classList.remove("stopScroll");
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }

      return newIsSidebarOpen;
    });
  };

  const startTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (brands.length > 0 && !isTimeoutPaused) {
        setIdSelectedBrand((prev) => (prev + 1) % brands.length);
      }
    }, 3000);
  };

  const stopTimeout = () => {
    clearTimeout(timeoutRef.current);
    setIsTimeoutPaused(true);
  };

  async function getBrands() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/brands`);
    const data = await res.json();
    setBrands(data.results);
  }

  async function getCars() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cars`);
    const data = await res.json();
    setCars(data.results);
  }

  async function getCategory() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/categories`
    );
    const data = await res.json();
    setCategories(data.results);
  }

  useEffect(() => {
    getBrands();
    getCars();
    getCategory();
  }, []);

  useEffect(() => {
    if (brands.length > 0 && !isTimeoutPaused) {
      startTimeout();
    }

    return () => clearTimeout(timeoutRef.current);
  }, [idSelectedBrand, isTimeoutPaused, brands]);

  return (
    <GlobalContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        brands,
        categories,
        idSelectedBrand,
        setIdSelectedBrand,
        setIsTimeoutPaused,
        stopTimeout,
        cars,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

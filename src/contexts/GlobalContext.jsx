import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [brands, setBrands] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newIsSidebarOpen = !prev;
      if (newIsSidebarOpen) {
        document.body.style.overflowY = "scroll";
        document.body.style.position = "fixed";
      } else {
        document.body.style.overflowY = "visible";
        document.body.style.position = "static";
      }
      return newIsSidebarOpen;
    });
  };

  async function getBrands() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/brands`);
    const data = await res.json();
    setBrands(data.results);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <GlobalContext.Provider value={{ isSidebarOpen, toggleSidebar, brands }}>
      {children}
    </GlobalContext.Provider>
  );
}

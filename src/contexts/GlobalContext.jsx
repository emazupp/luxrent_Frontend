import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <GlobalContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </GlobalContext.Provider>
  );
}

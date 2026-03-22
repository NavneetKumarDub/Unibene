import { createContext, useContext, useEffect, useState } from "react";

const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const local = localStorage.getItem("saved");
    if (local) {
      setSaved(JSON.parse(local));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved]);

  const isSaved = (id) => {
    return saved.some(item => item._id === id);
  };

  const toggleSave = (product) => {
    setSaved(prev => {
      if (prev.some(item => item._id === product._id)) {
        return prev.filter(item => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  return (
    <SavedContext.Provider value={{ saved, isSaved, toggleSave }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
"use client";

import { createContext, useContext, useState } from "react";

const dniCont = createContext();

export const useDni = () => useContext(dniCont);

export const DniProvider = ({ children }) => {
  const [dni, setDni] = useState("");

  return (
    <dniCont.Provider value={{ dni, setDni }}>{children}</dniCont.Provider>
  );
};

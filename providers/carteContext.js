import { createContext, useContext } from "react";

const CarteContext = createContext(null);

export const useCarte = () => {
  return useContext(CarteContext);
};

export default CarteContext;

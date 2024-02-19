"use client";
import { useState, createContext, useContext, useEffect } from "react";
import {
  buscarDatos,
  buscarDatosSoc,
  buscarDatosRes,
  buscarDatosPrest,
  buscarDatosCargos,
} from "@/config/endpoints";
import { useDni } from "@/context/dni.context";

// Crea el contexto de búsqueda
const SearchContext = createContext();

// Proveedor de contexto de búsqueda
export const SearchProvider = ({ children }) => {
  const resultado = useSearchProv();
  return (
    <SearchContext.Provider value={resultado}>
      {children}
    </SearchContext.Provider>
  );
};
// Hook personalizado para acceder al contexto de búsqueda
export const useSearch = () => {
  return useContext(SearchContext);
};
// Hook personalizado para realizar búsquedas
export function useSearchProv() {

  const [loading, setLoading] = useState(false);

  const { dni } = useDni();
  const [resultados, setResultados] = useState({
    admEvol: [],
    simaEvol: [],
    facEvol: [],
    amupEvol: [],
    SimaSoc: [],
    AdmSoc: [],
    FacSoc: [],
    AmupSoc: [],
    ResumenSima: [],
    ResumenAdm: [],
    SimaPres: [],
    FacPres: [],
    AmupPres: [],
    AdmPres: [],
    SimaCarg: [],
    AdmCarg: [],
    FacCarg: [],
    AmupCarg: [],
  });

  // Función para realizar la búsqueda de datos
  const handleBuscar = async (dni) => {
    try {

      setLoading(true);

      // Realiza la búsqueda en ambas API y espera a que se completen ambas
      const [datosEvol, datosSoc, datosRes, datosPrest, datosCargos] =
        await Promise.all([
          buscarDatos(dni),
          buscarDatosSoc(dni),
          buscarDatosRes(dni),
          buscarDatosPrest(dni),
          buscarDatosCargos(dni),
        ]);

      // Combina los resultados de ambas búsquedas
      const resultadosCombinados = {
        admEvol: datosEvol.AdmEvol || [],
        simaEvol: datosEvol.SimaEvol || [],
        facEvol: datosEvol.FacEvol || [],
        amupEvol: datosEvol.AmupEvol || [],
        SimaSoc: datosSoc.SimaSoc || [],
        AmupSoc: datosSoc.AmupSoc || [],
        AdmSoc: datosSoc.AdmSoc || [],
        FacSoc: datosSoc.FacSoc || [],
        ResumenSima: datosRes.ResumenSima || [],
        ResumenAdm: datosRes.ResumenAdm || [],
        SimaPres: datosPrest.SimaPres || [],
        AmupPres: datosPrest.AmupPres || [],
        AdmPres: datosPrest.AdmPres || [],
        FacPres: datosPrest.FacPres || [],
        SimaCarg: datosCargos.SimaCarg || [],
        AdmCarg: datosCargos.AdmCarg || [],
        FacCarg: datosCargos.FacCarg || [],
        AmupCarg: datosCargos.AmupCarg || [],
      };

      // Actualiza el estado con los resultados combinados
      setResultados(resultadosCombinados);
    } catch (error) {
      console.error("Error al buscar datos:", error);
    } finally {
    // Indica que la búsqueda ha terminado, ya sea con éxito o con error
    setLoading(false);
  }

  };

{/*
  useEffect(() => {
    // Realiza la búsqueda al cargar el componente y cada vez que cambie el DNI
    handleBuscar(dni);
  }, [dni]);
  */}


  return {
    loading,
    resultados,
    handleBuscar,
  };
}

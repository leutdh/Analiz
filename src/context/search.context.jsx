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
    Colocacion: [],
    CargosAdm: [],
    CargosAmup: [],
    CargosFac: [],
    CargosSima: [],
  });

  // Función para realizar la búsqueda de datos
  const handleBuscar = async (dni) => {
    try {
      setLoading(true);

      // Modifica el array de promesas para incluir solo las APIs activas
      const promesas = [
        buscarDatos(dni),
        buscarDatosSoc(dni),
        // Las siguientes líneas están comentadas, así que no las incluimos en el Promise.all
        // buscarDatosRes(dni),
        // buscarDatosPrest(dni),
        // buscarDatosCargos(dni),
      ];

      // Realiza la búsqueda solo en las APIs activas
      const resultadosAPI = await Promise.all(promesas);
      
      const datosEvol = resultadosAPI[0];
      const datosSoc = resultadosAPI[1];
      // No necesitamos estas variables ya que sus APIs están comentadas
      // const datosRes = resultadosAPI[2];
      // const datosPrest = resultadosAPI[3];
      // const datosCargos = resultadosAPI[4];

      // Combina los resultados de las búsquedas activas
      const resultadosCombinados = {
        admEvol: datosEvol.AdmEvol || [],
        simaEvol: datosEvol.SimaEvol || [],
        facEvol: datosEvol.FacEvol || [],
        amupEvol: datosEvol.AmupEvol || [],
        SimaSoc: datosSoc.SimaSoc || [],
        AmupSoc: datosSoc.AmupSoc || [],
        AdmSoc: datosSoc.AdmSoc || [],
        FacSoc: datosSoc.FacSoc || [],
        // Mantenemos estos campos vacíos ya que sus APIs están comentadas
        ResumenSima: [],
        ResumenAdm: [],
        SimaPres: [],
        AmupPres: [],
        AdmPres: [],
        FacPres: [],
        SimaCarg: [],
        AdmCarg: [],
        FacCarg: [],
        AmupCarg: [],
        Colocacion: datosEvol.Colocacion || [],
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

  {
    /*
  useEffect(() => {
    // Realiza la búsqueda al cargar el componente y cada vez que cambie el DNI
    handleBuscar(dni);
  }, [dni]);
  */
  }

  return {
    loading,
    resultados,
    handleBuscar,
  };
}
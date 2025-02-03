import { useState, useEffect } from "react";
import { useDni } from "@/context/dni.context";
import { useSearch } from "@/context/search.context";
import Spinner from "../spinner";
import AdmCard from "./adm.card";

function AdmAfiliados() {
  const { resultados, loading } = useSearch();
  const { dni } = useDni(); // Obtener el valor del DNI

  // 🟠 Si todavía está cargando
  if (loading) {
    return <Spinner />;
  }

  // 🔴 Si no hay resultados
  if (!resultados?.AdmSoc || resultados.AdmSoc.length === 0) {
    return (
      <div className="p-2 bg-gray-200 border-b text-sm text-center font-semibold shadow-md">
        No se encontraron resultados para el DNI {dni}
      </div>
    );
  }

  // 🟢 Si hay resultados
  return (
    <>
    <AdmCard ResultAdmSoc={resultados.AdmSoc} />
    </>
  );
}

export default AdmAfiliados;

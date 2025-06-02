"use client";
// Eliminar las importaciones innecesarias

import { useSearch } from "@/context/search.context";
import Cargando from "@/components/Cargando";
import Colocacion from "@/components/Colocacion";

export default function PagColocacion() {
 
  const { loading } = useSearch();


    if (loading) return <Cargando />;

  return (
    <div className="relative container mx-auto mt-2 p-5 min-h-screen border rounded-lg bg-gradient-to-r from-cyan-400/10 via-cyan-300/10 to-cyan-400/10 shadow-sm shadow-slate-950/10  ">
      
      <Colocacion/>
    
      
    </div>
  );
}

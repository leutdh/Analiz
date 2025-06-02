"use client";
import AfiliadosAmup from "@/components/AfiliadosAmup";
import ResultadosAmupEvol from "@/components/ResultadosAmupEvol";
import Colocacion from "@/components/Colocacion";
import { useSearch } from "@/context/search.context";
import Cargando from "@/components/Cargando";

export default function PagAmup() {
  const { resultados, loading } = useSearch();

  if (loading) return <Cargando />;

  return (
    <div className="container mx-auto mt-2 p-5 min-h-screen border rounded-lg bg-gradient-to-r from-cyan-400/10 via-cyan-300/10 to-cyan-400/10 shadow-sm shadow-slate-950/10 ">
      {resultados?.Colocacion?.length >= 1 && (
      <div>
        
        <Colocacion resultados={resultados.Colocacion} />
        <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      </div>
      )}
      
      <AfiliadosAmup resultados={resultados.AmupSoc} />
      {/*      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <PrestAmup resultados={resultados.AmupPres} /> */}
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <ResultadosAmupEvol resultados={resultados.amupEvol} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
    </div>
  );
}

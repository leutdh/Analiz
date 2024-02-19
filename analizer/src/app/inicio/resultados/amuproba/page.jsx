"use client";
import AfiliadosAmup from "@/components/AfiliadosAmup";
import PrestAmup from "@/components/PrestAmup";
import ResultadosAmupEvol from "@/components/ResultadosAmupEvol";
import CargAmup from "@/components/CargAmup";
import { useSearch } from "@/context/search.context";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cargando from "@/components/Cargando";

export default function PagAmup() {
  const { resultados } = useSearch();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/inicio");
    }
  }, []);

  if(loading) return <Cargando />
  
  return (
    <div className="container mx-auto mt-2 p-5 min-h-screen border rounded-lg bg-gradient-to-r from-cyan-400/10 via-cyan-300/10 to-cyan-400/10 shadow-sm shadow-slate-950/10 ">
      <AfiliadosAmup resultados={resultados.AmupSoc} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <PrestAmup resultados={resultados.AmupPres} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <ResultadosAmupEvol resultados={resultados.amupEvol} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      
    </div>
  );
}

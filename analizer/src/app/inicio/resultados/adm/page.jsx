"use client";
// Eliminar las importaciones innecesarias
import ResultadosAdmEvol from "@/components/ResultadosAdmEvol";
import ResumenAdm from "@/components/ResumenAdm";
import AfiliadosAdm from "@/components/AfiliadosAdm";
import CargAdm from "@/components/CargAdm";
import PrestAdm from "@/components/PrestAdm";
import { useSearch } from "@/context/search.context";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cargando from "@/components/Cargando";

export default function PagAdm() {
  const { resultados } = useSearch();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isEffectComplete, setIsEffectComplete] = useState(false);

  useEffect(() => {
    console.log("User:", user);
    if (!user) {
      router.push("/inicio");
    } else {
      setIsEffectComplete(true);
    }
  }, [user]);

  if (loading || !isEffectComplete) return <Cargando />;

  return (
    <div className="relative container mx-auto mt-2 p-5 min-h-screen border rounded-lg bg-gradient-to-r from-cyan-400/10 via-cyan-300/10 to-cyan-400/10 shadow-sm shadow-slate-950/10  ">
      <AfiliadosAdm resultados={resultados.AdmSoc} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <PrestAdm resultados={resultados.AdmPres} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <ResultadosAdmEvol resultados={resultados.admEvol} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />   
      <ResumenAdm resultados={resultados.ResumenAdm} />
    </div>
  );
}

"use client";
import AfiliadosSima from "@/components/AfiliadosSima";
import PrestSima from "@/components/PrestSima";
import ResultadosSimaEvol from "@/components/ResultadosSimaEvol";
import CargSima from "@/components/CargSima";
import ResumenSima from "@/components/ResumenSima";
import { useSearch } from "@/context/search.context";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cargando from "@/components/Cargando";

export default function PagSima() {
  const { resultados, loading } = useSearch();
  const { user } = useAuth();
  const router = useRouter();
  const [isEffectComplete, setIsEffectComplete] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/inicio");
    } else {
      setIsEffectComplete(true);
    }
  }, [token]);

  if(loading) return <Cargando />

  return (
    <div className="container mx-auto mt-2 p-5 min-h-screen border rounded-lg bg-gradient-to-r from-cyan-400/10 via-cyan-300/10 to-cyan-400/10 shadow-sm shadow-slate-950/10 ">
      <AfiliadosSima resultados={resultados.SimaSoc} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <PrestSima resultados={resultados.SimaPres} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
      <ResultadosSimaEvol resultados={resultados.simaEvol} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
     
      <ResumenSima resultados={resultados.ResumenSima} />
      <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
    </div>
  );
}

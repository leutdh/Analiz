"use client";
// Eliminar las importaciones innecesarias

import { useSearch } from "@/context/search.context";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cargando from "@/components/Cargando";
import Colocacion from "@/components/Colocacion";

export default function PagColocacion() {
 
  const { user, loading } = useAuth();
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

  if (loading || !isEffectComplete) return <Cargando />;

  return (
    <div className="relative container mx-auto mt-2 p-5 min-h-screen border rounded-lg bg-gradient-to-r from-cyan-400/10 via-cyan-300/10 to-cyan-400/10 shadow-sm shadow-slate-950/10  ">
      
      <Colocacion/>
    
      
    </div>
  );
}

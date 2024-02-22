"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cargando from "@/components/Cargando";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirige a '/inicio' después de que el componente se haya montado
    router.push("/inicio");
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez, similar a componentDidMount

  return 
  <Cargando />;
}

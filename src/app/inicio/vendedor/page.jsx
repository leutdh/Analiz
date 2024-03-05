"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchVend from "@/components/SearchVend";
import AdmContent from "@/components/AdmContent";
import SimaContent from "@/components/SimaContent";
import FacContent from "@/components/FacContent";
import AmupContent from "@/components/AmupContent";

export default function Vendedor() {
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/inicio");
    }
  }, [token]);

  return (
    <>
      <div className=" relative container mx-auto  p-5 min-h-screen border rounded-lg bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <SearchVend />
        </div>
        <div className="mt-10 container mx-auto 	">
          <AdmContent />
        </div>
        <div className="mt-10 container mx-auto	">
          <SimaContent />
        </div>
        <div className="mt-10 container mx-auto ">
          <FacContent />
        </div>
        <div className="mt-10 container mx-auto 	">
          <AmupContent />
        </div>
      </div>
    </>
  );
}

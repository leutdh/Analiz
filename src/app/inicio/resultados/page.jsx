"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import Cargando from '@/components/Cargando';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/inicio');
  }, []);

  return (
    <div>
      <Cargando/>
    </div>
  );
};

export default Page;

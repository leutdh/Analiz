import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Crea un store con persistencia
export const useUsuarioStore = create(
  persist(
    (set) => ({
      nombreVendedor: "",
      setNombreVendedor: (nombre) => set({ nombreVendedor: nombre }),
      clearNombreVendedor: () => set({ nombreVendedor: "" }),
    }),
    {
      name: 'usuario-storage', // nombre único para el almacenamiento
      storage: createJSONStorage(() => sessionStorage), // usa sessionStorage
    }
  )
);
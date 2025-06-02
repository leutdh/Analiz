"use client";
import React, { useState } from "react";
import { useDni } from "@/context/dni.context";
import { useSearch } from "@/context/search.context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch, FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import logo from "public/logo.png";

const NavbarComponent = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(""); // Estado para el input de búsqueda
  const { setDni } = useDni(); // Guardar el valor del DNI
  const { handleBuscar, loading } = useSearch(); // Acción de búsqueda
  const [isSelected, setiSelected] = useState(null);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      setDni(searchValue); // Actualizar el valor del contexto
      handleBuscar(searchValue); // Llamar a la búsqueda
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={logo} width={130} alt="Logo" />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {[
              { name: "COLOCACION", href: "/inicio/resultados/colocacion" },
              { name: "ADM", href: "/inicio/resultados/adm" },
              { name: "SIMA", href: "/inicio/resultados/sima" },
              { name: "AMUPROBA", href: "/inicio/resultados/amuproba" },
              { name: "FACILITAR", href: "/inicio/resultados/facilitar" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setiSelected(item.name)}
                className={`text-sm font-medium hover:text-pink-500 transition ${isSelected === item.name
                    ? "text-pink-600 border-b-2 border-pink-600"
                    : "text-gray-700"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search and Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar DNI"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown} // Detectar tecla Enter
                className="w-64 px-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-sm text-white bg-pink-500 hover:bg-pink-600 rounded-full transition"
              >
                Buscar
              </button>
            </div>

            <BiLogOut
              size={24}
              className="cursor-pointer text-gray-600 hover:text-pink-500 transition"
              onClick={async () => {
                try {
                  const response = await fetch("/api/logout", { 
                    method: "GET",
                    credentials: 'include' // Asegura que se envíen las cookies
                  });
                  
                  if (response.ok) {
                    // Limpiar el estado local si es necesario
                    localStorage.removeItem('token');
                    
                    // Redirigir usando el router de Next.js
                    router.push('/');
                    router.refresh(); // Forzar recarga del layout
                  }
                } catch (err) {
                  console.error("Error al hacer logout:", err);
                  // Intentar redirigir de todas formas
                  router.push('/');
                }
              }}
            />

            {/* Mobile Toggle */}
            <button
              onClick={toggleSearch}
              className="md:hidden text-pink-500 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search & Links */}
        {isSearchOpen && (
          <div className="md:hidden mt-2 pb-3 space-y-2 border-t border-pink-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar DNI"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown} // Detectar tecla Enter en mobile también
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-sm text-white bg-pink-500 hover:bg-pink-600 rounded-lg transition"
              >
                Buscar
              </button>
            </div>
            <div className="flex flex-col space-y-1">
              {[
                { name: "COLOCACION", href: "/inicio/resultados/colocacion" },
                { name: "ADM", href: "/inicio/resultados/adm" },
                { name: "SIMA", href: "/inicio/resultados/sima" },
                { name: "AMUPROBA", href: "/inicio/resultados/amuproba" },
                { name: "FACILITAR", href: "/inicio/resultados/facilitar" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setiSelected(item.name)}
                  className={`block text-sm text-center text-gray-700 hover:text-pink-500 py-1 ${isSelected === item.name ? "font-medium text-pink-600" : ""
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;

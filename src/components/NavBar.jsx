"use client";
import React, { useState, useEffect } from "react";
import { useDni } from "@/context/dni.context";
import { useSearch } from "@/context/search.context";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import logo from "public/logo.png";
import Cargando from "./Cargando";
// Importa la biblioteca react-tooltip y los estilos

const NavbarComponent = () => {
  const [isSearchOpen, setSearchOpen] = useState(true);
  const { dni, setDni } = useDni();
  const { handleBuscar, loading } = useSearch();
  const [isSelected, setiSelected] = useState(null);

  useEffect(() => {
    // Realiza la búsqueda de datos cuando el valor de 'dni' cambie
    if (dni.trim() !== "") {
      handleBuscar(dni); // Llama a la función handleBuscar
    }
  }, [dni]);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

if (loading) return (

  <Cargando />
)


  return (
    <nav className="sticky top-0 z-50  bg-gradient-to-br from-cyan-800/90 via-cyan-700/80 to-cyan-700/90 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className=" -m-6">
          <Image
            src={logo}
            width={180}
            className="h-15 mr-7 Degrade"
            alt="Analizer v5"
          />
        </div>
        <div className="flex  mt-auto mb-auto  md:order-2">
          <button
            type="button"
            onClick={toggleSearch}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
            aria-controls="navbar-search"
            aria-expanded={isSearchOpen}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          {isSearchOpen && (
            <div className="relative hidden items-center md:flex">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ingrese DNI"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center ml-7">
                <Tooltip id="my-tooltip" />
                <BiLogOut
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Cerrar sesion"
                  size={30}
                  className="block cursor-pointer py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-cyan-800 md:hover:bg-transparent md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  data-tip="Cerrar sesión"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                />
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={toggleSearch}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded={isSearchOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isSearchOpen ? "" : "hidden"
          }`}
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese Dni..."
              value={dni}
              onChange={(e) => setDni(e.target.value)} // Actualizar el estado del DNI
              onClick={() => handleBuscar(dni)}
            />
          </div>
          <ul className="flex flex-col p-3 bg-gradient-to-r from-slate-300/90 via-slate-100/90 to-slate-300/90 rounded-lg md:flex-row md:space-x-8">
            <li>
              <Link
                href="/inicio/resultados/adm"
                onClick={() => setiSelected("adm")}
                className={`py-2 px-4 rounded hover:bg-cyan-800/70 hover:text-white ${
                  isSelected === "adm" ? " bg-cyan-600/80 text-white Shadow shadow-sm shadow-slate-900/90" : ""
                }`}
              >
                ADM
              </Link>
            </li>

            <li>
              <Link
                href="/inicio/resultados/sima"
                onClick={() => setiSelected("sima")}
                className={`py-2 px-4 rounded hover:bg-cyan-800/70 hover:text-white ${
                  isSelected === "sima" ?  "bg-cyan-600/80 text-white Shadow shadow-sm shadow-slate-900/90" : ""
                }`}
              >
                SIMA
              </Link>
            </li>

            <li>
              <Link
                href="/inicio/resultados/amuproba"
                onClick={() => setiSelected("amuproba")}
                className={`py-2 px-4 rounded hover:bg-cyan-800/70 hover:text-white ${
                  isSelected === "amuproba" ? " bg-cyan-600/80 text-white Shadow shadow-sm shadow-slate-900/90" : ""
                }`}
              >
                AMUPROBA
              </Link>
            </li>

            <li>
              <Link
                href="/inicio/resultados/facilitar"
                onClick={() => setiSelected("facilitar")}
                className={`py-2 px-4 rounded hover:bg-cyan-800/70 hover:text-white ${
                  isSelected === "facilitar" ? " bg-cyan-600/80 text-white Shadow shadow-sm shadow-slate-900/90" : ""
                }`}
              >
                FACILITAR
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;

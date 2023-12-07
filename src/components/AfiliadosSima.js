"use client";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

function AfiliadosSima({ resultados }) {
  const [tablaMinimizada, setTablaMinimizada] = useState(false);

  const toggleTablaMinimizada = () => {
    setTablaMinimizada(!tablaMinimizada);
  };

  return (
    <div
    className={
      "relative bg-gradient-to-br from-cyan-600/80 via-cyan-700/70 to-cyan-800/90 overflow-x-auto shadow-md sm:rounded-lg border border-cyan-800"
    }
  >
    <Tooltip id="my-tooltip" />
    <h2
      data-tooltip-id="my-tooltip"
      data-tooltip-content="Este contenedor muestra la informacion del afiliado de SIMA EVOL"
      data-tooltip-position-strategy="fixed"
      className="p-2 text-lg font-semibold text-left text-neutral-100 Shadow ml-4"
    >
      ESTADO DE SOCIO SIMA EVOL
    </h2>
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-slate-700 shadow-md">
        <thead className="text-sm text-neutral-100 uppercase border-t border-cyan-900 bg-gradient-to-br from-cyan-800/90 via-cyan-700/80 to-cyan-700/90 Shadow-sm shadow-md">
          <tr className="">
            <th scope="col" className="px-2 py-2 ">
              Nombre
            </th>
            <th scope="col" className="px-2 py-2">
              Apellido
            </th>
            <th scope="col" className="px-2 py-2">
              DNI
            </th>
            <th scope="col" className="px-2 py-2">
              N° Socio
            </th>
            <th scope="col" className="px-2 py-2">
              Categoria
            </th>
            <th scope="col" className="px-2 py-2">
              Estado
            </th>
            <th scope="col" className="px-2 py-2">
              Dependencia
            </th>
          </tr>
        </thead>
        <tbody>
          {resultados && resultados.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="px-1 py-1 bg-gray-200 border-b  text-sm text-center font-semibold shadow-md"
              >
                El cliente no tiene registro de ser afiliado de SIMA
              </td>
            </tr>
          )}
          {resultados &&
            resultados.map((resultado, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
                } border text-left border-slate-400 uppercase htransition duration-300 ease-in-out hover:bg-orange-300	`}
              >
                <td scope="row" className="px-2 py-1">
                  {resultado.Nombre}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.Apellido}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.NumeroDeDoc}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.NumSoc}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.Categor}
                </td>
                <td
                  scope="row"
                  className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap"
                >
                  {resultado.Estad}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.Depen}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default AfiliadosSima;

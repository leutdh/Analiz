import { useState } from "react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

function CargSima({ resultados }) {
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
    <div
      id="divcontenedor"
      className="grid grid-cols-2 items-center text-gray-500"
    >
      <div className="col-span-1">
        <h2
          className="p-2 text-lg font-semibold text-left text-neutral-100 Shadow ml-4"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Este contenedor muestra informacion de los CARGOS ACTIVOS que tiene en SIMA EVOL"
          data-tooltip-position-strategy="fixed"
        >
          CARGOS ACTIVOS EN SIMA EVOL
        </h2>
      </div>
      <div className="col-span-1 flex justify-end items-center space-x-4 mr-4">
      <button
            onClick={toggleTablaMinimizada}
            className="Shadow-sm shadow shadow-slate-100/70 hover:bg-cyan-800 hover:shadow-cyan-950 text-white rounded flex items-center"
          >
            {tablaMinimizada ? (
              <TbArrowBadgeDown
                size={30}
                data-tooltip-id="maxi"
                data-tooltip-content="Maximizar"
                data-tooltip-position-strategy="fixed"
              />
            ) : (
              <TbArrowBadgeUp
                size={30}
                data-tooltip-id="mini"
                data-tooltip-content="Minimizar"
                data-tooltip-position-strategy="fixed"
              />
            )}
          </button>
          <Tooltip id="maxi" />
          <Tooltip id="mini" />
      </div>
    </div>
    <div
      id="tableMost"
      className={`relative overflow-x-auto shadow-md ${
        tablaMinimizada
          ? "h-0 opacity-0 transition-all ease-in-out duration-300"
          : "block transition-all ease-in-out duration-300"
      }`}
    >
      <table className="w-full text-sm text-left text-slate-700 shadow-md">
        <thead className="text-sm text-neutral-100 uppercase border-t border-cyan-900 bg-gradient-to-br from-cyan-800/90 via-cyan-700/80 to-cyan-700/90 Shadow-sm shadow-md">
          <tr>
            <th scope="col" className="px-2 py-2">
              CONCEPTO
            </th>
            <th scope="col" className="px-2 py-2">
              IMPORTE
            </th>
            <th scope="col" className="px-2 py-2">
              FORMO COBRO
            </th>
            <th scope="col" className="px-2 py-2">
              ESTADO
            </th>
            <th scope="col" className="px-2 py-2">
              INVERSOR
            </th>
          </tr>
        </thead>
        <tbody>
          {resultados.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="px-1 py-1 bg-gray-200 border-b  text-sm text-center font-semibold shadow-md"
              >
                No se encontraron Cargos en SIMA.
              </td>
            </tr>
          )}
          {resultados.map((resultado, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
              } border text-left border-slate-400 uppercase htransition duration-300 ease-in-out hover:bg-orange-300	`}
            >
              <td
                scope="row"
                className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {resultado.Cargo}
              </td>
              <td scope="row" className="px-2 py-1">
                ${resultado.ImpCuot}
              </td>
              <td scope="row" className="px-2 py-1">
                {resultado.FormCobro}
              </td>
              <td scope="row" className="px-2 py-1">
                {resultado.Estado}
              </td>
              <td scope="row" className="px-2 py-1">
                {resultado.Inversor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default CargSima;
import { useState } from "react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

function PrestAdm({ resultados }) {
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
        <div
          className="col-span-1"
          
        >
          <h2 className="p-2 text-lg font-semibold text-left text-neutral-100 Shadow ml-4"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Este contenedor muestra informacion de los prestamos que tiene o finalizo en ADM EVOL"
          data-tooltip-position-strategy="fixed">
            ESTADO DE PRESTAMOS EN ADM EVOL
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
                n° Prestamo
              </th>
              <th scope="col" className="px-2 py-2">
                Importe
              </th>
              <th scope="col" className="px-2 py-2">
                Cant.Cuotas
              </th>
              <th scope="col" className="px-2 py-2">
                Monto Cuotas
              </th>
              <th scope="col" className="px-2 py-2">
                C.Pendientes
              </th>
              <th scope="col" className="px-2 py-2">
                Ult Cobro
              </th>
              <th scope="col" className="px-2 py-2">
                Ult Rechazo
              </th>
              <th scope="col" className="px-2 py-2">
                Observaciones
              </th>
              <th scope="col" className="px-2 py-2">
                Inversor
              </th>
              <th scope="col" className="px-2 py-2">
                For.Cobro
              </th>
            </tr>
          </thead>
          <tbody>
            {resultados && resultados.length === 0 && (
              <tr>
                <td
                  colSpan="10"
                  className="px-1 py-1 bg-gray-200 border-b  text-sm text-center font-semibold shadow-md"
                >
                  No se encontraron Prestamos en ADM.
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
                    {resultado.Nprest}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    $  {resultado.CapOtorgado}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    {resultado.CantCuot}
                  </td>
                  <td scope="row" className="px-2 py-1">
                   $ {resultado.ImpTot}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    {resultado.CuotPend}
                  </td>
                  <td
                    scope="row"
                    className="px-2 py-1  font-medium text-gray-900 whitespace-nowrap"
                  >
                    {resultado.UltCob}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    {resultado.UltRec}
                  </td>
                  <td
                    scope="row"
                    className="px-2 py-1  font-medium text-gray-900 whitespace-nowrap"
                  >
                    {resultado.Observac}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    {resultado.Inv}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    {resultado.FormCobro}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PrestAdm;

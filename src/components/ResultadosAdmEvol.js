"use client";
import { useState } from "react";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";
import { Tooltip } from "react-tooltip";

function ResultadosAdmEvol({ resultados }) {
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [selectedFormaCobro, setSelectedFormaCobro] = useState("");
  const [selectedEstado, setselectedEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [tablaMinimizada, setTablaMinimizada] = useState(false);

  const toggleTablaMinimizada = () => {
    setTablaMinimizada(!tablaMinimizada);
  };

  // Extraer los períodos únicos de los resultados
  const periodosUnicos = resultados
    ? [...new Set(resultados.map((resultado) => resultado.Periodo))]
    : [];

  // Extraer las formas de cobro únicas de los resultados
  const formasCobroUnicas = resultados
    ? [...new Set(resultados.map((resultado) => resultado.FormCobro))]
    : [];

  // Extraer las formas de cobro únicas de los resultados
  const EstadoCobro = resultados
    ? [...new Set(resultados.map((resultado) => resultado.Estado))]
    : [];

  // Función para ordenar los resultados por período de forma descendente
  const resultadosFiltrados = resultados
    ? resultados
        .filter(
          (resultado) =>
            (!selectedPeriodo || resultado.Periodo === selectedPeriodo) &&
            (!selectedFormaCobro ||
              resultado.FormCobro === selectedFormaCobro) &&
            (!selectedEstado || resultado.Estado === selectedEstado)
        )
        .filter((resultado) =>
          resultado.Concept.toLowerCase().includes(busqueda.toLowerCase())
        )
        .sort((a, b) => {
          const fechaA = new Date(`01/${a.Periodo}`);
          const fechaB = new Date(`01/${b.Periodo}`);
          return fechaB - fechaA;
        })
    : [];

  return (
    <div
      className={
        "relative bg-gradient-to-br from-cyan-600/80 via-cyan-700/70 to-cyan-800/90 overflow-x-auto shadow-md sm:rounded-lg border border-cyan-800"
      }
    >
      <Tooltip id="my-tooltip" />
      <div className="w-full text-sm flex text-left text-gray-500 ">
        <div className="w-1/3">
          <h2
            className="p-2 text-lg font-semibold text-left text-neutral-100 Shadow ml-4"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Este contenedor muestra los cargos enviados/cobrados de ADM EVOL"
            data-tooltip-position-strategy="fixed"
          >
            ENVIOS DE CARGOS ADM EVOL
          </h2>
        </div>

        <div className="w-full flex justify-center items-center p-2 space-x-4 mr-2 ">
          <div className="w-full">
            <input
              type="text"
              placeholder="Buscar por concepto"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="block w-full p-1 text-sm text-slate-900 border border-gray-300/90 rounded-lg bg-gray-50/70  ring-teal-300/40 hover:ring-offset-4 focus:ring-1 focus:ring-teal-900/40"
            />
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="periodo" className="sr-only">
              Seleccionar Período:
            </label>
            <select
              id="periodo"
              className="block w-full p-1 text-sm text-slate-900 border border-gray-300/90 rounded-lg bg-gray-50/70  ring-teal-300/40 hover:ring-offset-4 focus:ring-1 focus:ring-teal-900/40"
              value={selectedPeriodo}
              onChange={(e) => setSelectedPeriodo(e.target.value)}
            >
              <option value="">Todos los Períodos</option>
              {periodosUnicos
                .map((periodo) => ({
                  label: periodo,
                  date: new Date(`01/${periodo}`),
                }))
                .sort((a, b) => b.date - a.date) // Ordenar de mayor a menor
                .map((periodoObj) => (
                  <option key={periodoObj.label} value={periodoObj.label}>
                    {periodoObj.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="estado" className="sr-only">
              Todos los estados:
            </label>
            <select
              id="estado"
              className="block w-full p-1 text-sm text-slate-900 border border-gray-300/90 rounded-lg bg-gray-50/70  ring-teal-300/40 hover:ring-offset-4 focus:ring-1 focus:ring-teal-900/40"
              value={selectedEstado}
              onChange={(e) => setselectedEstado(e.target.value)}
            >
              <option value="">Todos los estados:</option>
              {EstadoCobro.map((Estado) => (
                <option key={Estado} value={Estado}>
                  {Estado}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex items-center">
            <label htmlFor="formaCobro" className="sr-only">
              Forma de Cobro:
            </label>
            <select
              id="formaCobro"
              className="block w-full p-1 text-sm text-slate-900 border border-gray-300/90 rounded-lg bg-gray-50/70  ring-teal-300/40 hover:ring-offset-4 focus:ring-1 focus:ring-teal-900/40"
              value={selectedFormaCobro}
              onChange={(e) => setSelectedFormaCobro(e.target.value)}
            >
              <option value="">Todas las Formas</option>
              {formasCobroUnicas.map((formaCobro) => (
                <option key={formaCobro} value={formaCobro}>
                  {formaCobro}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end items-center space-x-4 mr-4">
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
                Periodo
              </th>
              <th scope="col" className="px-2 py-2">
                Concepto
              </th>
              <th scope="col" className="px-2 py-2">
                Forma de cobro
              </th>

              <th scope="col" className="px-2 py-2">
                Imp Enviado
              </th>
              <th scope="col" className="px-2 py-2">
                Imp Cobrado
              </th>
              <th scope="col" className="px-2 py-2">
                Estado
              </th>
              <th scope="col" className="px-2 py-2">
                Observaciones
              </th>
              <th scope="col" className="px-2 py-2">
                Inversor
              </th>
            </tr>
          </thead>
          <tbody>
            {resultadosFiltrados.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="px-1 py-1 bg-gray-200 border-b  text-sm text-center font-semibold shadow-md"
                >
                  No se encontraron resultados para ADM Evol.
                </td>
              </tr>
            )}
            {resultadosFiltrados.map((resultado, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
                } border text-left border-slate-400 uppercase htransition duration-300 ease-in-out hover:bg-orange-300	`}
              >
                {/* Celdas de datos con bordes y tamaño de texto pequeño */}
                <td
                  scope="row"
                  className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {resultado.Periodo}
                </td>

                <td scope="row" className="px-2 py-1">
                  {resultado.Concept}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.FormCobro}
                </td>

                <td
                  scope="row"
                  className="px-2 py-1 font-medium text-gray-900 dark:text-white"
                >
                  ${resultado.impEnviado}
                </td>
                <td
                  scope="row"
                  className="px-2 py-1 font-medium text-gray-900 dark:text-white"
                >
                  ${resultado.impCobrado}
                </td>
                <td
                  scope="row"
                  className={`px-2 py-1 font-medium ${
                    resultado.Estado === "Cobrado"
                      ? "text-green-700"
                      : resultado.Estado === "Rechazado"
                      ? "text-red-600"
                      : "text-gray-900" // color predeterminado para otros estados
                  }`}
                >
                  {resultado.Estado}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.Observac}
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
export default ResultadosAdmEvol;

"use client";
import { useSearch } from "@/context/search.context";
import Cargando from "./Cargando";

const SimaContent = () => {
  // Obtén los datos del contexto de búsqueda
  const { resultados, loading } = useSearch();
  const resultadosSimaSoc = resultados.SimaSoc;
  const resultadosSimaCarg = resultados.simaEvol;

  const resultadosFeb2024 = resultadosSimaCarg
  .filter((resultado) => resultado.Periodo === "02/2024")
  .filter((resultado) => {
    const formaCobro = resultado.FormCobro ? resultado.FormCobro.toLowerCase() : "";
    return formaCobro !== "bapro - debito bancario";
  });


  // Ordena los resultados alfabéticamente por concepto
  resultadosFeb2024.sort((a, b) => a.Concept.localeCompare(b.Concept));

  // Maneja el estado de carga
  if (loading) return <Cargando />;

  return (
    <div className="relative overflow-x-auto shadow-md w-8/12 m-auto rounded-3xl bg-gradient-to-br from-slate-200/90 via-slate-100/80 to-slate-200/90 shadow-slate-700/50">
      <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 table-auto">
        <caption className="p-2 text-lg border-b border-gray-900/50 font-semibold text-center rtl:text-right text-gray-900 ">
         <h1 style={{ fontSize: '1rem' }}> SIMA </h1>
          {resultadosSimaSoc && resultadosSimaSoc.length === 0 && (
            <p className="mt-2 text-sm font-normal text-gray-500 ">
              El cliente no es socio en SIMA
            </p>
          )}
          {resultadosSimaSoc.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center mt-2 text-sm font-normal  text-gray-800 "
            >
              <p>
                <span className="ml-3 font-semibold">Apellido:</span>{" "}
                {item.Apellido}
              </p>
              <p>
                <span className="ml-3 font-semibold">Nombre:</span>{" "}
                {item.Nombre}
              </p>
              <p>
                <span className="ml-3 font-semibold">DNI:</span>{" "}
                {item.NumeroDeDoc}
              </p>
              <p>
                <span className="ml-3 font-semibold">Estado:</span> {item.Estad}
              </p>
              <p>
                <span className="ml-3 font-semibold">Dependencia:</span>{" "}
                {item.Depen}
              </p>
            </div>
          ))}
        </caption>

        <thead className="text-xs text-gray-700 uppercase ">
          <tr>
            <th scope="col" className="px-4 py-2 w-8/12">
              Concepto
            </th>
            <th scope="col" className="px-4 py-2 w-1/12 ">
              Periodo
            </th>

            <th scope="col" className="px-4 py-2 w-4/12">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {resultadosFeb2024 && resultadosFeb2024.length > 0 ? (
            resultadosFeb2024.map((resultado, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
                } border text-left border-slate-400 uppercase htransition duration-300 ease-in-out hover:bg-orange-300	`}
              >
                {/* Celdas de datos con bordes y tamaño de texto pequeño */}
                <td scope="row" className="px-4 py-2 font-bold w-8/12">
                  {resultado.Concept}
                </td>
                <td scope="row" className="px-4 py-2 text-gray-900 w-1/12 ">
                  {resultado.Periodo}
                </td>
                <td
                  scope="row"
                  className={`px-4 py-2 w-4/12 ${
                    resultado.Estado === "Cobrado"
                      ? "text-green-700"
                      : resultado.Estado === "Rechazado"
                      ? "text-red-600"
                      : "text-gray-900" // color predeterminado para otros estados
                  }`}
                >
                  {resultado.Estado}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="px-1 py-1 bg-gray-200 border-b text-sm text-center font-semibold shadow-md"
              >
                No se encontraron resultados para SIMA.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SimaContent;

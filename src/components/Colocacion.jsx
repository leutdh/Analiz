"use client";
import { useSearch } from "@/context/search.context";
import Cargando from "./Generales/Cargando";

const Colocacion = () => {
  // Obtén los datos del contexto de búsqueda
  const { resultados, loading } = useSearch();
  const ResultadosColoc = resultados.Colocacion;

  // Maneja el estado de carga
  if (loading) return <Cargando />;

  return (
    <div className="relative overflow-x-auto shadow-md rounded-3xl w-8/12 m-auto bg-gradient-to-br from-slate-200/90 via-slate-100/80 to-slate-200/90 shadow-slate-700/50">
      <h1 className="text-center uppercase m-2" style={{ fontSize: "1rem" }}>
        COLOCACION JUNIO
      </h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-800 table-auto">
        <thead className="text-xs text-gray-700 uppercase  ">
          <tr>
            <th scope="col" className="px-4 py-2 w-8/12">
              Nombre y Apellido
            </th>
            <th scope="col" className="px-4 py-2 w-1/12">
              Monto
            </th>

            <th scope="col" className="px-4 py-2 w-4/12">
              Plan
            </th>
            <th scope="col" className="px-4 py-2 w-4/12">
              Monto Cuota
            </th>
            <th scope="col" className="px-4 py-2 w-4/12">
              1er desc
            </th>
            <th scope="col" className="px-4 py-2 w-4/12">
              Entidad
            </th>
            <th scope="col" className="px-4 py-2 w-4/12">
              Reparticion
            </th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {ResultadosColoc && ResultadosColoc.length > 0 ? (
            ResultadosColoc.map((resultado, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
                } border text-left border-slate-400 uppercase htransition duration-300 ease-in-out hover:bg-orange-300	`}
              >
                {/* Celdas de datos con bordes y tamaño de texto pequeño */}
                <td scope="row" className="px-4 py-2 font-bold w-8/12">
                  {resultado.Nombre}
                </td>
                <td scope="row" className="px-4 py-2 text-gray-900 w-1/12 ">
                  ${resultado.Monto}
                </td>
                <td scope="row" className="px-4 py-2 text-gray-900 w-1/12 ">
                  {resultado.Plan}
                </td>
                <td scope="row" className="px-4 py-2 text-gray-900 w-1/12 ">
                  ${resultado.MontoCuot}
                </td>
                <td scope="row" className="px-4 py-2 text-gray-900 w-1/12 ">
                  {resultado.Desc}
                </td>
                <td scope="row" className="px-4 py-2 text-gray-900 w-1/12 ">
                  {resultado.Entidad}
                </td>
                <td scope="row" className="px-4 py-2 text-gray-900 w-1/12 ">
                  {resultado.Reparticion}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-1 py-1 bg-gray-200 border-b text-sm text-center font-semibold shadow-md"
              >
                EL CLIENTE NO TIENE PRESTAMOS OTORGADOS EN EL MES DE FEBRERO.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Colocacion;

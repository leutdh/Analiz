"use client";
import { useSearch } from "@/context/search.context";
import Cargando from "./Cargando";

const FacContent = () => {
  const { resultados, loading } = useSearch();
  const resultadosFacSoc = resultados.FacSoc;
  const resultadosFacCarg = resultados.facEvol;

  const resultadosFeb2024 = resultadosFacCarg
    .filter((resultado) => resultado.Periodo === "07/2024" || resultado.Periodo === "08/2024")
    .filter((resultado) => {
      const formaCobro = resultado.FormCobro ? resultado.FormCobro.toLowerCase() : "";
      return formaCobro !== "bapro - debito bancario";
    })
    .sort((a, b) => {
      const fechaA = new Date(`01/${a.Periodo}`);
      const fechaB = new Date(`01/${b.Periodo}`);
      return fechaB - fechaA;
    });

  if (loading) return <Cargando />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-200/50 to-purple-300/60 p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600 mb-4">
            FACILITAR
          </h2>
          {resultadosFacSoc && resultadosFacSoc.length === 0 ? (
            <p className="text-center text-gray-600">
              El cliente no es socio en FACILITAR
            </p>
          ) : (
            resultadosFacSoc.map((item) => (
              <div key={item.id} className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <div className="bg-white rounded-lg shadow-md p-4 h-full">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Datos Personales
                    </h3>
                    <p className="text-gray-700">
                      <span className="font-semibold">Apellido:</span>{" "}
                      <span className="text-gray-600">{item.Apellido}</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Nombre:</span>{" "}
                      <span className="text-gray-600">{item.Nombre}</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">DNI:</span>{" "}
                      <span className="text-gray-600">{item.NumDoc}</span>
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <div className="bg-white rounded-lg shadow-md p-4 h-full">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Información Adicional
                    </h3>
                    <p className="text-gray-700">
                      <span className="font-semibold">Estado:</span>{" "}
                      <span className="text-gray-600">{item.Estad}</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Dependencia:</span>{" "}
                      <span className="text-gray-600">{item.Depen}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  Periodo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  Concepto
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resultadosFeb2024 && resultadosFeb2024.length > 0 ? (
                resultadosFeb2024.map((resultado, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-300 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resultado.Periodo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {resultado.Concept}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          resultado.Estado === "Cobrado"
                            ? "bg-green-100 text-green-800"
                            : resultado.Estado === "Rechazado"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {resultado.Estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-sm text-center text-gray-500 italic"
                  >
                    No se encontraron resultados para FACILITAR.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacContent;
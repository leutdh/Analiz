"use client";
import { useSearch } from "@/context/search.context";
import Cargando from "./Cargando";

const Colocacion = () => {
  const { resultados, loading } = useSearch();
  const ResultadosColoc = resultados.Colocacion;

  if (loading) return <Cargando />;

  // Calcular la suma total de MontoCuot sin decimales
  const totalMontoCuot = ResultadosColoc.reduce((total, resultado) => {
    // Eliminar el signo de dólar y las comas, luego parsear como número entero
    const montoSinDecimales = parseInt(
      resultado.MontoCuot.replace("$", "").replace(",", ""),
      10
    );
    return total + montoSinDecimales;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-200/50 to-purple-300/60 p-6 border-b border-gray-200 flex items-center justify-center min-h-[100px]">
          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600">
            COLOCACION OCTUBRE
          </h2>
        </div>

        {ResultadosColoc && ResultadosColoc.length > 0 ? (
          <div className="p-4">
            <h3 className="text-sm text-center font-semibold text-gray-800">
              {ResultadosColoc[0].Nombre}
            </h3>
          </div>
        ) : (
          <div className="p-4">
            <h3 className="text-sm  text-center font-semibold  text-gray-800">
              El cliente no se encuentra en la Colocacion
            </h3>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
               
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  Monto
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  Monto Cuota
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  1er desc
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  Entidad
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300">
                  Reparticion
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ResultadosColoc && ResultadosColoc.length > 0 ? (
                <>
                  {ResultadosColoc.map((resultado, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-300 transition-colors duration-200"
                    >
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${resultado.Monto}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resultado.Plan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${resultado.MontoCuot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resultado.Desc}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resultado.Entidad}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resultado.Reparticion}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-right text-sm text-gray-700"
                    >
                      Total Monto Cuota:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${totalMontoCuot.toFixed(2)}
                    </td>
                    <td colSpan="3"></td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-sm text-center text-gray-500 italic"
                  >
                    EL CLIENTE NO TIENE PRESTAMOS OTORGADOS EN EL MES DE
                    FEBRERO.
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

export default Colocacion;

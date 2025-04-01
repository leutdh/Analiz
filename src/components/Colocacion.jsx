"use client";
import { useSearch } from "@/context/search.context";
import Cargando from "./Cargando";

const Colocacion = () => {
  const { resultados, loading } = useSearch();
  const ResultadosColoc = resultados?.Colocacion || [];

  if (loading) return <Cargando />;

  const totalMontoCuot = ResultadosColoc.reduce((total, { MontoCuot }) => {
    if (!MontoCuot?.trim()) return total;
    const monto = parseInt(MontoCuot.replace(/[$,]/g, ""), 10);
    return total + (isNaN(monto) ? 0 : monto);
  }, 0);

  // Función para formatear la fecha
  const formatearFecha = (fechaString) => {
    if (!fechaString) return "";
    
    try {
      const fecha = new Date(fechaString);
      
      // Verificar si la fecha es válida
      if (isNaN(fecha.getTime())) return fechaString;
      
      // Opciones de formato para la fecha
      const opciones = { 
        day: '2-digit',
        month: 'long', 
        year: 'numeric'
      };
      
      // Formatear la fecha para Argentina
      return fecha.toLocaleDateString('es-AR', opciones);
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return fechaString; // Devolver el string original si hay error
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Colocación - Marzo
      </h2>

      <p className="text-center text-sm text-gray-600 mb-4">
        {ResultadosColoc.length > 0 ? ResultadosColoc[0].Nombre : "El cliente no se encuentra en la Colocación"}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700 border-collapse">
          <thead className="bg-gray-100">
            <tr className="border-b">
              {["Fecha","Monto", "Plan", "Monto Cuota", "1er Desc", "Entidad", "Repartición"].map((header) => (
                <th key={header} className="py-3 px-4 text-left font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ResultadosColoc.length > 0 ? (
              <>
                {ResultadosColoc.map(({ Mes, Monto, Plan, MontoCuot, Desc, Entidad, Reparticion }, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{formatearFecha(Mes)}</td>
                    <td className="py-3 px-4">${Monto}</td>
                    <td className="py-3 px-4">{Plan}</td>
                    <td className="py-3 px-4">${MontoCuot}</td>
                    <td className="py-3 px-4">{Desc}</td>
                    <td className="py-3 px-4">{Entidad}</td>
                    <td className="py-3 px-4">{Reparticion}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan="2" className="py-3 px-4 text-right">Total:</td>
                  <td className="py-3 px-4 text-blue-600">${totalMontoCuot.toFixed(2)}</td>
                  <td colSpan="4"></td>
                </tr>
              </>
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500 italic">
                  El cliente no tiene préstamos otorgados en el mes de febrero.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Colocacion;
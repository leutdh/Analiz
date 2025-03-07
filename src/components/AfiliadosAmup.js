import React, { useState, useMemo } from "react";
import { Tooltip } from "react-tooltip";

function AfiliadosAmup({ resultados }) {
  const [tablaMinimizada, setTablaMinimizada] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState(null);
  const [direccionOrden, setDireccionOrden] = useState('asc');

  const toggleTablaMinimizada = () => {
    setTablaMinimizada(!tablaMinimizada);
  };

  const handleOrdenar = (columna) => {
    if (ordenarPor === columna) {
      setDireccionOrden(direccionOrden === 'asc' ? 'desc' : 'asc');
    } else {
      setOrdenarPor(columna);
      setDireccionOrden('asc');
    }
  };

  const resultadosOrdenados = useMemo(() => {
    if (!resultados || resultados.length === 0) return resultados;
    
    return [...resultados].sort((a, b) => {
      if (!ordenarPor) return 0;
      
      const valorA = a[ordenarPor];
      const valorB = b[ordenarPor];
      
      if (valorA == null) return direccionOrden === 'asc' ? 1 : -1;
      if (valorB == null) return direccionOrden === 'asc' ? -1 : 1;
      
      return direccionOrden === 'asc'
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    });
  }, [resultados, ordenarPor, direccionOrden]);

  if (tablaMinimizada) {
    return (
      <div 
        className="bg-pink-200 p-3 text-pink-800 cursor-pointer rounded-lg shadow-md hover:bg-pink-300 transition-colors duration-300 text-center font-semibold"
        onClick={toggleTablaMinimizada}
      >
        Mostrar Detalle de Afiliados
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-pink-100">
      <Tooltip id="my-tooltip" />
      <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-4 flex justify-between items-center">
        <h2
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Información de afiliados de AMUPROBA EVOL"
          className="text-xl font-bold text-white tracking-wider"
        >
          ESTADO DE SOCIO AMUPROBA EVOL
        </h2>
        <button 
          onClick={toggleTablaMinimizada} 
          className="bg-white/20 text-white px-3 py-1 rounded-md hover:bg-white/30 transition"
        >
          Minimizar
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-pink-50 border-b-2 border-pink-200">
            <tr>
              {[
                { key: 'Nombre', label: 'Nombre' },
                { key: 'Apellido', label: 'Apellido' },
                { key: 'NumeroDeDoc', label: 'DNI' },
                { key: 'NumSoc', label: 'N° Socio' },
                { key: 'Categor', label: 'Categoria' },
                { key: 'Estad', label: 'Estado' },
                { key: 'Depen', label: 'Dependencia' }
              ].map(({ key, label }) => (
                <th 
                  key={key} 
                  className="px-4 py-3 text-left text-pink-700 font-semibold uppercase tracking-wider cursor-pointer hover:bg-pink-100"
                  onClick={() => handleOrdenar(key)}
                >
                  {label}
                  {ordenarPor === key && (
                    <span className="ml-2 text-pink-500">
                      {direccionOrden === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(!resultadosOrdenados || resultadosOrdenados.length === 0) && (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-3 bg-pink-50 text-center text-pink-800 font-medium"
                >
                  El cliente no tiene registro de ser afiliado de AMUPROBA
                </td>
              </tr>
            )}
            {resultadosOrdenados && resultadosOrdenados.map((resultado, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-pink-50/50"
                } hover:bg-pink-100 transition-colors`}
              >
                {[
                  resultado.Nombre,
                  resultado.Apellido,
                  resultado.NumeroDeDoc,
                  resultado.NumSoc,
                  resultado.Categor,
                  resultado.Estad,
                  resultado.Depen
                ].map((valor, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="px-4 py-3 text-gray-800 font-medium"
                  >
                    {valor}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AfiliadosAmup;
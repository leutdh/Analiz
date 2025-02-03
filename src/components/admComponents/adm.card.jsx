import { useState } from "react";

const AdmCard = ({ ResultAdmSoc }) => {
  const { Apellido, Nombre, Categor, Depen, Estad, NumSoc, NumeroDeDoc } =
    ResultAdmSoc[0] || {};

  return (
    <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 rounded-lg shadow-lg pt-6 pb-6 ">
      {/* Título */}
      <h2 className="text-center text-slate-900 text-2xl font-semibold mb-4">
        {Apellido} {Nombre}
      </h2>

      {/* Tabla de Información */}
      <div className="overflow-x-auto shadow-sm bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className=" opacity-80 text-sm text-white uppercase bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900">
            <tr>
              <th className="px-4 py-2">DNI</th>
              <th className="px-4 py-2">N° Socio</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Dependencia</th>
            </tr>
          </thead>
          <tbody>
            {ResultAdmSoc && ResultAdmSoc.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-4 text-center text-gray-500 font-medium"
                >
                  No hay resultados.
                </td>
              </tr>
            ) : (
              ResultAdmSoc.map((resultado, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-pink-50" : "bg-pink-100"
                  } hover:bg-pink-200 transition-all duration-300`}
                >
                  <td className="px-4 py-3">{resultado.NumeroDeDoc}</td>
                  <td className="px-4 py-3">{resultado.NumSoc}</td>
                  <td className="px-4 py-3">{resultado.Categor}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {resultado.Estad}
                  </td>
                  <td className="px-4 py-3">{resultado.Depen}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmCard;

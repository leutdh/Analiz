const Resu24 = ({resultados}) => {


    if (!resultados) {
        return <div>No hay resultados disponibles.</div>;
      }
    
  return (
    <table className="w-full text-sm text-left text-slate-700 shadow-md">
      <thead className="text-sm text-neutral-100 uppercase Shadow-sm border-t border-cyan-900 bg-gradient-to-br from-cyan-800/90 via-cyan-700/80 to-cyan-700/90  shadow-md">
        {/* Encabezados para Datos de Cobranza */}
        <tr>
          <th scope="col" className="px-2 py-2 text-red-300">
            IMPORTE
          </th>
          <th scope="col" className="px-2 py-2">
            ene 2024
          </th>
          <th scope="col" className="px-2 py-2">
            feb 2024
          </th>
          <th scope="col" className="px-2 py-2">
            mar 2024
          </th>
          <th scope="col" className="px-2 py-2">
            abr 2024
          </th>
          <th scope="col" className="px-2 py-2">
            may 2024
          </th>
          <th scope="col" className="px-2 py-2">
            jun 2024
          </th>
          <th scope="col" className="px-2 py-2">
            jul 2024
          </th>
          <th scope="col" className="px-2 py-2">
            ago 2024
          </th>
          <th scope="col" className="px-2 py-2">
            Sept 2024
          </th>
          <th scope="col" className="px-2 py-2">
            oct 2024
          </th>
          <th scope="col" className="px-2 py-2">
            nov 2024
          </th>
          <th scope="col" className="px-2 py-2">
            dic 2024
          </th>

          {/* Agrega más encabezados de datos de cobranza aquí */}
        </tr>
      </thead>
      <tbody>
        {resultados.map((resultado, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
            } border text-left border-slate-400 uppercase htransition duration-300 ease-in-out hover:bg-orange-300	`}
          >
            {/* Celdas de datos de cobranza */}
            <td scope="row" className="px-2 py-1 text-red-600">
              ${resultado.IMPORTE}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.ene24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.feb24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.mar24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.abr24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.may24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.jun24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.jul24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.ago24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.sept24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.oct24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.nov24}
            </td>
            <td scope="row" className="px-2 py-1">
              ${resultado.dic24}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default Resu24;
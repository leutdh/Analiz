import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { TbArrowBadgeDown, TbArrowBadgeUp } from "react-icons/tb";

function ResumenSima({ resultados }) {
  const [tablaMinimizada, setTablaMinimizada] = useState(false);
  const [tablaUno, setTablaUno] = useState(true);
  const [tablaDos, setTablaDos] = useState(true);
  const [tablaTres, setTablaTres] = useState(true);
  const [tablaCuatro, setTablaCuatro] = useState(false);

  const toggleTablaUno = () => {
    setTablaUno(!tablaUno);
  };

  const toggleTablaDos = () => {
    setTablaDos(!tablaDos);
  };

  const toggleTablaTres = () => {
    setTablaTres(!tablaTres);
  };
  const toggleTablaCuatro = () => {
    setTablaCuatro(!tablaCuatro);
  };

  const toggleTablaMinimizada = () => {
    setTablaMinimizada(!tablaMinimizada);
  };

  return (
    <div
      className={
        "bg-gradient-to-br from-cyan-600/80 via-cyan-700/70 to-cyan-800/90 overflow-x-auto shadow-md sm:rounded-lg border border-cyan-800"
      }
    >
      <Tooltip id="my-tooltip" />
      <div
        id="divcontenedor"
        className="grid grid-cols-2 items-center text-gray-500"
      >
        <div className="col-span-1">
          <h2
            className="p-2 text-lg font-semibold text-left text-neutral-100 Shadow ml-4"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Este contenedor muestra informacion del RESUMEN DE SIMA"
            data-tooltip-position-strategy="fixed"
          >
            RESUMEN COBRANZA SIMA
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
            {/* Encabezados para Datos Personales */}
            <tr>
              <th scope="col" className="px-2 py-2">
                APELLIDO Y NOMBRE
              </th>

              <th scope="col" className="px-2 py-2">
                IMPORTE
              </th>
              <th scope="col" className="px-2 py-2">
                PLAN
              </th>
              <th scope="col" className="px-2 py-2">
                INV
              </th>
              <th scope="col" className="px-2 py-2">
                CUOTA PAGAS
              </th>
              <th scope="col" className="px-2 py-2">
                CUOTA PENDIENTE
              </th>
              <th scope="col" className="px-2 py-2">
                CANCELACION
              </th>
              <th scope="col" className="px-2 py-2">
                COBRADO POR BAPRO
              </th>
              <th scope="col" className="px-2 py-2">
                REINTEGRADO
              </th>
              <th scope="col" className="px-2 py-2">
                OBSERVACION
              </th>

              {/* Agrega más encabezados de datos personales aquí */}
            </tr>
          </thead>
          <tbody>
            {resultados.length === 0 && (
              <tr>
                <td
                  colSpan="11"
                  className="px-1 py-1 bg-gray-200 border-b  text-sm text-center font-semibold shadow-md"
                >
                  No se encontraron resultados en el RESUMEN SIMA.
                </td>
              </tr>
            )}
            {resultados.map((resultado, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-200" : "bg-slate-300"
                } border text-left border-slate-400 uppercase htransition duration-300 ease-in-out hover:bg-orange-300	`}
              >
                {/* Celdas de datos personales */}
                <td
                  scope="row"
                  className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {resultado.APELLIDO_Y_NOMBRE}
                </td>

                <td scope="row" className="px-2 py-1">
                  ${resultado.IMPORTE}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.PLAN}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.INV}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.CUOTAPAGADAS}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.CUOTAPEND}
                </td>
                <td scope="row" className="px-2 py-1">
                  ${resultado.CANCELACION}
                </td>
                <td scope="row" className="px-2 py-1">
                  ${resultado.COBRADOPORBAPRO}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.REINTEGRADO}
                </td>
                <td scope="row" className="px-2 py-1">
                  {resultado.OBSERVACION}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sección de Datos de Préstamo */}
      <div
        className={`relative overflow-x-auto shadow-md ${
          tablaMinimizada
            ? "h-0 opacity-0 transition-all ease-in-out duration-300"
            : "transition-all ease-in-out duration-300"
        }`}
      >
        <div className="w-full flex items-center">
          <h1 className="p-2 text-lg font-semibold Shadow text-neutral-100 m-auto">
            Cobranza 2020
          </h1>
          <button
            onClick={toggleTablaUno}
            className="mr-4 Shadow-sm   shadow shadow-slate-100/70 hover:bg-cyan-800 hover:shadow-cyan-950 text-white rounded flex items-center"
          >
            {tablaUno ? (
              <TbArrowBadgeDown size={30} />
            ) : (
              <TbArrowBadgeUp size={30} />
            )}
          </button>
        </div>

        <div
          className={`relative overflow-x-auto shadow-md ${
            tablaUno
              ? "h-0 opacity-0 transition-all ease-in-out duration-300"
              : " block transition-all ease-in-out duration-300"
          }`}
        >
          <table className="w-full text-sm text-left text-slate-700 shadow-md">
            <thead className="text-sm text-neutral-100 Shadow-sm uppercase border-t border-cyan-900 bg-gradient-to-br from-cyan-800/90 via-cyan-700/80 to-cyan-700/90 shadow-md">
              {/* Encabezados para Datos de Préstamo */}
              <tr>
                <th scope="col" className="px-2 py-2 text-red-300">
                  IMPORTE
                </th>
                <th scope="col" className="px-2 py-2">
                  ene 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  feb 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  mar 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  abr 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  may 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  jun 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  jul 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  ago 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  sep 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  oct 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  nov 2020
                </th>
                <th scope="col" className="px-2 py-2">
                  dic 2020
                </th>
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
                  {/* Celdas de datos de préstamo */}
                  <td scope="row" className="px-2 py-1 text-red-600">
                    ${resultado.IMPORTE}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.ene20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.feb20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.mar20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.abr20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.may20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.jun20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.jul20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.ago20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.sep20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.oct20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.nov20}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.dic20}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de Datos de Cobranza */}
      <div
        className={`relative overflow-x-auto shadow-md ${
          tablaMinimizada
            ? "h-0 opacity-0 transition-all ease-in-out duration-300"
            : "block transition-all ease-in-out duration-300"
        }`}
      >
        <div className="w-full flex items-center">
          <h1 className="p-2 text-lg font-semibold Shadow text-neutral-100 m-auto">
            Cobranza 2021
          </h1>
          <button
            onClick={toggleTablaDos}
            className="mr-4 Shadow-sm  shadow shadow-slate-100/70 hover:bg-cyan-800 hover:shadow-cyan-950 text-white rounded flex items-center"
          >
            {tablaDos ? (
              <TbArrowBadgeDown size={30} />
            ) : (
              <TbArrowBadgeUp size={30} />
            )}
          </button>
        </div>

        <div
          className={`relative overflow-x-auto shadow-md ${
            tablaDos
              ? "h-0 opacity-0 transition-all ease-in-out duration-300"
              : " block transition-all ease-in-out duration-300"
          }`}
        >
          <table className="w-full text-sm text-left text-slate-700 shadow-md">
            <thead className="text-sm text-neutral-100 Shadow-sm uppercase border-t border-cyan-900 bg-gradient-to-br from-cyan-800/90 via-cyan-700/80 to-cyan-700/90  shadow-md">
              {/* Encabezados para Datos de Cobranza */}
              <tr>
                <th scope="col" className="px-2 py-2 text-red-300">
                  IMPORTE
                </th>
                <th scope="col" className="px-2 py-2">
                  ene 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  feb 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  mar 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  abr 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  may 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  jun 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  jul 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  ago 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  sep 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  oct 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  nov 2021
                </th>
                <th scope="col" className="px-2 py-2">
                  dic 2021
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
                    ${resultado.ene21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.feb21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.mar21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.abr21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.may21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.jun21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.jul21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.ago21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.sep21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.oct21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.nov21}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.dic21}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Sección de Datos de Cobranza */}
      <div
        className={`relative overflow-x-auto shadow-md ${
          tablaMinimizada
            ? "h-0 opacity-0 transition-all ease-in-out duration-300"
            : "block transition-all ease-in-out duration-300"
        }`}
      >
        <div className="w-full flex items-center">
          <h1 className="p-2 text-lg font-semibold Shadow text-neutral-100 m-auto">
            Cobranza 2022
          </h1>
          <button
            onClick={toggleTablaTres}
            className="mr-4 Shadow-sm   shadow shadow-slate-100/70 hover:bg-cyan-800 hover:shadow-cyan-950 text-white rounded flex items-center"
          >
            {tablaTres ? (
              <TbArrowBadgeDown size={30} />
            ) : (
              <TbArrowBadgeUp size={30} />
            )}
          </button>
        </div>

        <div
          className={`relative overflow-x-auto shadow-md ${
            tablaTres
              ? "h-0 opacity-0 transition-all ease-in-out duration-300"
              : " block transition-all ease-in-out duration-300"
          }`}
        >
          <table className="w-full text-sm text-left text-slate-700 shadow-md">
            <thead className="text-sm text-neutral-100 uppercase Shadow-sm border-t border-cyan-900 bg-gradient-to-br from-cyan-800/90 via-cyan-700/80 to-cyan-700/90  shadow-md">
              {/* Encabezados para Datos de Cobranza */}
              <tr>
                <th scope="col" className="px-2 py-2 text-red-300">
                  IMPORTE
                </th>
                <th scope="col" className="px-2 py-2">
                  ene 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  feb 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  mar 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  abr 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  may 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  jun 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  jul 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  ago 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  sep 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  oct 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  nov 2022
                </th>
                <th scope="col" className="px-2 py-2">
                  dic 2022
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
                    ${resultado.ene22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.feb22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.mar22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.abr22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.may22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.jun22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.jul22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.ago22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.sep22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.oct22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.nov22}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.dic22}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de Datos de Cobranza */}
      <div
        className={`relative overflow-x-auto shadow-md ${
          tablaMinimizada
            ? "h-0 opacity-0 transition-all ease-in-out duration-300"
            : "block transition-all ease-in-out duration-300"
        }`}
      >
        <div className="w-full flex items-center">
          <h1 className="p-2 text-lg font-semibold Shadow text-neutral-100 m-auto">
            Cobranza 2023
          </h1>
          <button
            onClick={toggleTablaCuatro}
            className="mr-4 Shadow-sm   shadow shadow-slate-100/70 hover:bg-cyan-800 hover:shadow-cyan-950 text-white rounded flex items-center"
          >
            {tablaCuatro ? (
              <TbArrowBadgeDown size={30} />
            ) : (
              <TbArrowBadgeUp size={30} />
            )}
          </button>
        </div>

        <div
          className={`relative overflow-x-auto shadow-md ${
            tablaCuatro
              ? "h-0 opacity-0 transition-all ease-in-out duration-300"
              : " block transition-all ease-in-out duration-300"
          }`}
        >
          <table className="w-full text-sm text-left text-slate-700 shadow-md">
            <thead className="text-sm text-neutral-100 uppercase Shadow-sm border-t border-cyan-900 bg-gradient-to-br from-cyan-800/90 via-cyan-700/80 to-cyan-700/90  shadow-md">
              {/* Encabezados para Datos de Cobranza */}
              <tr>
                <th scope="col" className="px-2 py-2 text-red-300">
                  IMPORTE
                </th>
                <th scope="col" className="px-2 py-2">
                  ene 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  feb 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  mar 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  abr 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  may 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  jun 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  jul 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  ago 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  Sept 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  oct 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  nov 2023
                </th>
                <th scope="col" className="px-2 py-2">
                  dic 2023
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
                    ${resultado.ene23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.feb23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.mar23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.abr23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.may23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.jun23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.jul23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.ago23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.sept23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.oct23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.nov23}
                  </td>
                  <td scope="row" className="px-2 py-1">
                    ${resultado.dic23}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`relative overflow-x-auto shadow-md ${
          tablaMinimizada
            ? "h-0 opacity-0 transition-all ease-in-out duration-300"
            : "block transition-all ease-in-out duration-300"
        }`}
      >
        <div className="w-full flex items-center">
          <h1 className="p-2 text-lg font-semibold Shadow text-neutral-100 m-auto">
            Cobranza 2024
          </h1>
          <button
            onClick={toggleTablaCuatro}
            className="mr-4 Shadow-sm   shadow shadow-slate-100/70 hover:bg-cyan-800 hover:shadow-cyan-950 text-white rounded flex items-center"
          >
            {tablaCuatro ? (
              <TbArrowBadgeDown size={30} />
            ) : (
              <TbArrowBadgeUp size={30} />
            )}
          </button>
        </div>

        <div
          className={`relative overflow-x-auto shadow-md ${
            tablaCuatro
              ? "h-0 opacity-0 transition-all ease-in-out duration-300"
              : " block transition-all ease-in-out duration-300"
          }`}
        >
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
        </div>
      </div>
    </div>
  );
}

export default ResumenSima;

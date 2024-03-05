import { useDni } from "@/context/dni.context";
import { useSearch } from "@/context/search.context";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import logo from "public/logo.png";
import { Tooltip } from "react-tooltip";


const SearchVend = () => {
  const { dni, setDni } = useDni();
  const { handleBuscar, loading } = useSearch();

  const handleClick = (event) => {
    event.preventDefault();
    return handleBuscar(dni);
  };

  return (
    <div className="flex relative justify-between rounded-3xl items-center bg-gradient-to-br from-slate-200/90 via-slate-100/80 to-slate-200/90 shadow-sm shadow-slate-700/50">
      <div className="ml-10">
        <Image src={logo} width={180} className="h-15" alt="Analizer v5" />
      </div>
      <form className="max-w-md flex mr-10 ml-4" onSubmit={handleClick}>
        <div className="relative flex items-center ml-8">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            className="w-full p-2 ps-8 text-sm border rounded-lg bg-gray-200 border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresar DNI aquí"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
          <button
            type="submit"
            className="border m-2 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
          >
            Buscar
          </button>
        </div>
        <div className="flex items-center ml-8">
        <Tooltip id="my-tooltip" />
          <BiLogOut
            size={30}
            data-tooltip-id="my-tooltip"
            className="block cursor-pointer py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-cyan-800 md:hover:bg-transparent md:hover:text-cyan-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            data-tip="Cerrar sesión"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchVend;

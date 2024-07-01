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
    <div className="max-w-6xl mx-auto mb-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-200/50 to-purple-300/60 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image src={logo} width={140} height={40} className="h-10" alt="Analizer v5" />
            </div>
            <form className="flex-grow max-w-2xl mx-4" onSubmit={handleClick}>
              <div className="relative flex items-center">
                <input
                  className="w-full p-3 pl-10 text-sm border rounded-lg bg-white border-gray-300 placeholder-gray-400 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Ingresar DNI aquí"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                <button
                  type="submit"
                  className="ml-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                >
                  Buscar
                </button>
              </div>
            </form>
            <div className="flex items-center">
              <Tooltip id="logout-tooltip" />
              <BiLogOut
                size={28}
                data-tooltip-id="logout-tooltip"
                data-tooltip-content="Cerrar sesión"
                className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchVend;
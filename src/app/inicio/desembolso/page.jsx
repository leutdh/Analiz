import SelecPlan from "@/components/desembolsos/sistemaDesembolsos/SelecPlan";

export default function PagDesembolso() {

  
  return (
    <div className="relative container mx-auto mt-8 p-8 min-h-screen border rounded-xl bg-gradient-to-r from-cyan-400/10 via-cyan-300/10 to-cyan-400/10 shadow-lg">
      {/* Cabecera con ícono y título */}
      <div className="flex flex-col items-center mb-8">
        <div className="bg-cyan-100 p-4 rounded-full mb-4 flex items-center justify-center">
          <span className="text-3xl">💰</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Generar Desembolso
        </h1>
        <p className="text-gray-600 mt-2 text-center max-w-lg">
          Seleccione el plan correspondiente para iniciar el proceso de desembolso
        </p>
      </div>
      
      {/* Línea decorativa */}
      <div className="relative py-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gradient-to-r from-cyan-400/10 via-cyan-300/10 to-cyan-400/10 px-4 text-sm text-gray-500">
            Opciones disponibles
          </span>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="mt-6">
        <SelecPlan />
      </div>
    </div>
  );
}

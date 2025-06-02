// page.jsx - Página principal mejorada
import { getGrillaReba } from "@/config/services";
import FormularioReba from "@/components/desembolsos/sistemaDesembolsos/reba/FormularioReba";

export default async function PagReba() {
  const grillaReba = await getGrillaReba();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
            REBA AMUPROBA
          </h1>
          <p className="text-gray-600 text-lg">ELEGI EL PLAN AUTORIZADO</p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-2xl mx-auto space-y-6">
         <FormularioReba grillaReba={grillaReba} />
        </div>
      </div>
    </div>
  );
}

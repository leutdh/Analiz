
import { getGrillaAdm } from "@/config/services";
import FormularioADM from "@/components/desembolsos/sistemaDesembolsos/adm/FormularioADM";
export default async function PagAdm() {
  const grillaAdm = await getGrillaAdm();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                ADM ACCEDO
              </h1>
              <p className="text-gray-600 text-lg">ELEGI EL PLAN AUTORIZADO</p>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-4 rounded-full"></div>
            </div>
    
            {/* Contenido principal */}
            <div className="max-w-2xl mx-auto space-y-6">
             <FormularioADM grillaAdm={grillaAdm} />
            </div>
          </div>
        </div>
  );
}

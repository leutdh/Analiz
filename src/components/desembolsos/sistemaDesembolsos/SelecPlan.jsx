"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SelecPlan() {
    const [plan, setPlan] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const opcionesPlanes = [
        { 
            id: 1, 
            value: 'REBA AMUPROBA', 
            label: 'REBA AMUPROBA',
            description: 'Plan de desembolso para clientes de REBA AMUPROBA'
        },
        { 
            id: 2, 
            value: 'ADM ACCEDO', 
            label: 'ADM PROPIO',
            description: 'Plan de desembolso para clientes de ADM'
        },
        { 
            id: 3, 
            value: 'SIMA ACCEDO', 
            label: 'SIMA PROPIO',
            description: 'Plan de desembolso para clientes de SIMA'
        },
    ];

    const handleContinue = () => {
        if (!plan) return;
        // Redirige según el plan seleccionado
        if (plan === 'REBA AMUPROBA') router.push('/inicio/desembolso/reba');
        else if (plan === 'ADM ACCEDO') router.push('/inicio/desembolso/adm');
        else if (plan === 'SIMA ACCEDO') router.push('/inicio/desembolso/sima');
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Seleccione un Plan de Desembolso</h2>
                <p className="text-gray-600">Por favor, elija el plan que corresponde a su operación</p>
            </div>
            
            <div className="space-y-4 mb-8">
                {opcionesPlanes.map((opcion) => (
                    <div 
                        key={opcion.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${plan === opcion.value 
                            ? 'border-cyan-500 bg-cyan-50 shadow-sm' 
                            : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/30'}`}
                        onClick={() => setPlan(opcion.value)}
                    >
                        <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${plan === opcion.value ? 'border-cyan-500' : 'border-gray-300'}`}>
                                {plan === opcion.value && <div className="w-3 h-3 rounded-full bg-cyan-500"></div>}
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">{opcion.label}</h3>
                                <p className="text-sm text-gray-500">{opcion.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-end">
                <button 
                    onClick={handleContinue} 
                    disabled={!plan}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${!plan 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-md hover:shadow-lg'}`}
                >
                    <span>Continuar</span>
                    <span className={`ml-2 transition-transform duration-200 ${isHovered ? 'transform translate-x-1' : ''}`}>→</span>
                </button>
            </div>
        </div>
    );
}
"use client";
import React, { useState, useEffect } from "react";
import FormField from "../../reutilizables/FormField";
import SelectField from "../../reutilizables/SelectField";
import Button from "../../reutilizables/Button";


export default function FormularioReba({ grillaReba }) {
  

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [Reba, setReba] = useState(null);
  const [nombreReba, setNombreReba] = useState('');
  const [montoCuota, setMontoCuota] = useState('');
  const [cuotaSocial, setCuotaSocial] = useState('');
  const [formData, setFormData] = useState({
    cuit: "",
    nombreApellido: "",
    dni: "",
    legajo: "",
    vendedor: "",
    dependencia: "",
    monto: "",
    cantCuotas: "",
    domicilio: "",
    localidad: "",
    localidadNombre: "",
    codigoPostal: "",
    provincia: "Buenos Aires",
    provinciaNombre: "Buenos Aires",

    cbu: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    nacionalidad: "",
    sexo: "",
    fechaIngreso: "",
    ingresosUltimoMes: "",
    montoCuota: montoCuota,


  });


  useEffect(() => {
    if (montoCuota) {
      setFormData(prev => ({
        ...prev,
        montoCuota: montoCuota
      }));
    }
  }, [montoCuota]);

    useEffect(() => {
      const fetchUsuario = async () => {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setFormData(prev => ({
            ...prev,
            vendedor: data.nombre
          }));
          
        }
      };
      fetchUsuario();
    }, []);


  useEffect(() => {
    const planSeleccionadoReba = grillaReba.find(p => p.montoNeto === Number(formData.monto));
    if (planSeleccionadoReba && formData.cantCuotas) {
      switch (String(formData.cantCuotas)) {
        case "12":
          setMontoCuota(planSeleccionadoReba.Plazo12);
          setCuotaSocial(planSeleccionadoReba.CuotaSocial);
          break;
        case "18":
          setMontoCuota(planSeleccionadoReba.Plazo18);
          setCuotaSocial(planSeleccionadoReba.CuotaSocial);
          break;
        case "24":
          setMontoCuota(planSeleccionadoReba.Plazo24);
          setCuotaSocial(planSeleccionadoReba.CuotaSocial);
          break;
        default:
          setMontoCuota('');
          setCuotaSocial('');
          break;
      }
    } else {
      setMontoCuota('');
      setCuotaSocial('');
    }
  }, [formData.monto, formData.cantCuotas]);

  // Opciones para el select de Dependencia
  const opcionesDependencia = [
    { value: "", label: "Seleccione una dependencia" },
    { value: "Policia", label: "Policia PBA" },
    { value: "DOCENTE", label: "MINISTERIO DE EDUCACION" },
  ];

  const opcionesSexo = [
    { value: "", label: "Seleccione sexo" },
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
  ];

  // Opciones para el select de Cuotas
  const opcionesCuotas = [
    { value: "12", label: "12 cuotas" },
    { value: "18", label: "18 cuotas" },
    { value: "24", label: "24 cuotas" }

  ];
  // // Cargar provincias al montar el componente
  // useEffect(() => {
  //   const cargarProvincias = async () => {
  //     try {
  //       const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
  //       const data = await response.json();
  //       const provinciasData = data.provincias.map(prov => ({
  //         value: prov.id,
  //         label: prov.nombre
  //       }));
  //       setProvincias(provinciasData);
  //     } catch (error) {
  //       console.error('Error al cargar las provincias:', error);
  //     }
  //   };

  //   cargarProvincias();
  // }, []);

  // // Cargar localidades cuando se selecciona una provincia
  // const handleProvinciaChange = async (e) => {
  //   const provinciaId = e.target.value;
  //   const provinciaNombre = e.target.options[e.target.selectedIndex].text;
  //   setFormData(prev => ({
  //     ...prev,
  //     provincia: provinciaId, // Mantenemos el ID para el select
  //     provinciaNombre: provinciaNombre, // Guardamos el nombre para enviar
  //     localidad: '',
  //     localidadNombre: ''
  //   }));

  //   if (!provinciaId) {
  //     setLocalidades([]);
  //     return;
  //   }

  //   setLoadingLocalidades(true);
  //   try {
  //     const response = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaId}&max=1000`);
  //     const data = await response.json();
  //     const localidadesData = data.municipios.map(loc => ({
  //       value: loc.id,
  //       label: loc.nombre
  //     }));
  //     setLocalidades(localidadesData);
  //   } catch (error) {
  //     console.error('Error al cargar las localidades:', error);
  //   } finally {
  //     setLoadingLocalidades(false);
  //   }
  // };


  const parseNumber = (str) => {
    // Eliminar todos los caracteres que no sean dígitos
    return str.replace(/\D/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación para el campo monto (solo números enteros con formato de miles)
    if (name === 'monto') {
      // Si el valor está vacío, permitir borrado
      if (value === '') {
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }));
        return;
      }

      // Solo procesar si el valor es un número válido
      const parsedValue = parseNumber(value);
      if (/^\d*$/.test(parsedValue)) {
        setFormData(prev => ({
          ...prev,
          [name]: parsedValue // Guardamos el valor sin formato para el estado
        }));
      }
      return;
    }

    // Para los demás campos
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!formData.cuit || formData.cuit.length !== 11) {
      alert("El CUIT debe tener 11 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://api.bcra.gob.ar/CentralDeDeudores/v1.0/Deudas/${formData.cuit}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la información de deudas.");
      }
      const data = await response.json();
      console.log("Respuesta BCRA:", data);



      // Extraer el DNI quitando los 2 primeros dígitos y el último
      const identificacion = String(data.results?.identificacion || "");
      const dniFormateado = identificacion.length >= 3 ?
        identificacion.substring(2, identificacion.length - 1) : "";

      // Actualizar los campos con los datos de la respuesta
      setFormData(prev => ({
        ...prev,
        nombreApellido: data.results?.denominacion || "",
        dni: dniFormateado
      }));

      // Mostrar el formulario completo después de una búsqueda exitosa
      setShowForm(true);
    } catch (error) {
      console.error(error);
      alert("Error al consultar la API de deudas.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Crear un objeto con los datos a enviar
    const datosAEnviar = {
      ...formData,
      
      montoCuota: montoCuota,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create/reba`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAEnviar)
      });
      if (!response.ok) {
        throw new Error('Error al enviar los datos.');
      }

      // Obtener el nombre sugerido del archivo desde el header
      const disposition = response.headers.get('Content-Disposition');
      let filename = `legajoReba-${formData.cuit}.docx`;
      if (disposition && disposition.indexOf('filename=') !== -1) {
        filename = disposition
          .split('filename=')[1]
          .replace(/["']/g, '')
          .trim();
      }

      // Descargar el archivo como blob
      const blob = await response.blob();
      // Guardar el archivo en el estado para mostrar el enlace de descarga
      setReba(blob);
      setNombreReba(filename);

      alert('¡Solicitud enviada correctamente y legajo generado!');
      // setFormData({ ... }); // Si quieres limpiar los campos
    } catch (error) {
      alert('Hubo un error al enviar la solicitud.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <h2 className="text-2xl font-semibold">Formulario de Desembolso</h2>
        <p className="text-blue-100 mt-1">Complete los datos para continuar</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="relative w-full group">
          <div className={`flex items-end gap-3 ${showForm ? 'opacity-70' : ''}`}>
            <div className="flex-1">
              <FormField
                label="CUIT / CUIL"
                name="cuit"
                value={formData.cuit}
                onChange={handleInputChange}
                disabled={showForm}
              />
            </div>
            <button
              type="button"
              onClick={handleBuscar}
              className="self-end px-6 py-2.5 h-[42px] bg-blue-600 text-white font-medium text-sm rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-70 disabled:hover:bg-blue-600"
              disabled={!formData.cuit || formData.cuit.length !== 11}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar
              </span>
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mt-8 space-y-8" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
            {/* Sección: Datos del Cliente */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Datos del Cliente
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Columna 1 */}
                <div className="space-y-6">
                  <FormField
                    label="Nombre y Apellido"
                    type="text"
                    name="nombreApellido"
                    value={formData.nombreApellido}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="DNI"
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Columna 2 */}
                <div className="space-y-6">
                  <FormField
                    label="Vendedor"
                    type="text"
                    name="vendedor"
                    value={formData.vendedor}
                    onChange={handleInputChange}
                    disabled
                    required
                  />
                  <FormField
                    label="Número de Legajo"
                    type="text"
                    name="legajo"
                    value={formData.legajo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    label="Domicilio"
                    type="text"
                    name="domicilio"
                    value={formData.domicilio}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Provincia"
                    name="provincia"
                    value="Buenos Aires"
                    disabled
                  />

                </div>
                <div className="space-y-6">

                  <FormField
                    label="Código Postal"
                    type="text"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Localidad"
                    name="localidad"
                    value={formData.localidad}
                    onChange={handleInputChange}
                    required
                  />

                </div>

                <div className="space-y-6">
                  <FormField
                    label="CBU"
                    type="text"
                    name="cbu"
                    value={formData.cbu}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Fecha de Nacimiento"
                    type="date"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="Teléfono"
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    label="Nacionalidad"
                    type="text"
                    name="nacionalidad"
                    value={formData.nacionalidad}
                    onChange={handleInputChange}
                    required
                  />
                  <SelectField
                    label="Sexo"
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleInputChange}
                    options={opcionesSexo}
                    required
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    label="Fecha de Ingreso laboral"
                    type="date"
                    name="fechaIngreso"
                    value={formData.fechaIngreso}
                    onChange={handleInputChange}
                    required
                  />
                  <FormField
                    label="ingresos en el último mes"
                    type="number"
                    name="ingresosUltimoMes"
                    value={formData.ingresosUltimoMes}
                    onChange={handleInputChange}
                    required
                  />
                </div>

              </div>

              <div className="mt-4">
                <SelectField
                  label="Dependencia"
                  name="dependencia"
                  value={formData.dependencia}
                  onChange={handleInputChange}
                  options={opcionesDependencia}
                  required
                />
              </div>
            </div>

            {/* Sección: Datos del Préstamo */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Datos del Préstamo
              </h3>


              <div className="flex flex-col justify-center">
                <div className="p-6 w-full">
                  <label htmlFor="plan-select" className="block text-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Plan Autorizado
                  </label>
                  <div className="relative">
                    <select
                      id="plan-select"
                      className="w-full text-center appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 pr-12 text-lg font-medium text-gray-700 focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all duration-200 cursor-pointer hover:border-gray-300"
                      defaultValue=""
                      onChange={handleInputChange}
                      name="monto"
                      required
                    >
                      <option value="" disabled className="text-gray-400 text-center">
                        💰 Seleccione un monto
                      </option>
                      {grillaReba.map((plan) => (
                        <option key={plan._id} value={plan.montoNeto} className="text-gray-700">
                          $ {plan.montoNeto.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="p-6 w-full">
                  <label htmlFor="plan-select" className="block text-center text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Cantidad de cuotas
                  </label>
                  <div className="relative">
                    <select
                      id="plan-select"
                      className="w-full text-center appearance-none bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 pr-12 text-lg font-medium text-gray-700 focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all duration-200 cursor-pointer hover:border-gray-300"
                      defaultValue=""
                      onChange={handleInputChange}
                      name="cantCuotas"
                      required
                    >
                      <option value="" disabled className="text-gray-400 text-center">
                        📅 Seleccione el plazo
                      </option>
                      {opcionesCuotas.map((cuota) => (
                        <option key={cuota.value} value={cuota.value} className="text-gray-700">
                          {cuota.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monto en mano</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${formData.monto.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cantidad de Cuotas</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {formData.cantCuotas} cuotas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monto por Cuota</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        ${montoCuota}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cuota Social</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ${cuotaSocial}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-6 flex flex-col md:flex-row gap-4 md:justify-center">
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                className="px-6 py-2.5"
                onClick={handleSubmit}
              >
                <span className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirmar Solicitud y generar legajo reba
                </span>
              </Button>

            </div>
          </div>
        )}
      </form>
      {/* Enlace de descarga del archivo generado */}
      {Reba && (
        <div className="mt-10 flex justify-center mb-10">
          <a
            href={URL.createObjectURL(Reba)}
            download={nombreReba || "archivo.docx"}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-300 text-black font-bold text-sm rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 group-hover:animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
            Descargar Legajo Reba
          </a>
        </div>
      )}

    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import FormField from "./reutilizables/FormField";
import SelectField from "./reutilizables/SelectField";
import Button from "./reutilizables/Button";

export default function Formulario({grillaReba}) {
  const [formData, setFormData] = useState({
    cuit: "",
    nombreApellido: "",
    dni: "",
    legajo: "",
    vendedor: "",
    dependencia: "",
    entidad: "",
    tipoPrestamo: "",
    monto: "",
    cantCuotas: "",
    domicilio: "",
    localidad: "",
    localidadNombre: "",
    codigoPostal: "",
    provincia: "",
    provinciaNombre: "",
    cbu: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    telRef1: "",
    telRef2: "",
    referencia1: "",
    referencia2: "",
  });

  const [loading, setLoading] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [loadingLocalidades, setLoadingLocalidades] = useState(false);

  // Opciones para el select de Dependencia
  const opcionesDependencia = [
    { value: "", label: "Seleccione una dependencia" },
    { value: "Policia", label: "Policia PBA" },
    { value: "SPB", label: "Servicio Penitenciario Bonaerense" },
  ];

  // Opciones para el select de Entidad
  const opcionesEntidad = [
    { value: "", label: "Seleccione una entidad" },
    { value: "AMUPROBA", label: "AMUPROBA" },
    { value: "FACILITAR", label: "FACILITAR" },
    { value: "SIMA", label: "SIMA" },
    { value: "ADM", label: "ADM" },
    // Agrega más entidades según necesidad
  ];

  // Opciones para el select de Tipo de Préstamo
  const opcionesTipoPrestamo = [
    { value: "", label: "Seleccione tipo de préstamo" },
    { value: "TASA REGULADA", label: "TASA REGULADA" },
    { value: "AYUDA", label: "AYUDA" },
    // Agrega más tipos según necesidad
  ];

  // Opciones para el select de Cuotas
  const opcionesCuotas = [
    { value: "", label: "Seleccione cuotas" },
    { value: "12", label: "12 cuotas" },
    { value: "18", label: "18 cuotas" },
    { value: "24", label: "24 cuotas" }

  ];
  // Cargar provincias al montar el componente
  useEffect(() => {
    const cargarProvincias = async () => {
      try {
        const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
        const data = await response.json();
        const provinciasData = data.provincias.map(prov => ({
          value: prov.id,
          label: prov.nombre
        }));
        setProvincias(provinciasData);
      } catch (error) {
        console.error('Error al cargar las provincias:', error);
      }
    };

    cargarProvincias();
  }, []);

  // Cargar localidades cuando se selecciona una provincia
  const handleProvinciaChange = async (e) => {
    const provinciaId = e.target.value;
    const provinciaNombre = e.target.options[e.target.selectedIndex].text;
    setFormData(prev => ({
      ...prev,
      provincia: provinciaId, // Mantenemos el ID para el select
      provinciaNombre: provinciaNombre, // Guardamos el nombre para enviar
      localidad: '',
      localidadNombre: ''
    }));

    if (!provinciaId) {
      setLocalidades([]);
      return;
    }

    setLoadingLocalidades(true);
    try {
      const response = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaId}&max=1000`);
      const data = await response.json();
      const localidadesData = data.municipios.map(loc => ({
        value: loc.id,
        label: loc.nombre
      }));
      setLocalidades(localidadesData);
    } catch (error) {
      console.error('Error al cargar las localidades:', error);
    } finally {
      setLoadingLocalidades(false);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [CartaInstruccion, setCartaInstruccion] = useState(null);
  const [nombreCartaInstruccion, setNombreCartaInstruccion] = useState('');
  const [PlanillaDesembolso, setPlanillaDesembolso] = useState(null);
  const [nombrePlanillaDesembolso, setNombrePlanillaDesembolso] = useState('');
  const [Reba, setReba] = useState(null);
  const [nombreReba, setNombreReba] = useState('');

  const formatNumber = (num) => {
    // Eliminar todos los puntos existentes para evitar problemas al formatear
    const numStr = String(num).replace(/\./g, '');
    // Formatear con puntos de miles
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

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

    // No se necesita validación especial para el select de cuotas
    // ya que solo puede seleccionar valores predefinidos

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
      // Mantenemos todos los datos originales pero reemplazamos los IDs por los nombres
      provincia: formData.provinciaNombre, // Enviamos el nombre en lugar del ID
      localidad: formData.localidadNombre   // Enviamos el nombre en lugar del ID
    };

    try {
      const response = await fetch('http://localhost:3001/api/desembolsos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAEnviar)
      });
      if (!response.ok) {
        throw new Error('Error al enviar los datos.');
      }

      // Obtener el nombre sugerido del archivo desde el header
      const disposition = response.headers.get('Content-Disposition');
      let filename = 'carta.docx';
      if (disposition && disposition.indexOf('filename=') !== -1) {
        filename = disposition
          .split('filename=')[1]
          .replace(/["']/g, '')
          .trim();
      }

      // Descargar el archivo como blob
      const blob = await response.blob();
      // Guardar el archivo en el estado para mostrar el enlace de descarga
      setCartaInstruccion(blob);
      setNombreCartaInstruccion(filename);

      alert('¡Solicitud enviada correctamente y carta generada!');
      // setFormData({ ... }); // Si quieres limpiar los campos
    } catch (error) {
      alert('Hubo un error al enviar la solicitud.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Nuevo submit para otro endpoint
  const handleSubmitPlanilla = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Crear un objeto con los datos a enviar
    const datosAEnviar = {
      ...formData,
      // Mantenemos todos los datos originales pero reemplazamos los IDs por los nombres
      provincia: formData.provinciaNombre, // Enviamos el nombre en lugar del ID
      localidad: formData.localidadNombre   // Enviamos el nombre en lugar del ID
    };

    try {
      const response = await fetch('http://localhost:3001/api/planilla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAEnviar)
      });
      if (!response.ok) {
        throw new Error('Error al enviar los datos.');
      }

      // Obtener el nombre sugerido del archivo desde el header
      const disposition = response.headers.get('Content-Disposition');
      let filename = 'planilladesembolso.docx';
      if (disposition && disposition.indexOf('filename=') !== -1) {
        filename = disposition
          .split('filename=')[1]
          .replace(/["']/g, '')
          .trim();
      }

      // Descargar el archivo como blob
      const blob = await response.blob();
      // Guardar el archivo en el estado para mostrar el enlace de descarga
      setPlanillaDesembolso(blob);
      setNombrePlanillaDesembolso(filename);

      alert('¡Solicitud enviada correctamente y planilla generada!');
      // setFormData({ ... }); // Si quieres limpiar los campos
    } catch (error) {
      alert('Hubo un error al enviar la solicitud.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



    // Nuevo submit para otro endpoint
    const handleSubmitReba = async (e) => {
      e.preventDefault();
      setLoading(true);
      
      // Crear un objeto con los datos a enviar
      const datosAEnviar = {
        ...formData,
        // Mantenemos todos los datos originales pero reemplazamos los IDs por los nombres
        provincia: formData.provinciaNombre, // Enviamos el nombre en lugar del ID
        localidad: formData.localidadNombre   // Enviamos el nombre en lugar del ID
      };
  
      try {
        const response = await fetch('http://localhost:3001/api/reba', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datosAEnviar)
        });
        if (!response.ok) {
          throw new Error('Error al enviar los datos.');
        }
  
        // Obtener el nombre sugerido del archivo desde el header
        const disposition = response.headers.get('Content-Disposition');
        let filename = 'reba.docx';
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
  
        alert('¡Solicitud enviada correctamente y planilla generada!');
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
                  <SelectField
                    label="Provincia"
                    name="provincia"
                    value={formData.provincia || ''}
                    onChange={handleProvinciaChange}
                    options={[
                      { value: '', label: 'Seleccione una provincia' },
                      ...provincias
                    ]}
                    required
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
                  <SelectField
                    label="Localidad"
                    name="localidad"
                    value={formData.localidad || ''}
                    onChange={(e) => {
                      const localidadId = e.target.value;
                      const localidadNombre = e.target.options[e.target.selectedIndex].text;
                      setFormData(prev => ({
                        ...prev,
                        localidad: localidadId,
                        localidadNombre: localidadId ? localidadNombre : ''
                      }));
                    }}
                    options={[
                      { value: '', label: loadingLocalidades ? 'Cargando...' : 'Seleccione una localidad' },
                      ...localidades
                    ]}
                    disabled={!formData.provincia || loadingLocalidades}
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
            {/* Sección: Referencias */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Personas de referencia
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Referencia 1"
                  type="text"
                  name="referencia1"
                  value={formData.referencia1}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Telefono"
                  type="tel"
                  name="telRef1"
                  value={formData.telRef1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4  ">
                <FormField
                  label="Referencia 2"
                  type="text"
                  name="referencia2"
                  value={formData.referencia2}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label="Telefono"
                  type="tel"
                  name="telRef2"
                  value={formData.telRef2}
                  onChange={handleInputChange}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="Entidad"
                  name="entidad"
                  value={formData.entidad}
                  onChange={handleInputChange}
                  options={opcionesEntidad}
                  required
                />

                <SelectField
                  label="Tipo de Préstamo"
                  name="tipoPrestamo"
                  value={formData.tipoPrestamo}
                  onChange={handleInputChange}
                  options={opcionesTipoPrestamo}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <FormField
                  label="Monto"
                  name="monto"
                  value={formData.monto ? formatNumber(formData.monto) : ''}
                  onChange={handleInputChange}
                  inputMode="decimal"
                  required
                />

                <SelectField
                  label="Cantidad de Cuotas"
                  name="cantCuotas"
                  value={formData.cantCuotas}
                  onChange={handleInputChange}
                  options={opcionesCuotas}
                  required
                />
              </div>
            </div>

            <div className="pt-6 flex flex-col md:flex-row gap-4 md:justify-end">
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
                  Confirmar Solicitud
                </span>
              </Button>
              <Button
                type="submit"
                variant="secondary"
                isLoading={loading}
                onClick={handleSubmitPlanilla}
                className="px-6 py-2.5"
              >
                <span className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Planilla de desembolso
                </span>
              </Button>
              <Button
                type="submit"
                variant="secondary"
                isLoading={loading}
                onClick={handleSubmitReba}
                className="px-6 py-2.5"
              >
                <span className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Reba
                </span>
              </Button>
            </div>
          </div>
        )}
      </form>
      {/* Enlace de descarga del archivo generado */}
      {Reba && (
        <div className="mt-6">
          <a
            href={URL.createObjectURL(Reba)}
            download={nombreReba || "archivo.docx"}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Descargar reba generada
          </a>
        </div>
      )}
      {CartaInstruccion && (
        <div className="mt-6">
          <a
            href={URL.createObjectURL(CartaInstruccion)}
            download={nombreCartaInstruccion || "archivo.docx"}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Descargar carta generada
          </a>
        </div>
      )}
      {/* Enlace de descarga del archivo generado */}
      {PlanillaDesembolso && (
        <div className="mt-6">
          <a
            href={URL.createObjectURL(PlanillaDesembolso)}
            download={nombrePlanillaDesembolso || "archivo.docx"}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Descargar planilla generada
          </a>
        </div>
      )}
    </div>
  );
}

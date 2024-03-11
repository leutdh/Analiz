import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (typeof document !== "undefined") {
      const token = localStorage?.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthApi = {
  login: (formData) => api.post(`/login`, formData),
};

const AdminApi = {
  getName: (userId) => api.get(`/admins/${userId}`),
};

// Nuevo endpoint para obtener ayudas




export const buscarDatos = async (dni) => {
  try {
    console.log("Buscando datos...");
    const response = await api.get(`/buscar-datos?dni=${dni}`);
    console.log("Respuesta:", response.data); // Verificar la respuesta

    if (response.data) {
      // Si se encontraron datos en la base
      return response.data;
    } else {
      // Si no se encontraron datos en la base
      console.log("Cliente no ingresado en la base.");
      return null; // Puedes devolver null u otro valor apropiado
    }
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw error;
  }
};

export const buscarDatosSoc = async (dni) => {
  try {
    console.log("Buscando datos...");
    const response = await api.get(`/buscar-afiliado?dni=${dni}`);
    console.log("Respuesta:", response.data); // Verificar la respuesta

    if (response.data) {
      // Si se encontraron datos en la base
      return response.data;
    } else {
      console.log("Cliente no ingresado en la base.");
      return null; // Puedes devolver null u otro valor apropiado
    }
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw error;
  }
};

export const buscarDatosRes = async (dni) => {
  try {
    console.log("Buscando datos...");
    const response = await api.get(`/buscar-resu?dni=${dni}`);
    console.log("Respuesta:", response.data); // Verificar la respuesta
    if (response.data) {
      // Si se encontraron datos en la base
      return response.data;
    } else {
      console.log("Cliente no ingresado en la base.");
      return null; // Puedes devolver null u otro valor apropiado
    }
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw error;
  }
};

export const buscarDatosCargos = async (dni) => {
  try {
    console.log("Buscando datos...");
    const response = await api.get(`/buscar-carg?dni=${dni}`);
    console.log("Respuesta:", response.data); // Verificar la respuesta
    if (response.data) {
      // Si se encontraron datos en la base
      return response.data;
    } else {
      console.log("Cliente no ingresado en la base.");
      return null; // Puedes devolver null u otro valor apropiado
    }
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw error;
  }
};

export const buscarDatosPrest = async (dni) => {
  try {
    console.log("Buscando datos...");
    const response = await api.get(`/buscar-prest?dni=${dni}`);
    console.log("Respuesta:", response.data); // Verificar la respuesta
    if (response.data) {
      // Si se encontraron datos en la base
      return response.data;
    } else {
      console.log("Cliente no ingresado en la base.");
      return null; // Puedes devolver null u otro valor apropiado
    }
  } catch (error) {
    console.error("Error al buscar datos:", error);
    throw error;
  }
};





export { AuthApi, AdminApi };

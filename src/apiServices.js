// URL base de la API, definida en el .env
const API_URL = process.env.REACT_APP_API_URL;
import axios from "axios";

// obtener máquinas por categorias
export const getMaquinasPorCategoria = async (cat_ID) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/Maquinas_Categorias/${cat_ID}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener la información de la máquina");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// buscador
export const buscarSolicitudes = async (searchTerm) => {
  try {
    const response = await axios.post(`${API_URL}/api/buscar`, { searchTerm });
    return response.data;
  } catch (error) {
    console.error("Error en la búsqueda de solicitudes:", error);
    throw error;
  }
};

// aceptar solicitud
export const aceptarSolicitud = async (sol_ID) => {
  try {
    const response = await axios.post(`${API_URL}/api/solicitudes/aceptar`, { sol_ID });
    return response.data;
  } catch (error) {
    console.error("Error al aceptar la solicitud:", error);
    throw error;
  }
};
// lista de categorías
export const getCategorias = async () => {
  try {
    const response = await fetch(`${API_URL}/api/categorias`);
    if (!response.ok) {
      throw new Error("Error al obtener categorías");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// lista de top solicitudes
export const getTopSolicitudes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/topsolicitudes`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// listado de todas las solicitudes
export const getSolicitudes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/solicitudes`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// listado de todas las solicitudes rechazadas
export const getSolicitudesRechazadas = async () => {
  try {
    const response = await fetch(`${API_URL}/api/solisrechazadas`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// listado de todas las solicitudes aceptadas
export const getSolicitudesAceptadas = async () => {
  try {
    const response = await fetch(`${API_URL}/api/solisaceptadas`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

export const getRastrearSolicitud = async (codigo) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/rastrearsolicitud/${codigo}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener la solicitud");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

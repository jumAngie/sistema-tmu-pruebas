// URL base de la API, definida en el .env
const API_URL = process.env.REACT_APP_API_URL;
const API_NEW_URL = process.env.REACT_APP_API_NEW_URL;
import axios from "axios";

// obtener máquinas por categorias - CAMBIADO
export const getMaquinasPorCategoria = async (cat_ID) => {
  try {
    const response = await fetch(
      `${API_NEW_URL}/api/Solicitudes/MaquinasXCategoria?cat_ID=${cat_ID}`
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
// lista de categorías - CAMBIADO
export const getCategorias = async () => {
  try {
    const response = await fetch(`${API_NEW_URL}/api/Categorias/Listar`);
    if (!response.ok) {
      throw new Error("Error al obtener categorías");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// lista de top solicitudes - CAMBIADO
export const getTopSolicitudes = async () => {
  try {
    const response = await fetch(`${API_NEW_URL}/api/Solicitudes/TOP5_Listar`);
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

// Crear una nueva solicitud
export const insertarSolicitud = async (solicitud) => {
  try {
    const response = await fetch(`${API_URL}/api/insertarsolicitud`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitud),
    });

    if (!response.ok) {
      throw new Error("Error al insertar la solicitud");
    }

    return await response.json(); // Devuelve el resultado del backend
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

export const insertarSolicitud_Temp = async (solicitud) => {
  try {
    const response = await fetch(`${API_URL}/api/insertarsolicitudtemp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitud),
    });

    if (!response.ok) {
      throw new Error("Error al insertar la solicitud");
    }

    return await response.json(); // Devuelve el resultado del backend
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

export const loginUsuario = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/login`, {
    email,
    password,
  });

  return response.data; // ahora solo trae { token: "..." }
};

export const rechazar_Solicitud = async (motivo) => {
  try {
    const response = await fetch(`${API_URL}/api/rechazarsolicitud`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(motivo),
    });

    if (!response.ok) {
      throw new Error("Error al rechazar la solicitud");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// Enlistar detalles de una máquina ya publicada - CAMBIADO
export const getMachineDetails = async (sol_ID) => {
  try {
    const response = await axios.get(`${API_NEW_URL}/api/Solicitudes/Detalles?sol_ID=${sol_ID}`);
    return response.data.data; 
  } catch (error) {
    console.error("Error al obtener los detalles de la máquina:", error);
    throw error;
  }
};

export const insertarCategoria = async (categoria) => {
  try {
    const response = await axios.post(`${API_URL}/api/insertar_categorias`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al insertar la categoría:", error);
    throw error;
  }
};

export const actualizarCategoria = async (categoria) => {
  try {
    const response = await axios.post(`${API_URL}/api/actualizar_categorias`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al insertar la categoría:", error);
    throw error;
  }
};

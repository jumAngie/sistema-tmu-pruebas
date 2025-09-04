// URL base de la API, definida en el .env
const API_URL = process.env.REACT_APP_API_URL;
import axios from "axios";

// obtener máquinas por categorias - CAMBIADO
export const getMaquinasPorCategoria = async (cat_ID) => {
  try {
    const response = await fetch(`${API_URL}/api/Solicitudes/MaquinasXCategoria?cat_ID=${cat_ID}`);
    if (!response.ok) {
      throw new Error("Error al obtener la información de la máquina");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// buscador - CAMBIADO
export const buscarSolicitudes = async (searchTerm) => {
  try {
    const response = await axios.post(`${API_URL}/api/Solicitudes/Buscador?sol_Buscador=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error en la búsqueda de solicitudes:", error);
    throw error;
  }
};

// aceptar solicitud - CAMBIADO
export const aceptarSolicitud = async (sol_ID) => {
  try {
    const response = await axios.post(`${API_URL}/api/Solicitudes/Aceptar?sol_ID=${sol_ID}`);
    return response.data;
  } catch (error) {
    console.error("Error al aceptar la solicitud:", error);
    throw error;
  }
};

// rechazar solicitud - CAMBIADO
export const rechazar_Solicitud = async (motivo) => {
  try {
    const response = await fetch(
      `${API_URL}/api/Solicitudes/Rechazar?sol_ID=${motivo.sol_ID}&sol_Motivo=${motivo.rejection}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(motivo),
      }
    );

    if (!response.ok) {
      throw new Error("Error al rechazar la solicitud");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// lista de categorías - CAMBIADO
export const getCategorias = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Categorias/Listar`);
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
    const response = await fetch(`${API_URL}/api/Solicitudes/TOP5_Listar`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// listado de todas las solicitudes - CAMBIADO
export const getSolicitudes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Solicitudes/Listar`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// listado de todas las solicitudes rechazadas - CAMBIADO
export const getSolicitudesRechazadas = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Solicitudes/Listar_Solicitudes_R`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// listado de todas las solicitudes aceptadas - CAMBIADO
export const getSolicitudesAceptadas = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Solicitudes/Listar_Solicitudes_A`);
    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// información de las solicitudes - CAMBIADO
export const getRastrearSolicitud = async (codigo) => {
  try {
    const response = await fetch(`${API_URL}/api/Solicitudes/Rastrear?sol_Cod=${codigo}`);
    if (!response.ok) {
      throw new Error("Error al obtener la solicitud");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// Inicio de sesión - CAMBIADO
export const loginUsuario = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/Usuarios/Login`, {
    usua_ID: 0,
    usua_Nombre: "",
    usua_Email: email,
    usua_Password: password,
    usua_UsuarioCreacion: 0,
    usua_FechaCreacion: new Date().toISOString(),
    usua_UsuarioModificacion: null,
    usua_FechaModificacion: null,
    usua_Estado: true,
  });

  return response.data;
};

// Crear una nueva solicitud con comprobante - CAMBIADO pero no probado
export const insertarSolicitud = async (solicitud) => {
  try {
    const payload = {
      sol_ID: 0,
      sol_Cod: "",
      cat_ID: solicitud.category,
      sol_Marca: solicitud.brand,
      sol_Horas: solicitud.operationHours,
      sol_Titular: solicitud.titular,
      sol_Descripcion: solicitud.description,
      sol_Precio: solicitud.price || "0",
      sol_IMG_1: solicitud.images[0] || null,
      sol_IMG_2: solicitud.images[1] || null,
      sol_IMG_3: solicitud.images[2] || null,
      sol_IMG_4: solicitud.images[3] || null,
      sol_Comprobante: solicitud.images[4] || null,
      sol_NombreCliente: solicitud.client,
      sol_Telefono_1: solicitud.phoneNumber,
      sol_Telefono_2: solicitud.additionalPhoneNumber,
      sol_Correo: solicitud.email,
      sol_Estado: "P",
      sol_Motivo: "",
      sol_FechaVencimiento: new Date().toISOString(),
      cat_Nombre: "",
    };

    const response = await fetch(`${API_URL}/api/Solicitudes/Insertar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error al insertar la solicitud");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
};

// Insertar solicitud sin comprobante - PROBANDO
export const insertarSolicitud_Temp = async (solicitud) => {
  try {
    // Transformar el objeto del frontend al formato que espera la API
    const payload = {
      sol_ID: 0,
      sol_Cod: "TEMP",
      cat_ID: solicitud.category,
      sol_Marca: solicitud.brand,
      sol_Horas: solicitud.operationHours,
      sol_Titular: solicitud.titular,
      sol_Descripcion: solicitud.description,
      sol_Precio: solicitud.price || "0",
      sol_IMG_1: solicitud.images[0] || null,
      sol_IMG_2: solicitud.images[1] || null,
      sol_IMG_3: solicitud.images[2] || null,
      sol_IMG_4: solicitud.images[3] || null,
      sol_Comprobante: "",
      sol_NombreCliente: solicitud.client,
      sol_Telefono_1: solicitud.phoneNumber,
      sol_Telefono_2: solicitud.additionalPhoneNumber,
      sol_Correo: solicitud.email,
      sol_Estado: "P",
      sol_Motivo: "",
      sol_FechaVencimiento: new Date().toISOString(),
      cat_Nombre: "",
    };

    const response = await fetch(`${API_URL}/api/Solicitudes/Insertar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error al insertar la solicitud");
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
    const response = await axios.get(`${API_URL}/api/Solicitudes/Detalles_VerMas?sol_ID=${sol_ID}`);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los detalles de la máquina:", error);
    throw error;
  }
};

// Insertar categoría - AÚN NO IMPLEMENTADO - CAMBIADO
export const insertarCategoria = async (categoria) => {
  try {
    const response = await axios.post(`${API_URL}/api/Categorias/Insertar`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al insertar la categoría:", error);
    throw error;
  }
};

// Actualizar categoria - AÚN NO IMPLEMENTADO - CAMBIADO
export const actualizarCategoria = async (categoria) => {
  try {
    const response = await axios.post(`${API_URL}/api/Categorias/Actualizar`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al insertar la categoría:", error);
    throw error;
  }
};

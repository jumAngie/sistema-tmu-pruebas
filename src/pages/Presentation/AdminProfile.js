import React, { useEffect, useState } from "react";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import { AppBar, Toolbar, Typography, Modal, Box, Grid, TextField } from "@mui/material";
import AdminCategories from "pages/Presentation/AdminCategoriasForm";
import logoperfil from "assets/images/logo-perfil.png";
import { getSolicitudes } from "apiServices"; //
import { getSolicitudesRechazadas } from "apiServices";
import { getSolicitudesAceptadas } from "apiServices";
import { aceptarSolicitud } from "apiServices";
import { rechazar_Solicitud } from "apiServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedTab, setSelectedTab] = useState("users");

  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudesRechazadas, setSolicitudesRechazadas] = useState([]);
  const [solicitudesAceptadas, setSolicitudesAceptadas] = useState([]);

  // Estado para el modal y el motivo
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [solID, setSolID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!token) {
      navigate("/pages/authentication/sign-in");
    } else if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleOpenRejectModal = (id) => {
    setSolID(id); // Estableces el ID de la solicitud
    setOpenRejectModal(true); // Abres el modal
  };

  // Función para cerrar el modal
  const handleCloseRejectModal = () => {
    setOpenRejectModal(false);
    setRejectionReason(""); // Limpiar motivo al cerrar modal
  };

  // Función para confirmar el rechazo
  const handleConfirmRejection = async () => {
    if (!solID || !rejectionReason) return; // Validar que todo esté completo

    try {
      const response = await rechazar_Solicitud({ sol_ID: solID, rejection: rejectionReason });
      toast.success(response.data.messageStatus);
      setOpenRejectModal(false);
      handleCloseRequestModal();
      await fetchSolicitudes();
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      toast.error("Hubo un error al rechazar la solicitud.");
    }
  };

  const fetchSolicitudes = async () => {
    try {
      const data = await getSolicitudes();
      if (data.data && data.data.length > 0) {
        setSolicitudes(data.data);
      } else {
        setSolicitudes([]);
      }
    } catch (error) {
      console.error("Error al obtener las solicitudes:", error);
    }
  };

  useEffect(() => {
    fetchSolicitudes(); // Llama a la función para cargar las solicitudes al montar el componente
  }, []);

  useEffect(() => {
    getSolicitudesRechazadas()
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setSolicitudesRechazadas(data.data);
        } else {
          setSolicitudesRechazadas([]);
        }
      })
      .catch((error) => console.error("Error al obtener las solicitudes:", error));
  }, []);

  useEffect(() => {
    getSolicitudesAceptadas()
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setSolicitudesAceptadas(data.data);
        } else {
          setSolicitudesAceptadas([]);
        }
      })
      .catch((error) => console.error("Error al obtener las solicitudes:", error));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/pages/authentication/sign-in");
  };

  const handleOpenRequestModal = (request) => {
    setSelectedRequest(request);
    setOpenRequestModal(true);
  };

  const handleCloseRequestModal = () => {
    setOpenRequestModal(false);
    setSelectedRequest(null);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  /* const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };*/

  const getStatusColor = (estado) => {
    switch (estado) {
      case "P":
        return "gray"; // Pendiente
      case "R":
        return "red"; // Rechazado
      case "A":
        return "green"; // Aceptado
      default:
        return "black";
    }
  };

  const formatearFecha = (fecha) => {
    const opciones = {
      year: "numeric",
      month: "long", // Cambia a '2-digit' si prefieres el mes en formato numérico
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return fecha.toLocaleString("es-ES", opciones);
  };

  const handleAprobar = async (sol_ID) => {
    try {
      const response = await aceptarSolicitud(sol_ID);
      if (response.code == 200) {
        toast.success("Solicitud Aceptada");
        await fetchSolicitudes();
        handleCloseRequestModal();
      } else {
        toast.error("Error, no se puede aprobar");
      }
    } catch (error) {
      toast.error("Error, no se puede aprobar");
    }
  };
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1428A0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ color: "#ffff", flexGrow: 1 }}>
            Panel de Administración
          </Typography>
          <MKButton
            startIcon={<Icon>logout</Icon>}
            variant="contained"
            color="light"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </MKButton>
        </Toolbar>
      </AppBar>

      <MKBox p={3}>
        <Card sx={{ p: 3, mb: 4 }}>
          <MKBox display="flex" alignItems="center" mb={3}>
            <Avatar src={logoperfil} alt="Administrador" sx={{ width: 120, height: 90, mr: 2 }} />
            <MKBox display="flex" flexDirection="column">
              <MKTypography variant="h5">
                {/* Aquí usamos una condicional: Si existe usuario, muestra el nombre, si no, "Administrador" */}
                {usuario ? `Bienvenido, ${usuario.usua_Nombre}` : "Administrador"}
              </MKTypography>
              {/* Opcional: Mostrar el email o rol si lo deseas */}
              <MKTypography variant="caption" color="text">
                {usuario?.usua_Email}
              </MKTypography>
            </MKBox>
          </MKBox>

          <MKBox display="flex" justifyContent="center" mb={3}>
            <MKButton
              variant="contained"
              startIcon={<Icon>article</Icon>}
              color={selectedTab === "requests" ? "info" : "default"}
              onClick={() => handleTabChange("requests")}
              sx={{
                mr: 2,
                backgroundColor: "#1428A0",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#D3D3D3",
                },
              }}
            >
              Ver todas las Solicitudes
            </MKButton>

            <MKButton
              variant="contained"
              startIcon={<Icon>dangerous</Icon>}
              color={selectedTab === "denied-requests" ? "info" : "default"}
              onClick={() => handleTabChange("denied-requests")}
              sx={{
                mr: 2,
                backgroundColor: "#1428A0",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#D3D3D3",
                },
              }}
            >
              Ver las Solicitudes Rechazadas
            </MKButton>

            <MKButton
              variant="contained"
              startIcon={<Icon>check</Icon>}
              color={selectedTab === "accepted-requests" ? "info" : "default"}
              onClick={() => handleTabChange("accepted-requests")}
              sx={{
                mr: 2,
                backgroundColor: "#1428A0",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#D3D3D3",
                },
              }}
            >
              Ver las Solicitudes Aceptadas
            </MKButton>

            <MKButton
              variant="contained"
              startIcon={<Icon>category</Icon>}
              color={selectedTab === "categories" ? "info" : "default"}
              onClick={() => handleTabChange("categories")}
              sx={{
                backgroundColor: "#1428A0",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#D3D3D3",
                },
              }}
            >
              Gestionar Categorías
            </MKButton>
          </MKBox>

          {selectedTab === "requests" && (
            <Box component={Paper} padding={2} elevation={3}>
              <Typography variant="h2" gutterBottom>
                Solicitudes Recibidas
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
              >
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <strong>Código</strong>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "center" }}>
                  <strong>Título</strong>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <strong>Estado</strong>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "center" }}>
                  <strong>Cliente</strong>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <strong>Acciones</strong>
                </Grid>
              </Grid>
              {solicitudes.map((solicitud) => (
                <Grid container spacing={2} key={solicitud.sol_Id} style={{ padding: "10px 0" }}>
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {solicitud.sol_ID}
                  </Grid>
                  <Grid item xs={3} style={{ textAlign: "center" }}>
                    {solicitud.sol_Titular}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ textAlign: "center" }}
                    sx={{ color: getStatusColor(solicitud.sol_Estado) }}
                  >
                    {solicitud.sol_Estado === "P"
                      ? "Pendiente"
                      : solicitud.sol_Estado === "R"
                      ? "Rechazada"
                      : "Aceptada"}
                  </Grid>
                  <Grid item xs={3} style={{ textAlign: "center" }}>
                    {solicitud.sol_NombreCliente}
                  </Grid>
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    <MKButton
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpenRequestModal(solicitud)} // Pasar solicitud actual a la función
                    >
                      Ver Detalles
                    </MKButton>
                  </Grid>
                </Grid>
              ))}
            </Box>
          )}

          {selectedTab === "denied-requests" && (
            <Box component={Paper} padding={2} elevation={3}>
              <Typography variant="h2" gutterBottom>
                Solicitudes Rechazadas
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
              >
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <strong>Código</strong>
                </Grid>
                <Grid item xs={5} style={{ textAlign: "center" }}>
                  <strong>Motivo</strong>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <strong>Estado</strong>
                </Grid>
              </Grid>
              {solicitudesRechazadas.map((solicitud) => (
                <Grid container spacing={2} key={solicitud.sol_Cod} style={{ padding: "10px 0" }}>
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {solicitud.sol_Cod}
                  </Grid>
                  <Grid item xs={5} style={{ textAlign: "center" }}>
                    {solicitud.sol_Motivo}
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "center" }}>
                    {solicitud.sol_Estado === "P"
                      ? "Pendiente"
                      : solicitud.sol_Estado === "R"
                      ? "Rechazada"
                      : "Aceptada"}
                  </Grid>
                </Grid>
              ))}
            </Box>
          )}

          {selectedTab === "accepted-requests" && (
            <Box component={Paper} padding={2} elevation={3}>
              <Typography variant="h2" gutterBottom>
                Solicitudes Aceptadas
              </Typography>
              <Grid
                container
                spacing={2}
                style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}
              >
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <strong>Código</strong>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "center" }}>
                  <strong>Titular</strong>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "center" }}>
                  <strong>Fecha Vencimiento</strong>
                </Grid>
              </Grid>
              {solicitudesAceptadas.map((solicitud) => (
                <Grid container spacing={2} key={solicitud.sol_Cod} style={{ padding: "10px 0" }}>
                  <Grid item xs={2} style={{ textAlign: "center" }}>
                    {solicitud.sol_Cod}
                  </Grid>
                  <Grid item xs={3} style={{ textAlign: "center" }}>
                    {solicitud.sol_Titular}
                  </Grid>
                  <Grid item xs={3} style={{ textAlign: "center" }}>
                    {formatearFecha(solicitud.sol_FechaVencimiento)}
                  </Grid>
                </Grid>
              ))}
            </Box>
          )}

          {selectedTab === "categories" && <AdminCategories></AdminCategories>}
        </Card>

        {/* Modal para mostrar detalles de la solicitud */}
        <Modal
          open={openRequestModal}
          onClose={handleCloseRequestModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1200,
              maxHeight: "90vh", // Limita la altura máxima al 90% de la altura de la ventana
              overflowY: "auto", // Habilita el scroll vertical si el contenido es más grande que la altura máxima
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column", // Asegura que los elementos dentro del modal se organicen verticalmente
              gap: 2,
            }}
          >
            {selectedRequest && (
              <>
                {/* Información de la Solicitud */}
                <Typography id="modal-title" variant="h3">
                  Solicitud de {selectedRequest.sol_Titular} (Cliente:{" "}
                  {selectedRequest.sol_NombreCliente})
                </Typography>
                <Typography variant="body1">
                  <strong>Categoría:</strong> {selectedRequest.cat_Nombre}
                </Typography>
                <Typography variant="body1">
                  <strong>Marca:</strong> {selectedRequest.sol_Marca}
                </Typography>
                <Typography variant="body1">
                  <strong>Descripción:</strong> {selectedRequest.sol_Descripcion}
                </Typography>
                <Typography variant="body1">
                  <strong>Precio:</strong> {selectedRequest.sol_Precio || "No especificado"}
                </Typography>
                <Typography variant="body1">
                  <strong>Teléfono:</strong> {selectedRequest.sol_Telefono_1}
                </Typography>
                <Typography variant="body1">
                  <strong>Teléfono Adicional:</strong> {selectedRequest.sol_Telefono_2}
                </Typography>
                <Typography variant="body1">
                  <strong>Correo:</strong> {selectedRequest.sol_Correo}
                </Typography>
                <Typography variant="h6" mt={2}>
                  Imágenes:
                </Typography>
                <Box display="flex" gap={2} justifyContent="center">
                  <img
                    src={selectedRequest.sol_IMG_1}
                    alt="Imagen 1"
                    style={{ width: "450px", height: "250px", objectFit: "full" }}
                  />
                </Box>
                <Box display="flex" gap={2} justifyContent="center">
                  <img
                    src={selectedRequest.sol_IMG_2}
                    alt="Imagen 2"
                    style={{ width: "450px", height: "250px", objectFit: "full" }}
                  />
                </Box>
                <Box display="flex" gap={2} justifyContent="center">
                  <img
                    src={selectedRequest.sol_IMG_3}
                    alt="Imagen 3"
                    style={{ width: "450px", height: "250px", objectFit: "full" }}
                  />
                </Box>
                <Box display="flex" gap={2} justifyContent="center">
                  <img
                    src={selectedRequest.sol_IMG_4}
                    alt="Imagen 4"
                    style={{ width: "450px", height: "250px", objectFit: "full" }}
                  />
                </Box>
                <Typography variant="h6" mt={2}>
                  Comprobante de Pago:
                </Typography>
                <Box display="flex" justifyContent="center">
                  <img
                    src={selectedRequest.sol_Comprobante}
                    alt="Comprobante"
                    style={{ width: "450px", height: "250px", objectFit: "full" }}
                  />
                </Box>
                {/* Botones de Aprobar y Rechazar */}
                <Box display="flex" justifyContent="center" mt={4} gap={2}>
                  <MKButton
                    onClick={() => handleAprobar(selectedRequest.sol_ID)} // Usar una función anónima
                    sx={{
                      padding: "12px 24px",
                      fontSize: "1.1rem",
                      minWidth: "150px",
                    }}
                    startIcon={<Icon>check</Icon>}
                    variant="contained"
                    color="success"
                  >
                    APROBAR
                  </MKButton>
                  {/* Botón de Rechazar */}
                  <MKButton
                    onClick={() => handleOpenRejectModal(selectedRequest.sol_ID)}
                    sx={{
                      padding: "12px 24px",
                      fontSize: "1.1rem",
                      minWidth: "150px",
                    }}
                    startIcon={<Icon>close</Icon>}
                    variant="outlined"
                    color="error"
                  >
                    RECHAZAR
                  </MKButton>

                  {/* Modal de rechazo */}
                  <Modal open={openRejectModal} onClose={handleCloseRejectModal}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        p: 4,
                        boxShadow: 24,
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Motivo del Rechazo
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Escribe el motivo del rechazo aquí..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        sx={{ mb: 3 }}
                      />
                      <Box display="flex" justifyContent="flex-end" gap={2}>
                        <MKButton
                          onClick={handleCloseRejectModal}
                          sx={{
                            padding: "12px 24px",
                            minWidth: "150px",
                          }}
                          variant="outlined"
                          color="secondary"
                        >
                          Cancelar
                        </MKButton>
                        <MKButton
                          onClick={handleConfirmRejection}
                          sx={{
                            padding: "12px 24px",
                            minWidth: "150px",
                          }}
                          startIcon={<Icon>check</Icon>}
                          variant="contained"
                          color="success"
                          disabled={!rejectionReason} // Desactiva hasta que se llene el motivo
                        >
                          Confirmar Rechazo
                        </MKButton>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </MKBox>
    </>
  );
}

export default AdminProfile;

import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Useroutes from "Useroutes";
import Icon from "@mui/material/Icon";
import React, { useState } from "react";
import CreateRequestForm from "pages/Presentation/CrearSolicitudForm";
import { Badge } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userRequests = [
  { id: 1, title: "Solicitud para máquina CNC", status: "En revisión", days: "N/A" },
  { id: 2, title: "Solicitud para Bulldozer Komatsu D85", status: "Aprobada", days: "5 días" },
  { id: 3, title: "Solicitud para Maquina Industrial", status: "Vencida", days: "60 días" },
];

function UserProfile() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  const handleCreateRequestClick = () => {
    setShowForm(true);
    setShowRequests(false);
  };

  const handleShowRequestsClick = () => {
    setShowForm(false);
    setShowRequests(true);
  };

  const handleCancelRequest = () => {
    setShowForm(false);
  };

  const handleViewPublicationClick = (status) => {
    if (status === "Vencida") {
      toast.error("El Anuncio ya venció.");
    } else if (status === "En revisión") {
      toast.warning("El Anuncio está siendo revisado", {
        type: "default",
      });
    } else if (status === "Aprobada") {
      navigate("/info-maquina");
    }
  };

  return (
    <>
      {/* Navbar sin fijar */}
      <DefaultNavbar routes={Useroutes} />

      {/* Contenedor con margen superior */}
      <MKBox bgColor="white" minHeight="100vh" position="relative">
        <MKBox pt={6} pb={3}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={10}>
              <Card
                sx={{
                  p: 2,
                  mx: { xs: 2, lg: 3 },
                  mt: 6,
                  mb: 4,
                  backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                    rgba(white.main, 0.8),
                  backdropFilter: "saturate(200%) blur(30px)",
                  boxShadow: ({ boxShadows: { xxl } }) => xxl,
                  maxWidth: "120%", // Aumenta el ancho máximo de la card
                }}
              >
                {/* Foto de Perfil y Nombre */}
                <MKBox display="flex" flexDirection="column" alignItems="center" mb={3}>
                  <Avatar
                    alt="Usuario"
                    src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" // Foto de perfil de ejemplo
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                  <MKTypography variant="h4">
                    Nombre del Usuario <Icon style={{ marginLeft: 5 }}>edit</Icon>
                  </MKTypography>
                  <MKTypography variant="h6">@username</MKTypography>
                </MKBox>

                <MKBox textAlign="center" mb={4}>
                  <MKButton
                    variant="contained"
                    startIcon={<Icon>add</Icon>}
                    sx={{
                      backgroundColor: "#1428A0",
                      color: "#fff",
                      fontSize: { xs: "0.5rem", sm: "0.9rem" },
                      padding: { xs: "8px 16px", sm: "12px 24px" },
                      "&:hover": {
                        backgroundColor: "#007A32",
                        color: "#fff",
                      },
                    }}
                    onClick={handleCreateRequestClick}
                  >
                    Crear Solicitud
                  </MKButton>
                  <MKButton
                    variant="contained"
                    sx={{
                      backgroundColor: "#1428A0",
                      color: "#fff",
                      fontSize: { xs: "0.5rem", sm: "0.9rem" },
                      padding: { xs: "8px 16px", sm: "12px 24px" },
                      "&:hover": {
                        backgroundColor: "#007A32",
                        color: "#fff",
                      },
                      ml: 2, // Espacio entre los botones
                    }}
                    onClick={handleShowRequestsClick}
                  >
                    Mis Solicitudes
                  </MKButton>
                </MKBox>

                {/* Mostrar el formulario si showForm es true */}
                {showForm && (
                  <MKBox>
                    <MKBox textAlign="center" mb={4}>
                      <MKButton
                        onClick={handleCancelRequest}
                        startIcon={<Icon>cancel</Icon>}
                        sx={{
                          position: "relative",
                          top: "40px", // Ajusta según necesites
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.1)", // Efecto de zoom al hacer hover
                            backgroundColor: "#d32f2f", // Cambia el color al hacer hover (opcional)
                            color: "#ffff",
                          },
                        }}
                      >
                        Cancelar Solicitud
                      </MKButton>
                    </MKBox>
                    <CreateRequestForm />
                  </MKBox>
                )}

                {/* Mostrar la tabla de solicitudes si showRequests es true */}
                {showRequests && (
                  <MKBox mt={4}>
                    <MKTypography textAlign="center" variant="h5" mb={2}>
                      Mis Solicitudes
                    </MKTypography>
                    <Grid container spacing={2}>
                      {userRequests.map((request) => (
                        <Grid item xs={12} md={6} key={request.id}>
                          <Card sx={{ p: 2 }}>
                            <MKTypography variant="h6">{request.title}</MKTypography>
                            <MKTypography
                              variant="body2"
                              color="text.secondary"
                              display="flex"
                              alignItems="center"
                            >
                              Estado:
                              <Badge
                                sx={{
                                  ml: 1, // Espacio entre el texto y el badge
                                  backgroundColor:
                                    request.status === "Aprobada"
                                      ? "green"
                                      : request.status === "En revisión"
                                      ? "gray"
                                      : "red",
                                  color: "white",
                                  px: 1, // Espacio interno del badge
                                  borderRadius: 1,
                                  fontWeight: "bold", // Texto en negrita
                                }}
                              >
                                {request.status}
                              </Badge>
                            </MKTypography>
                            <MKTypography variant="body2" color="text.secondary">
                              Días en publicación: {request.days}
                            </MKTypography>

                            <MKButton
                              variant="contained"
                              startIcon={<Icon>visibility</Icon>}
                              onClick={() => handleViewPublicationClick(request.status)}
                            >
                              Ver Publicación
                            </MKButton>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </MKBox>
                )}
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </>
  );
}

export default UserProfile;

import React, { useState } from "react";
import { TextField, Button, Card, Typography, Container, Box, Grid, Icon } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getRastrearSolicitud } from "apiServices";
import MKBox from "components/MKBox";
import { useNavigate } from "react-router-dom";
import Useroutes from "Useroutes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import bgImage from "assets/images/fondoprueba.png";
import CenteredFooter from "examples/Footers/CenteredFooter";

// Estilo personalizado para la tarjeta de resultado
const ResultCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: theme.palette.background.default,
}));

const TrackingPage = () => {
  const [searchCode, setSearchCode] = useState(""); // Para el código de búsqueda
  const [request, setRequest] = useState(null); // Para los detalles de la solicitud encontrada
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Función para manejar la búsqueda
  const handleSearch = () => {
    getRastrearSolicitud(searchCode)
      .then((data) => {
        setRequest(data.data[0]);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error al buscar solicitud:", error);
        setErrorMessage("Hubo un error al buscar la solicitud. Inténtelo de nuevo.");
      });
  };

  // Función para determinar el color del estado
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

  return (
    <>
      {/* Navbar sin fijar */}
      <DefaultNavbar routes={Useroutes} />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          position: "relative",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        {/* Contenido que va sobre el overlay */}
        <MKBox
          sx={{
            position: "relative",
            zIndex: 2,
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Container>
            <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
              <MKBox
                component="img"
                src={require("assets/images/HEADER-V1.png")}
                alt="Tu Máquina Usada"
                width="130%"
                height="auto"
                sx={{
                  objectFit: "cover",
                  mt: -10,
                }}
              />
            </Grid>
          </Container>
        </MKBox>
      </MKBox>

      <MKBox bgColor="white" minHeight="100vh" position="relative">
        <MKBox pt={6} pb={3}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={10}>
              <Card
                sx={{
                  p: 2,
                  mx: { xs: 2, lg: 3 },
                  mt: -18,
                  mb: 1,
                  backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                    rgba(white.main, 0.8),
                  backdropFilter: "saturate(200%) blur(30px)",
                  boxShadow: ({ boxShadows: { xxl } }) => xxl,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Container sx={{ mt: 6 }}>
                  <Typography variant="h2" align="center" gutterBottom>
                    Rastrea tu solicitud
                  </Typography>
                  <Typography variant="body1" align="center" mb={4}>
                    Ingresa el código proporcionado en el formulario de registro y rastrea tu
                    solicitud si aún no ves publicada tu máquina.
                  </Typography>

                  {/* Campo de entrada y botón de búsqueda */}
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <TextField
                      label="Código de Solicitud"
                      variant="outlined"
                      value={searchCode}
                      onChange={(e) => setSearchCode(e.target.value)}
                      sx={{ mr: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      sx={{
                        backgroundColor: "#4A90E2", // Color de fondo personalizado
                        color: "#FFFFFF", // Color del texto
                        "&:hover": {
                          backgroundColor: "#357ABD", // Color de fondo al hacer hover
                        },
                      }}
                    >
                      Buscar
                    </Button>
                  </Box>

                  {/* Mensaje de error */}
                  {errorMessage && (
                    <Typography color="error" align="center" mt={2}>
                      {errorMessage}
                    </Typography>
                  )}

                  {/* Resultados de la búsqueda */}
                  {request && (
                    <ResultCard>
                      <Typography variant="h6" fontWeight="bold">
                        Código de Solicitud: {request.sol_Cod}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Titular: </strong> {request.sol_Titular}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: getStatusColor(request.sol_Estado) }}
                      >
                        Estado de la Solicitud:{" "}
                        {request.sol_Estado === "P"
                          ? "Pendiente"
                          : request.sol_Estado === "R"
                          ? `Rechazada`
                          : "Aceptada"}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Motivo: </strong> {request.sol_Motivo}
                      </Typography>
                    </ResultCard>
                  )}
                </Container>
                {/* Botón para volver */}
                <Box mt={4} textAlign="center">
                  <Button
                    variant="contained"
                    startIcon={<Icon>arrow_back</Icon>}
                    sx={{
                      backgroundColor: "#1428A0",
                      color: "#fff",
                      fontSize: { xs: "0.9rem", sm: "1.2rem" },
                      padding: { xs: "8px 16px", sm: "12px 24px" },
                      "&:hover": {
                        backgroundColor: "#ffff",
                        color: "#1428A0",
                        borderColor: "#1428A0",
                      },
                    }}
                    onClick={() => navigate("/")} // Ruta de vuelta a la página principal
                  >
                    Volver a la Página Principal
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>

      <CenteredFooter></CenteredFooter>
    </>
  );
};

export default TrackingPage;

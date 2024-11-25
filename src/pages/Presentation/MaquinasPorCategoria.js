import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Grid, Typography, Card, CardContent, Button, Container, Icon } from "@mui/material";
import { getMaquinasPorCategoria } from "apiServices";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import routes from "routes";
import CenteredFooter from "examples/Footers/CenteredFooter";
import { useNavigate } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";

// Images
import bgImage from "assets/images/fondoprueba.png";

const MachinesByCategory = () => {
  const { cat_ID } = useParams();
  const location = useLocation();
  const { cat_Nombre } = location.state || {};

  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige al inicio si no viene `cat_Nombre` desde la navegación por categorías
    if (!cat_Nombre) {
      navigate("/");
    }
  }, [cat_Nombre, navigate]);

  useEffect(() => {
    const fetchMachinesByCategory = async () => {
      try {
        const data = await getMaquinasPorCategoria(cat_ID);
        setMachines(data);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachinesByCategory();
  }, [cat_ID]);

  return (
    <>
      <DefaultNavbar routes={routes}></DefaultNavbar>
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
        {/* Overlay con opacidad */}
        <MKBox
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(20, 40, 160, 0.5)",
            zIndex: 1,
          }}
        />

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
                width="170%"
                height="auto"
                sx={{
                  objectFit: "cover",
                  mt: -7,
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
                <Container sx={{ mt: 1 }}>
                  <Typography variant="h1" align="center" gutterBottom>
                    Máquinas en la categoría: <strong> {cat_Nombre} </strong>
                  </Typography>

                  <Grid container spacing={3}>
                    {machines.length > 0 ? (
                      machines.map((machine) => (
                        <Grid item xs={12} sm={6} md={4} key={machine.sol_ID}>
                          <Card>
                            <Box
                              component="img"
                              src={machine.sol_IMG_1}
                              alt={machine.sol_Marca}
                              sx={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "4px 4px 0 0",
                              }}
                            />
                            <CardContent>
                              <Typography variant="h6">{machine.sol_Marca}</Typography>
                              <Typography variant="body1">{machine.sol_Titular}</Typography>
                              <Typography variant="body2">{machine.sol_Descripcion}</Typography>
                            </CardContent>
                            <Button
                              variant="outlined"
                              sx={{
                                color: "#007A32",
                                borderColor: "#007A32",
                                "&:hover": {
                                  backgroundColor: "#e0f2f1",
                                  borderColor: "#e0f2f1",
                                },
                              }}
                              onClick={() => console.log("Ver más de la máquina", machine.sol_ID)}
                            >
                              Ver más
                            </Button>
                          </Card>
                        </Grid>
                      ))
                    ) : (
                      // Mostrar mensaje si no hay máquinas
                      <Box sx={{ textAlign: "center", mt: 8, width: "100%" }}>
                        <Box
                          sx={{ transform: "scale(1.5)", display: "inline-flex", color: "#888" }}
                        >
                          <SearchOffIcon fontSize="inherit" />
                        </Box>
                        <Typography variant="h5" color="textSecondary">
                          Aún no hay máquinas en esta categoría...
                        </Typography>
                      </Box>
                    )}
                  </Grid>

                  {/* Botón para volver */}
                  <Box mt={15} textAlign="center">
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
                </Container>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
      <CenteredFooter></CenteredFooter>
    </>
  );
};

export default MachinesByCategory;

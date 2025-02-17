// @mui material components
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Icon,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import { getTopSolicitudes } from "apiServices";

import InfoIcon from "@mui/icons-material/Info";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import CategoriesSection from "pages/Presentation/Categorias";
import BuscadorSection from "pages/Presentation/Buscador";
//import AnunciosLaterales from "pages/Presentation/AnunciosLaterales";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MKBadge from "components/MKBadge";
import PublicarMaquinaButton from "pages/Presentation/BotonFlotante";

// Routes
import React, { useEffect, useState } from "react";
import routes from "routes";

// Images
import bgImage from "assets/images/fondoprueba.png";
import { useNavigate } from "react-router-dom";
import CenteredFooter from "examples/Footers/CenteredFooter";
import RastrearMaquinaButton from "./BotonFlotanteRastreo";

function Presentation() {
  const navigate = useNavigate();

  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    getTopSolicitudes()
      .then((data) => {
        setSolicitudes(data);
      })
      .catch((error) => console.error("Error al obtener solicitudes:", error));
  }, []);

  const [activeSection, setActiveSection] = useState("home");
  const handleShowHome = () => setActiveSection("home");
  const handleShowAbout = () => setActiveSection("about");
  const handleShowAdvertise = () => setActiveSection("advertise");

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    descripcion: "",
    imagen: null,
  });
  const [error, setError] = useState({
    nombre: false,
    correo: false,
    telefono: false,
    descripcion: false,
    imagen: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setError({ ...error, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {
      nombre: !formData.nombre,
      correo: !formData.correo,
      telefono: !formData.telefono,
      descripcion: !formData.descripcion,
      imagen: !formData.imagen,
    };
    setError(newError);

    // Si no hay errores, proceder con el envío del formulario
    if (!Object.values(newError).includes(true)) {
      // Aquí va la lógica para enviar el formulario
      console.log("Formulario enviado:", formData);
    }
  };

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

      {activeSection === "home" && (
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 6 },
            mt: -18,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
            position: "relative",
            zIndex: 3,
          }}
        >
          {/* Contenedor de botones */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 4,
              pt: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>home</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowHome}
            >
              Inicio
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>info</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowAbout}
            >
              Sobre Nosotros
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>ads_click</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowAdvertise}
            >
              publicidad para tu negocio
            </Button>
          </Box>

          <Container sx={{ mt: 6 }}>
            {/*TEXTO*/}
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#4f5f7b",
                mt: -1,
                mb: 1,
                fontSize: ({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: size["3xl"],
                }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <Icon
                  sx={{
                    fontSize: 40,
                    color: "#4f5f7b",
                  }}
                >
                  history
                </Icon>
              </Box>
              Lo más reciente....
            </Typography>
            <Grid container spacing={3}>
              {solicitudes.map((solicitud) => (
                <Grid item xs={12} sm={6} lg={4} key={solicitud.sol_ID}>
                  <Card sx={{ p: 2, boxShadow: "lg" }}>
                    <Box
                      component="img"
                      src={solicitud.sol_IMG_2}
                      alt={solicitud.sol_Titular}
                      width="100%"
                      height="300px"
                      mb={2}
                      sx={{
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <Typography variant="h5" fontWeight="bold" mb={1}>
                      {solicitud.sol_Titular}
                    </Typography>

                    <Typography variant="body2" color="text" mb={1}>
                      <Icon sx={{ fontSize: "inherit", verticalAlign: "middle" }}>
                        attach_money
                      </Icon>{" "}
                      Precio: {solicitud.sol_Precio}
                    </Typography>

                    <Typography variant="body2" color="text" mb={1}>
                      <Icon sx={{ fontSize: "inherit", verticalAlign: "middle" }}>access_time</Icon>{" "}
                      Horas de uso: {solicitud.sol_Horas}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2}>
                      {/* Botón "Ver más" */}
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<Icon>visibility</Icon>}
                        onClick={() => navigate("/info-maquina")}
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
                      >
                        Ver más
                      </Button>

                      {/* Botón de WhatsApp */}
                      <Button
                        variant="outlined"
                        startIcon={<WhatsAppIcon />}
                        onClick={() =>
                          window.open(`https://wa.me/${solicitud.sol_Telefono_1}`, "_blank")
                        } // Reemplaza con el número de WhatsApp real
                        sx={{
                          //backgroundColor: "#1428A0",
                          color: "#1428A0",
                          fontSize: { xs: "0.9rem", sm: "1.2rem" },
                          padding: { xs: "8px 16px", sm: "12px 24px" },
                          "&:hover": {
                            backgroundColor: "#1428A0",
                            color: "#ffff",
                            borderColor: "#1428A0",
                          },
                        }}
                      >
                        {/* Aquí se puede poner el icono de WhatsApp */}
                        Contacto
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/*Buscador*/}
          <BuscadorSection></BuscadorSection>
          {/* Sección de Categorías */}
          <CategoriesSection></CategoriesSection>
        </Card>
      )}
      {activeSection === "about" && (
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -18,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
            position: "relative",
            zIndex: 3,
          }}
        >
          {/* Contenedor de botones */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 4,
              pt: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>home</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowHome}
            >
              Inicio
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>info</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowAbout}
            >
              Sobre Nosotros
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>ads_click</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowAdvertise}
            >
              PUBLICIDAD PARA TU NEGOCIO
            </Button>
          </Box>

          <Container sx={{ mt: 6 }}>
            {/* TEXTO */}
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#4f5f7b",
                mt: -1,
                mb: 1,
                fontSize: ({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: size["3xl"],
                }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <Icon
                  sx={{
                    fontSize: 40,
                    color: "#4f5f7b",
                  }}
                >
                  info
                </Icon>
              </Box>
              Sobre Nosotros
            </Typography>
            <Grid container spacing={4}>
              {/* Tarjeta Misión */}
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    p: 3,
                    backgroundColor: "#1428A0",
                    color: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    minHeight: "210px",
                    mt: 3,
                    mb: 1,
                  }}
                >
                  <Typography variant="h2" color="#fff" mb={2}>
                    Misión
                  </Typography>
                  <Typography variant="body1" color="#fff">
                    Facilitar las gestiones de compra venta de maquinaria y accesorios industriales
                    a través de un espacio virtual.
                  </Typography>
                </Card>
              </Grid>
              {/* Tarjeta Visión */}
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    p: 3,
                    backgroundColor: "#1428A0",
                    color: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    minHeight: "210px",
                    mt: 3,
                    mb: 1,
                  }}
                >
                  <Typography variant="h2" color="#fff" mb={2}>
                    Visión
                  </Typography>
                  <Typography variant="body1" color="#fff">
                    Ser el principal punto de encuentro virtual para la compra venta de maquinaria y
                    accesorios industriales a nivel de la región centroamericana.
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            {/* VALORES */}
            <Typography variant="h2" color="#008F39" mt={4} mb={2}>
              Valores
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  icon: "emoji_people",
                  title: "Responsabilidad",
                  description: "Ofrecer un punto de encuentro cumpliendo los compromisos asumidos.",
                },
                {
                  icon: "lightbulb",
                  title: "Proactividad",
                  description: "Para buscar potenciales oportunidades de negocio.",
                },
                {
                  icon: "eco",
                  title: "Amigables con el ambiente",
                  description: "Promover la reutilización de los productos.",
                },
                {
                  icon: "autorenew",
                  title: "Flexibilidad",
                  description: "Para adaptarse a las realidades cambiantes del entorno de negocio.",
                },
                {
                  icon: "verified_user",
                  title: "Honestidad",
                  description: "Promoviendo la transparencia en las gestiones.",
                },
                {
                  icon: "groups",
                  title: "Trabajo en equipo",
                  description: "Colaborar conjunta y activamente en la gestión del negocio.",
                },
              ].map((value, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      boxShadow: "lg",
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Icon sx={{ fontSize: 45, color: "#008F39", mb: 2 }}>{value.icon}</Icon>
                      <Typography variant="h6" fontWeight="bold" mb={1}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" color="text">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Card>
      )}
      {activeSection === "advertise" && (
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -18,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
            position: "relative",
            zIndex: 3,
          }}
        >
          {/* Contenedor de botones */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 4,
              pt: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>home</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowHome}
            >
              Inicio
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>info</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowAbout}
            >
              Sobre Nosotros
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>ads_click</Icon>}
              sx={{
                backgroundColor: "#1428A0",
                color: "#fff",
                fontSize: { xs: "0.9rem", sm: "1.2rem" },
                padding: { xs: "8px 16px", sm: "12px 24px" },
                "&:hover": {
                  backgroundColor: "#007A32",
                },
              }}
              onClick={handleShowAdvertise}
            >
              PUBLICIDAD PARA TU NEGOCIO
            </Button>
          </Box>
          <Container sx={{ mt: 6 }}>
            {/* Título */}
            <Typography
              variant="h1"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#4f5f7b",
                mb: 1,
                fontSize: ({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: size["3xl"],
                }),
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <Icon
                  sx={{
                    fontSize: 40,
                    color: "#4f5f7b",
                  }}
                >
                  campaign
                </Icon>
              </Box>
              PUBLICIDAD PARA TU NEGOCIO
            </Typography>
            <MKBadge
              badgeContent="PRÓXIMAMENTE"
              variant="contained"
              color="warning"
              container
              circular
              sx={{
                mb: 3,
              }}
            />
            {/* Descripción */}
            <Typography variant="body1" color="text" mb={4}>
              Si quieres promocionar tu negocio en nuestra plataforma, completa el siguiente
              formulario:
            </Typography>
            {/* Formulario */}
            <Card sx={{ backgroundColor: "#ffff", p: 3 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  variant="outlined"
                  margin="normal"
                  required
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  error={error.nombre}
                  helperText={error.nombre ? "Este campo es obligatorio" : ""}
                />
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  variant="outlined"
                  margin="normal"
                  type="email"
                  required
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  error={error.correo}
                  helperText={error.correo ? "Este campo es obligatorio" : ""}
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  variant="outlined"
                  margin="normal"
                  required
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  error={error.telefono}
                  helperText={error.telefono ? "Este campo es obligatorio" : ""}
                />
                <TextField
                  fullWidth
                  label="Descripción del Lote o Servicio"
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  error={error.descripcion}
                  helperText={error.descripcion ? "Este campo es obligatorio" : ""}
                />

                <Box display="flex" alignItems="center" margin="normal">
                  <TextField
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    required
                    name="imagen"
                    onChange={handleChange}
                    error={error.imagen}
                    helperText={error.imagen ? "Este campo es obligatorio" : ""}
                  />
                  <Tooltip title="La imagen debe tener un tamaño de 800x600 píxeles para mejor visualización">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Icon sx={{ fontSize: { xs: "1rem", sm: "1rem" } }}>send</Icon>}
                    sx={{
                      backgroundColor: "#024896",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#007A32",
                      },
                    }}
                  >
                    Enviar
                  </Button>
                </Box>
              </form>
            </Card>
          </Container>
        </Card>
      )}
      <PublicarMaquinaButton></PublicarMaquinaButton>
      <RastrearMaquinaButton></RastrearMaquinaButton>
      <CenteredFooter></CenteredFooter>
    </>
  );
}

export default Presentation;

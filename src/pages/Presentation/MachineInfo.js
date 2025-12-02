import React, { useEffect, useState } from "react";
import { Card, CardContent, Box, Typography, Button, Icon, Grid } from "@mui/material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { getMachineDetails } from "apiServices";
import MKBox from "components/MKBox";
import { useNavigate } from "react-router-dom";
import bgImage from "assets/images/fondoprueba.png";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import PaidIcon from "@mui/icons-material/Paid";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactMailIcon from "@mui/icons-material/ContactMail";

function MachineInfo() {
  const { sol_ID } = useParams();
  const navigate = useNavigate(); // Obtén el ID de la máquina desde la URL
  const [machineDetails, setMachineDetails] = useState(null);

  useEffect(() => {
    // Llamar a la función de apiServices para obtener los detalles de la máquina
    const fetchMachineDetails = async () => {
      try {
        const data = await getMachineDetails(sol_ID);
        setMachineDetails(data[0]);
      } catch (error) {
        console.error("Error al obtener los detalles de la máquina:", error);
      }
    };

    fetchMachineDetails();
  }, [sol_ID]);

  if (!machineDetails)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            width: "150px", // Asegura un tamaño grande
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AgricultureIcon
            sx={{
              fontSize: "150px !important", // Fuerza el tamaño del icono
              color: "#008F39",
              animation: "move 1.5s infinite linear",
            }}
          />
        </Box>
        <Typography variant="h2" sx={{ mt: 2, color: "#008F39" }}>
          Cargando...
        </Typography>
        <style>
          {`
            @keyframes move {
              0% { transform: translateX(-20px); }
              50% { transform: translateX(20px); }
              100% { transform: translateX(-20px); }
            }
          `}
        </style>
      </Box>
    );
  return (
    <>
      <DefaultNavbar routes={routes} />

      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          position: "relative", // Para posicionar el overlay
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
            position: "relative", // Para que esté por encima del overlay
            zIndex: 2, // Asegúrate de que el contenido esté sobre el overlay
            color: "#fff", // Ajusta el color del texto para que contraste con el fondo
            textAlign: "center", // Centra el texto
          }}
        ></MKBox>
      </MKBox>

      <Box
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -40,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          position: "relative",
          zIndex: 3,
        }}
        p={4}
      >
        <Typography variant="h1" gutterBottom align="center">
          Información de la Máquina
        </Typography>
        <Typography variant="h2" gutterBottom align="center">
          {machineDetails.sol_Titular}
        </Typography>
        {/* Fila de imágenes */}
        <Grid container spacing={2} justifyContent="center" style={{ marginBottom: "20px" }}>
          <Grid item xs={6} sm={3}>
            {machineDetails.sol_IMG_1 && (
              <img
                src={machineDetails.sol_IMG_1}
                alt="Imagen 1"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            )}
          </Grid>
          <Grid item xs={6} sm={3}>
            {machineDetails.sol_IMG_2 && (
              <img
                src={machineDetails.sol_IMG_2}
                alt="Imagen 2"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            )}
          </Grid>
          <Grid item xs={6} sm={3}>
            {machineDetails.sol_IMG_3 && (
              <img
                src={machineDetails.sol_IMG_3}
                alt="Imagen 3"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            )}
          </Grid>
          <Grid item xs={6} sm={3}>
            {machineDetails.sol_IMG_4 && (
              <img
                src={machineDetails.sol_IMG_4}
                alt="Imagen 4"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            )}
          </Grid>
        </Grid>

        {/* Cartas con información de la máquina y contacto */}
        <Grid container spacing={3}>
          {/* Carta de Información de la Máquina */}
          <Grid item xs={12} sm={6}>
            <Card style={{ borderRadius: "12px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h4" style={{ marginBottom: "10px" }}>
                  <PrecisionManufacturingIcon /> Información General
                </Typography>
                <Typography variant="body1">
                  <BookmarksIcon />
                  <strong> Marca:</strong> {machineDetails.sol_Marca}
                </Typography>
                <Typography variant="body1">
                  <AccessTimeIcon />
                  <strong> Horas:</strong> {machineDetails.sol_Horas}
                </Typography>
                <Typography variant="body1">
                  <CategoryIcon />
                  <strong> Categoría:</strong> {machineDetails.cat_Nombre}
                </Typography>
                <Typography variant="body1">
                  <DescriptionIcon />
                  <strong> Descripción:</strong> {machineDetails.sol_Descripcion}
                </Typography>
                <Typography variant="body1">
                  <PaidIcon />
                  <strong> Precio:</strong> HNL. {machineDetails.sol_Precio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Carta de Información de Contacto */}
          <Grid item xs={12} sm={6}>
            <Card style={{ borderRadius: "12px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
              <CardContent>
                <Typography variant="h4" style={{ marginBottom: "20px" }}>
                  <WhatsAppIcon /> Información de Contacto
                </Typography>

                {/* Mostrar información de contacto */}
                <div style={{ marginBottom: "20px" }}>
                  <Typography variant="body1">
                    <PhoneIcon />
                    <strong> Teléfono Principal:</strong> {machineDetails.sol_Telefono_1}
                  </Typography>
                  <Typography variant="body1">
                    <PhoneIcon />
                    <strong> Teléfono Adicional:</strong> {machineDetails.sol_Telefono_2}
                  </Typography>
                  <Typography variant="body1">
                    <ContactMailIcon />
                    <strong> Correo:</strong> {machineDetails.sol_Correo}
                  </Typography>
                </div>

                {/* Botones centrados en la parte inferior */}
                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    href={`https://wa.me/${machineDetails.sol_Telefono_1}`}
                    target="_blank"
                    sx={{
                      backgroundColor: "#007A32",
                      color: "#fff",
                      fontSize: { xs: "0.8rem", sm: "1.1rem" },
                      padding: { xs: "8px 16px", sm: "12px 24px" },
                      "&:hover": {
                        backgroundColor: "#1428A0",
                      },
                    }}
                  >
                    Contactar vía WhatsApp
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EmailIcon />}
                    href={`mailto:${machineDetails.sol_Correo}`}
                    sx={{
                      backgroundColor: "#1428A0",
                      color: "#fff",
                      fontSize: { xs: "0.8rem", sm: "1.1rem" },
                      padding: { xs: "8px 16px", sm: "12px 24px" },
                      "&:hover": {
                        backgroundColor: "#007A32",
                      },
                    }}
                  >
                    Enviar Correo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
      </Box>
    </>
  );
}

// Validamos las props del componente
MachineInfo.propTypes = {
  sol_ID: PropTypes.number.isRequired, // Aseguramos que sol_ID sea un número y es requerido
};
export default MachineInfo;

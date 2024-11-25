import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Button,
  Icon,
} from "@mui/material";
import MKBox from "components/MKBox";

import { useNavigate } from "react-router-dom";
import soliImg1 from "assets/images/solicitudes/maquinaria-de-construccion-bulldozer-Komatsu-D85-18---1659941368390190927_big--22080809492677584800.jpg";
import soliImg2 from "assets/images/solicitudes/D85EXPX_18_06.jpg";
import soliImg3 from "assets/images/solicitudes/22578-15712751.jpg";
import soliImg4 from "assets/images/solicitudes/UTB8xILdCiaMiuJk43PTq6ySmXXa4.jpg_720x720q50.avif";
import bgImage from "assets/images/fondoprueba.png";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

// Datos de la máquina para ejemplificar
const machineData = {
  name: "Bulldozer Komatsu D85",
  category: "Vehículos",
  brand: "Komatsu",
  descripcion: "Bulldozer Komatsu D85, en excelente estado.",
  hours: "500 horas",
  price: "HNL 26,000",
  images: [soliImg1, soliImg2, soliImg3, soliImg4],
  email: "contact@example.com",
  phone: "+1234567890",
  additionalPhone: "+0987654321",
};

function MachineInfo() {
  const navigate = useNavigate();

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
        {/* Overlay con opacidad */}
        <MKBox
          sx={{
            position: "absolute", // Posiciona el overlay sobre la imagen
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(20, 40, 160, 0.5)", // Azul con opacidad
            zIndex: 1, // Asegúrate de que el overlay esté detrás del contenido
          }}
        />

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

        {/* Galería de Imágenes */}
        <Box mb={4}>
          <Typography variant="h3" gutterBottom align="center">
            Bulldozer Komatsu D85
          </Typography>
          <Grid container spacing={2}>
            {machineData.images.map((image, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={`Máquina ${index + 1}`}
                    height="200"
                    image={image}
                    style={{ objectFit: "cover" }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ maxWidth: 1200, margin: "auto", mt: 4 }}>
          <Box display="flex" gap={2}>
            {/* Datos de la Máquina */}
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  <Icon>info</Icon> Datos de la Máquina
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1">
                  <strong>Nombre:</strong> {machineData.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Categoría:</strong> {machineData.category}
                </Typography>
                <Typography variant="body1">
                  <strong>Marca:</strong> {machineData.brand}
                </Typography>
                <Typography variant="body1">
                  <strong>Horas de Uso:</strong> {machineData.hours}
                </Typography>
                <Typography variant="body1">
                  <strong>Precio:</strong> {machineData.price}
                </Typography>

                <Typography variant="body1">
                  <strong>Descripción:</strong> {machineData.descripcion}
                </Typography>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  <Icon>phone</Icon> Ponte en Contacto
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1">
                  <strong>Email:</strong> {machineData.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Teléfono:</strong> {machineData.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Teléfono Adicional:</strong> {machineData.additionalPhone}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

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

export default MachineInfo;

import MKBox from "components/MKBox";
import { Container, Card, Grid } from "@mui/material";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Useroutes from "Useroutes";
import React from "react";
import CreateRequestForm from "pages/Presentation/CrearSolicitudForm";
import bgImage from "assets/images/fondoprueba.png";
import CenteredFooter from "examples/Footers/CenteredFooter";
import { PrivacyTip } from "@mui/icons-material";

function PublicarMaquina() {
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

      {/* Contenedor con margen superior */}
      <MKBox bgColor="white" minHeight="100vh" position="relative">
        <MKBox pt={6} pb={3}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={10}>
              <Card
                sx={{
                  p: 2,
                  mx: { xs: 2, lg: 3 },
                  mt: -18,
                  mb: 4,
                  backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                    rgba(white.main, 0.8),
                  backdropFilter: "saturate(200%) blur(30px)",
                  boxShadow: ({ boxShadows: { xxl } }) => xxl,
                  position: "relative",
                  zIndex: 3,
                }}
              >
                {/* Aviso sobre el sitio */}
                <MKBox mb={3}>
                  <MKTypography variant="body1" color="black" textAlign="center">
                    <strong>
                      Este sitio es solo un espacio de conexión entre compradores y vendedores. No
                      nos hacemos responsables por las transacciones entre vendedores y compradores.
                      Por favor sea cuidadoso.{" "}
                    </strong>
                  </MKTypography>
                </MKBox>
                <MKBox mb={1}>
                  <MKTypography variant="body2" color="text.secondary" textAlign="center">
                    <strong>
                      <PrivacyTip></PrivacyTip> Aviso de Privacidad:
                    </strong>{" "}
                    Todos los datos proporcionados en este formulario, incluyendo teléfono y
                    detalles de contacto, serán visibles públicamente en el sitio. Por favor,
                    complete la información con precaución y evite compartir datos sensibles.
                    Recomendamos que solo incluya información relevante para la transacción.{" "}
                  </MKTypography>
                </MKBox>

                {/* Formulario de creación de solicitud */}
                <CreateRequestForm />
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
      <CenteredFooter></CenteredFooter>
    </>
  );
}

export default PublicarMaquina;

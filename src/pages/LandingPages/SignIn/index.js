import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui/material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/fondoprueba.png";

function SignInBasic() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => setShowSignUp(!showSignUp);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    if (username === "Usuario1" && password === "123") {
      navigate("/user-profile");
    } else if (username === "AnaG200" && password === "Ana200") {
      navigate("/user-profile");
    } else if (username === "Admin" && password === "Admin123") {
      navigate("/admin-profile");
    } else {
      toast.error("Datos Incorrectos");
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <MKBox
              sx={{
                perspective: "1000px",
              }}
            >
              <Card
                sx={{
                  height: "300px", // Altura fija para mantener la consistencia del diseño
                  transition: "transform 0.6s",
                  transformStyle: "preserve-3d",
                  transform: showSignUp ? "rotateY(180deg)" : "rotateY(0deg)",
                  position: "relative",
                }}
              >
                {/* Cara de Inicio de Sesión */}
                <MKBox
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%", // Asegura que ocupe toda la altura del contenedor
                    backfaceVisibility: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                  }}
                >
                  <MKBox
                    borderRadius="lg"
                    coloredShadow="#1428A0"
                    sx={{
                      backgroundColor: "#1428A0",
                      color: "#fff",
                      width: "300px",
                    }}
                    mx={2}
                    mt={-8}
                    p={1}
                    mb={2}
                    textAlign="center"
                  >
                    <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Iniciar Sesión
                    </MKTypography>
                  </MKBox>
                  <MKBox pt={4} pb={3} px={3}>
                    <MKBox component="form" role="form" onSubmit={handleLogin}>
                      <MKBox mb={2}>
                        <MKInput
                          type="text"
                          label="Usuario"
                          fullWidth
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput
                          type="password"
                          label="Contraseña"
                          fullWidth
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </MKBox>
                      <MKBox mt={4} mb={1}>
                        <MKButton
                          variant="gradient"
                          sx={{
                            backgroundColor: "#1428A0",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#007A32",
                            },
                          }}
                          fullWidth
                          type="submit"
                        >
                          Entrar
                        </MKButton>
                      </MKBox>
                    </MKBox>
                  </MKBox>
                </MKBox>

                {/* Cara de Registro */}
                <MKBox
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%", // Asegura que ocupe toda la altura del contenedor
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                  }}
                >
                  <MKBox
                    borderRadius="lg"
                    coloredShadow="#1428A0"
                    sx={{
                      backgroundColor: "#1428A0",
                      color: "#fff",
                      width: "300px",
                    }}
                    mx={2}
                    mt={-2}
                    p={1}
                    mb={2}
                    textAlign="center"
                  >
                    <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                      Regístrate
                    </MKTypography>
                  </MKBox>
                  <MKBox pt={4} pb={3} px={3}>
                    <MKBox component="form" role="form">
                      <MKBox mb={2}>
                        <MKInput type="text" label="Nombre" fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput type="email" label="Correo Electrónico" fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput type="password" label="Contraseña" fullWidth />
                      </MKBox>
                      <MKBox mt={4} mb={1}>
                        <MKButton
                          variant="gradient"
                          sx={{
                            backgroundColor: "#1428A0",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#007A32",
                            },
                          }}
                          fullWidth
                        >
                          Registrarse
                        </MKButton>
                      </MKBox>
                      <MKBox mt={3} mb={1} textAlign="center">
                        <MKTypography variant="button" color="text">
                          ¿Ya tienes una cuenta?{" "}
                          <MKTypography
                            component="span"
                            onClick={toggleForm}
                            variant="button"
                            color="#1428A0"
                            fontWeight="medium"
                            sx={{ cursor: "pointer" }}
                            textGradient
                          >
                            Inicia Sesión
                          </MKTypography>
                        </MKTypography>
                      </MKBox>
                    </MKBox>
                  </MKBox>
                </MKBox>
              </Card>
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

// Images
import bgImage from "assets/images/fondoprueba.png";
import { loginUsuario } from "apiServices";

function SignInBasic() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Por favor, ingrese su usuario y contraseña.");
      return;
    }

    try {
      const response = await loginUsuario(username, password);
      if (response.code == 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("usuario", JSON.stringify(response.data));
        navigate("/admin-profile");
      } else {
        toast.error("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Usuario o contraseña incorrectos.");
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
          backgroundImage: `url(${bgImage})`,
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
                      backgroundColor: "#76dd70",
                      color: "#0d440aff",
                      width: "300px",
                    }}
                    mx={2}
                    mt={-8}
                    p={1}
                    mb={2}
                    textAlign="center"
                  >
                    <MKTypography variant="h4" fontWeight="medium" color="#0d440aff" mt={1}>
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
              </Card>
            </MKBox>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;

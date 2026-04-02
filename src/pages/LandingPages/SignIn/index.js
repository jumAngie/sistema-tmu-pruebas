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

      {/* Fondo con overlay */}
      <MKBox
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `linear-gradient(rgba(56, 74, 180, 0.75), rgba(26, 36, 92, 0.56)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={11} sm={8} md={5} lg={4}>
            <Card
              sx={{
                p: 6,
                borderRadius: 3,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.95)",
              }}
            >
              {/* Título */}
              <MKBox textAlign="center" mb={3}>
                <MKTypography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    backgroundColor: "#76dd70",
                    color: "#0d440a",
                    display: "inline-block",
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                  }}
                >
                  Iniciar Sesión
                </MKTypography>
              </MKBox>

              {/* Formulario */}
              <MKBox component="form" onSubmit={handleLogin}>
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

                <MKBox mt={3}>
                  <MKButton
                    fullWidth
                    type="submit"
                    sx={{
                      backgroundColor: "#1428A0",
                      color: "#fff",
                      py: 1.2,
                      fontWeight: "bold",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#007A32",
                        color: "#fff",
                      },
                    }}
                  >
                    ENTRAR
                  </MKButton>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;

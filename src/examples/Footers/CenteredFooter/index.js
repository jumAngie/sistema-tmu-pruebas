import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import InstagramIcon from "@mui/icons-material/Instagram";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Icon, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CenteredFooter({ company, socials, light }) {
  const { name } = company;
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const renderSocials = socials.map((social) => (
    <MKTypography
      key={social.link}
      component={Link}
      href={social.link}
      variant="body2"
      color={light ? "white" : "secondary"}
      fontWeight="regular"
    >
      {social.icon}
    </MKTypography>
  ));

  return (
    <MKBox component="footer" py={6} px={{ xs: 2, sm: 3 }}>
      <Container maxWidth="md">
        <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={12}>
            <MKTypography
              variant="body1"
              color={light ? "white" : "secondary"}
              sx={{
                mb: 2,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              Aviso: Este sitio es un punto de encuentro virtual entre compradores y vendedores, sin
              embargo, no nos hacemos responsables por las transacciones que se realicen, por favor
              verifique cuidadosamente antes de realizar cualquier pago.
            </MKTypography>

            <MKTypography
              variant="body1"
              color={light ? "white" : "secondary"}
              sx={{
                mb: 2,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              Correo de Soporte: info@tumaquinausada.com
            </MKTypography>
          </Grid>

          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={3}
              mt={1}
              mb={3}
              flexWrap="wrap"
            >
              {renderSocials}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              <MKTypography variant="body2" color={light ? "white" : "secondary"}>
                © {year} {name}
              </MKTypography>

              <MKTypography
                variant="body1"
                onClick={() => navigate("/inicio-sesion")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: light ? "white" : "#1428A0",
                  fontWeight: "bold",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <Icon sx={{ fontSize: "0.9rem", mr: 1 }}>login</Icon>
                Iniciar Sesión
              </MKTypography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

CenteredFooter.defaultProps = {
  company: { href: "", name: "Tu Máquina Usada" },
  links: [],
  socials: [
    {
      icon: <InstagramIcon fontSize="small" />,
      link: "https://www.instagram.com/tumaquinausada.hn/",
      href: "https://www.instagram.com/tumaquinausada.hn/",
    },
  ],
  light: false,
};

CenteredFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  socials: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  light: PropTypes.bool,
};

export default CenteredFooter;

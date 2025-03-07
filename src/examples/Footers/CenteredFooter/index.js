import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function CenteredFooter({ company, socials, light }) {
  const { href, name } = company;

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
    <MKBox component="footer" py={6}>
      <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
        <Grid item xs={10} lg={8}>
          <MKTypography variant="body1" color={light ? "white" : "secondary"}>
            Aviso: Este sitio un punto de encuentro virtual entre compradores y vendedores. Sin
            embargo, no nos hacemos responsables por las transacciones que se realicen. Por favor
            verifique cuidadosamente antes de realizar cualquier pago.
          </MKTypography>
          <MKTypography variant="body1" lg={8} sx={{ textAlign: "center" }}>
            Correo de Soporte: soporte-cliente@tumaquinausada.com
          </MKTypography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack display="flex" direction="row" justifyContent="center" spacing={3} mt={1} mb={3}>
            {renderSocials}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <MKTypography variant="body2" color={light ? "white" : "secondary"}>
            Copyright &copy; {year}
            <MKTypography
              component={Link}
              href={href}
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color={light ? "white" : "secondary"}
            >
              {name}
            </MKTypography>
          </MKTypography>
        </Grid>
      </Grid>
    </MKBox>
  );
}

// Setting default values for the props of CenteredFooter
CenteredFooter.defaultProps = {
  company: { href: "", name: "Tu Máquina Usada" },
  links: [],
  socials: [
    { icon: <FacebookIcon fontSize="small" />, link: "" },
    {
      icon: <TwitterIcon fontSize="small" />,
      link: "",
    },
    {
      icon: <InstagramIcon fontSize="small" />,
      link: "",
    },
  ],
  light: false,
};

// Typechecking props for the CenteredFooter
CenteredFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  socials: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  light: PropTypes.bool,
};

export default CenteredFooter;

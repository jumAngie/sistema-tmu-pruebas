import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "../../components/MKBox";
import DefaultNavbar from "../../examples/Navbars/DefaultNavbar";
import DefaultFooter from "../../examples/Footers/DefaultFooter";
import routes from "../../routes";
import footerRoutes from "../../footer.routes";

function HomePage() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          color: "default",
        }}
      />
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={8}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ mx: "auto", textAlign: "center" }}
        ></Grid>
      </Container>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default HomePage;

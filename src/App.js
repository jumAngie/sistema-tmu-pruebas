import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
import routes from "routes";
import UserProfile from "pages/Presentation/UserProfile";
import AdminProfile from "pages/Presentation/AdminProfile";
import CreateRequestForm from "pages/Presentation/CrearSolicitudForm";
import MachineInfo from "pages/Presentation/MachineInfo";
import PublicarMaquina from "pages/Presentation/CrearSolicitudPage";
import TrackingPage from "pages/Presentation/RastrearSolicitud";
import MachinesByCategory from "pages/Presentation/MaquinasPorCategoria";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/crear-solicitud" element={<CreateRequestForm />} />
        <Route path="/info-maquina/:sol_ID" element={<MachineInfo />} />
        <Route path="/crear-solicitud-page" element={<PublicarMaquina />} />
        <Route path="/rastrear-solicitud" element={<TrackingPage />} />
        <Route path="/categoria/:cat_ID" element={<MachinesByCategory />} />
      </Routes>
    </ThemeProvider>
  );
}

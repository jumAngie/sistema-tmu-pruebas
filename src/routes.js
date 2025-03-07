import React from "react";
import SignIn from "layouts/pages/authentication/sign-in";
import { Icon } from "@mui/material";

const routes = [
  {
    name: "Iniciar Sesión",
    icon: <Icon>login</Icon>,
    route: "/pages/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Contáctanos",
    icon: <Icon>contact_mail</Icon>,
    route: "mailto:soporte-cliente@tumaquinausada.com",
  },
];

export default routes;

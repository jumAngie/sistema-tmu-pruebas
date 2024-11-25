/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================


  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// @mui material components
import React from "react";
import SignIn from "layouts/pages/authentication/sign-in";
import { Icon } from "@mui/material";

const phoneNumber = "95887062"; // Reemplaza con tu número sin espacios ni guiones
const whatsappUrl = `https://wa.me/${phoneNumber}`;

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
    href: whatsappUrl,
  },
];

export default routes;

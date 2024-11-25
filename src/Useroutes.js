import React from "react";
import Icon from "@mui/material/Icon";

const phoneNumber = "95887062"; // Reemplaza con tu número sin espacios ni guiones
const whatsappUrl = `https://wa.me/${phoneNumber}`;

const Useroutes = [
  {
    name: "Contáctanos",
    icon: <Icon>contact_mail</Icon>,
    href: whatsappUrl,
  },
];

export default Useroutes;

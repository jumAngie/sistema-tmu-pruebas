import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const FloatingButton = styled(Fab)({
  position: "fixed",
  bottom: "30px",
  right: "20px",
  backgroundColor: "#007A32",
  color: "#fff",
  padding: "16px 24px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#1428A0",
  },
});

function PublicarMaquinaButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/crear-solicitud-page");
  };

  return (
    <Tooltip title="Publica tu máquina aquí">
      <FloatingButton onClick={handleClick} variant="extended">
        <ControlPoint sx={{ mr: 1, fontSize: "1.7rem" }} />
        Publica tu máquina aquí
      </FloatingButton>
    </Tooltip>
  );
}

export default PublicarMaquinaButton;

import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { GpsFixed } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const FloatingButton = styled(Fab)({
  position: "fixed",
  bottom: "30px",
  left: "20px",
  backgroundColor: "#ffff",
  color: "#0f249f",
  padding: "16px 24px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#ffff",
    color: "#007A32",
  },
});

function RastrearMaquinaButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/rastrear-solicitud");
  };

  return (
    <Tooltip title="Ingresa el código y revisa el estado de tu solicitud.">
      <FloatingButton onClick={handleClick} variant="extended">
        <GpsFixed sx={{ mr: 1, fontSize: "1.7rem" }} />
        Rastrea tu solicitud aquí
      </FloatingButton>
    </Tooltip>
  );
}

export default RastrearMaquinaButton;

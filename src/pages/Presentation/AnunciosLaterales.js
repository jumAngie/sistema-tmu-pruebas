import React from "react";
import { Box } from "@mui/material";

// Componente de anuncios laterales
const AnunciosLaterales = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 3,
      }}
    >
      <Box
        sx={{
          width: "120px", // Ancho del anuncio
          height: "400px", // Alto del anuncio
          backgroundColor: "#ddd", // Color de fondo o agrega tu imagen
          borderRadius: "8px",
        }}
      >
        <img
          src="https://blog.hubspot.es/hs-fs/hubfs/Infografia_Anuncio-Publicitario_600x5000%202%20(1).jpg?width=600&name=Infografia_Anuncio-Publicitario_600x5000%202%20(1).jpg"
          alt="Anuncio 1"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "120px", // Ancho del anuncio
          height: "400px", // Alto del anuncio
          backgroundColor: "#ddd", // Color de fondo o agrega tu imagen
          borderRadius: "8px",
        }}
      >
        <img
          src="path_to_your_image"
          alt="Anuncio 2"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
};

export default AnunciosLaterales;

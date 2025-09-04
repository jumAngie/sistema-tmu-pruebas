import React, { useState } from "react";
import {
  Container,
  TextField,
  Box,
  Icon,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import MKTypography from "components/MKTypography";
import { buscarSolicitudes } from "apiServices"; // Importa el servicio de búsqueda
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Icono para el botón "Ver más"
import { useNavigate } from "react-router-dom";

const BuscadorSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Por favor ingrese un término de búsqueda");
      return;
    }
    try {
      const data = await buscarSolicitudes(searchTerm);
      if (data.data.length === 0) {
        setError("No se encontraron resultados");
        setResults([]);
      } else {
        setError(""); // Limpia cualquier mensaje de error
        setResults(data.data); // Almacena los resultados en el estado
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setError("Hubo un problema al realizar la búsqueda. Inténtelo de nuevo.");
    }
  };

  const handleCancel = () => {
    setSearchTerm("");
    setResults([]);
    setError("");
  };

  return (
    <Container sx={{ mt: 6, backgroundColor: "#1428A0", p: 3, borderRadius: "8px" }}>
      <MKTypography
        variant="h1"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#fff",
          mt: -1,
          mb: 3,
          fontSize: ({ breakpoints, typography: { size } }) => ({
            [breakpoints.down("md")]: size["3xl"],
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
          }}
        >
          <Icon
            sx={{
              fontSize: 40,
              color: "#fff",
            }}
          >
            search
          </Icon>
        </Box>
        Buscador
      </MKTypography>

      {/* Search Input, Button, and Cancel Button */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Ingresa la descripción de la máquina que está buscando..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "4px",
            flex: 1,
            fontSize: "1.2rem",
            "& .MuiInputBase-input": {
              fontSize: "1.2rem",
            },
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSearch}
          sx={{
            height: "56px",
            fontSize: "1rem",
            padding: "12px 24px",
            color: "#ffff",
            backgroundColor: "#008F39",
            "&:hover": {
              backgroundColor: "#007A32",
            },
          }}
        >
          Buscar
        </Button>
        {results.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel}
            sx={{
              height: "56px",
              fontSize: "1rem",
              padding: "12px 24px",
            }}
          >
            Cancelar
          </Button>
        )}
      </Box>

      {/* Resultados de la Búsqueda */}
      <Box sx={{ mt: 4 }}>
        {error && (
          <MKTypography color="error" variant="body1">
            {error}
          </MKTypography>
        )}
        {results.map((result) => (
          <Card
            key={result.sol_ID}
            sx={{ mt: 2, backgroundColor: "#e0f7fa", p: 2, display: "flex", alignItems: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                backgroundColor: "#e8f8ff",
                borderRadius: "8px",
                marginY: 2,
              }}
            >
              {/* Imagen del resultado */}
              <Box
                component="img"
                src={result.sol_IMG_1}
                alt="Imagen de la máquina"
                sx={{
                  width: "150px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: 2,
                }}
              />

              {/* Información del resultado */}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1">Marca: {result.sol_Marca}</Typography>
                <Typography variant="body1">Titular: {result.sol_Titular}</Typography>
                <Typography variant="body1">Descripción: {result.sol_Descripcion}</Typography>
              </CardContent>

              {/* Botón "Ver más" */}
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: "#007A32",
                  borderColor: "#007A32",
                  "&:hover": {
                    backgroundColor: "#e0f2f1",
                    borderColor: "#e0f2f1",
                  },
                }}
                onClick={() => navigate(`/info-maquina/${result.sol_ID}`)}
              >
                Ver más
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default BuscadorSection;

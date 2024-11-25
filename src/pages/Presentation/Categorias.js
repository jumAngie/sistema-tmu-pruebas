import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Box, Container, Icon } from "@mui/material";
import { styled } from "@mui/material/styles";
import MKTypography from "components/MKTypography";
import { getCategorias } from "apiServices";
import { useNavigate } from "react-router-dom";

// Estilo personalizado para la carta de categorías con efecto hover
const CategoryCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)", // Levantar la carta
    boxShadow: theme.shadows[10], // Sombra más prominente al hacer hover
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(2),
  height: "100%",
}));

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (cat_ID, cat_Nombre) => {
    navigate(`/categoria/${cat_ID}`, { state: { cat_Nombre } });
  };

  useEffect(() => {
    getCategorias()
      .then((data) => {
        console.log(data);
        setCategories(data); // Actualiza las categorías en el estado
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  return (
    <Container sx={{ mt: 6 }}>
      {/*TEXTO*/}
      <MKTypography
        variant="h1"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#4f5f7b",
          mt: -1,
          mb: 1,
          fontSize: ({ breakpoints, typography: { size } }) => ({
            [breakpoints.down("md")]: size["3xl"],
          }),
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <Icon sx={{ fontSize: 40, color: "#4f5f7b" }}>category</Icon>
        </Box>
        Categorías
      </MKTypography>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} lg={4} key={category.cat_ID}>
            <CategoryCard
              onClick={() => handleCategoryClick(category.cat_ID, category.cat_Nombre)}
              sx={{ cursor: "pointer" }}
            >
              <Box
                component="img"
                src={category.cat_Imagen} // Usa la URL de la imagen desde la API
                alt={category.cat_Nombre} // Usa el nombre de la categoría desde la API
                sx={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  mb: 2,
                  borderRadius: "1px",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {category.cat_Nombre} {/* Usa el nombre de la categoría */}
              </Typography>
            </CategoryCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesSection;

import React, { useEffect, useState } from "react";
import { Card, Grid, Typography, Box, Container, Icon } from "@mui/material";
import { styled } from "@mui/material/styles";
import MKTypography from "components/MKTypography";
import { getCategoriasSW } from "apiServices";
import { useNavigate } from "react-router-dom";

// Estilo personalizado para la carta de categorías con efecto hover
const CategoryCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[10],
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
  textAlign: "center",
  padding: theme.spacing(2),
  height: 260,
  width: 300,
  boxSizing: "border-box",
  borderRadius: theme.spacing(1.5),
}));

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (cat_ID, cat_Nombre) => {
    navigate(`/categoria/${cat_ID}`, { state: { cat_Nombre } });
  };

  useEffect(() => {
    getCategoriasSW()
      .then((data) => {
        setCategories(data.data);
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

      <Grid container spacing={3} alignItems="stretch">
        {categories.map((category) => (
          <Grid item xs={12} sm={6} lg={4} key={category.cat_ID} sx={{ display: "flex" }}>
            <CategoryCard onClick={() => handleCategoryClick(category.cat_ID, category.cat_Nombre)}>
              <Box
                sx={{
                  width: "100%",
                  height: 140,
                  overflow: "hidden",
                  borderRadius: "6px",
                  backgroundColor: "#f5f5f5",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={category.cat_Imagen}
                  alt={category.cat_Nombre}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 1,
                  textAlign: "center",
                  minHeight: 70,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {category.cat_Nombre}
                </Typography>
              </Box>
            </CategoryCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesSection;

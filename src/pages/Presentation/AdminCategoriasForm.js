import React, { useState, useEffect } from "react";
import { Card, Typography as MKTypography, Box, Modal, TextField, Icon, Grid } from "@mui/material";
import MKButton from "components/MKButton";
import { actualizarCategoria, insertarCategoria, getCategorias } from "apiServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  const fetchCategories = async () => {
    try {
      const data = await getCategorias();
      const formattedCategories = data.map((cat) => ({
        id: cat.cat_ID,
        name: cat.cat_Nombre,
        img: cat.cat_Imagen, // Asegúrate de que `cat_Imagen` sea la URL correcta
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    // Llama a la función fetchCategories cuando el componente se monte
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    setSelectedCategory(category);
    if (category) {
      setNewCategory({ id: category.id, name: category.name, image: category.img }); // Cargar datos al editar
    } else {
      setNewCategory({ name: "", image: "" });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewCategory({ name: "", image: "" });
    setSelectedCategory(null);
  };

  const handleSaveCategory = async () => {
    try {
      if (!newCategory.name || !newCategory.image) {
        toast.warning("Todos los campos son obligatorios.");
        return;
      }

      const categoryData = {
        cat_Nombre: newCategory.name,
        cat_Imagen: newCategory.image,
      };

      if (selectedCategory) {
        // Si existe selectedCategory, es una actualización
        await actualizarCategoria({ ...categoryData, cat_ID: selectedCategory.cat_ID });
        toast.success("Categoría actualizada correctamente.");
      } else {
        // Si no hay selectedCategory, es una inserción
        await insertarCategoria(categoryData);
        toast.success("Categoría agregada correctamente.");
      }

      handleCloseModal();
      fetchCategories(); // Recargar la lista de categorías
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      toast.error("Hubo un error al guardar la categoría.");
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div>
      <Card sx={{ p: 2, mb: 4 }}>
        <MKTypography variant="h2" mb={2}>
          Tabla de Categorías
        </MKTypography>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
          <MKButton
            variant="contained"
            startIcon={<Icon>add</Icon>}
            color="success"
            onClick={() => handleOpenModal()}
            sx={{ width: "19%", height: "30%" }}
          >
            Agregar Nueva Categoría
          </MKButton>
        </Box>
        <Grid container spacing={2} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <strong>ID</strong>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <strong>Foto</strong>
          </Grid>
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <strong>Nombre</strong>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <strong>Acciones</strong>
          </Grid>
        </Grid>
        {categories.map((category) => (
          <Grid container spacing={2} key={category.id} style={{ padding: "10px 0" }}>
            <Grid item xs={2} style={{ textAlign: "center" }}>
              {category.id}
            </Grid>
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <img
                src={category.img}
                alt={category.name}
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={2} style={{ textAlign: "center" }}>
              {category.name}
            </Grid>
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <MKButton
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<Icon>edit</Icon>}
                  sx={{ fontSize: "0.875rem" }}
                  onClick={() => handleOpenModal(category)}
                >
                  Editar
                </MKButton>
                <MKButton
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<Icon>delete</Icon>}
                  sx={{ fontSize: "0.875rem" }}
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  DESACTIVAR
                </MKButton>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Card>

      {/* Modal para agregar/editar categoría */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 900,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <MKTypography variant="h4" mb={2}>
            {selectedCategory ? "Editar Categoría" : "Agregar Nueva Categoría"}
          </MKTypography>
          <TextField
            fullWidth
            label="Nombre de la Categoría"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="URL de la Imagen"
            value={newCategory.image}
            onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
            sx={{ mb: 2 }}
          />
          <MKButton variant="contained" color="success" onClick={handleSaveCategory} sx={{ mr: 1 }}>
            {selectedCategory ? "Actualizar" : "Agregar"}
          </MKButton>
          <MKButton variant="outlined" color="secondary" onClick={handleCloseModal}>
            Cancelar
          </MKButton>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminCategories;

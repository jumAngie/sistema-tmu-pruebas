import React, { useState } from "react";
import { Card, Typography as MKTypography, Box, Modal, TextField, Icon, Grid } from "@mui/material";
import MKButton from "components/MKButton";

import soldaduraImage from "assets/images/Categorias/SOLDADURA.jpg";
import calderasImage from "assets/images/Categorias/CALDERAS-DE-VAPOR.jpg";
import cocinasImage from "assets/images/Categorias/COCINAS-INDUSTRIALES.png";
import equipoImage from "assets/images/Categorias/EQUIPO-DE-CONSTRUCCION.jpg";
import generadoresImage from "assets/images/Categorias/GENERADORES.png";

import aireacondicionadoImage from "assets/images/Categorias/AIRE-ACONDICIONADO-Y-REFRIGERACION.jpg";
import compresorImage from "assets/images/Categorias/COMPRESORES-DE-AIRE.jfif";
import maqAgricolaImage from "assets/images/Categorias/MAQUINARIA-AGRICOLA.png";
import maqTextilImage from "assets/images/Categorias/MAQUINARIA-TEXTIL.jpg";
import mineriaImage from "assets/images/Categorias/MINERIA.jpg";
import montacargaImage from "assets/images/Categorias/MONTACARGAS.jpg";
import plataElevacionImage from "assets/images/Categorias/PLATAFORMAS-DE-ELEVACION.jpg";

const AdminCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, img: soldaduraImage, name: "SOLDADURA" },
    { id: 2, img: calderasImage, name: "CALDERAS DE VAPOR" },
    { id: 3, img: cocinasImage, name: "COCINAS INDUSTRIALES" },
    { id: 4, img: equipoImage, name: "EQUIPO DE CONSTRUCCIÓN" },
    { id: 5, img: generadoresImage, name: "GENERADORES" },
    { id: 6, img: aireacondicionadoImage, name: "AIRE ACONDICIONADO Y REGRIFERACIÓN" },
    { id: 7, img: compresorImage, name: "COMPRESORES DE AIRE" },
    { id: 8, img: maqAgricolaImage, name: "MÁQUINAS AGRICOLAS" },
    { id: 9, img: maqTextilImage, name: "MÁQUINAS TEXTILES" },
    { id: 10, img: mineriaImage, name: "MINERÍA" },
    { id: 11, img: montacargaImage, name: "MONTACARGA" },
    { id: 12, img: plataElevacionImage, name: "PLATAFORMA DE ELEVACIÓN" },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
  };

  const handleAddCategory = () => {
    // Lógica para agregar nueva categoría
    setCategories([...categories, { id: Date.now(), ...newCategory }]);
    setNewCategory({ name: "", image: "" });
    handleCloseModal();
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
            onClick={() => setOpenModal(true)}
            sx={{ width: "19%", height: "30%" }} // Ajusta el ancho según sea necesario
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
                style={{ width: 100, height: 100, objectFit: "cover" }} // Ajusta el tamaño según tus necesidades
              />
            </Grid>
            <Grid item xs={2} style={{ textAlign: "center" }}>
              {category.name}
            </Grid>
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <MKButton
                  variant="contained"
                  color="light"
                  size="small"
                  startIcon={<Icon>visibility</Icon>}
                  sx={{ fontSize: "0.875rem" }}
                  //onClick={() => handleViewDetails(category.id)}
                >
                  Detalles
                </MKButton>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
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
          <MKButton variant="contained" color="success" onClick={handleAddCategory} sx={{ mr: 1 }}>
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

import React, { useEffect, useMemo, useState } from "react";
import { Card, Box, Modal, TextField, Icon, Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import {
  actualizarCategoria,
  insertarCategoria,
  getCategorias,
  actiDesactiCategoria,
} from "apiServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 700 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const initialForm = {
  id: 0,
  name: "",
  description: "",
  image: "",
};

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const getUserId = () => {
    return usuario?.usua_ID || 1;
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategorias();

      const formattedCategories = (data?.data || []).map((cat) => ({
        id: cat.cat_ID,
        name: cat.cat_Nombre || "",
        description: cat.cat_Descripcion || "",
        img: cat.cat_Imagen || "",
        estado: cat.cat_Estado,
        cat_UsuarioCreacion: cat.cat_UsuarioCreacion,
        cat_UsuarioModificacion: cat.cat_UsuarioModificacion,
        usuarioCreacion: cat.usuarioCreador,
        usuarioModificacion: cat.usuarioModificador,
        original: cat,
      }));

      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      console.error("Detalle:", error?.response?.data);
      toast.error("No se pudieron cargar las categorías.");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    setSelectedCategory(category);

    if (category) {
      setNewCategory({
        id: category.id,
        name: category.name || "",
        description: category.description || "",
        image: category.img || "",
      });
    } else {
      setNewCategory(initialForm);
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCategory(null);
    setNewCategory(initialForm);
  };

  const isValidUrl = (value) => {
    if (!value) return false;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleSaveCategory = async () => {
    try {
      const userId = getUserId();

      if (!userId) {
        toast.error("No se encontró el usuario logueado.");
        return;
      }

      if (!newCategory.name.trim()) {
        toast.warning("El nombre de la categoría es obligatorio.");
        return;
      }

      if (!newCategory.description.trim()) {
        toast.warning("La descripción es obligatoria.");
        return;
      }

      if (!newCategory.image.trim()) {
        toast.warning("La imagen es obligatoria.");
        return;
      }

      if (!isValidUrl(newCategory.image.trim())) {
        toast.warning("La URL de la imagen no es válida.");
        return;
      }

      setSaving(true);

      if (selectedCategory) {
        const categoryData = {
          cat_ID: selectedCategory.id,
          cat_Nombre: newCategory.name.trim(),
          cat_Descripcion: newCategory.description.trim(),
          cat_Imagen: newCategory.image.trim(),
          cat_UsuarioCreacion: selectedCategory.usuarioCreacion || userId,
          cat_UsuarioModificacion: userId,
          cat_Estado: Boolean(selectedCategory.estado),
          usuarioCreador: "",
          usuarioModificador: "",
        };

        await actualizarCategoria(categoryData);
        toast.success("Categoría actualizada correctamente.");
      } else {
        const categoryData = {
          cat_ID: 0,
          cat_Nombre: newCategory.name.trim(),
          cat_Descripcion: newCategory.description.trim(),
          cat_Imagen: newCategory.image.trim(),
          cat_UsuarioCreacion: userId,
          cat_UsuarioModificacion: userId,
          cat_Estado: true,
          usuarioCreador: "",
          usuarioModificador: "",
        };

        await insertarCategoria(categoryData);
        toast.success("Categoría agregada correctamente.");
      }

      handleCloseModal();
      await fetchCategories();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      console.error("Respuesta del backend:", error?.response?.data);
      toast.error("Hubo un error al guardar la categoría.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (category) => {
    try {
      const userId = getUserId();

      if (!userId) {
        toast.error("No se encontró el usuario logueado.");
        return;
      }

      const nuevoEstado = !category.estado;
      await actiDesactiCategoria({
        cat_Estado: nuevoEstado,
        cat_ID: category.id,
        cat_UsuarioModificacion: userId,
      });

      toast.success(
        nuevoEstado ? "Categoría activada correctamente." : "Categoría desactivada correctamente."
      );

      await fetchCategories();
    } catch (error) {
      console.error("Error al cambiar estado de la categoría:", error);
      console.error("Respuesta del backend:", error?.response?.data);
      toast.error("No se pudo cambiar el estado de la categoría.");
    }
  };

  const filteredRows = useMemo(() => {
    const text = searchText.toLowerCase();

    return categories.filter((category) => {
      const estadoTexto = category.estado ? "activa" : "inactiva";

      return (
        String(category.id || "")
          .toLowerCase()
          .includes(text) ||
        String(category.name || "")
          .toLowerCase()
          .includes(text) ||
        String(category.description || "")
          .toLowerCase()
          .includes(text) ||
        String(category.img || "")
          .toLowerCase()
          .includes(text) ||
        estadoTexto.includes(text)
      );
    });
  }, [categories, searchText]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "img",
      headerName: "Imagen",
      flex: 1.1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Box
          component="img"
          src={params.value || "https://via.placeholder.com/80x80?text=Sin+Imagen"}
          alt={params.row.name}
          sx={{
            width: 64,
            height: 64,
            objectFit: "cover",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
          }}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/80x80?text=Error";
          }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1.1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Descripción",
      flex: 1.7,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 0.9,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.value ? "Activa" : "Inactiva"}
          color={params.value ? "success" : "default"}
          size="small"
          sx={{
            fontWeight: "bold",
            borderRadius: "18px",
            minWidth: 90,
          }}
        />
      ),
    },
    {
      field: "usuarioCreacion",
      headerName: "Creación",
      flex: 1.1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "usuarioModificacion",
      headerName: "Modificación",
      flex: 1.1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1.8,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
          <MKButton
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<Icon>edit</Icon>}
            onClick={() => handleOpenModal(params.row)}
          >
            Editar
          </MKButton>

          <MKButton
            variant="outlined"
            color={params.row.estado ? "error" : "success"}
            size="small"
            startIcon={<Icon>{params.row.estado ? "toggle_off" : "toggle_on"}</Icon>}
            onClick={() => handleToggleStatus(params.row)}
          >
            {params.row.estado ? "Desactivar" : "Activar"}
          </MKButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Card sx={{ p: 2, mb: 4 }}>
        <MKTypography variant="h2" mb={2}>
          Tabla de Categorías
        </MKTypography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Buscar categoría"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Busca por id, nombre, descripción o estado"
            sx={{ minWidth: 280, flex: 1 }}
          />

          <MKButton
            variant="contained"
            startIcon={<Icon>add</Icon>}
            color="success"
            onClick={() => handleOpenModal()}
          >
            Agregar Nueva Categoría
          </MKButton>
        </Box>

        <Box sx={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f7f7f7",
                borderBottom: "1px solid #ddd",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#fafafa",
              },
            }}
          />
        </Box>
      </Card>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={3} fontWeight="bold">
            {selectedCategory ? "Editar Categoría" : "Agregar Nueva Categoría"}
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Nombre de la Categoría"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />

            <TextField
              fullWidth
              label="Descripción"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              multiline
              rows={3}
            />

            <TextField
              fullWidth
              label="URL de la Imagen"
              value={newCategory.image}
              onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
            />

            {newCategory.image && (
              <Box>
                <Typography variant="body2" mb={1}>
                  Vista previa
                </Typography>
                <Box
                  component="img"
                  src={newCategory.image}
                  alt="Vista previa"
                  sx={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "1px solid #ddd",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/120x120?text=Sin+Vista";
                  }}
                />
              </Box>
            )}

            <Box display="flex" gap={1} mt={1}>
              <MKButton
                variant="contained"
                color="success"
                onClick={handleSaveCategory}
                disabled={saving}
              >
                {selectedCategory ? "Actualizar" : "Agregar"}
              </MKButton>

              <MKButton
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
                disabled={saving}
              >
                Cancelar
              </MKButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminCategories;

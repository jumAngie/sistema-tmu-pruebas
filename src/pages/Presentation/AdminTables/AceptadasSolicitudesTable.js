import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, TextField, Chip, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MKButton from "components/MKButton";
import { toast } from "react-toastify";
import { eliminar_Solicitud } from "apiServices";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 500 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

// Convierte "21/02/2026 17:34:32" a Date
const parseFechaVencimiento = (fechaString) => {
  if (!fechaString) return null;

  const [fechaPart, horaPart = "00:00:00"] = fechaString.split(" ");
  const [day, month, year] = fechaPart.split("/");
  const [hours, minutes, seconds] = horaPart.split(":");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds)
  );
};

// Calcula días faltantes
const calcularDiasRestantes = (fechaVencimiento) => {
  const fecha = parseFechaVencimiento(fechaVencimiento);
  if (!fecha) return null;

  const hoy = new Date();
  const diferenciaMs = fecha - hoy;
  const dias = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

  return dias;
};

// Badge según cercanía
const getVencimientoInfo = (diasRestantes) => {
  if (diasRestantes === null) {
    return { label: "Sin fecha", color: "default" };
  }

  if (diasRestantes < 0) {
    return { label: "Vencida", color: "info" };
  }

  if (diasRestantes === 0) {
    return { label: "Hoy vence", color: "error" };
  }

  if (diasRestantes <= 5) {
    return {
      label: `${diasRestantes} día${diasRestantes !== 1 ? "s" : ""}`,
      color: "error",
    };
  }

  if (diasRestantes <= 15) {
    return {
      label: `${diasRestantes} día${diasRestantes !== 1 ? "s" : ""}`,
      color: "warning",
    };
  }

  return {
    label: `${diasRestantes} día${diasRestantes !== 1 ? "s" : ""}`,
    color: "success",
  };
};

const SolicitudesAceptadasTable = ({ solicitudesAceptadas, fetchSolicitudesAceptadas }) => {
  const [searchText, setSearchText] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const getUserId = () => {
    return usuario?.usua_ID || 1;
  };

  const rows = useMemo(() => {
    return solicitudesAceptadas
      .filter((solicitud) => {
        const texto = searchText.toLowerCase();

        return (
          String(solicitud.sol_Cod || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_Titular || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.usua_AceptaN || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_FechaVencimiento || "")
            .toLowerCase()
            .includes(texto)
        );
      })
      .map((solicitud, index) => {
        const diasRestantes = calcularDiasRestantes(solicitud.sol_FechaVencimiento);

        return {
          id: solicitud.sol_Cod ?? index,
          codigo: solicitud.sol_Cod,
          titular: solicitud.sol_Titular,
          fechaVencimiento: solicitud.sol_FechaVencimiento,
          aceptadoPor: solicitud.usua_AceptaN,
          fechaAcepta: solicitud.sol_FechaAcepta,
          diasRestantes,
          solicitudCompleta: solicitud,
        };
      });
  }, [solicitudesAceptadas, searchText]);

  const cerrarModalConfirmacion = () => {
    setOpenConfirmModal(false);
    setSelectedSolicitud(null);
  };

  const ejecutarEliminacion = async (row) => {
    try {
      const userId = getUserId();

      if (!userId) {
        toast.error("No se encontró el usuario logueado.");
        return;
      }

      setLoadingDelete(true);

      await eliminar_Solicitud({
        sol_ID: row.codigo,
        usua_Elimina: userId,
      });

      toast.success("La solicitud se quitó del sitio correctamente.");

      cerrarModalConfirmacion();

      if (typeof fetchSolicitudesAceptadas === "function") {
        await fetchSolicitudesAceptadas();
      }
    } catch (error) {
      console.error("Error al quitar la solicitud del sitio:", error);
      console.error("Respuesta del backend:", error?.response?.data);
      toast.error("No se pudo quitar la solicitud del sitio.");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleQuitarDelSitio = (row) => {
    // Si todavía no se ha vencido, pedir confirmación
    if (row.diasRestantes !== null && row.diasRestantes >= 0) {
      setSelectedSolicitud(row);
      setOpenConfirmModal(true);
      return;
    }

    // Si ya venció, quitar directo
    ejecutarEliminacion(row);
  };

  const columns = [
    {
      field: "codigo",
      headerName: "Código",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "titular",
      headerName: "Título",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fechaVencimiento",
      headerName: "Fecha Vencimiento",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "aceptadoPor",
      headerName: "Aceptó",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fechaAcepta",
      headerName: "Fecha Aceptación",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (!params.value) return "-";

        const fecha = new Date(params.value);
        return isNaN(fecha.getTime()) ? params.value : fecha.toLocaleString();
      },
    },
    {
      field: "diasRestantes",
      headerName: "Tiempo Restante",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const info = getVencimientoInfo(params.value);

        return (
          <Chip
            label={info.label}
            color={info.color}
            variant="filled"
            size="small"
            sx={{
              fontWeight: "bold",
              borderRadius: "20px",
              minWidth: 100,
            }}
          />
        );
      },
      sortComparator: (v1, v2) => {
        if (v1 === null) return 1;
        if (v2 === null) return -1;
        return v1 - v2;
      },
    },
    {
      field: "acciones",
      headerName: "Eliminar del Sitio",
      flex: 1.8,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <MKButton
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleQuitarDelSitio(params.row)}
        >
          Quitar del sitio
        </MKButton>
      ),
    },
  ];

  return (
    <>
      <Box component={Paper} p={2} elevation={3}>
        <Typography variant="h2" gutterBottom>
          Solicitudes Aceptadas
        </Typography>

        <Box mb={2}>
          <TextField
            fullWidth
            label="Buscar solicitud aceptada"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Busca por código, título, aceptó o fecha"
          />
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            disableRowSelectionOnClick
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f7f7f7",
                fontWeight: "bold",
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
      </Box>

      <Modal open={openConfirmModal} onClose={cerrarModalConfirmacion}>
        <Box sx={modalStyle}>
          <Typography variant="h5" mb={2} fontWeight="bold">
            Confirmar acción
          </Typography>

          <Typography mb={3}>
            Esta solicitud todavía no se ha vencido.
            <br />
            ¿Seguro que quieres quitarla del sitio público?
          </Typography>

          {selectedSolicitud && (
            <Box mb={3}>
              <Typography variant="body2">
                <strong>Código:</strong> {selectedSolicitud.codigo}
              </Typography>
              <Typography variant="body2">
                <strong>Título:</strong> {selectedSolicitud.titular}
              </Typography>
              <Typography variant="body2">
                <strong>Tiempo restante:</strong> {selectedSolicitud.diasRestantes} día
                {selectedSolicitud.diasRestantes !== 1 ? "s" : ""}
              </Typography>
            </Box>
          )}

          <Box display="flex" gap={1} justifyContent="flex-end">
            <MKButton
              variant="outlined"
              color="secondary"
              onClick={cerrarModalConfirmacion}
              disabled={loadingDelete}
            >
              Cancelar
            </MKButton>

            <MKButton
              variant="contained"
              color="error"
              onClick={() => ejecutarEliminacion(selectedSolicitud)}
              disabled={loadingDelete}
            >
              Confirmar
            </MKButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

SolicitudesAceptadasTable.propTypes = {
  solicitudesAceptadas: PropTypes.arrayOf(
    PropTypes.shape({
      sol_Cod: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sol_Titular: PropTypes.string,
      sol_FechaVencimiento: PropTypes.string,
      usua_AceptaN: PropTypes.string,
      sol_FechaAcepta: PropTypes.string,
    })
  ).isRequired,
  fetchSolicitudesAceptadas: PropTypes.func,
};

SolicitudesAceptadasTable.defaultProps = {
  fetchSolicitudesAceptadas: null,
};

export default SolicitudesAceptadasTable;

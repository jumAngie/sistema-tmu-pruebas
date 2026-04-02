import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, TextField, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MKButton from "components/MKButton";

const RequestsTable = ({ solicitudes, handleOpenRequestModal }) => {
  const [searchText, setSearchText] = useState("");

  const getEstadoInfo = (estado) => {
    switch (estado) {
      case "P":
        return { label: "Pendiente", color: "default" };
      case "R":
        return { label: "Rechazada", color: "error" };
      case "A":
        return { label: "Aceptada", color: "success" };
      case "V":
        return { label: "Vencida", color: "info" };
      default:
        return { label: "Desconocido", color: "default" };
    }
  };

  const filteredRows = useMemo(() => {
    return solicitudes
      .filter((solicitud) => {
        const textoBusqueda = searchText.toLowerCase();

        return (
          String(solicitud.sol_ID || "")
            .toLowerCase()
            .includes(textoBusqueda) ||
          String(solicitud.sol_Titular || "")
            .toLowerCase()
            .includes(textoBusqueda) ||
          String(solicitud.sol_NombreCliente || "")
            .toLowerCase()
            .includes(textoBusqueda) ||
          String(solicitud.usua_AceptaN || "")
            .toLowerCase()
            .includes(textoBusqueda) ||
          String(solicitud.usua_RechazaN || "")
            .toLowerCase()
            .includes(textoBusqueda)
        );
      })
      .map((solicitud) => ({
        id: solicitud.sol_ID,
        codigo: solicitud.sol_ID,
        titulo: solicitud.sol_Titular,
        estado: solicitud.sol_Estado,
        acepto: solicitud.usua_AceptaN || "-",
        rechazo: solicitud.usua_RechazaN || "-",
        cliente: solicitud.sol_NombreCliente || "-",
        eliminacion: solicitud.usua_EliminaN || "-",
        solicitudCompleta: solicitud,
      }));
  }, [solicitudes, searchText]);

  const columns = [
    {
      field: "codigo",
      headerName: "Código",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "titulo",
      headerName: "Título",
      flex: 3,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const estadoInfo = getEstadoInfo(params.value);

        return (
          <Chip
            label={estadoInfo.label}
            color={estadoInfo.color}
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
    },
    {
      field: "cliente",
      headerName: "Cliente",
      flex: 1.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "acepto",
      headerName: "Aceptó",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rechazo",
      headerName: "Rechazó",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "eliminacion",
      headerName: "Eliminó",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <MKButton
          variant="outlined"
          color="secondary"
          onClick={() => handleOpenRequestModal(params.row.solicitudCompleta)}
        >
          Ver Detalles
        </MKButton>
      ),
    },
  ];

  return (
    <Box component={Paper} p={2} elevation={3}>
      <Typography variant="h2" gutterBottom>
        Solicitudes Recibidas
      </Typography>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Buscar solicitud"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Busca por código, título, cliente, aceptó o rechazó"
        />
      </Box>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
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
  );
};

RequestsTable.propTypes = {
  solicitudes: PropTypes.arrayOf(
    PropTypes.shape({
      sol_ID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sol_Cod: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sol_Titular: PropTypes.string,
      sol_Estado: PropTypes.string,
      usua_AceptaN: PropTypes.string,
      usua_RechazaN: PropTypes.string,
      sol_NombreCliente: PropTypes.string,
    })
  ).isRequired,
  handleOpenRequestModal: PropTypes.func.isRequired,
};

export default RequestsTable;

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, TextField, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const getEstadoInfo = (estado) => {
  switch (estado) {
    case "R":
      return {
        label: "Rechazada",
        color: "error",
      };
    case "P":
      return {
        label: "Pendiente",
        color: "warning",
      };
    case "A":
      return {
        label: "Aceptada",
        color: "success",
      };
    default:
      return {
        label: "Desconocido",
        color: "default",
      };
  }
};

const formatearFecha = (fechaString) => {
  if (!fechaString) return "-";

  const fecha = new Date(fechaString);
  if (isNaN(fecha.getTime())) return fechaString;

  return fecha.toLocaleString();
};

const SolicitudesRechazadasTable = ({ solicitudesRechazadas }) => {
  const [searchText, setSearchText] = useState("");

  const rows = useMemo(() => {
    return solicitudesRechazadas
      .filter((solicitud) => {
        const texto = searchText.toLowerCase();

        return (
          String(solicitud.sol_Cod || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_Titular || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_Motivo || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_Estado || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.usua_RechazaN || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_FechaRechazo || "")
            .toLowerCase()
            .includes(texto)
        );
      })
      .map((solicitud, index) => ({
        id: solicitud.sol_Cod ?? index,
        codigo: solicitud.sol_Cod,
        titular: solicitud.sol_Titular,
        motivo: solicitud.sol_Motivo || "-",
        estado: solicitud.sol_Estado,
        rechazoPor: solicitud.usua_RechazaN || "-",
        fechaRechazo: solicitud.sol_FechaRechazo,
      }));
  }, [solicitudesRechazadas, searchText]);

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
      headerName: "Titular",
      flex: 2.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "motivo",
      headerName: "Motivo de rechazo",
      flex: 2.2,
      headerAlign: "center",
      align: "center",
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
      field: "rechazoPor",
      headerName: "Rechazó",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fechaRechazo",
      headerName: "Fecha de rechazo",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => formatearFecha(params.value),
    },
  ];

  return (
    <Box component={Paper} p={2} elevation={3}>
      <Typography variant="h2" gutterBottom>
        Solicitudes Rechazadas
      </Typography>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Buscar solicitud rechazada"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Busca por código, motivo, estado, usuario o fecha"
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
  );
};

SolicitudesRechazadasTable.propTypes = {
  solicitudesRechazadas: PropTypes.arrayOf(
    PropTypes.shape({
      sol_Cod: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sol_Titular: PropTypes.string,
      sol_Motivo: PropTypes.string,
      sol_Estado: PropTypes.string,
      usua_RechazaN: PropTypes.string,
      sol_FechaRechazo: PropTypes.string,
    })
  ).isRequired,
};

export default SolicitudesRechazadasTable;

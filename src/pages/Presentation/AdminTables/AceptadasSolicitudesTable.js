import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, TextField, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
    return { label: "Vencida", color: "error" };
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

const SolicitudesAceptadasTable = ({ solicitudesAceptadas }) => {
  const [searchText, setSearchText] = useState("");

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
        };
      });
  }, [solicitudesAceptadas, searchText]);

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
  ];

  return (
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
};

export default SolicitudesAceptadasTable;

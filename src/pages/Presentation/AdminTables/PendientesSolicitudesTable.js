import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Paper, Typography, TextField, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const formatearFecha = (fechaString) => {
  if (!fechaString) return "-";

  const fecha = new Date(fechaString);
  if (isNaN(fecha.getTime())) return fechaString;

  return fecha.toLocaleString();
};

const calcularDiasEnEspera = (fechaCreacion) => {
  if (!fechaCreacion) return null;

  const fecha = new Date(fechaCreacion);
  if (isNaN(fecha.getTime())) return null;

  const hoy = new Date();
  const diferenciaMs = hoy - fecha;
  const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

  return dias;
};

const getTiempoEsperaInfo = (diasEnEspera) => {
  if (diasEnEspera === null) {
    return {
      label: "Sin fecha",
      color: "default",
    };
  }

  if (diasEnEspera <= 1) {
    return {
      label: `${diasEnEspera} día${diasEnEspera !== 1 ? "s" : ""}`,
      color: "success",
    };
  }

  if (diasEnEspera <= 3) {
    return {
      label: `${diasEnEspera} día${diasEnEspera !== 1 ? "s" : ""}`,
      color: "warning",
    };
  }

  return {
    label: `${diasEnEspera} día${diasEnEspera !== 1 ? "s" : ""} - Urgente`,
    color: "error",
  };
};

const SolicitudesPendientesTable = ({ solicitudesPendientes }) => {
  const [searchText, setSearchText] = useState("");

  const rows = useMemo(() => {
    return solicitudesPendientes
      .filter((solicitud) => {
        const texto = searchText.toLowerCase();

        return (
          String(solicitud.sol_Cod || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_Titular || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_NombreCliente || "")
            .toLowerCase()
            .includes(texto) ||
          String(solicitud.sol_FechaCreacion || "")
            .toLowerCase()
            .includes(texto)
        );
      })
      .map((solicitud, index) => {
        const diasEnEspera = calcularDiasEnEspera(solicitud.sol_FechaCreacion);

        return {
          id: solicitud.sol_Cod ?? index,
          codigo: solicitud.sol_Cod,
          titular: solicitud.sol_Titular || "-",
          cliente: solicitud.sol_NombreCliente || "-",
          fechaCreacion: solicitud.sol_FechaCreacion,
          diasEnEspera,
          solicitudCompleta: solicitud,
        };
      });
  }, [solicitudesPendientes, searchText]);

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
      flex: 1.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cliente",
      headerName: "Cliente",
      flex: 1.4,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fechaCreacion",
      headerName: "Fecha de creación",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => formatearFecha(params.value),
    },
    {
      field: "diasEnEspera",
      headerName: "Tiempo en espera",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const info = getTiempoEsperaInfo(params.value);

        return (
          <Chip
            label={info.label}
            color={info.color}
            variant="filled"
            size="small"
            sx={{
              fontWeight: "bold",
              borderRadius: "20px",
              minWidth: 110,
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
        Solicitudes Pendientes
      </Typography>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Buscar solicitud pendiente"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Busca por código, título, cliente o fecha"
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
            sorting: {
              sortModel: [{ field: "diasEnEspera", sort: "desc" }],
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

SolicitudesPendientesTable.propTypes = {
  solicitudesPendientes: PropTypes.arrayOf(
    PropTypes.shape({
      sol_Cod: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sol_Titular: PropTypes.string,
      sol_NombreCliente: PropTypes.string,
      sol_FechaCreacion: PropTypes.string,
    })
  ).isRequired,
};

export default SolicitudesPendientesTable;

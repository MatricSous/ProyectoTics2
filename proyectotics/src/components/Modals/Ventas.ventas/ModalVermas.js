import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { esES } from '@mui/x-data-grid/locales';

function ModalVermas({ material, onClose }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: 1300,
    height: 600,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const [materialDetails, setMaterialDetails] = useState([]); // Estado para los materiales relacionados
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la obtención de materiales desde una base de datos.
    const fetchMaterialDetails = async () => {
      const associatedMaterials = [
        { id: 1, nombre: 'Material A', cantidad: 10, detalle: 'Detalle del Material A' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        
        { id: 3, nombre: 'Material C', cantidad: 8, detalle: 'Detalle del Material C' },
        { id: 4, nombre: 'Material D', cantidad: 2, detalle: 'Detalle del Material D' },
        { id: 5, nombre: 'Material E', cantidad: 12, detalle: 'Detalle del Material E' }
      ];

      // Agregamos el valor total a cada material basado en la cantidad
      const materialsWithTotal = associatedMaterials.map(material => ({
        ...material,
        total: material.cantidad * 100 // Precio fijo de 100 como ejemplo
      }));

      setMaterialDetails(materialsWithTotal); // Establecemos los materiales relacionados
      setLoading(false); // Cambiamos el estado a no cargando
    };

    fetchMaterialDetails(); // Llamamos a la función para obtener los detalles

  }, [material]); // Cada vez que cambie el material seleccionado, se ejecutará esta función

  // Calcula el total de la columna "Total"
  const totalSum = materialDetails.reduce((sum, item) => sum + item.total, 0);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre del Material', width: 200 },
    { field: 'cantidad', headerName: 'Cantidad', type: 'number', width: 100, headerAlign: 'left', align: 'center' },
    { field: 'detalle', headerName: 'Detalle', width: 300 },
    { field: 'total', headerName: 'Total', width: 100, flex:1 },
  ];

  if (loading) return <div>Cargando...</div>;

  return (
    <Box style={{ padding: 20, position: 'relative' }}>
      {/* Botón de cierre en la esquina superior derecha */}
      <Button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
        <HighlightOffIcon style={{ color: '#b71c1c' }} />
      </Button>

      <h2>Detalles de la venta {material.nombre}</h2>
      <div className='Raya'></div>
      <Box>
      <DataGrid
        headerHeight={50}
        rowHeight={50}
        rows={materialDetails}
        columns={columns}
        
        checkboxSelection={false}
        disableSelectionOnClick
        disableColumnSelector
        pagination={false}
        hideFooter={true}
        sx={{
            "& ::-webkit-scrollbar": {
              width: "6px"
            },
            "& ::-webkit-scrollbar-track": {
              backgroundColor: "#f5f5f5"
            },
            "& ::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
              backgroundColor: "#f5f5f5"
            },
            "& .MuiDataGrid-iconButtonContainer": {
                color: "#fff",
            },
            "& .MuiDataGrid-sortIcon": {
                color: "#fff",
            },
            "& .MuiDataGrid-menuIcon": {
                color: "#fff",
            },
            "& .MuiDataGrid-menuIconButton": {
                color: "#fff",
            },
            bgcolor: '#e5e5e5',
            '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#2b2b2b',
                color: '#daa520',
                fontSize: '1rem',
                textAlign: 'left',
                borderRight: 'none',
            },
            '& .MuiDataGrid-cell': {
                backgroundColor: '#e5e5e5',
                color: '#000',
                paddingLeft: '8px',
                fontSize: '0.9rem',
            },
            '& .MuiDataGrid-row:hover': {
                backgroundColor: '#d6e3f1',
            },
            '& .MuiDataGrid-row': {
                borderBottom: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-columnSeparator': {
                display: 'none',
            },
            maxWidth: '100%',
            maxHeight:'310px'
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
      </Box>
      <div className='Raya'></div>
      {/* Mostramos el total general */}
      <Box mt={2} display="flex" flexDirection="column">
        <Box display="flex"  width="100%">
          <strong>Total De La Venta:</strong>
          <span style={{marginLeft:'10px'}}>{totalSum}</span>
        </Box>
        <Box display="flex"  width="100%">
          <strong>Fecha y Hora De Venta:</strong>
          <span style={{marginLeft:'10px'}}>{material.detalle}</span>
        </Box>
        <Box display="flex"  width="100%">
          <strong>Código De Venta:</strong>
          <span style={{marginLeft:'10px'}}>{material.id}</span>
        </Box>
        <Box display="flex"  width="100%">
          <strong>Vendedor:</strong>
          <span style={{marginLeft:'10px'}}>Backend</span>
        </Box>
      </Box>


    </Box>
  );
}

export default ModalVermas;

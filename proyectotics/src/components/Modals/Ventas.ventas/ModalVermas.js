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
    {
        id: 1,
        cliente: 'Juan Pérez',
        detalle: 'Mueble de madera',
        direccion: 'Avenida Providencia 1234',
        telefono: '+56 9 1234 5678',
        rows: [
            { id: 1, nombre: 'Madera Pino', cantidad: 15, detalle: 'Tablas de madera pino para mueble', precio: 20000 },
            { id: 2, nombre: 'Clavos de Carpintero', cantidad: 500, detalle: 'Clavos para ensamblaje', precio: 1500 },
            { id: 3, nombre: 'Visagras', cantidad: 12, detalle: 'Visagras para puertas', precio: 5000 },
        ]
    },
    {
        id: 2,
        cliente: 'Ana Martínez',
        detalle: 'Silla de madera',
        direccion: 'Calle Apoquindo 1011',
        telefono: '+56 9 2345 6789',
        rows: [
            { id: 1, nombre: 'Madera Roble', cantidad: 10, detalle: 'Madera roble para asiento y respaldo', precio: 25000 },
            { id: 2, nombre: 'Tornillos de Acero', cantidad: 200, detalle: 'Tornillos para ensamblaje', precio: 3000 },
            { id: 3, nombre: 'Pintura Barniz', cantidad: 5, detalle: 'Barniz para acabado', precio: 10000 },
        ]
    },
    {
        id: 3,
        cliente: 'Carlos García',
        detalle: 'Mesa de comedor',
        direccion: 'Calle La Florida 2450',
        telefono: '+56 9 3456 7890',
        rows: [
            { id: 1, nombre: 'Madera de Cedro', cantidad: 20, detalle: 'Madera de cedro para la estructura', precio: 40000 },
            { id: 2, nombre: 'Patas de Mueble', cantidad: 4, detalle: 'Patas metálicas para mesa', precio: 15000 },
            { id: 3, nombre: 'Clavos de Carpintero', cantidad: 300, detalle: 'Clavos para ensamblaje', precio: 2000 },
        ]
    },
    {
        id: 4,
        cliente: 'María López',
        detalle: 'Estantería de madera',
        direccion: 'Avenida Bellavista 123',
        telefono: '+56 9 4567 8901',
        rows: [
            { id: 1, nombre: 'Madera MDF', cantidad: 25, detalle: 'MDF para estantería', precio: 15000 },
            { id: 2, nombre: 'Clavos de Carpintero', cantidad: 400, detalle: 'Clavos para ensamblaje de estantes', precio: 2000 },
            { id: 3, nombre: 'Pintura Acrílica', cantidad: 5, detalle: 'Pintura acrílica para acabado', precio: 5000 },
        ]
    },
    {
        id: 5,
        cliente: 'Luis Ramírez',
        detalle: 'Mueble de TV',
        direccion: 'Calle 5 de Abril 879',
        telefono: '+56 9 5678 9012',
        rows: [
            { id: 1, nombre: 'Madera Pino', cantidad: 10, detalle: 'Madera pino para la estructura', precio: 15000 },
            { id: 2, nombre: 'Patas Metálicas', cantidad: 4, detalle: 'Patas metálicas para el mueble', precio: 12000 },
            { id: 3, nombre: 'Visagras', cantidad: 6, detalle: 'Visagras para puertas del mueble', precio: 3000 },
        ]
    },
    {
        id: 6,
        cliente: 'Pedro González',
        detalle: 'Silla de comedor',
        direccion: 'Calle San Francisco 432',
        telefono: '+56 9 6789 0123',
        rows: [
            { id: 1, nombre: 'Madera Roble', cantidad: 12, detalle: 'Madera de roble para la silla', precio: 20000 },
            { id: 2, nombre: 'Tornillos de Acero', cantidad: 100, detalle: 'Tornillos para ensamblaje', precio: 1500 },
            { id: 3, nombre: 'Tapizado de Tela', cantidad: 10, detalle: 'Tela para el asiento de la silla', precio: 10000 },
        ]
    },
    {
        id: 7,
        cliente: 'Elena Pérez',
        detalle: 'Escritorio de oficina',
        direccion: 'Avenida Los Leones 600',
        telefono: '+56 9 7890 1234',
        rows: [
            { id: 1, nombre: 'Madera Pino', cantidad: 15, detalle: 'Madera pino para la estructura', precio: 12000 },
            { id: 2, nombre: 'Clavos de Carpintero', cantidad: 300, detalle: 'Clavos para ensamblaje', precio: 2500 },
            { id: 3, nombre: 'Barniz', cantidad: 2, detalle: 'Barniz para acabado', precio: 5000 },
        ]
    },
    {
        id: 8,
        cliente: 'Jorge Martínez',
        detalle: 'Silla ejecutiva',
        direccion: 'Calle Vicuña Mackenna 543',
        telefono: '+56 9 8901 2345',
        rows: [
            { id: 1, nombre: 'Madera Roble', cantidad: 8, detalle: 'Madera de roble para la estructura', precio: 25000 },
            { id: 2, nombre: 'Piel Sintética', cantidad: 5, detalle: 'Piel sintética para el asiento', precio: 7000 },
            { id: 3, nombre: 'Tornillos de Acero', cantidad: 100, detalle: 'Tornillos para ensamblaje', precio: 1500 },
        ]
    }
    ,
    { 
        id: 11, 
        cliente: 'Benjamín Cofré', 
        detalle: 'Mueble de comedor', 
        direccion: 'Avenida Central 999', 
        telefono: '+56 9 0123 4567',
        rows: [ 
          { id: 1, nombre: 'Madera de Cedro', cantidad: 20, detalle: 'Madera de cedro para la estructura', precio: 33250 },
          { id: 2, nombre: 'Patas Metálicas', cantidad: 4, detalle: 'Patas metálicas para el mueble', precio: 15000 },
          { id: 11, nombre: 'Puerta de Madera', cantidad: 4, detalle: 'Puerta de madera maciza', precio: 3000,},
          { id: 13, nombre: 'Interruptores Eléctricos', cantidad: 4, detalle: 'Interruptores de alta calidad', precio: 250 },
        ]
      }
];
const selectedMaterial = associatedMaterials.find(item => item.cliente === material.nombre);

if (selectedMaterial) {
  const materialsWithTotal = selectedMaterial.rows.map(row => ({
    id: row.id,
    cliente: selectedMaterial.cliente,
    nombre: row.nombre,
    cantidad: row.cantidad,
    detalle: row.detalle,
    total: row.precio
  }));

  setMaterialDetails(materialsWithTotal);
} else {
  setMaterialDetails([]);
}

setLoading(false);  // Asegúrate de que esta línea esté bien formateada
};

fetchMaterialDetails();
}, [material]);


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
          <span style={{marginLeft:'10px'}}>{material.precio}</span>
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
          <span style={{marginLeft:'10px'}}>Waton</span>
        </Box>
      </Box>


    </Box>
  );
}

export default ModalVermas;

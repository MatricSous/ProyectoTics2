import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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
        { id: 3, nombre: 'Material C', cantidad: 8, detalle: 'Detalle del Material C' },
        { id: 4, nombre: 'Material D', cantidad: 2, detalle: 'Detalle del Material D' },
        { id: 5, nombre: 'Material E', cantidad: 12, detalle: 'Detalle del Material E' }
      ];

      setMaterialDetails(associatedMaterials); // Establecemos los materiales relacionados
      setLoading(false); // Cambiamos el estado a no cargando
    };

    fetchMaterialDetails(); // Llamamos a la función para obtener los detalles

  }, [material]); // Cada vez que cambie el material seleccionado, se ejecutará esta función

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre del Material', width: 200 },
    { field: 'cantidad', headerName: 'Cantidad', type: 'number', width: 100 },
    {
      field: 'detalle',
      headerName: 'Detalle',
      width: 300,
    },
  ];

  if (loading) return <div>Cargando...</div>;

  return (
    <Box style={{ padding: 20, position: 'relative'}}>
      {/* Botón de cierre en la esquina superior derecha */}
      <Button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
        <HighlightOffIcon style={{ color: '#b71c1c' }} />
      </Button>

      <h2>Detalles del Producto {material.nombre}</h2>

      <DataGrid
        rows={materialDetails}
        columns={columns}
        pageSize={5} // Establecemos que queremos mostrar 5 filas por página
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default ModalVermas;

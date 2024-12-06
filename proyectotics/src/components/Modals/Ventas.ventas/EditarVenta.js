import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, Grid2, Grid, MenuItem } from '@mui/material';

function EditarVenta({ material, open, onClose, onSaveChanges }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 370,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Estado para los detalles del material
  const [materialDetails, setMaterialDetails] = useState(material);
  const [newPrice, setNewPrice] = useState(material?.precio || 0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(material?.precio || 0);

  useEffect(() => {
    // Actualizar el precio final cuando cambie el precio o descuento
    const discountedPrice = newPrice - (newPrice * (discount / 100));
    setFinalPrice(discountedPrice);
  }, [newPrice, discount]);

  // Función para manejar el cambio de precio
  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  // Función para manejar el cambio de descuento
  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleSaveChanges = () => {
    const updatedMaterial = { ...material, precio: finalPrice };

    console.log("Material actualizado:", updatedMaterial);

    // Pasa el material actualizado al componente padre
    onSaveChanges(updatedMaterial);

    onClose(); // Cierra el modal
  };

  if (!material) {
    return null; // No mostrar nada si material es null
  }

  return (
    <Box sx={style}>
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2
          id="parent-modal-title"
          style={{
            margin: 0,
            color: 'black',
            fontSize: '1.5rem',
            zIndex: 1,
            wordWrap: 'break-word',
          }}
        >
          {material.nombre}
        </h2>
        <div
          className="Raya"
          style={{
            height: '2px',
            backgroundColor: 'black',
            width: '100%',
            marginTop: '0.5rem',
          }}
        ></div>
      </div>

      <Typography variant="h6" gutterBottom>
        Precio Actual: ${material.precio}
      </Typography>

      <TextField
        label="Nuevo Precio"
        value={newPrice}
        onChange={handlePriceChange}
        fullWidth
        variant="outlined"
        margin="normal"
        type="number"
      />

      <TextField
        label="Descuento (%)"
        value={discount}
        onChange={handleDiscountChange}
        fullWidth
        variant="outlined"
        margin="normal"
        type="number"
        InputProps={{
          endAdornment: <span>%</span>,
        }}
      />

      <Typography variant="h6" gutterBottom>
        Precio Final: ${finalPrice.toFixed(2)}
      </Typography>

      <Grid2 container rowSpacing={2} style={{ display: 'flex', alignItems: 'center' }} />

      <Button
        variant="contained"
        color="amarillo"
        onClick={handleSaveChanges}
        fullWidth
        sx={{ marginTop: '1rem' }}
      >
        Guardar Cambios
      </Button>
    </Box>
  );
}

export default EditarVenta;

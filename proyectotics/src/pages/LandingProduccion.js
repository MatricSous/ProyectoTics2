// LandingProduccion.js

import React, { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import RecipeModal from '../components/Modals/RecipeModal'; // Ajusta la ruta según sea necesario
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export default function LandingProduccion() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ backgroundColor: '#e5e5e5' }}>
      <Container maxWidth="sm" style={{ height: '100vh', paddingTop: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container style={{ position: 'relative', height: '400px', width: '300px' }}>

          {/* Botón de recetas */}
          <RecipeModal open={openModal} handleClose={handleClose} />
          
          <Grid item xs={12} style={{ position: 'absolute', top: '50%', right: '-90%', transform: 'translateY(-50%)' }}>
            <Button
              variant="contained"
              color="amarillohoverblanco"
              startIcon={<ReceiptLongIcon style={{ fontSize: '35px' }} />}
              onClick={handleOpen}
              sx={{ width: '300px', height: '75px', fontSize: '30px' }}
            >
              Recetas
            </Button>
          </Grid>

          <Grid item xs={12} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
                        <Button className='botonGrande' variant="contained" startIcon={<CategoryIcon style={{ fontSize: '35px' }} />} sx={{ width: '300px', height: '75px', fontSize: '30px' }} color="amarillohoverblanco">Productos</Button>
            </Grid>

          <Grid item xs={12} style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}>
            <Button variant="contained" color="azul" startIcon={<SettingsIcon />}>Ajustes</Button>
          </Grid>

          <Grid item xs={12} style={{ position: 'absolute', top: '50%', left: '-90%', transform: 'translateY(-50%)', paddingRight: '16px' }}>
            <Button variant="contained" color="amarillohoverblanco" startIcon={<InventoryIcon style={{ fontSize: '35px' }} />} sx={{ width: '300px', height: '75px', fontSize: '30px', display: 'flex' }}>
              Bodegas
            </Button>
          </Grid>

        </Grid>
      </Container>

      
      
    </div>
  );
}

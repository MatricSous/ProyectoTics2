import React, {useState} from 'react';
//import Axios from 'axios';
import { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import '../index.css';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import ConstructionIcon from '@mui/icons-material/Construction';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InventoryIcon from '@mui/icons-material/Inventory';
import NestedModal from '../components/Modals/productos';

export default function LandingProduccion() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div 
      style={{backgroundColor: '#e5e5e5' , }}>
    
      <Container bmaxWidth="sm" style={{ height: '100vh',paddingTop:'120px' ,display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
      <Grid container style={{ position: 'relative', height: '400px', width: '300px' }}>

        {/* Botón superior */}
        <Grid item xs={12} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
          <Button 
            className='botonGrande'  
            variant="contained" 
            startIcon={
              <CategoryIcon 
                style={{ fontSize: '35px' }}/>} 
            sx={{ width: '300px', height: '75px' , fontSize:'30px' }} 
            color="amarillohoverblanco"
            onClick={handleOpen}>
          Productos
          </Button>
          <NestedModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
        </Grid>

      {/* Botón inferior */}
      <Grid item xs={12} style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}>
        <Button variant="contained" color="azul" startIcon={<SettingsIcon />} >Ajustes</Button>
      </Grid>

      {/* Botón izquierdo */}
      <Grid item xs={12}  style={{ position: 'absolute', top: '50%', left: '-90%', transform: 'translateY(-50%)', paddingRight: '16px' }}>
        <Button variant="contained" color="amarillohoverblanco" startIcon={<InventoryIcon style={{ fontSize: '35px' }} />} sx={{ width: '300px', height: '75px', fontSize:'30px', display: 'flex'}}
              >Bodegas </Button>
      </Grid>

      {/* Botón derecho */}
      <Grid item xs={12} style={{ position: 'absolute', top: '50%', right: '-90%', transform: 'translateY(-50%)' }}>
        <Button variant="contained" color="amarillohoverblanco" startIcon={<ReceiptLongIcon style={{ fontSize: '35px' }}/>} sx={{ width: '300px', height: '75px', fontSize:'30px'  }}>Recetas</Button>
      </Grid>
      
    </Grid>
  </Container>
  </div>
  );
    


}
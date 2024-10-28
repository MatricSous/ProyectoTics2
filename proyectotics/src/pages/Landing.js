import React from 'react';
//import Axios from 'axios';
import { Container, Grid, Button } from '@mui/material';
import '../index.css';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import ConstructionIcon from '@mui/icons-material/Construction';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function Landing() {
    const navigate = useNavigate(); // Crea una instancia de navigate

    return (
        <div 
        style={{backgroundColor: '#e5e5e5' , }}>
        
        <Container bmaxWidth="sm" style={{ height: '100vh',paddingTop:'120px' ,display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        <Grid container style={{ position: 'relative', height: '400px', width: '300px' }}>
          
          {/* Botón superior */}
          <Grid item xs={12} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
            <Button onClick={() => navigate('/LandingProduccion')} className='botonGrande'  variant="contained" startIcon={<ConstructionIcon style={{ fontSize: '35px' }}/>} sx={{ width: '300px', height: '75px' , fontSize:'30px' }} color="amarillohoverblanco">Producción</Button>
          </Grid>
            
          {/* Botón inferior */}
          <Grid item xs={12} style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}>
            <Button variant="contained" color="azul" startIcon={<SettingsIcon />} >Ajustes</Button>
          </Grid>
  
          {/* Botón izquierdo */}
          <Grid item xs={12}  style={{ position: 'absolute', top: '50%', left: '-90%', transform: 'translateY(-50%)', paddingRight: '16px' }}>
            <Button onClick={() => navigate('/LandingVentas')} variant="contained" color="amarillohoverblanco" startIcon={<StoreIcon style={{ fontSize: '35px' }} />} sx={{ width: '300px', height: '75px', fontSize:'30px', display: 'flex'}}
                  >Ventas </Button>
          </Grid>
  
          {/* Botón derecho */}
          <Grid item xs={12} style={{ position: 'absolute', top: '50%', right: '-90%', transform: 'translateY(-50%)' }}>
            <Button onClick={() => navigate('/LandingCompras')} variant="contained" color="amarillohoverblanco" startIcon={<LocalMallIcon style={{ fontSize: '35px' }}/>} sx={{ width: '300px', height: '75px', fontSize:'30px'  }}>
                Compras</Button>
          </Grid>
          
        </Grid>
      </Container>
      </div>
      );
}
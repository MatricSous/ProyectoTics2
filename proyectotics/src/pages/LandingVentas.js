import React from 'react';
//import Axios from 'axios';
import { Container, Grid, Button } from '@mui/material';
import '../index.css';
import SettingsIcon from '@mui/icons-material/Settings';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export default function LandingProduccion() {


    return (
        <div 
        style={{backgroundColor: '#e5e5e5' , }}>
        
        <Container bmaxWidth="sm" style={{ height: '100vh',paddingTop:'120px' ,display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        <Grid container style={{ position: 'relative', height: '400px', width: '300px' }}>
          
          {/* Botón superior */}
          <Grid item xs={12} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
            <Button className='botonGrande'  variant="contained" startIcon={<PointOfSaleIcon style={{ fontSize: '35px' }}/>} sx={{ width: '300px', height: '75px' , fontSize:'30px' }} color="amarillohoverblanco">
            Ventas
            </Button>
          </Grid>
            
          {/* Botón inferior */}
          <Grid item xs={12} style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}>
            <Button variant="contained" color="azul" startIcon={<SettingsIcon />} >Ajustes</Button>
          </Grid>
  
          {/* Botón izquierdo */}
          <Grid item xs={12}  style={{ position: 'absolute', top: '50%', left: '-90%', transform: 'translateY(-50%)', paddingRight: '16px' }}>
            <Button variant="contained" color="amarillohoverblanco" startIcon={<GroupAddIcon style={{ fontSize: '35px' }} />} sx={{ width: '300px', height: '75px', fontSize:'30px', display: 'flex'}}
                  >Clientes </Button>
          </Grid>
  
          {/* Botón derecho */}
          <Grid item xs={12} style={{ position: 'absolute', top: '50%', right: '-90%', transform: 'translateY(-50%)' }}>
            <Button variant="contained" color="amarillohoverblanco" startIcon={<RequestQuoteIcon style={{ fontSize: '35px' }}/>} sx={{ width: '300px', height: '75px', fontSize:'30px'  }}>Cotización</Button>
          </Grid>
          
        </Grid>
      </Container>
      </div>
      );
    


}
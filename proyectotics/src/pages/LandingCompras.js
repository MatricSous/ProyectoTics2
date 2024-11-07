import React from 'react';
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
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TaskIcon from '@mui/icons-material/Task';


export default function LandingProduccion() {


    return (
        <div 
        style={{backgroundColor: '#e5e5e5' , }}>
        
        <Container bmaxWidth="sm" style={{ height: '100vh' ,display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        <Grid container style={{ position: 'relative', height: '400px', width: '300px' }}>
          
          {/* Botón superior */}
          
            
          {/* Botón inferior */}
          <Grid item xs={12} style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}>
            <Button variant="contained" color="azul" startIcon={<SettingsIcon />} >Ajustes</Button>
          </Grid>
  
          {/* Botón izquierdo */}
          <Grid item xs={12}  style={{ position: 'absolute', top: '50%', left: '-70%', transform: 'translateY(-50%)', paddingRight: '16px' }}>
            <Button variant="contained" color="amarillohoverblanco" startIcon={<PostAddIcon style={{ fontSize: '45px' }} />} sx={{ width: '300px', height: '100px', fontSize:'30px', display: 'flex', lineHeight: '1.2',}}
                  >Ordenes de Compra </Button>
          </Grid>
  
          {/* Botón derecho */}
          <Grid item xs={12} style={{ position: 'absolute', top: '50%', right: '-70%', transform: 'translateY(-50%)' }}>
            <Button variant="contained" color="amarillohoverblanco" startIcon={<TaskIcon style={{ fontSize: '45px' }}/>} sx={{ width: '300px', height: '100px', fontSize:'30px', display: 'flex', lineHeight: '1.2',  }}>Aprobar Ordenes</Button>
          </Grid>
          
        </Grid>
      </Container>
      </div>
      );
    


}
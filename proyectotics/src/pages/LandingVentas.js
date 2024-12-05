import React from 'react';
//import Axios from 'axios';
import { useState } from 'react';
import { Container, Grid2, Button } from '@mui/material';
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
import VentasModal from '../components/Modals/Ventas.ventas/VentasModal';

export default function LandingProduccion() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  const [openVentas, setOpenVentas] = useState(false);
  const handleOpenVentas = () => setOpenVentas(true);
  const handleCloseVentas = () => setOpenVentas(false);


    return (
        <div 
        style={{backgroundColor: '#e5e5e5' , }}>
        
        <Container bmaxWidth="sm" style={{ height: '100vh',paddingTop:'120px' ,display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
        <Grid2 container style={{ position: 'relative', height: '400px', width: '300px' }}>
          
          {/* Botón superior */}
          <Grid2 item xs={12} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
            <Button className='botonGrande' onClick={handleOpenVentas} variant="contained" startIcon={<PointOfSaleIcon style={{ fontSize: '35px' }}/>} sx={{ width: '300px', height: '75px' , fontSize:'30px' }} color="amarillohoverblanco">
            Ventas
            </Button>
            <VentasModal open={openVentas} handleClose={handleCloseVentas} handleOpen={handleOpenVentas} />
            
          </Grid>
            
          {/* Botón inferior */}
          <Grid2 item xs={12} style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}>
            <Button variant="contained" color="azul" startIcon={<SettingsIcon />} >Ajustes</Button>
          </Grid2>
  
          {/* Botón izquierdo */}
          <Grid2 item xs={12}  style={{ position: 'absolute', top: '50%', left: '-90%', transform: 'translateY(-50%)', paddingRight: '16px' }}>
            <Button 
              variant="contained" 
              onClick={handleOpenClientes} 
              color="amarillohoverblanco" 
              startIcon={
                <GroupAddIcon 
                  style={{ fontSize: '35px' }} 
                />
              } 
              sx={{ 
                width: '300px', 
                height: '75px', 
                fontSize:'30px', 
                display: 'flex'
              }}
            >
              Clientes 
            </Button>
            <NestedModalClientes open={openClientes} handleClose={handleCloseClientes} handleOpen={handleOpenClientes} />
          </Grid2>
  
          {/* Botón derecho */}
          <Grid2 item xs={12} style={{ position: 'absolute', top: '50%', right: '-90%', transform: 'translateY(-50%)' }}>
            <Button variant="contained" color="amarillohoverblanco" startIcon={<RequestQuoteIcon style={{ fontSize: '35px' }}/>} sx={{ width: '300px', height: '75px', fontSize:'30px'  }}>Cotización</Button>
          </Grid2>
          
        </Grid2>
      </Container>
      </div>
      );
    


}
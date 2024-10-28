import React, { useState } from 'react';
import { Grid, AppBar, Toolbar, Typography, Button, styled, Box } from '@mui/material';
import logo from '../images/LOGOrial.png'; // Ajusta la ruta de tu logo
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RedoIcon from '@mui/icons-material/Redo';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: '#093D77',
  color: 'white',
  padding: '0 16px',
}));

function Navbar() {
  const navigate = useNavigate(); // Crea una instancia de navigate
  const location = useLocation();
  const hidenButton = location.pathname === '/';
  const showMessage = !hidenButton;

  //const hideNavbar = location.pathname==='/';

  return (
    //<>
      //{!hideNavbar && (
        <AppBar position="fixed">
          <CustomToolbar>
            <Grid container alignItems="center" justifyContent="space-between">
              {/* Logo alineado a la izquierda */}
              <Grid item xs={4}>
                <Box display="flex" alignItems="center">
                  <img src={logo} alt="Logo" className='LOGO' style={{ width: '60px', height: '50px', paddingRight: '25px' }} />
                  {!hidenButton && (
                  <Button 
                    variant="text" 
                    color='amarillo' 
                    startIcon={<RedoIcon style={{ fontSize: '30px', transform: 'scaleX(-1)' }} />} 
                    onClick={() => navigate(-1)} // Regresa a la página anterior
                  >
                    Volver
                  </Button>
                  )}
                </Box>
              </Grid>

             
              
              {/* Mensaje de bienvenida */}
              {!showMessage && (
                <Grid item xs={4} display="flex" justifyContent="center">
                  <Typography component="h1" variant="h6" gutterBottom sx={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
                    Inicia sesión para comenzar con tus funciones
                  </Typography>
                </Grid>
              )}

              {/* Botones alineados a la derecha */}
              <Grid item xs={4} style={{ textAlign: 'right' }}>
              {!hidenButton && (
                <Button variant="text" color='amarillo' style={{ marginRight: '20px' }} startIcon={<AccountCircleIcon />}>
                  ADMINISTRADOR
                </Button>
              )}
              {!hidenButton && (
                <Button variant="contained" color='amarillo'>
                  Cerrar sesión 
                </Button>
              )}
              </Grid>
            </Grid>
          </CustomToolbar>
        </AppBar>
      //)}
    //</>  
  );
}

export default Navbar;

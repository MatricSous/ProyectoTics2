import React from 'react';
import { Grid, AppBar, Toolbar, Typography, Button, styled, Box } from '@mui/material';
import logo from '../images/LOGOrial.png'; // Ajusta la ruta de tu logo
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RedoIcon from '@mui/icons-material/Redo';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: '#093D77',
  color: 'white',
  padding: '0 16px',
}));

function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate(); // Crea una instancia de navigate

  return (
    <AppBar position="fixed">
      <CustomToolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Logo alineado a la izquierda */}
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <img src={logo} alt="Logo" className='LOGO' style={{ width: '60px', height: '50px', paddingRight: '25px' }} />
              <Button 
                variant="text" 
                color='amarillo' 
                startIcon={<RedoIcon style={{ fontSize: '30px', transform: 'scaleX(-1)' }} />} 
                onClick={() => navigate(-1)} // Regresa a la página anterior
              >
                Volver
              </Button>
            </Box>
          </Grid>

          {/* Enlaces de navegación o secciones en el centro */}
          <Grid item xs={4}>
            <Typography variant="h6" align="center"></Typography>
          </Grid>

              {/* Botones alineados a la derecha */}
              <Grid item xs={4} style={{ textAlign: 'right' }}>
              {!hidenButton && (
                <Button variant="text" color='amarillo' style={{ marginRight: '20px' }} startIcon={<AccountCircleIcon />}>
                  ADMINISTRADOR
                </Button>
              )}
              {!hidenButton && (
                <Button variant="contained" color='amarillo' >
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

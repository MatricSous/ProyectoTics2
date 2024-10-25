import React from 'react';
import { Grid, AppBar, Toolbar, Typography, Button, styled } from '@mui/material';
import logo from '../images/LOGOrial.png'; // Ajusta la ruta de tu logo
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: '#093D77',
  color: 'white',
  padding: '0 16px',
}));



function Navbar() {
    const theme = useTheme();
  return (
    
    <AppBar position="static">
      <CustomToolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          
          {/* Logo alineado a la izquierda */}
          <Grid item xs={4}>
            <img src={logo} alt="Logo" className='LOGO' style={{ width: '60px', height: '50px' }} />
          </Grid>

          {/* Enlaces de navegación o secciones en el centro */}
          <Grid item xs={4}>
            <Typography variant="h6" align="center"></Typography>
          </Grid>

          {/* Botones alineados a la derecha */}
          <Grid item xs={4} style={{ textAlign: 'right' }}>
            <Button  variant="text" color='negro' style={{ marginRight: '20px' }}>
              ADMINISTRADOR
            </Button>
            <Button variant="contained" color='negro'  >
              Botón 2
            </Button>
          </Grid>

        </Grid>
      </CustomToolbar>
    </AppBar>
  );
}

export default Navbar;

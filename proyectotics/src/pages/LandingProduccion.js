import React, {useState} from 'react';
import Axios from 'axios';


import { Container, Grid, Grid2, Button } from '@mui/material';
import RecipeModal from '../components/Modals/Recetas/RecipeModal'; // Ajusta la ruta según sea necesario
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InventoryIcon from '@mui/icons-material/Inventory';
import NestedModalProductos from '../components/Modals/productos';
import NestedModalBodega from '../components/Modals/bodega';
import NestedModalRecetas from '../components/Modals/recetas';




export default function LandingProduccion() {
  const [openProductos, setOpenProductos] = useState(false);
  const handleOpenProductos = () => setOpenProductos(true);
  const handleCloseProductos = () => setOpenProductos(false);

  const[openRecetas, setOpenRecetas] = useState(false);
  const handleOpenRecetas = () => setOpenRecetas(true);
  const handleCloseRecetas = () => setOpenRecetas(false);

  const [openBodega, setOpenBodega] = useState(false);
  const handleOpenBodega = () => setOpenBodega(true);
  const handleCloseBodega = () => setOpenBodega(false);

  const [openReceta, setOpenReceta] = useState(false);
  const handleOpenReceta = () => setOpenReceta(true);
  const handleCloseReceta = () => setOpenReceta(false);

  return (
    <div
    style={{
        backgroundImage: `
            linear-gradient(rgba(229, 229, 229, 0.8), rgba(229, 229, 229, 0.8)),
            url(${require('../images/bg.jpg')})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100vw',
    }}
>
    
      <Container bmaxWidth="sm" style={{ height: '100vh',paddingTop:'120px' ,display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
      <Grid2 container style={{ position: 'relative', height: '400px', width: '300px' }}>

        {/* Botón superior */}
        <Grid2 item xs={12} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
          <Button 
            className='botonGrande'  
            variant="contained" 
            startIcon={
              <CategoryIcon 
                style={{ fontSize: '35px' }}/>} 
            sx={{ width: '300px', height: '75px' , fontSize:'30px' }} 
            color="amarillohoverblanco"
            onClick={handleOpenProductos}>
          Productos
          </Button>
          <NestedModalProductos open={openProductos} handleClose={handleCloseProductos} handleOpen={handleOpenProductos} />
        </Grid2>

      {/* Botón inferior */}
     
      {/* Botón izquierdo */}
      <Grid2 item xs={12}  style={{ position: 'absolute', top: '50%', left: '-90%', transform: 'translateY(-50%)', paddingRight: '16px' }}>
        <Button 
          variant="contained" 
          color="amarillohoverblanco" 
          startIcon={
            <InventoryIcon 
              style={{ fontSize: '35px' }} />} 
          sx={{ width: '300px', height: '75px', fontSize:'30px', display: 'flex'}}
          onClick={handleOpenBodega}>
        Bodegas 
        </Button>
        <NestedModalBodega open={openBodega} handleClose={handleCloseBodega} handleOpen={handleOpenBodega} />
      </Grid2>

      {/* Botón derecho */}
      <Grid2 item xs={12} style={{ position: 'absolute', top: '50%', right: '-90%', transform: 'translateY(-50%)' }}>
        <Button variant="contained" 
        color="amarillohoverblanco" 
        startIcon={<ReceiptLongIcon 
        style={{ fontSize: '35px' }}/>} sx={{ width: '300px', height: '75px', fontSize:'30px'  }}
        onClick={handleOpenRecetas}>
          Recetas
        </Button>
        <RecipeModal open={openRecetas} handleClose={handleCloseRecetas} handleOpen={handleOpenRecetas} />
      </Grid2>
      
      
    </Grid2>
  </Container>
  </div>
  );
    


}


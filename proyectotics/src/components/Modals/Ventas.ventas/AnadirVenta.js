import React, { useState ,useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, Grid2, Grid, item, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TablaAnadir from './TablaAnadir';



function AnadirVenta({ open, onClose }) {
    
    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const vendedores = [
    {
      value: 'Cazuela',
      label: 'Cazuela',
    },
    {
      value: 'Waton',
      label: 'Waton',
    },
    {
      value: 'Tati',
      label: 'Tati',
    },
    {
      value: 'Milla',
      label: 'Milla',
    },
  ];
  
  const despachador = [
    {
      value: 'Yailin',
      label: 'Yailin',
    },
    {
      value: 'Fernin',
      label: 'Fernin',
    },
    {
      value: 'Miguel',
      label: 'Miguel',
    },
    {
      value: 'Yarden',
      label: 'Yarden',
    },
  ];

    return(
        <Box sx={style}>
            <Button onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10, color: 'black', zIndex: 1 }}>
                    <HighlightOffIcon style={{ color: '#b71c1c' }} />
            </Button>
            <h2
                    id="parent-modal-title"
                    style={{
                        position: 'absolute',
                        top: -5,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'black',
                        zIndex: 1,
                        fontSize: '1.5rem',
                    }}
            >
                Gestión De Venta
            </h2>
            <div className="Raya"></div>
            
            <Grid2 container rowSpacing={2}  style={{ display: 'flex', alignItems: 'center'}}>
                <Grid2 size={3}>
                    <item>
                        <TextField  color="amarillo" id="outlined-basic" label="Cotizaciones" variant="outlined" disabled/>
                    </item>
                </Grid2>
                <Grid2 xs={2} container justifyContent={'space-between'}> 
                    <Grid2 >                
                        <Button >
                        <SearchIcon color= 'amarillo'/>
                        </Button>              
                    </Grid2>
                    <Grid2  >                     
                        <Button >
                        <InfoIcon color='amarillo'/>
                        </Button>                
                    </Grid2>
                    <Grid2  >                   
                        <Button >
                        <AddIcon color='amarillo'/>
                        </Button>
                    </Grid2>
                </Grid2>
                <Grid2 size={1}></Grid2>
                <Grid2 size={2}>
                    <item>
                        <TextField id="outlined-basic" label="Cliente" variant="outlined" disabled/>
                    </item>
                </Grid2>
                <Grid2 xs={2} container justifyContent={'space-between'}>
                    <Grid2 >
                        <Button >
                        <SearchIcon color='amarillo'/>
                        </Button>
                    </Grid2>
                    <Grid2 >
                        <Button >
                        <InfoIcon color='amarillo'/>
                        </Button>
                    </Grid2>
                    <Grid2 >
                        <Button >
                        <AddIcon color='amarillo'/>
                        </Button>
                    </Grid2>                   
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Vendedor"
                        defaultValue="Waton"
                        helperText="Por favor seleciona el vendedor"
                        color='amarillo'
                        sx={{width:'223px'}}
                        >
                        {vendedores.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>
                <Grid2 size={3.56}></Grid2>
                <Grid2 size={3.7} sx={{marginBottom:'25px'}} display={'flex'} alignItems={'center'}>
                    <item>
                        <TextField  color="amarillo" id="outlined-basic" label="Dirección" variant="outlined" disabled />
                    </item>
                    <Grid2 >
                    <item>
                        <Button >
                        <EditIcon color='amarillo'/>
                        </Button>
                    </item>
                    </Grid2>
                </Grid2>
            </Grid2>
        <div className='Raya2'> 
            <span>
        <h2
                    id="parent-modal-title"
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'black',
                        zIndex: 1,
                        fontSize: '1.5rem',
                        marginTop:'-20px',
                        
                    }}
            >
                Entrega
        </h2>
        </span>
        </div>
        <Grid2 container rowSpacing={2}  style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
            <Grid2>
                <item>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Despachador"
                        defaultValue="Yailin"
                        color='amarillo'
                        helperText="Selecione el Despachador"
                        sx={{width:'223px'}}
                        >
                        {despachador.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </item>
            </Grid2>

            <Grid2 sx={{marginTop:'-22px'}}>
                <item>
                    <TextField id="outlined-basic" label="Costo" variant="outlined" color='amarillo'/>
                </item>
            </Grid2>

            <Grid2 sx={{marginTop:'-22px'}}>
                <item>
                    <TextField id="outlined-basic" label="Horario" variant="outlined" color= 'amarillo'/>
                </item>
            </Grid2>
            
        </Grid2>
        <Grid2 sx={{marginTop:'0px'}}>
            <item>
                <TextField fullWidth id="outlined-basic" label="Notas" variant="outlined"/>
            </item>
        </Grid2>
        <div className='Raya'></div>
        <TablaAnadir/>
        





        </Box>
    )
};

export default AnadirVenta;
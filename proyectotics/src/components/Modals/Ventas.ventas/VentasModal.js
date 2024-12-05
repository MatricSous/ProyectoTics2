import React, { useState, useEffect, useTheme } from 'react';
import { Modal, Box, Typography, Button, TextField, styled, alpha, InputBase, Grid2, Toolbar, Fab, Grid } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TablaVentas from './TablaVentas';
import ModalVermas from './ModalVermas';
import AnadirVenta from './AnadirVenta';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 938,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: '#2b2b2b',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: '2px solid #2b2b2b',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



// VentasModal.js
const VentasModal = ({ open, handleClose }) => {
    const [childOpen, setChildOpen] = React.useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const [openModal, setOpenModal] = useState(false);
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const [busqueda, setBusqueda] = useState('');
    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
    };
 
    
    const [value, setValue] = React.useState(0);  
    return (
        <Modal aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description" open={open} onClose={handleClose}>
            <Box sx={style}>
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
                    Ventas
                </h2>
                <div className="Raya"></div>
                <Button onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10, color: 'black', zIndex: 1 }}>
                    <HighlightOffIcon style={{ color: '#b71c1c' }} />
                </Button>

                <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                
                    <Fab style={{ marginLeft: '8px' }} color="amarilloamarillo" aria-label="add" variant="extended" onClick={handleOpenModal}>
                        <AddIcon />Agregar
                    </Fab>

                    <Modal open={openModal} onClose={handleCloseModal}>
                        <AnadirVenta onClose={handleCloseModal}/>
                    </Modal>

                    <Grid2 container spacing={22} style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                        <Grid2>
                            <item>
                                <Toolbar style={{ paddingLeft: '0px', marginTop: '2px' }}>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Buscar…"
                                            value={busqueda}
                                            onChange={handleChangeBusqueda}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </Search>
                                </Toolbar>
                            </item>
                        </Grid2>

                        <Grid2>
                            <item>
                                <h2 id="parent-modal-title" style={{ marginTop: 0, marginBottom: 0}}>
                                    Ventas Realizadas
                                </h2>
                            </item>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <TablaVentas filterText={busqueda} />
            </Box>
        </Modal>
    );
};

export default VentasModal;

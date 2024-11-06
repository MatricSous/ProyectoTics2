// components/modals/RecipeModal.js

import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import '../../index.css';
import ProcesoList from './ProcesoList';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 480,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RecipeModal = ({ open, handleClose }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Modal 
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    open={open} onClose={handleClose}>
      
      <Box sx={style}>
        <Button
          onClick={handleClose}
          sx={{ position: 'absolute', top: 10, right: 10, color: 'black', zIndex: 1 }}
        >
          <HighlightOffIcon style={{color: '#b71c1c'}}/>
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
          Transformaciones de Productos
        </h2>

        <div className="Raya"></div>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          
          <ProcesoList />
          <Button onClick={handleOpenModal} startIcon={<SearchIcon style={{ fontSize: '25px' }} />} variant="text" color="primary">
            Buscar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RecipeModal;

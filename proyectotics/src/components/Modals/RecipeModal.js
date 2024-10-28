// components/modals/RecipeModal.js

import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import '../../index.css';
import ProcesoList from './ProcesoList';

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
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Button
          onClick={handleClose}
          sx={{ position: 'absolute', top: 10, right: 10, color: 'black', zIndex: 1 }}
        >
          <CloseIcon />
        </Button>

        <Typography
          variant="h6"
          component="h2"
          sx={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', color: 'black', zIndex: 1 }}
        >
          Transformaciones de Productos
        </Typography>
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

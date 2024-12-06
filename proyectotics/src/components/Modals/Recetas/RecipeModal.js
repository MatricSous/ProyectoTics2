import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TablaRecipes from './TablaRecipes';
import AnadirReceta from './AnadirReceta';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import ModalVermas from './ModalVermas';

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

// Datos de ejemplo para las filas de la tabla
const rows = [
  { id: 1, nombre: 'Cemento Portland', cantidad: 50, detalle: 'Saco de 42.5 kg para uso general en obras' },
  { id: 2, nombre: 'Arena', cantidad: 100, detalle: 'Arena fina para mezcla de concreto y acabados' },
  { id: 3, nombre: 'Grava', cantidad: 80, detalle: 'Grava de 1 pulgada, ideal para construcción de cimientos' },
  { id: 4, nombre: 'Ladrillo Rojo', cantidad: 500, detalle: 'Ladrillo para muros de carga y acabados' },
  { id: 5, nombre: 'Varilla de Acero', cantidad: 150, detalle: 'Varilla de 3/8 pulgadas, para refuerzo de concreto' },
  { id: 6, nombre: 'Yeso', cantidad: 40, detalle: 'Yeso de alta pureza para enlucidos y acabados' },
  { id: 7, nombre: 'Bloques de Concreto', cantidad: 300, detalle: 'Bloques de 12x20x40 cm para paredes y muros' },
  { id: 8, nombre: 'Madera Contrachapada', cantidad: 20, detalle: 'Tablas de 18 mm para encofrado y construcción de moldes' },
  { id: 9, nombre: 'Clavos de Acero', cantidad: 5000, detalle: 'Clavos de 3 pulgadas para usos generales en carpintería' },
  { id: 10, nombre: 'Pintura Acrílica', cantidad: 25, detalle: 'Pintura blanca para interiores, base de agua' },
];

const RecipeModal = ({ open, handleClose }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Estado para el token
  const [recipes, setRecipes] = useState([]); // Estado para las recetas
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura del modal de detalles
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const [filteredRows, setFilteredRows] = useState([]); // Estado para las filas filtradas
  const [selectedMaterials, setSelectedMaterials] = useState([]); // Estado para los materiales seleccionados
  const [selectedMaterial, setSelectedMaterial] = useState(null); // Estado para el material seleccionado
  const [selectedMaterialDetails, setSelectedMaterialDetails] = useState(null); // Estado para los detalles del material seleccionado
  
  const handleOpenModal = async (recipe) => {
    try {
      const materialDetailsPromises = recipe.materiales.map(async (material) => {
        const response = await axios.get(`http://localhost:8081/materiales/${material.codigo_material}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return { ...response.data, cantidad: material.cantidad };
      });

      const materialDetails = await Promise.all(materialDetailsPromises);
      setSelectedMaterialDetails({ nombre_receta: recipe.nombre, materiales: materialDetails });
      setOpenModal(true);
    } catch (error) {
      console.error('Error al obtener detalles del material:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMaterialDetails(null);
  };

  // Removed duplicate handleAddMaterialToRecipe function

  const HandleModalOpen = () => {
    setOpenModal(true);
  };
  // Función para obtener las recetas
  useEffect(() => {
    const fetchRecipes = async () => {
      if (token) {
        try {
          console.log('Obteniendo Recetas...');
          const response = await axios.get('http://localhost:8081/recetas', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Recetas Obtenidas:', response.data.recetas);
          const mappedData = response.data.recetas.map(recipe => ({
            id: recipe.id_recetas,
            materiales: recipe.materiales,
            nombre: recipe.nombre_receta,
            cantidad: '1',
            detalle: recipe.notas_recetas
          }));
          setRecipes(mappedData); // Actualiza las recetas
          setFilteredRows(mappedData); // Inicializa las filas filtradas con todas las recetas
        } catch (error) {
          console.error('Error al obtener Recetas:', error);
        }
      }
    };

    fetchRecipes();
  }, [token]);

  // Filtrar las filas cada vez que cambia el texto de búsqueda
  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRows(filtered); // Actualiza las filas filtradas
  }, [searchText, recipes]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); // Actualiza el texto de búsqueda
  };

  const handleAddMaterialToRecipe = (material) => {
    setSelectedMaterials((prevMaterials) => {
      // Evitar duplicados
      if (prevMaterials.some((item) => item.id === material.id)) return prevMaterials;
      return [...prevMaterials, material];
    });
  };
  return (
    <Modal aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description" open={open} onClose={handleClose}>
      <Box sx={style}>
        <Button onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10, color: 'black', zIndex: 1 }}>
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
          Transformaciones de Productos
        </h2>

        <div className="Raya"></div>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2, width: '300px' }}
          />
          <Button 
            variant="contained" 
            color="amarillo" 
            startIcon={<SearchIcon />} 
            sx={{ width: 150, height: 55, marginLeft: 2, marginBottom: 2 }}
          >
            <h3 style={{ margin: 0 }}>Buscar</h3>
          </Button>

          <Button 
            variant="contained" 
            color="amarillo" 
            onClick={HandleModalOpen}
            sx={{
              width: 100, 
              height: 55, 
              marginRight: 6.5,
              marginBottom: 2, 
              marginLeft: 'auto' // Esto mueve el botón hacia la derecha
            }}
          >
            <h3  style={{ lineHeight: '0.8' }}>Añadir Receta</h3>
          </Button>
        </Box>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ height: 350, width: '100%' }}>
            <AnadirReceta 
              rows={filteredRows} 
              onClose={handleCloseModal} 
              onSelectMaterial={handleAddMaterialToRecipe} // Pasamos la función para agregar material
            />
          </Box>
        </Modal>

        <Box sx={{ height: 350, width: '100%' }}>
          <TablaRecipes rows={filteredRows} />
        </Box>
      </Box>
    </Modal>
  );
};

export default RecipeModal;
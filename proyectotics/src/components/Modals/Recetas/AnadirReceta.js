import React, { useState ,useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function AnadirReceta({ rows, onClose, material }) {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [openQuantityModal, setOpenQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [materialToAdd, setMaterialToAdd] = useState(null);
  const [materialDetails, setMaterialDetails] = useState([]);
  const [selectedBodega, setSelectedBodega] = useState('');
  const [loading, setLoading] = useState(false); // Definir setLoading
  const bodegas = [
    { id: 1, nombre: 'Bodega Central' },
    { id: 2, nombre: 'Bodega Norte' },
    { id: 3, nombre: 'Bodega Sur' },
  ];

  const handleSelectMaterial = (selectedMaterial) => {
    setMaterialToAdd(selectedMaterial);
    setOpenQuantityModal(true);
  };

  const handleBodegaChange = (e) => {
    setSelectedBodega(e.target.value);
  };

  const handleAddMaterialWithQuantity = () => {
    if (materialToAdd) {
      setSelectedMaterials((prev) => [
        ...prev,
        { ...materialToAdd, cantidad: quantity },
      ]);
      console.log(materialToAdd, quantity)
      setOpenQuantityModal(false);
      setQuantity(1); // Resetea la cantidad para la próxima selección
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: 1300,
    height: 700,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const quantityModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

  

  const columns = [
    { field: 'id_materiales', headerName: 'ID', width: 70 },
    { field: 'nombre_material', headerName: 'Nombre del Material', width: 200 },
    { field: 'cantidad', headerName: 'Cantidad', type: 'number', width: 100 },
    { field: 'descripcion_material', headerName: 'Detalle del Material', width: 300 },
    {
      field: 'select',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="negro"
          size="small"
          onClick={() => handleSelectMaterial(params.row)}
          style={{ float: 'right' }}
        >
          Agregar
        </Button>
      ),
    },
  ];

  const fetchMaterialDetails = async () => {
    setLoading(true); // Iniciar carga
    try {
      const token = localStorage.getItem('token'); // Obtener el token de almacenamiento local
      const response = await axios.get('http://localhost:8081/materiales', {
        headers: {
          Authorization: `Bearer ${token}`, // Adjuntar el token en el header
        },
      });
      
      console.log(response)

      const data = response.data.map((item) => ({
        id: item.id_materiales,
        id_materiales: item.id_materiales,
        nombre_material: item.nombre_material,
        codigo_material: item.codigo_material,
        descripcion_material: item.descripcion_material,
        tipo_material: item.tipo_material,
        precio_material: item.precio_material,
      }));

      console.log(data);
      setMaterialDetails(data);
    } catch (error) {
      console.error(`Error al obtener los materiales:`, error);
      setMaterialDetails([]);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };


  useEffect(() => {

    fetchMaterialDetails();
  }, []);                  

  const handleRemoveMaterial = (materialToRemove) => {
    setSelectedMaterials((prev) => prev.filter((material) => material.id !== materialToRemove.id));
  };

  const columns2 = [
    { field: 'id_materiales', headerName: 'ID', width: 70 },
    { field: 'nombre_material', headerName: 'Nombre del Material', width: 200 },
    { field: 'cantidad', headerName: 'Cantidad', type: 'number', width: 100 },
    { field: 'descripcion_material', headerName: 'Detalle del Material', width: 300 },
    {
      field: 'select',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="amarillo"
          size="small"
          onClick={() => handleRemoveMaterial(params.row)}
          style={{ float: 'right' }}
        >
          Quitar
        </Button>
      ),
    },
  ];

  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const [filteredRows, setFilteredRows] = useState(rows); // Estado para las filas filtradas
  // Filtra las filas basadas en searchText
  useEffect(() => {
    const filtered = materialDetails.filter((material) =>
      material.nombre_material.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRows(filtered); // Actualiza las filas filtradas
  }, [searchText, materialDetails]); // Dependencias: texto de búsqueda y materialDetails

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); // Actualiza el texto de búsqueda
  };


  const [recetaNombre, setRecetaNombre] = useState(''); // Estado para el nombre de la receta
  const [recetaDescripcion, setRecetaDescripcion] = useState('');
  const [isNombreValido, setIsNombreValido] = useState(true); // Estado para validar el nombre
  const [isRecetaCreada, setIsRecetaCreada] = useState(false); // Estado para habilitar el botón de crear receta


    // Validación de nombre (no repetir en la base de datos)
    const handleNombreChange = (event) => {
      const nombre = event.target.value;
      setRecetaNombre(nombre);
  
      // Verifica si el nombre ya existe en la base de datos (rows)
      const isNombreDuplicado = rows.some((row) => row.nombre.toLowerCase() === nombre.toLowerCase());
      setIsNombreValido(nombre && !isNombreDuplicado);
    };

    // Validación de nombre (no repetir en la base de datos)
    const handleDescripcionChange = (event) => {
      const nombre = event.target.value;
      setRecetaDescripcion(nombre);
  
      // Verifica si el nombre ya existe en la base de datos (rows)
      const isNombreDuplicado = rows.some((row) => row.nombre.toLowerCase() === nombre.toLowerCase());
      setIsNombreValido(nombre && !isNombreDuplicado);
    };
  
    // Lógica para habilitar el botón "Crear Receta"
    useEffect(() => {
      setIsRecetaCreada(isNombreValido && recetaNombre !== ''); // El botón solo se habilita si el nombre es válido
    }, [recetaNombre, isNombreValido]);

    const handleCrearReceta = async () => {
      try {
        // Preparar los datos para el envío
        const materiales = selectedMaterials.map((material) => ({
          codigo_material: material.codigo_material,
          cantidad: material.cantidad,
        }));
  
        const recetaData = {
          nombre_receta: recetaNombre,
          materiales: materiales,
          precio_producto_unitario: 150.0, // Esto debería ser dinámico según la receta, aquí solo es un ejemplo
          foto_producto: "https://example.com/images/receta.jpg", // Foto de ejemplo
          notas_recetas: recetaDescripcion,
          id_bodega: selectedBodega,
        };
  
        // Enviar la solicitud POST con los datos
        const token = localStorage.getItem('token'); // Obtener token desde localStorage
        const response = await axios.post('http://localhost:8081/recetas/crearReceta', recetaData, {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token de autenticación
          },
        });
  
        console.log('Receta creada:', response.data);
        onClose(); // Cerrar el modal después de crear la receta
      } catch (error) {
        console.error('Error al crear receta:', error);
      }
    };
    
  return ( 
    <Box sx={style}>
      <Button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
        <HighlightOffIcon style={{ color: '#b71c1c' }} />
      </Button>
      <h2 id="parent-modal-title" style={{ textAlign: 'left', marginTop: -20 }}>
        Creación De Recetas
      </h2>
      <div style={{ marginTop: -15 }} className="Raya"></div>

      <Box sx={{ marginTop: 3 }}>
      {/* Campo de nombre de la receta */}
      <TextField
        label="Nombre de la Receta"
        variant="outlined"
        value={recetaNombre}
        onChange={handleNombreChange}
        error={!isNombreValido}
        helperText={!isNombreValido && 'El nombre ya está en uso o es inválido'}
        sx={{ width: '300px', paddingBottom: '40px' }}
      />

      <h2 style={{ textAlign: 'center', marginTop: -80 }}>Lista De Materiales</h2>

      {/* Nueva sección para la búsqueda, descripción y selector de bodega */}
      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
        {/* Campo de búsqueda */}
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ marginBottom: 1, width: '300px' }}
        />

        {/* Campo de descripción */}
        <TextField
          label="Descripción"
          variant="outlined"
          value={recetaDescripcion}
          onChange={handleDescripcionChange}
          sx={{ marginBottom: 1, width: '300px' }}
        />

        {/* Selector de bodega */}
        <FormControl sx={{ marginBottom: 1, width: '300px' }}>
          <InputLabel id="select-bodega-label">Bodega</InputLabel>
          <Select
            labelId="select-bodega-label"
            value={selectedBodega}
            onChange={handleBodegaChange}
            label="Bodega"
          >
            <MenuItem value="">
              <em>Seleccionar Bodega</em>
            </MenuItem>
            {bodegas.map((bodega) => (
              <MenuItem key={bodega.id} value={bodega.id}>
                {bodega.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Botón para crear la receta */}
        <Button
          variant="contained"
          color="amarillo"
          disabled={!isRecetaCreada}
          onClick={handleCrearReceta}
          sx={{ height: 55, textAlign: 'center' }}
        >
          Crear Receta
        </Button>
      </Box>
    </Box>

      <Box style={{ flexGrow: 1, height: 200, overflow: 'auto' }}>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rowHeight={35}
        rows={filteredRows} 
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
      />

      </Box>

      {/* Línea divisora */}
      <div className="Raya" style={{ margin: '20px 0' }}></div>

      {/* Lista de materiales para la receta */}
      
      <h2 style={{ textAlign: 'center', marginTop: -20 }}>Lista De Materiales Para La Receta</h2>
      <Box style={{ flexGrow: 1, height: 200, overflow: 'auto' }}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rowHeight={35}
          rows={selectedMaterials}
          columns={columns2}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </Box>

      {/* Modal para ingresar la cantidad */}
      <Modal open={openQuantityModal} onClose={() => setOpenQuantityModal(false)}>
        <Box sx={quantityModalStyle}>
          <Typography variant="h6" component="h2">
            Ingresar Cantidad
          </Typography>
          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMaterialWithQuantity}
            sx={{ mt: 2 }}
          >
            Confirmar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default AnadirReceta;

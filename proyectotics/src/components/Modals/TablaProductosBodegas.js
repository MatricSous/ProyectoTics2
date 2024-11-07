import { Button, Modal, Box, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialRows = [
  { id: 1, codigo: "MA3345", material: "Tornillo Cruz 3mm", stock: 20, stockComp: 10 ,bodega: "Ventas", stockMax: 99, stockMin: 5, unidad: "UN"},
  { id: 2, codigo: "MAT7645", material: "Pintura Mate Blanca", stock: 5, stockComp: 10 , bodega: "Elaboracion", stockMax: 20, stockMin: 1, unidad: "LT" }
];





function TablaProductosBodegas() {
  
  const [rows, setRows] = useState(initialRows);  // Estado para las filas de la tabla
  const [openModal, setOpenModal] = useState(false);  // Estado para controlar el modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openAnadirModal, setOpenAnadirModal] = useState(false);  // Estado para controlar el modal de creación de bodega
  const [selectedId, setSelectedId] = useState(null);  // Estado para guardar el ID de la fila seleccionada
  const [selectedStock, setSelectedStock] = useState('');  // Estado para el valor de stock en el modal
  const [stockUnit, setStockUnit] = useState('');  // Estado para la unidad de medida
  const [searchText, setSearchText] = useState('');  // Estado para guardar el texto de búsqueda
  const [newBodega, setNewBodega] = useState('');  // Estado para el nombre de la nueva bodega
  const [errorMessage, setErrorMessage] = useState('');  // Estado para el mensaje de error si la bodega ya existe

  // Filtramos las filas según el texto de búsqueda
  const filteredRows = rows.filter(
    (row) =>
      row.bodega.toLowerCase().includes(searchText.toLowerCase()) ||
      row.codigo.toLowerCase().includes(searchText.toLowerCase())  // Modificado para permitir búsqueda por código también
  );

  //Control para la snackabar
  const [openSnackBar, setOpenSnackbar] = useState(false);

  const columns = [
    { 
      field: 'codigo', 
      headerName: 'Codigo', 
      flex: 1,  
      minWidth: 150, 
      maxWidth: 300 
    },
    { 
      field: 'material', 
      headerName: 'Material', 
      flex: 1,  
      minWidth: 150, 
      maxWidth: 300 
    },

    { 
      field: 'stockMin', 
      headerName: 'Stock Minimo', 
      flex: 1,  
      minWidth: 200, 
      maxWidth: 400 
    }, 
    { 
      field: 'stockMax', 
      headerName: 'Stock Maximo', 
      flex: 1,  
      minWidth: 200, 
      maxWidth: 400 
    }, 
    { 
      field: 'unidad', 
      headerName: 'Unidad', 
      flex: 1,  
      minWidth: 200, 
      maxWidth: 400 
    }, 
    { 
      field: 'anadir', 
      headerName: 'Añadir', 
      width: 150,  
      minWidth: 100, 
      maxWidth: 200, 
      align: 'center', 
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="amarillo"
          onClick={() => handleButtonClick(params.row.id)}
        >
          Modificar
        </Button>
      )
    },
  ];

  //Peticiones

  const token = localStorage.getItem('token');


// Función para obtener el Inventario cuando se abre el modal
useEffect(() => {
  if (token) {
      console.log("enviando get");
      axios.get('http://localhost:8081/inventarios/getInventario', {
          headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
          // Mapear cada elemento de la respuesta al formato deseado
          const mappedData = response.data.inventario.map(item => ({
              id: item.id,
              codigo: item.codigo,
              material: item.material,
              bodega: item.bodega,
              stock: item.stock,
              stockComp: item.stockComp,
              stockMax: item.stockMax,
              stockMin: item.stockMin,
              unidad: item.unidad
          }));

          // Actualizar el estado de initialRows con los datos mapeados
          setRows(mappedData);
      })
      .catch(error => console.error('Error al obtener Inventario:', error));
  }
}, [token]);  // Asegúrate de incluir `token` como dependencia para recargar si cambia




  const handleButtonClick = (id) => {
    const row = rows.find((r) => r.id === id);
    setSelectedId(id);  // Guardamos el ID de la fila
    setSelectedStock(row.stock);  // Establecemos el valor del número de stock
    setStockUnit(row.unidad);  // Establecemos la unidad de medida (si existe)
    setOpenModal(true);  // Abrimos el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);  // Cerramos el modal
  };
  const handleCloseAnadirModal = () => {
    setOpenAnadirModal(false);  // Cerramos el modal
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);  // Actualizamos el texto de búsqueda
  };

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);  // Actualizamos el valor del número de stock en el modal
  };

  const handleSaveStock = () => {
    // Actualizamos la fila con el nuevo stock, manteniendo la unidad de medida
    setRows(rows.map((row) =>
      row.id === selectedId ? { ...row, stock: `${selectedStock}` } : row
    ));
    handleCloseModal();  // Cerramos el modal
  };

  const toggleSnackbar = () => {
    setOpenSnackbar((prevValue) => !prevValue);
  };

  const handleCreateBodegaClick = () => {
    setOpenCreateModal(true);  // Abrimos el modal para crear una nueva bodega
  };

  const handleAnadirProductoClick = () => {
    setOpenAnadirModal(true);  // Abrimos el modal para crear una nueva bodega
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);  // Cerramos el modal de creación de bodega
    setNewBodega('');  // Reseteamos el valor del campo de nueva bodega
    setErrorMessage('');  // Limpiamos el mensaje de error
  };

  const handleNewBodegaChange = (event) => {
    setNewBodega(event.target.value);  // Actualizamos el nombre de la nueva bodega
  };

  const handleSaveNewBodega = () => {
    // Verificamos si la bodega ya existe
    if (rows.some((row) => row.bodega.toLowerCase() === newBodega.toLowerCase())) {
      setErrorMessage('¡La bodega ya existe!');  // Mostramos el mensaje de error
      return;
    }

    axios.post('http://localhost:8081/bodegas/agregarBodegas', 
      { newBodega }, // Datos enviados en el cuerpo de la solicitud
      {
          headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(response => {

      handleCloseCreateModal();

        toggleSnackbar();
    })
    .catch(error => setErrorMessage('No se pudo agregar la bodega'));
      


  };

  return (
    <div>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>

      <TextField
        label="Buscar"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        sx={{ marginTop: 1, width: 250 }}
      />

      {/* Contenedor para agrupar los botones a la derecha */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="azul"
          sx={{ marginTop: 1 }}
          onClick={handleCreateBodegaClick}
        >
          Crear Bodega
        </Button>
        <Button
          variant="contained"
          color="azul"
          sx={{ marginTop: 1 }}
          onClick={handleAnadirProductoClick}
        >
          Añadir Producto a Bodega
        </Button>
      </Box>
    </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={toggleSnackbar}

      >
        <Alert

          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Bodega Agregada Exitosamente!
        </Alert>
      </Snackbar>


      <DataGrid
        headerHeight={0}
        rowHeight={50}
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection={false}
        disableSelectionOnClick={true}
        rowSelection={false}
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#093d77',  // Color de fondo de la cabecera
            color: '#fff',  // Color de texto de la cabecera
          },
          '& .MuiDataGrid-cell': {
            backgroundColor: '#f5f5f5',  // Color de fondo de las celdas
            color: '#000',  // Color del texto de las celdas
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#d6e3f1',  // Color de fila al pasar el ratón
          },
          '& .MuiDataGrid-selection': {
            backgroundColor: 'rgba(9, 61, 119, 0.5)',  // Color de selección de filas
          }
        }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Aplicar las traducciones al DataGrid
      />

      {/* Modal de creación de nueva bodega */}
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 800, bgcolor: 'white', boxShadow: 24, padding: 4, borderRadius: 3
        }}>
          <h2 id="modal-title">Crear Nueva Bodega</h2>
          <TextField
            label="Nombre de la Bodega"
            variant="outlined"
            value={newBodega}
            onChange={handleNewBodegaChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {errorMessage && <Typography color="error" sx={{ marginBottom: 2 }}>{errorMessage}</Typography>}

          <Button onClick={handleSaveNewBodega} variant="contained" color="azul" sx={{ marginRight: 1 }}>
            Guardar
          </Button>
          <Button onClick={handleCloseCreateModal} variant="contained" color="negro">
            Cerrar
          </Button>
        </Box>
      </Modal>

      {/* Modal para modificar stock */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 800, bgcolor: 'white', boxShadow: 24, padding: 4, borderRadius: 3
        }}>
          <h2 id="modal-title">Modificar Stock</h2>
          <p id="modal-description">Actualmente, el stock es {selectedStock} {stockUnit}. Ingresa el nuevo valor de stock:</p>

          {/* Campo de entrada para modificar solo el número de stock */}
          <TextField
            label="Nuevo Stock"
            variant="outlined"
            value={selectedStock}
            onChange={handleStockChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            type="number"  // Asegura que solo se pueda ingresar números
          />

          {/* Botones de acción */}
          <Button onClick={handleSaveStock} variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Guardar
          </Button>
          <Button onClick={handleCloseModal} variant="contained" color="secondary">
            Cerrar
          </Button>
        </Box>

      </Modal>
      {/* Modal para anadir un producto a bodega */}
      <Modal
        open={openAnadirModal}
        onClose={handleCloseAnadirModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 800, bgcolor: 'white', boxShadow: 24, padding: 4, borderRadius: 3
        }}>
          <h2 id="modal-title">Anadir Producto</h2>
          {/* Campo de entrada para modificar solo el número de stock */}
          <TextField
            label="Nuevo Stock"
            variant="outlined"
            value={selectedStock}
            onChange={handleStockChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            type="number"  // Asegura que solo se pueda ingresar números
          />

          {/* Botones de acción */}
          <Button onClick={handleSaveStock} variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Guardar
          </Button>
          <Button onClick={handleCloseModal} variant="contained" color="secondary">
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default TablaProductosBodegas;

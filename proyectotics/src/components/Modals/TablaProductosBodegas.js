import { Button, Modal, Box, TextField, Typography, Snackbar, Alert,  Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialRows = [
  { id: 1, codigo: "MA3345", material: "Tornillo Cruz 3mm", stock: 20, stockComp: 10 ,bodega: "Ventas", stockMax: 99, stockMin: 5, unidad: "UN"},
  { id: 2, codigo: "MAT7645", material: "Pintura Mate Blanca", stock: 5, stockComp: 10 , bodega: "Elaboracion", stockMax: 20, stockMin: 1, unidad: "LT" }
];

const initialBodegas = [
  { id: 1, id_bodega: 1, bodega: "Ventas"},
  { id: 2, id_bodega: 2, bodega: "Ventas2"}
];






function TablaProductosBodegas() {
  
  const [rows, setRows] = useState(initialRows);  // Estado para las filas de la tabla
  const [bodegas, setBodegas] = useState(initialBodegas)
  const [openModal, setOpenModal] = useState(false);  // Estado para controlar el modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openAnadirModal, setOpenAnadirModal] = useState(false);  // Estado para controlar el modal de creación de bodega
  const [selectedId, setSelectedId] = useState(null);  // Estado para guardar el ID de la fila seleccionada
  const [selectedStock, setSelectedStock] = useState(0);  // Estado para el valor de stock en el modal
  const [stockUnit, setStockUnit] = useState('');  // Estado para la unidad de medida
  const [searchText, setSearchText] = useState('');  // Estado para guardar el texto de búsqueda
  const [newBodega, setNewBodega] = useState('');  // Estado para el nombre de la nueva bodega
  const [errorMessage, setErrorMessage] = useState('');  // Estado para el mensaje de error si la bodega ya existe
  const [bodegaElegida, setBodegaElegida] = useState('');
  const [valorAgregar, setValorAgregar] = useState()

  const filteredRows = rows.filter(
    (row) =>
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
      field: 'categoria', 
      headerName: 'Categoria', 
      flex: 1,  
      minWidth: 150, 
      maxWidth: 300 
    },
    { 
      field: 'descripcion', 
      headerName: 'Descripcion', 
      flex: 1,  
      minWidth: 150, 
      maxWidth: 300 
    },

    { 
      field: 'unidad', 
      headerName: 'Unidad', 
      flex: 1,  
      minWidth: 200, 
      maxWidth: 400 
    }, 

    { 
      field: 'valor', 
      headerName: 'Valor', 
      flex: 1,  
      minWidth: 200, 
      maxWidth: 400 
    }, 
    { 
      field: 'moneda', 
      headerName: 'Moneda', 
      flex: 1,  
      minWidth: 200, 
      maxWidth: 400 
    }, 

    { 
      field: 'anadir', 
      headerName: 'Seleccionar', 
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
          Añadir
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
      axios.get('http://localhost:8081/materiales/verMateriales', {
          headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
          
          // Mapear cada elemento de la respuesta al formato deseado
          console.log(response.data)
          const mappedData = response.data.materiales.map((item, index) => ({
            id: item.id_materiales,  // id incremental empezando desde 1
            material: item.nombre_material,
            codigo: item.codigo_material,
            descripcion: item.descripcion_material,
            categoria: item.tipo_material,
            unidad: item.unidad_medida,
            stockMin: item.stockMin,
            moneda: item.moneda,
            valor: item.valor_iva
        
        }));

          console.log(mappedData)

          // Actualizar el estado de initialRows con los datos mapeados
          setRows(mappedData);
      })
      .catch(error => console.error('Error al obtener Inventario:', error));

      axios.get('http://localhost:8081/bodegas/getBodegas', {
          headers: { Authorization: `Bearer ${token}` }
      })

      .then(response => {
          
        // Mapear cada elemento de la respuesta al formato deseado
        console.log(response.data)
        const mappedData = response.data.bodegas.map((item, index) => ({
          id: index + 1,  // id incremental empezando desde 1
          id_bodega: item.id_bodega,
          nombre: item.nombre_bodega
      
      }));

        console.log(mappedData)

        // Actualizar el estado de initialRows con los datos mapeados
        setBodegas(mappedData);
      })
      .catch(error => console.error('Error al obtener Bodegas:', error));

  }
}, [token]);  // Asegúrate de incluir `token` como dependencia para recargar si cambia




  const handleButtonClick = (id) => {
    const row = rows.find((r) => r.id === id);
    setSelectedId(id);  // Guardamos el ID de la fila
    setSelectedStock(row.material);  // Establecemos el valor del número de stock
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
    setSelectedStock(event.target.value);  // Actualizamos el texto de búsqueda
  };

  const handleValorAgregarChange = (event) => {
    setValorAgregar(event.target.value);  // Actualizamos el valor del número de stock en el modal
  };

  const handleSaveStock = async () => {
    try {
      // Realizamos la petición POST con axios, enviando el id y el nuevo stock
      console.log(selectedId, " ", bodegaElegida, " ", selectedStock)
      await axios.post('http://localhost:8081/bodegas/bodegasMateriales', {
        id_material: selectedId,
        id_bodega: bodegaElegida,
        cantidad: valorAgregar,
      }, {
        headers: { Authorization: `Bearer ${token}` }
    });

      console.log(selectedId, " ", bodegaElegida, " ", selectedStock)
  
      // Si la petición es exitosa, actualizamos la fila en el estado
      setRows(rows.map((row) =>
        row.id === selectedId ? { ...row, stock: `${selectedStock}` } : row
      ));
  
      // Cerramos el modal
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
    }
  };

  const handleWarehouseChange = (event) => {
    setBodegaElegida(event.target.value); // Asume que tienes un estado para la bodega seleccionada
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

      <Box sx={{marginTop: 2}}>
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
      </Box>
      {/* Modal de creación de nueva bodega */}
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 1000, bgcolor: 'white', boxShadow: 24, padding: 4, borderRadius: 3
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
    <h2 id="modal-title">Añadir a bodega</h2>
    <p id="modal-description">Agregando {valorAgregar} {selectedStock}. Ingrese la cantidad ({stockUnit}):</p>

    {/* Campo de entrada para modificar solo el número de stock */}
    <TextField
      label="Cantidad a agregar"
      variant="outlined"
      value={valorAgregar}
      onChange={handleValorAgregarChange}
      fullWidth
      sx={{ marginBottom: 2 }}
      type="number"
    />

    {/* Selector para la bodega */}
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
      <InputLabel id="warehouse-label">Seleccionar Bodega</InputLabel>
      <Select
        labelId="warehouse-label"
        id="warehouse-select"
        value={bodegaElegida}
        onChange={handleWarehouseChange}
        label="Seleccionar Bodega"
      >
        {bodegas.map((bodega) => (
          <MenuItem key={bodega.id} value={bodega.id_bodega}>
            {bodega.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Botones de acción */}
    <Button onClick={handleSaveStock} variant="contained" color="azul" sx={{ marginRight: 1 }}>
      Guardar
    </Button>
    <Button onClick={handleCloseModal} variant="contained" color="amarillo">
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

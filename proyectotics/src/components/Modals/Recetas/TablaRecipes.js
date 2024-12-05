import { useState, useEffect} from 'react'; // Importa useState
import { Button, Modal, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import ModalVermas from './ModalVermas'; // Asegúrate de que la ruta sea correcta

function TablaRecipes({ rows }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: 600,
    height: 600,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };
  

  const [openModal, setOpenModal] = useState(false); // Estado para controlar si el modal está abierto
  const [selectedMaterial, setSelectedMaterial] = useState(null); // Estado para almacenar la fila seleccionada

  // Función que maneja el clic en "Ver más"
  const handleVerMas = (row) => {
    setSelectedMaterial(row); // Establece la fila seleccionada
    setOpenModal(true); // Abre el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false); // Cierra el modal
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'left', align: 'left' },
    { field: 'nombre', headerName: 'Nombre del Material', width: 200, headerAlign: 'left', align: 'left' },
    { field: 'cantidad', headerName: 'Cantidad', type: 'number', width: 100, headerAlign: 'left', align: 'left' },
    {
      field: 'detalle',
      headerName: 'Detalle del Material',
      width: 450, 
      headerAlign: 'left', 
      align: 'left', 
    },
    {
      field: 'verMas', // Campo para el botón "Ver más"
      headerName: 'Ver Receta',
      headerAlign: 'center',
      width: 150,
      renderCell: (params) => (
        <Button
          style={{ marginLeft: 10 }}
          variant="contained"
          color="negro"
          onClick={() => handleVerMas(params.row)} // Acción al hacer clic
        >
          <MoreHorizIcon /> Ver más
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rowHeight={50}
        rows={rows}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
      />

      {/* Modal de "Ver más" */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <ModalVermas material={selectedMaterial} onClose={handleCloseModal} />
        </Box>
      </Modal>
    </div>
  );
}



export default TablaRecipes;

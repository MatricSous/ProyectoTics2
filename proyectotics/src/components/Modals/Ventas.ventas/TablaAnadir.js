import { useState, useEffect} from 'react'; // Importa useState
import { Button, Modal, Box, Tooltip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import ModalVermas from './ModalVermas'; // Asegúrate de que la ruta sea correcta
import EditIcon from '@mui/icons-material/Edit';
import EditarVenta from './EditarVenta';

function TablaAnadir({ cotizacion }) {
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

  const rows = [
    { id: 1, nombre: 'Acero Inoxidable', cantidad: 120, detalle: 'Material resistente a la corrosión.', precio: 12000 },
    { id: 2, nombre: 'Tornillo Phillips', cantidad: 500, detalle: 'Tornillos de alta calidad para proyectos diversos.', precio: 50000 },
    { id: 3, nombre: 'Madera Contrachapada', cantidad: 50, detalle: 'Tablas ideales para muebles y construcciones.', precio: 5000 },
    { id: 4, nombre: 'Cemento Portland', cantidad: 200, detalle: 'Cemento de uso general para construcción.', precio: 20000 },
    { id: 5, nombre: 'Pintura Acrílica', cantidad: 80, detalle: 'Pintura resistente al agua, ideal para exteriores.', precio: 8000 },
    { id: 6, nombre: 'Cables de Cobre', cantidad: 300, detalle: 'Cables conductores para proyectos eléctricos.', precio: 30000 },
    { id: 7, nombre: 'Láminas de Aluminio', cantidad: 40, detalle: 'Material liviano y resistente.', precio: 4000 },
    { id: 8, nombre: 'Clavos de Hierro', cantidad: 1000, detalle: 'Clavos multiusos para construcción.', precio: 100000 },
    { id: 9, nombre: 'Vidrio Templado', cantidad: 25, detalle: 'Cristales resistentes a impactos y altas temperaturas.', precio: 2500 },
    { id: 10, nombre: 'Tubería PVC', cantidad: 60, detalle: 'Tuberías versátiles para plomería.', precio: 6000 }
  ];
  
    
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'left', align: 'left' },
    { field: 'nombre', headerName: 'Nombre del Material', width: 200, headerAlign: 'left', align: 'left' },
    { field: 'cantidad', headerName: 'Cantidad', type: 'number', width: 100, headerAlign: 'left', align: 'left' },
    {
      field: 'detalle',
      headerName: 'Detalle del Material',
      width: 300, 
      headerAlign: 'left', 
      align: 'left', 
    },
    {
        field: 'precio',
        headerName: 'Precio',
        width: 250, 
        headerAlign: 'left', 
        align: 'left',
        renderCell: (params) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%' }}>
            {/* Precio mostrado como texto */}
            <span>${params.row.precio}</span>
            
            <Tooltip
            placement="right"
            title="Editar">
               
            <EditIcon 
              style={{ marginLeft: 10 }}
              variant="contained"
              color="negro"
              onClick={() => handleVerMas(params.row)} // Acción al hacer clic
              sx={{'&:hover': {
                                color: '#daa520',
                                bgcolor: 'transparent'
                            },}}
            >
            </EditIcon>
            </Tooltip>
            </div>
          ), 
      },
    
  ];


  return (
    <div style={{ height: 200, width: '100%' }}>
      <DataGrid
       headerHeight={50}
       rowHeight={25}
       rows={rows}
       columns={columns}
       checkboxSelection={false}
       disableSelectionOnClick
       disableColumnSelector
       pagination={false}
       hideFooter={true}
       sx={{
           "& ::-webkit-scrollbar": {
             width: "6px"
           },
           "& ::-webkit-scrollbar-track": {
             backgroundColor: "#f5f5f5"
           },
           "& ::-webkit-scrollbar-thumb": {
             borderRadius: "10px",
             boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
             backgroundColor: "#f5f5f5"
           },
           "& .MuiDataGrid-iconButtonContainer": {
               color: "#fff",
           },
           "& .MuiDataGrid-sortIcon": {
               color: "#fff",
           },
           "& .MuiDataGrid-menuIcon": {
               color: "#fff",
           },
           "& .MuiDataGrid-menuIconButton": {
               color: "#fff",
           },
           bgcolor: '#e5e5e5',
           '& .MuiDataGrid-columnHeader': {
               backgroundColor: '#2b2b2b',
               color: '#daa520',
               fontSize: '1rem',
               textAlign: 'left',
               borderRight: 'none',
           },
           '& .MuiDataGrid-cell': {
               backgroundColor: '#e5e5e5',
               color: '#000',
               paddingLeft: '8px',
               fontSize: '0.9rem',
           },
           '& .MuiDataGrid-row:hover': {
               backgroundColor: '#d6e3f1',
           },
           '& .MuiDataGrid-row': {
               borderBottom: '1px solid #e0e0e0',
           },
           '& .MuiDataGrid-columnSeparator': {
               display: 'none',
           },
       }}
       localeText={esES.components.MuiDataGrid.defaultProps.localeText}
   />
      

      {/* Modal de "Ver más" */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box>
          <EditarVenta material={selectedMaterial} onClose={handleCloseModal} />
        </Box>
      </Modal>
    </div>
  );
}

export default TablaAnadir;

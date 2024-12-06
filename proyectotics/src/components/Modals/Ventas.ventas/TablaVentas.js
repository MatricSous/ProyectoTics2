// TablaVentas.js
import { useState, useEffect } from 'react';
import { Button, Modal, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import ModalVermas from './ModalVermas';

function TablaVentas({ filterText }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        maxWidth: 800,
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

    const [openModal, setOpenModal] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    // Generar datos aleatorios
    const cotizaciones = [
        { 
            id: 1, 
            nombre: 'Juan Pérez', 
            precio: 26500, 
            detalle: '2024-12-06 10:30 AM' 
        },
        { 
            id: 2, 
            nombre: 'Ana Martínez', 
            precio: 38000, 
            detalle: '2024-12-06 11:00 AM' 
        },
        { 
            id: 3, 
            nombre: 'Carlos García', 
            precio: 57000, 
            detalle: '2024-12-06 11:30 AM' 
        },
        { 
            id: 4, 
            nombre: 'María López', 
            precio: 22000, 
            detalle: '2024-12-06 12:00 PM' 
        },
        { 
            id: 5, 
            nombre: 'Luis Ramírez', 
            precio: 30000, 
            detalle: '2024-12-06 12:30 PM' 
        },
        { 
            id: 6, 
            nombre: 'Pedro González', 
            precio: 31500, 
            detalle: '2024-12-06 01:00 PM' 
        },
        { 
            id: 7, 
            nombre: 'Elena Pérez', 
            precio: 42000, 
            detalle: '2024-12-06 01:30 PM' 
        },
        { 
            id: 8, 
            nombre: 'Jorge Martínez', 
            precio: 29500, 
            detalle: '2024-12-06 02:00 PM' 
        },
        { 
            id: 9, 
            nombre: 'Sofía Herrera', 
            precio: 25000, 
            detalle: '2024-12-06 02:30 PM' 
        },
        { 
            id: 10, 
            nombre: 'Ricardo Sánchez', 
            precio: 33000, 
            detalle: '2024-12-06 03:00 PM' 
        }
        ,
        { 
            id: 11, 
            nombre: 'Benjamín Cofré', 
            precio: 61250, 
            detalle: '2024-12-07 13:04 PM' 
        }
    ];
    

    const [rows, setRows] = useState(cotizaciones);

    const handleVerMas = (row) => {
        setSelectedMaterial(row);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const columns = [
        { field: 'id', headerName: 'Código Venta', width: 150, headerAlign: 'left', align: 'left' },
        { field: 'nombre', headerName: 'Nombre del Cliente', width: 200, headerAlign: 'left', align: 'left' },
        { field: 'precio', headerName: 'Precio', type: 'number', width: 100, headerAlign: 'left', align: 'left' },
        {
            field: 'detalle',
            headerName: 'Fecha y Hora',
            width: 300,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'verMas',
            headerName: 'Ver Detalles',
            headerAlign: 'center',
            
            flex: 1,
            
            width: 170,
            renderCell: (params) => (
                <Button
                    style={{ marginLeft: 24 }}
                    variant="contained"
                    color="negro"
                    onClick={() => handleVerMas(params.row)}
                >
                    <MoreHorizIcon /> Ver más
                </Button>
            ),
        },
    ];

    // Filtrar filas según el texto de búsqueda
    const filteredRows = rows.filter((row) =>
        row.nombre.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div style={{ height: 350, width: '100%' }}>
            <DataGrid
                headerHeight={50}
                rowHeight={50}
                rows={filteredRows}
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

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={style}>
                    <ModalVermas material={selectedMaterial} onClose={handleCloseModal} />
                </Box>
            </Modal>
        </div>
    );
}

export default TablaVentas;

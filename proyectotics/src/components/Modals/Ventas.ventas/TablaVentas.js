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
    const generateRows = () => {
        return Array.from({ length: 10 }, (_, index) => ({
            id: index + 1,
            nombre: `Cliente ${index + 1}`,
            precio: Math.floor(Math.random() * 1000) + 100,
            detalle: `2023-11-10 10:${index}0`,
        }));
    };

    const [rows, setRows] = useState(generateRows());

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

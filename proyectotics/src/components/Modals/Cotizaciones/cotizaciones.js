import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid2, 
    Button, 
    Box, 
    Fab, 
    Modal, 
    styled, 
    alpha, 
    InputBase,
    Paper,
    Toolbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import logo from '../../../images/LOGOrial.png'; // Ajusta la ruta de tu logo
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CrearCotizacion from './crearcotizacion';
import DetailCotizacion from './detailcotizacion';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#e5e5e5',
    border: '3px solid #093d77',
    boxShadow: 24,
    borderRadius: 3,
    pt: 2,
    px: 4,
    pb: 3,
};

//Barra de búsqueda
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: '#2b2b2b',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: '2px solid #2b2b2b',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
//Barra de búsqueda

export default function NestedModalCotizaciones({open, handleClose}) {
    //Arreglos falsos
    const cotizaciones = [
        {id: 1, numero: 19, fecha_cotizacion: '12-09-2023 10:00:00', id_cliente: 3, id_usuario: 2, productos: [{id_producto: '1', cantidad: 3, precio_producto: 735}, {id_producto: '2', cantidad: 2, precio_producto: 298}], forma_pago: 'tarjeta'},
        {id: 2, numero: 22, fecha_cotizacion: '13-09-2023 15:00:00', id_cliente: 3, id_usuario: 2, productos: [{id_producto: '1', cantidad: 6, precio_producto: 2834}, {id_producto: '2', cantidad: 45, precio_producto: 2986}], forma_pago: 'crédito'},

    ];

    const materiales = [
        {id: 1, codigo: "abc1", nombre_material: "Torinillo1", categoria_material: "Tornillos", valor: 234, moneda: 'CLP'},
        {id: 2, codigo: "abc2", nombre_material: "Torinillo2", categoria_material: "Tornillos", valor: 364, moneda: 'USD'},
    ];

    const productos = [
        {id: 1, nombre_producto: 'Mueble', materiales:[{id_material: 1, cantidad: 3}, {id_material: 2, cantidad: 6}], precio_producto: 9876, foto_producto: logo, notas_recetas: 'ajkshhjsdvchsdjsdbcsjhcb sdjkcbhsdjhcsbdjkcs akjhbdsjbfshjkdlas kasjbdsjbhhjsd'},
        {id: 2, nombre_producto: 'Mueble2', materiales:[{id_material: 1, cantidad: 8}, {id_material: 2, cantidad: 23}], precio_producto: 27847, foto_producto: logo, notas_recetas: 'ajkshhjsdvchsdjsdbcsjhcb sdjkcbhsdjhcsbdjkcs akjhbdsjbfshjkdlas kasjbdsjbhhjsd'}
    ];

    const clientes = [
        {id: 3, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa', apellido_cliente: 'aaaaaaaaaa', telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'}
    ];

    const usuarios= [
        {id: 2, rut_usuario: '12345678-9', nombre_usuario: 'bbbbbbbbb', apellido_usuario: 'bbbbbbbbb', telefono_usuario: 912345678, correo_usuario:'abcd@abcd.cl', direccion_usuario: 'bbbbbbb 1234, bbbbbb'}
    ];

    // Extraer datos de los arreglos
    const cotizacionesFinales = cotizaciones.map(cot => {
        // Busca nombres de los materiales relacionados en cada producto de la cotización
        const productosDetalles = cot.productos.map((prod) => ({
            ...prod,
            nombre_producto: productos.find(producto => producto.id === parseInt(prod.id_producto))?.nombre_producto || 'Producto Desconocido',
            precio_producto: productos.find(producto => producto.id === parseInt(prod.id_producto))?.precio_producto || 0,
            total_producto: prod.cantidad * prod.precio_producto,
            nombres_materiales: prod.materiales
                ? prod.materiales.map(mat => 
                    materiales.find(material => material.id === parseInt(mat.id_material))?.nombre_material || 'Material Desconocido'
                  ).join(', ')
                : 'Material Desconocido',
            precio_materiales: prod.materiales
            ? prod.materiales.map(mat => 
                materiales.find(material => material.id === parseInt(mat.id_material))?.valor || 'Precio Desconocido'
              ).join(', ')
            : 'Material Desconocido', 
            moneda_materiales: prod.materiales
            ? prod.materiales.map(mat => 
                materiales.find(material => material.id === parseInt(mat.id_material))?.moneda || ''
              ).join(', ')
            : 'Material Desconocido'             
        }));

        const precioCotizacion = productosDetalles.reduce((total, prod) => total + prod.total_producto, 0);

        return{
            ...cot,
            numero_cotizacion: cot.numero,
            nombre_cliente: clientes.find(cliente => cliente.id === cot.id_cliente)?.nombre_cliente || 'Cliente Desconocido',
            apellido_cliente: clientes.find(cliente => cliente.id === cot.id_cliente)?.apellido_cliente || '',
            cliente: `${clientes.find(cliente => cliente.id === cot.id_cliente)?.nombre_cliente || 'Cliente Desconocido'} ${clientes.find(cliente => cliente.id === cot.id_cliente)?.apellido_cliente || ''}`,
            nombre_usuario: usuarios.find(usuario => usuario.id === cot.id_usuario)?.nombre_usuario || 'Usuario Desconocido',
            apellido_usuario: usuarios.find(usuario => usuario.id === cot.id_usuario)?.apellido_usuario || 'Usuario Desconocido',
            usuario: `${usuarios.find(usuario => usuario.id === cot.id_usuario)?.nombre_usuario || 'Usuario Desconocido'} ${usuarios.find(usuario => usuario.id === cot.id_usuario)?.apellido_usuario || ''}`,
            productos: productosDetalles,
            precioCotizacion
        };
    });

    const [cotizacionSelect, setCotizacionSelect] = useState('');

    const [childOpen, setChildOpen] = React.useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => {
        setChildOpen(false);
        setCotizacionSelect('');
    };

    const [detailOpen, setDetailOpen] = React.useState(false);
    const handleDetailOpen = (cotizacionSelect) => {
        setCotizacionSelect(cotizacionSelect);
        setDetailOpen(true);
    };
    const handleDetailClose = () => setDetailOpen(false);

    const columns = [
        { 
            field: 'numero_cotizacion', 
            headerName: 'N°', 
            width: 60,
            renderCell: (params) => (
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'left', 
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                    height: '100%',
                    lineHeight: '1.2'
                }}>
                    {params.value}
                </div>
            )
        },
        { 
            field: 'fecha_cotizacion', 
            headerName: 'Fecha/Hora', 
            width: 103,
            renderCell: (params) => (
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'left', 
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                    height: '100%',
                    lineHeight: '1.2'
                }}>
                    {params.value}
                </div>
            )
        },
        {
        field: 'cliente', 
        headerName: 'Nombre Cliente', 
        width: 180,
        renderCell: (params) => (
            <div style={{ 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'left', 
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                textAlign: 'center',
                height: '100%',
                lineHeight: '1.2'
            }}>
                {params.value}
            </div>
        )
    },
    {            
        field: 'usuario', 
        headerName: 'Encargado', 
        width: 180,
        renderCell: (params) => (
            <div style={{ 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'left', 
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                textAlign: 'center',
                height: '100%',
                lineHeight: '1.2'
            }}>
                {params.value}
            </div>
        )
    },
    {            
        field: 'precioCotizacion', 
        headerName: 'Total', 
        width: 100,
        renderCell: (params) => (
            <div style={{ 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'left', 
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                textAlign: 'center',
                height: '100%',
                lineHeight: '1.2'
            }}>
                {params.value}
            </div>
        )
    },
    {            
        field: 'forma_pago', 
        headerName: 'Forma de pago', 
        width: 135,
        renderCell: (params) => (
            <div style={{ 
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'left', 
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                textAlign: 'center',
                height: '100%',
                lineHeight: '1.2'
            }}>
                {params.value}
            </div>
        )
    },
    { 
        field: 'vermas', 
        headerName: 'Ver más', 
        width: 120, 
        renderCell: (params) => (
            <Fab
                aria-label="comment"
                size="small"
                variant="extended"
                onClick={(event) => {
                    event.stopPropagation();
                    handleDetailOpen(params.row);
                }}
                color="azulamarillo"
                sx={{fontSize: '12px', zIndex: 1 }}
            >
                <MoreHorizIcon /> Ver más
            </Fab>
        ) 
    }
    ];
   
    const [busqueda, setBusqueda] = useState('');
    const cotizacionesFiltradas = cotizacionesFinales.filter(
        (cotizacion) => 
            cotizacion.fecha_cotizacion.toLowerCase().includes(busqueda.toLowerCase()) || 
            cotizacion.materiales.toLowerCase().includes(busqueda.toLowerCase()) ||
            cotizacion.precio_producto.toLowerCase().includes(busqueda.toLowerCase()) ||
            cotizacion.notas_recetas.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
    };

    //variables para crear cotización
   
    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style,
                width: { xs: '90%', sm: '80%', md: '68%', lg: '62.45%' },
                maxHeight: '90vh', // Limita la altura
                overflowY: 'auto', // Agrega scroll en caso de contenido extenso
                overflowX: 'auto'
            }}>
                <Grid2 container alignItems="center" justifyContent="space-between">
                    <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                        <h2 id="parent-modal-title">Cotizaciones</h2>
                    </Grid2>

                    <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                        <Button onClick={handleClose}>
                            <HighlightOffIcon style={{color: '#b71c1c'}}/>
                        </Button>
                    </Grid2>
                </Grid2>

                <Grid2 container alignItems="center" justifyContent="space-between">
                    <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                        <Fab color="amarilloamarillo" aria-label="add" variant="extended" onClick={handleChildOpen}>
                            <AddIcon/>Crear
                        </Fab>
                    </Grid2>

                    <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                        <Toolbar>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Buscar…"
                                        value={busqueda}
                                        onChange={handleChangeBusqueda}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Toolbar>
                    </Grid2>
                </Grid2>

                <Box
                    sx={{ marginTop:2, height: 400, maxWidth: '100%', bgcolor: '#e5e5e5' }}
                >
                    <Paper style={{  marginTop:10, height: 420, width: '100%' }} elevation={0}>
                        <DataGrid
                            headerHeight={50}
                            rowHeight={50}
                            rows={cotizacionesFiltradas} 
                            columns={columns.map((column) => ({
                                ...column,
                                headerAlign: 'left',  
                                align: 'left',       
                                width: column.width   
                            }))}
                            checkboxSelection={false}
                            disableSelectionOnClick
                            disableColumnSelector 
                            hideFooter={true}  
                            sx={{
                                bgcolor: '#e5e5e5',
                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: '#093d77', 
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
                                backgroundColor: '#d6e3f1'  
                            },
                            '& .MuiDataGrid-row': {
                                borderBottom: '1px solid #e0e0e0' 
                            },
                            '& .MuiDataGrid-columnSeparator': {
                                display: 'none', 
                            },
                            }}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText} 
                        />
                    </Paper>
                </Box>
                <CrearCotizacion open={childOpen} handleClose={handleChildClose} />
                <DetailCotizacion open={detailOpen} handleClose={handleDetailClose} cotizacionSelect={cotizacionSelect}/>
            </Box>
        </Modal>
        </div>
  );
}
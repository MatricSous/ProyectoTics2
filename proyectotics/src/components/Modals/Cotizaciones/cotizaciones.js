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
    Toolbar
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
        { 
          id: 1, 
          numero: 1, 
          fecha_cotizacion: '01-12-2023 10:00:00', 
          id_cliente: 1, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 15, precio_producto: 20000 },
            { id_producto: '2', cantidad: 500, precio_producto: 1500 },
            { id_producto: '3', cantidad: 12, precio_producto: 5000 }
          ], 
          forma_pago: 'efectivo' 
        },
        { 
          id: 2, 
          numero: 2, 
          fecha_cotizacion: '02-12-2023 11:00:00', 
          id_cliente: 2, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 10, precio_producto: 25000 },
            { id_producto: '2', cantidad: 200, precio_producto: 3000 },
            { id_producto: '3', cantidad: 5, precio_producto: 10000 }
          ], 
          forma_pago: 'tarjeta' 
        },
        { 
          id: 3, 
          numero: 3, 
          fecha_cotizacion: '03-12-2023 12:00:00', 
          id_cliente: 3, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 20, precio_producto: 40000 },
            { id_producto: '2', cantidad: 4, precio_producto: 15000 },
            { id_producto: '3', cantidad: 300, precio_producto: 2000 }
          ], 
          forma_pago: 'transferencia' 
        },
        { 
          id: 4, 
          numero: 4, 
          fecha_cotizacion: '04-12-2023 13:00:00', 
          id_cliente: 4, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 25, precio_producto: 15000 },
            { id_producto: '2', cantidad: 400, precio_producto: 2000 },
            { id_producto: '3', cantidad: 5, precio_producto: 5000 }
          ], 
          forma_pago: 'crédito' 
        },
        { 
          id: 5, 
          numero: 5, 
          fecha_cotizacion: '05-12-2023 14:00:00', 
          id_cliente: 5, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 10, precio_producto: 15000 },
            { id_producto: '2', cantidad: 4, precio_producto: 12000 },
            { id_producto: '3', cantidad: 6, precio_producto: 3000 }
          ], 
          forma_pago: 'efectivo' 
        },
        { 
          id: 6, 
          numero: 6, 
          fecha_cotizacion: '06-12-2023 15:00:00', 
          id_cliente: 6, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 12, precio_producto: 20000 },
            { id_producto: '2', cantidad: 100, precio_producto: 1500 },
            { id_producto: '3', cantidad: 10, precio_producto: 10000 }
          ], 
          forma_pago: 'transferencia' 
        },
        { 
          id: 7, 
          numero: 7, 
          fecha_cotizacion: '07-12-2023 16:00:00', 
          id_cliente: 7, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 15, precio_producto: 12000 },
            { id_producto: '2', cantidad: 300, precio_producto: 2500 },
            { id_producto: '3', cantidad: 2, precio_producto: 5000 }
          ], 
          forma_pago: 'tarjeta' 
        },
        { 
          id: 8, 
          numero: 8, 
          fecha_cotizacion: '08-12-2023 17:00:00', 
          id_cliente: 8, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 8, precio_producto: 25000 },
            { id_producto: '2', cantidad: 5, precio_producto: 7000 },
            { id_producto: '3', cantidad: 100, precio_producto: 1500 }
          ], 
          forma_pago: 'crédito' 
        },
        { 
          id: 9, 
          numero: 9, 
          fecha_cotizacion: '09-12-2023 18:00:00', 
          id_cliente: 9, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 10, precio_producto: 15000 },
            { id_producto: '2', cantidad: 1, precio_producto: 25000 },
            { id_producto: '3', cantidad: 50, precio_producto: 1000 }
          ], 
          forma_pago: 'efectivo' 
        },
        { 
          id: 10, 
          numero: 10, 
          fecha_cotizacion: '10-12-2023 19:00:00', 
          id_cliente: 10, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 20, precio_producto: 35000 },
            { id_producto: '2', cantidad: 4, precio_producto: 15000 },
            { id_producto: '3', cantidad: 6, precio_producto: 3000 }
          ], 
          forma_pago: 'transferencia' 
        },
        { 
          id: 11, 
          numero: 11, 
          fecha_cotizacion: '11-12-2023 20:00:00', 
          id_cliente: 11, 
          id_usuario: 1, 
          productos: [
            { id_producto: '1', cantidad: 20, precio_producto: 35000 },
            { id_producto: '2', cantidad: 4, precio_producto: 15000 },
            { id_producto: '3', cantidad: 6, precio_producto: 3000 }
          ], 
          forma_pago: 'tarjeta' 
        }
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
        { id: 1, rut_cliente: null, nombre_cliente: 'Juan', apellido_cliente: 'Pérez', telefono_cliente: 912345678, correo_cliente: null, direccion_cliente: 'Avenida Providencia 1234' },
        { id: 2, rut_cliente: null, nombre_cliente: 'Ana', apellido_cliente: 'Martínez', telefono_cliente: 923456789, correo_cliente: null, direccion_cliente: 'Calle Apoquindo 1011' },
        { id: 3, rut_cliente: null, nombre_cliente: 'Carlos', apellido_cliente: 'García', telefono_cliente: 934567890, correo_cliente: null, direccion_cliente: 'Calle La Florida 2450' },
        { id: 4, rut_cliente: null, nombre_cliente: 'María', apellido_cliente: 'López', telefono_cliente: 945678901, correo_cliente: null, direccion_cliente: 'Avenida Bellavista 123' },
        { id: 5, rut_cliente: null, nombre_cliente: 'Luis', apellido_cliente: 'Ramírez', telefono_cliente: 956789012, correo_cliente: null, direccion_cliente: 'Calle 5 de Abril 879' },
        { id: 6, rut_cliente: null, nombre_cliente: 'Pedro', apellido_cliente: 'González', telefono_cliente: 967890123, correo_cliente: null, direccion_cliente: 'Calle San Francisco 432' },
        { id: 7, rut_cliente: null, nombre_cliente: 'Elena', apellido_cliente: 'Pérez', telefono_cliente: 978901234, correo_cliente: null, direccion_cliente: 'Avenida Los Leones 600' },
        { id: 8, rut_cliente: null, nombre_cliente: 'Jorge', apellido_cliente: 'Martínez', telefono_cliente: 989012345, correo_cliente: null, direccion_cliente: 'Calle Vicuña Mackenna 543' },
        { id: 9, rut_cliente: null, nombre_cliente: 'Sofía', apellido_cliente: 'Herrera', telefono_cliente: 990123456, correo_cliente: null, direccion_cliente: 'Calle Colón 125' },
        { id: 10, rut_cliente: null, nombre_cliente: 'Ricardo', apellido_cliente: 'Sánchez', telefono_cliente: 901234567, correo_cliente: null, direccion_cliente: 'Avenida Central 999' },
        { id: 11, rut_cliente: null, nombre_cliente: 'Benjamín', apellido_cliente: 'Cofré', telefono_cliente: 901234567, correo_cliente: null, direccion_cliente: 'Avenida Central 999' },
      ];

    const usuarios= [
        {id: 1, rut_usuario: '12345678-9', nombre_usuario: 'Waton', apellido_usuario: null, telefono_usuario: 912345678, correo_usuario:'abcd@abcd.cl', direccion_usuario: 'bbbbbbb 1234, bbbbbb'}
    ];

    // Extraer datos de los arreglos
    const cotizacionesFinales = cotizaciones.map(cot => {
        // Busca nombres de los materiales relacionados en cada producto de la cotización
        const productosDetalles = cot.productos.map((prod) => ({
            ...prod,
            nombre_producto: productos.find(producto => producto.id === parseInt(prod.id_producto))?.nombre_producto || 'Producto Desconocido',
            precio_producto: productos.find(producto => producto.id === parseInt(prod.id_producto))?.precio_producto || 0,
            total_producto:  prod.precio_producto,
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
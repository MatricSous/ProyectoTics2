import React, { useState, useEffect } from 'react';
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
import AgregarCliente from './agregarcliente';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#e5e5e5',
    border: '3px solid #093d77',
    boxShadow: 24,

    width: 1500,
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

export default function NestedModalClientes({open, handleClose}) {
    const clientes = [
        {id: 1, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 2, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 3, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 4, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 5, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 6, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 7, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 8, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 9, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},
        {id: 10, rut_cliente: '12345678-9', nombre_cliente: 'aaaaaaaa',  telefono_cliente: 912345678, correo_cliente:'abcd@abcd.cl', direccion_cliente: 'aaaaaa 1234, aaaaaa'},

    ];

    const [cliente, setCliente] = useState(clientes);
    const [clienteSelect, setClienteSelect] = useState(null);
    const [actualizar, setActualizar] = useState(false);

    const toggleActualizar = () => {
        setActualizar(prevValue => !prevValue); // Cambia al opuesto
      };
   

    const [childOpen, setChildOpen] = React.useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);

    const [nombre, setNombre] = useState('');
    const handleChangeNombre = (event) => {
        setNombre(event.target.value)
    }

    const [apellido, setApellido] = useState('');
    const handleChangeApellido = (event) => {
        setApellido(event.target.value)
    }

    const [rut, setRut] = useState('');
    const handleChangeRut = (event) => {
        setRut(event.target.value)
    }

    const [telefono, setTelefono] = useState('');
    const handleChangeTelefono = (event) => {
        setTelefono(event.target.value)
    }

    const [correo, setCorreo] = useState('');
    const handleChangeCorreo = (event) => {
        setCorreo(event.target.value)
    }

    const [direccion, setDireccion] = useState('');
    const handleChangeDireccion = (event) => {
        setDireccion(event.target.value)
    }

    const columns = [
        { 
            field: 'rut_cliente', 
            headerName: 'Rut', 
            width: 150,
            renderCell: (params) => (
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center', 
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
            field: 'nombre_cliente', 
            headerName: 'Nombre', 
            width: 250,
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
            field: 'telefono_cliente', 
            headerName: 'Teléfono', 
            width: 120,
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
            field: 'correo_cliente', 
            headerName: 'Correo', 
            width: 250,
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
            field: 'direccion_cliente',
            headerName: 'Dirección',
            width: 310,
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
    ];
   
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log(token);
    if (open && token) {
        console.log("enviando get");
        axios.get('http://localhost:8081/clientes', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            // Mapeo para cambiar los nombres de las columnas
            console.log(response.data.clientes)
            const transformedClientes = response.data.clientes.map(cliente => ({
                id: cliente.idcliente,
                rut_cliente: cliente.rut,
                nombre_cliente: cliente.razon_social,
                telefono_cliente: cliente.telefono,
                correo_cliente: cliente.correo,
                direccion_cliente: cliente.direccion // Mantén las columnas que no cambian igual
            }));
            setCliente(transformedClientes);
        })
        .catch(error => console.error('Error al obtener cliente:', error));
    }
}, [open]);

useEffect(() => {
    console.log(token);
    if (open && token) {
        console.log("enviando get");
        axios.get('http://localhost:8081/clientes', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            // Mapeo para cambiar los nombres de las columnas
            console.log(response.data.clientes)
            const transformedClientes = response.data.clientes.map(cliente => ({
                id: cliente.idcliente,
                rut_cliente: cliente.rut,
                nombre_cliente: cliente.razon_social,
                telefono_cliente: cliente.telefono,
                correo_cliente: cliente.correo,
                direccion_cliente: cliente.direccion // Mantén las columnas que no cambian igual
            }));
            setCliente(transformedClientes);
        })
        .catch(error => console.error('Error al obtener cliente:', error));
    }
}, [actualizar]);

    useEffect(() => {
        console.log("Clientes actualizados:", cliente);
    }, [cliente]); // Este efecto se ejecutará cada vez que 'materiales' cambie

    const [busqueda, setBusqueda] = useState('');
    const clientesFiltrados = cliente.filter(
        (cliente) => 
            cliente.rut_cliente.toLowerCase().includes(busqueda.toLowerCase()) || 
            cliente.nombre_cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
            cliente.telefono_cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
            cliente.correo_cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
            cliente.direccion_cliente.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
    };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800,
            width: { xs: '90%', sm: '70%', md: '60%', lg: '57%' },
            maxHeight: '90vh', // Limita la altura
            overflowY: 'auto', // Agrega scroll en caso de contenido extenso
            disply: 'flex',
            overflowX: 'auto'
         }}>

            <Grid2 container alignItems="center" justifyContent="space-between">
                <Grid2 item xs={4} style={{ textAlign: 'center' }}>
                    <h2 id="parent-modal-title">Clientes</h2>
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
                        <AddIcon/>Agregar
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
                sx={{ width: '100%', marginTop:2, height: 400,  bgcolor: '#e5e5e5' }}
            >
                <Paper style={{  marginTop:10, height: 420, width: '100%' }} elevation={0}>
                    <DataGrid
                        headerHeight={50}
                        rowHeight={50}
                        rows={clientesFiltrados} 
                        columns={columns.map((column) => ({
                            ...column,
                            headerAlign: 'left',  
                            align: 'left',       
                            width: column.width   
                        }))}
                        checkboxSelection={false}
                        disableSelectionOnClick
                        disableColumnSelector 
                        pagination={false}
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
            <AgregarCliente 
                open={childOpen} 
                handleClose={handleChildClose} 
                nombre={nombre}
                handleChangeNombre={handleChangeNombre}
                handleChangeApellido={handleChangeApellido}
                rut={rut}
                handleChangeRut={handleChangeRut}
                telefono={telefono}
                handleChangeTelefono={handleChangeTelefono}
                correo={correo}
                handleChangeCorreo={handleChangeCorreo}
                direccion={direccion}
                handleChangeDireccion={handleChangeDireccion}
                actualizar={actualizar}
                toggleActualizar={toggleActualizar}
            />
        </Box>
      </Modal>
    </div>
  );
}
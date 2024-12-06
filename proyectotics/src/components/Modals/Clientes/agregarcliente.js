import React, {useEffect} from 'react';
import axios from 'axios';
import {
    Grid2, 
    Button, 
    Box, 
    Modal, 
    styled,
    alpha,
    Divider,
    Typography,
    FormControl,
    InputLabel,
    InputBase
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import Filter2OutlinedIcon from '@mui/icons-material/Filter2Outlined';

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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#F3F6F9',
        border: '1px solid',
        borderColor: '#2b2b2b',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
      // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha('#2b2b2b', 0.25)} 0 0 0 0.2rem`,
            borderColor: '#2b2b2b',
        },
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
            borderColor: '#2D3843',
        }),
    },
}));


export default function AgregarCliente({ 
    open, 
    handleClose, 
    actualizar,
    toggleActualizar,
    nombre, 
    handleChangeNombre, 
    rut,
    handleChangeRut,
    telefono,
    handleChangeTelefono,
    correo,
    handleChangeCorreo,
    direccion,
    handleChangeDireccion
}) {

    const [showSaveMessage, setShowSaveMessage] = React.useState(false);
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    // Limpiar mensajes de alerta cuando el modal se abre o se cierra
    useEffect(() => {
        if (!open) {
            setShowSaveMessage(false);
            setShowErrorMessage(false);
        }
    }, [open]);

    const handleGuardar = async () => {
        const cliente = {
            "RUT": rut,
            "razon_social": nombre,
            "telefono": telefono,
            "correo": correo,
            "direccion": direccion,
        };

        const token = localStorage.getItem('token');
    
        console.log("Enviando solicitud POST a /clientes/crearCliente con los datos:", cliente);
    
        try {
            await axios.post('http://localhost:8081/clientes/crearCliente', cliente, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowSaveMessage(true);
            setShowErrorMessage(false);
            toggleActualizar(); // Muestra mensaje de guardado exitoso
        } catch (error) {
            setShowSaveMessage(false);
            setShowErrorMessage(true); // Muestra mensaje de error
            console.error('Error al guardar al cliente:', error);
        }
    };

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ 
                    ...style, 
                    width: { xs: '90%', sm: '68%', md: '58%', lg: '48%' },
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}>
                    <Grid2 container alignItems="center" justifyContent="space-between">
                        <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                            <h2 id="parent-modal-title">Agregar nuevo cliente</h2>
                        </Grid2>

                        <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                            <Button onClick={handleClose}>
                                <HighlightOffIcon style={{ color: '#b71c1c' }} />
                            </Button>
                        </Grid2>
                    </Grid2>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr'}, gap: 2, paddingTop: 2 }}>
                        <Grid2 sx={{ display: 'flex', alignItems: 'center' }}>
                            <Filter1OutlinedIcon color="azul" sx={{ fontSize: '30px' }} /> 
                            <Typography sx={{ paddingLeft: 1, fontSize: '20px' }}>Información Personal</Typography>
                        </Grid2>

                        <Grid2 sx={{ display: 'flex', alignItems: 'center', paddingLeft: 1 }}>
                            <Filter2OutlinedIcon color="azul" sx={{ fontSize: '30px' }} /> 
                            <Typography sx={{ paddingLeft: 1, fontSize: '20px' }}>Información De Contacto</Typography>
                        </Grid2>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 5px 1fr'}, gap: 2, paddingTop: 2 }}>
                        <Box>
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="nombre">
                                    Razon Social
                                </InputLabel>
                                <BootstrapInput id="nombre" sx={{ width: 300 }} value={nombre} onChange={handleChangeNombre} />
                            </FormControl>

                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="rut">
                                    Rut
                                </InputLabel>
                                <BootstrapInput id="rut" sx={{ width: 300 }} value={rut} onChange={handleChangeRut} />
                            </FormControl>
                        </Box>

                        <Divider orientation="vertical" flexItem sx={{ mr: 1, borderWidth: 1, bgcolor: '#daa520' }} />

                        <Box>
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="telefono">
                                    Teléfono
                                </InputLabel>
                                <BootstrapInput id="telefono" sx={{ width: 300 }} value={telefono} onChange={handleChangeTelefono} />
                            </FormControl>

                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="correo">
                                    Correo
                                </InputLabel>
                                <BootstrapInput id="correo" sx={{ width: 300 }} value={correo} onChange={handleChangeCorreo} />
                            </FormControl>

                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="direccion">
                                    Dirección de Despacho
                                </InputLabel>
                                <BootstrapInput id="direccion" sx={{ width: 300 }} value={direccion} onChange={handleChangeDireccion} />
                            </FormControl>
                        </Box>
                    </Box>
                    
                    {showSaveMessage && (
                        <Box mt={2}>
                            <Typography variant="body1" color="success.main" align="center">
                                Cliente Ingresado Exitosamente.
                            </Typography>
                        </Box>
                    )}
                    
                    {showErrorMessage && (
                        <Box mt={2}>
                            <Typography variant="body1" color="error" align="center">
                                Ocurrió un error al ingresar el cliente. Intente nuevamente.
                            </Typography>
                        </Box>
                    )}

                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" onClick={handleClose} color="error">
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={handleGuardar} color="success">
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

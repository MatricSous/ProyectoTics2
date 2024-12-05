import React from 'react';
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
    nombre, 
    handleChangeNombre, 
    apellido, 
    handleChangeApellido,
    rut,
    handleChangeRut,
    telefono,
    handleChangeTelefono,
    correo,
    handleChangeCorreo,
    direccion,
    handleChangeDireccion
}) {
    const handleGuardar = async () => {
        const cliente = {
            "rut_cliente": rut,
            "nombre_cliente": nombre,
            "apellido_cliente": apellido,
            "telefono_cliente": telefono,
            "correo_cliente": correo,
            "direccion_cliente": direccion,
        };
    
        console.log("Enviando solicitud POST a /materiales/crearMaterial con los datos:", cliente);
    
    
/*        try {
            await axios.post('http://localhost:8081/materiales/crearMaterial', cliente, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowSaveMessage(true); // Muestra mensaje de guardado exitoso
        } catch (error) {
            console.error('Error al guardar al cliente:', error);
        }
*/
    };


    return (
        <React.Fragment>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 700,
                    width: { xs: '90%', sm: '68%', md: '58%', lg: '48%' },
                    maxHeight: '90vh', // Limita la altura
                    overflowY: 'auto', // Agrega scroll en caso de contenido extenso
                    displey: 'flex',
                    overflowX: 'auto'
               }}>
                    <Grid2 container alignItems="center" justifyContent="space-between">
                        <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                            <h2 id="parent-modal-title">Agregar nuevo cliente</h2>
                        </Grid2>

                        <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                            <Button onClick={handleClose}>
                                <HighlightOffIcon style={{color: '#b71c1c'}}/>
                            </Button>
                        </Grid2>
                    </Grid2>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr'}, gap: 2, paddingTop: 2 }}>
                        <Grid2 sx={{display: 'flex', alignItems: 'center'}}>
                            <Filter1OutlinedIcon color="azul" sx={{fontSize: '30px'}}/> 
                            <Typography sx={{paddingLeft: 1, fontSize:'20px'}}>Información Personal</Typography>
                        </Grid2>

                        <Grid2 sx={{display: 'flex', alignItems: 'center', paddingLeft: 1}}>
                            <Filter2OutlinedIcon color="azul" sx={{fontSize: '30px'}}/> 
                            <Typography sx={{paddingLeft: 1, fontSize: '20px'}}>Información De Contacto</Typography>
                        </Grid2>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 5px 1fr'}, gap: 2, paddingTop: 2 }}>

                        <Box>
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input" >
                                    Nombre/s
                                </InputLabel>
                                <BootstrapInput id="nombre" sx={{ width: 300}} value={nombre} onChange={handleChangeNombre} />
                            </FormControl>

                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Apellido/s
                                </InputLabel>
                                <BootstrapInput id="nombre" sx={{ width: 300}} value={apellido} onChange={handleChangeApellido} />
                            </FormControl> 


                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Rut/Run
                                </InputLabel>
                                <BootstrapInput id="nombre" sx={{ width: 300}} value={rut} onChange={handleChangeRut} />
                            </FormControl>
                        </Box>

                        <Divider orientation="vertical" flexItem sx={{ mr: 1, borderWidth: 1, bgcolor: '#daa520'}} />

                        <Box>
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Teléfono
                                </InputLabel>
                                <BootstrapInput id="nombre" sx={{ width: 300}} value={telefono} onChange={handleChangeTelefono} />
                            </FormControl>

                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Correo
                                </InputLabel>
                                <BootstrapInput id="nombre" sx={{ width: 300}} value={correo} onChange={handleChangeCorreo} />
                            </FormControl>

                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Dirección de Despacho
                                </InputLabel>
                                <BootstrapInput id="nombre" sx={{ width: 300}} value={direccion} onChange={handleChangeDireccion} />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box mt={2} display="flex" justifyContent="space-between">
                        {/* Botón izquierdo */}
                        <Button variant="contained" onClick={handleClose} color="rojo">
                            Cancelar
                        </Button>
                        
                        {/* Botón derecho */}
                        <Button variant="contained" onClick={handleGuardar} color={"success"}>
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
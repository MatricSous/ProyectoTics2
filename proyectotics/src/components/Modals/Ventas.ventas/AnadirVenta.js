import React, { useState ,useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, Grid2, Grid, item, MenuItem, Popover, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TablaAnadir from './TablaAnadir';
import AgregarCliente from './AgregarCliente';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';


function AnadirVenta({ open, onClose }) {
    
    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 640,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const vendedores = [
    {
      value: 'Cazuela',
      label: 'Cazuela',
    },
    {
      value: 'Waton',
      label: 'Waton',
    },
    {
      value: 'Tati',
      label: 'Tati',
    },
    {
      value: 'Milla',
      label: 'Milla',
    },
  ];
  
  const despachador = [
    {
      value: 'Yailin',
      label: 'Yailin',
    },
    {
      value: 'Fernin',
      label: 'Fernin',
    },
    {
      value: 'Miguel',
      label: 'Miguel',
    },
    {
      value: 'Yarden',
      label: 'Yarden',
    },
  ];
    
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [cotizacionText, setCotizacionText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [cotizacionId, setCotizacionId] = useState('');
  const [isCotizacionDisabled, setIsCotizacionDisabled] = useState(true);
  const [cotizaciondir, setCotizaciondir] = useState('');
  const [rows, setRows] = useState([]);  // Agrega el estado para las filas de la cotización seleccionada
  const [costo, setCosto] = useState('');
  const [horario, setHorario] = useState('');
  const [openAgregarCliente, setOpenAgregarCliente] = useState(false);

  
  const [deliveryDateRange, setDeliveryDateRange] = useState({ startDate: '', endDate: '' });

    // Actualizar el rango de fechas en el estado
    useEffect(() => {
        const { startDate, endDate } = getRandomDeliveryDateRange();
        setDeliveryDateRange({ startDate, endDate });
    }, []);

  // Lista de cotizaciones (puedes reemplazar esto con datos dinámicos)
  const cotizaciones = [
    { 
      id: 1, 
      cliente: 'Juan Pérez', 
      detalle: 'Mueble de madera', 
      direccion: 'Avenida Providencia 1234', 
      telefono: '+56 9 1234 5678',
      rows: [ 
        { id: 1, nombre: 'Madera Pino', cantidad: 15, detalle: 'Tablas de madera pino para mueble', precio: 20000 },
        { id: 2, nombre: 'Clavos de Carpintero', cantidad: 500, detalle: 'Clavos para ensamblaje', precio: 1500 },
        { id: 3, nombre: 'Visagras', cantidad: 12, detalle: 'Visagras para puertas', precio: 5000 },
      ]
    },
    { 
      id: 2, 
      cliente: 'Ana Martínez', 
      detalle: 'Silla de madera', 
      direccion: 'Calle Apoquindo 1011', 
      telefono: '+56 9 2345 6789',
      rows: [ 
        { id: 1, nombre: 'Madera Roble', cantidad: 10, detalle: 'Madera roble para asiento y respaldo', precio: 25000 },
        { id: 2, nombre: 'Tornillos de Acero', cantidad: 200, detalle: 'Tornillos para ensamblaje', precio: 3000 },
        { id: 3, nombre: 'Pintura Barniz', cantidad: 5, detalle: 'Barniz para acabado', precio: 10000 },
      ]
    },
    { 
      id: 3, 
      cliente: 'Carlos García', 
      detalle: 'Mesa de comedor', 
      direccion: 'Calle La Florida 2450', 
      telefono: '+56 9 3456 7890',
      rows: [ 
        { id: 1, nombre: 'Madera de Cedro', cantidad: 20, detalle: 'Madera de cedro para la estructura', precio: 40000 },
        { id: 2, nombre: 'Patas de Mueble', cantidad: 4, detalle: 'Patas metálicas para mesa', precio: 15000 },
        { id: 3, nombre: 'Clavos de Carpintero', cantidad: 300, detalle: 'Clavos para el ensamblaje', precio: 2000 },
      ]
    },
    { 
      id: 4, 
      cliente: 'María López', 
      detalle: 'Estantería de madera', 
      direccion: 'Avenida Bellavista 123', 
      telefono: '+56 9 4567 8901',
      rows: [ 
        { id: 1, nombre: 'Madera MDF', cantidad: 25, detalle: 'MDF para estantería', precio: 15000 },
        { id: 2, nombre: 'Clavos de Carpintero', cantidad: 400, detalle: 'Clavos para ensamblaje de estantes', precio: 2000 },
        { id: 3, nombre: 'Pintura Acrílica', cantidad: 5, detalle: 'Pintura acrílica para acabado', precio: 5000 },
      ]
    },
    { 
      id: 5, 
      cliente: 'Luis Ramírez', 
      detalle: 'Mueble de TV', 
      direccion: 'Calle 5 de Abril 879', 
      telefono: '+56 9 5678 9012',
      rows: [ 
        { id: 1, nombre: 'Madera Pino', cantidad: 10, detalle: 'Madera pino para la estructura', precio: 15000 },
        { id: 2, nombre: 'Patas Metálicas', cantidad: 4, detalle: 'Patas metálicas para el mueble', precio: 12000 },
        { id: 3, nombre: 'Visagras', cantidad: 6, detalle: 'Visagras para puertas del mueble', precio: 3000 },
      ]
    },
    { 
      id: 6, 
      cliente: 'Pedro González', 
      detalle: 'Silla de comedor', 
      direccion: 'Calle San Francisco 432', 
      telefono: '+56 9 6789 0123',
      rows: [ 
        { id: 1, nombre: 'Madera Roble', cantidad: 12, detalle: 'Madera de roble para la silla', precio: 20000 },
        { id: 2, nombre: 'Tornillos de Acero', cantidad: 100, detalle: 'Tornillos para ensamblaje', precio: 1500 },
        { id: 3, nombre: 'Tapizado de Tela', cantidad: 10, detalle: 'Tela para el asiento de la silla', precio: 10000 },
      ]
    },
    { 
      id: 7, 
      cliente: 'Elena Pérez', 
      detalle: 'Escritorio de oficina', 
      direccion: 'Avenida Los Leones 600', 
      telefono: '+56 9 7890 1234',
      rows: [ 
        { id: 1, nombre: 'Madera Pino', cantidad: 15, detalle: 'Madera pino para la estructura', precio: 12000 },
        { id: 2, nombre: 'Clavos de Carpintero', cantidad: 300, detalle: 'Clavos para ensamblaje', precio: 2500 },
        { id: 3, nombre: 'Barniz', cantidad: 2, detalle: 'Barniz para acabado', precio: 5000 },
      ]
    },
    { 
      id: 8, 
      cliente: 'Jorge Martínez', 
      detalle: 'Silla ejecutiva', 
      direccion: 'Calle Vicuña Mackenna 543', 
      telefono: '+56 9 8901 2345',
      rows: [ 
        { id: 1, nombre: 'Madera Roble', cantidad: 8, detalle: 'Madera de roble para la estructura', precio: 25000 },
        { id: 2, nombre: 'Piel sintética', cantidad: 5, detalle: 'Piel sintética para el asiento', precio: 7000 },
        { id: 3, nombre: 'Tornillos de Acero', cantidad: 100, detalle: 'Tornillos para el ensamblaje', precio: 1500 },
      ]
    },
    { 
      id: 9, 
      cliente: 'Sofía Herrera', 
      detalle: 'Mesa auxiliar', 
      direccion: 'Calle Colón 125', 
      telefono: '+56 9 9012 3456',
      rows: [ 
        { id: 1, nombre: 'Madera Pino', cantidad: 10, detalle: 'Madera de pino para mesa auxiliar', precio: 15000 },
        { id: 2, nombre: 'Vidrio Templado', cantidad: 1, detalle: 'Vidrio templado para la mesa', precio: 25000 },
        { id: 3, nombre: 'Tornillos de Acero', cantidad: 50, detalle: 'Tornillos para ensamblaje de la mesa', precio: 1000 },
      ]
    },
    { 
      id: 10, 
      cliente: 'Ricardo Sánchez', 
      detalle: 'Mueble de comedor', 
      direccion: 'Avenida Central 999', 
      telefono: '+56 9 0123 4567',
      rows: [ 
        { id: 1, nombre: 'Madera de Cedro', cantidad: 20, detalle: 'Madera de cedro para la estructura', precio: 35000 },
        { id: 2, nombre: 'Patas Metálicas', cantidad: 4, detalle: 'Patas metálicas para el mueble', precio: 15000 },
        { id: 3, nombre: 'Visagras', cantidad: 6, detalle: 'Visagras para puertas', precio: 3000 },
      ]
    }
];


    const handleOpenAgregarCliente = () => {
        setOpenAgregarCliente(true);  // Esto abrirá el modal
    };

  

  const handleOpenPopover = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
      setAnchorEl(null);
  };

  const handleSelectCotizacion = (cotizacion) => {
    setCotizacionId(cotizacion.id); // Actualiza el ID en el TextField de Cotizaciones
    setSelectedCotizacion(cotizacion);
    setCotizaciondir(cotizacion.direccion);
    setCotizacionText(`${cotizacion.cliente}`);
    setIsDisabled(false); // Habilitar el TextField
    setAnchorEl(null);
    setCosto(getRandomCost());  // Asignar el valor aleatorio para el costo
    setHorario(getRandomDeliveryDateRange());
    setRows(cotizacion.rows);
};

    const getRandomCost = () => {
        return Math.floor(Math.random() * 6) * 1000 + 15000;  // Genera un valor entre $15,000 y $20,000
    };

    const getRandomDeliveryDateRange = () => {
        const today = new Date();
        
        // Fecha de inicio (7 días después de la fecha actual)
        const startDate = new Date(today);
        startDate.setDate(today.getDate() + 7);
        
        // Fecha de finalización (14 días después de la fecha actual)
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 14);
        
        // Formatear las fechas a formato "DD-MM-YYYY"
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };
    
        // Devolver el rango de fechas
        return {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        };
    };
    
    const { startDate, endDate } = getRandomDeliveryDateRange();
    console.log(`${startDate} - ${endDate}`);

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? 'cotizacion-popover' : undefined;

  
    // Estado para controlar la visibilidad del modal
    const [openDialog, setOpenDialog] = useState(false);
  
    // Función para abrir el modal
    const handleOpenDialog = () => {
      setOpenDialog(true);
    };
  
    // Función para cerrar el modal
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
    const [ventaRealizada, setVentaRealizada] = useState(false);
    // Función para confirmar la compra y cerrar el modal

    const [confirming, setConfirming] = useState(false); // Estado para mostrar el mensaje de confirmación
    const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
    const [formData, setFormData] = useState({
      cliente: '',
      vendedor: '',
      metodoPago: '',
      fecha: '',
      cotizacion: '',
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleConfirm = () => {
        setConfirming(true); // Inicia el proceso de confirmación
    
        // Simula una llamada API o lógica de negocio aquí
        setTimeout(() => {
          setSuccessMessage("Venta realizada con éxito");
          setConfirming(false); // Termina el proceso de confirmación
    
          // Cierra el modal después de 3 segundos
          setTimeout(() => {
            onClose(); // Cierra el modal
          }, 3000); // Espera 3 segundos antes de cerrar
        }, 1000); // Simula un pequeño retraso antes de mostrar el mensaje
      };


    return(
        <Box sx={style}>
            <Button onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10, color: 'black', zIndex: 1 }}>
                    <HighlightOffIcon style={{ color: '#b71c1c' }} />
            </Button>

            <h2
                    id="parent-modal-title"
                    style={{
                        position: 'absolute',
                        top: -5,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'black',
                        zIndex: 1,
                        fontSize: '1.5rem',
                    }}
            >
                Gestión De Venta
            </h2>
            <div className="Raya"></div>
            
            <Grid2 container rowSpacing={2}  style={{ display: 'flex', alignItems: 'center'}}>
                <Grid2 size={3}>
                    <item>
                        <TextField  color="amarillo"
                        id="cotizacion-field"
                        label="Cotización"
                        variant="outlined"
                        value={cotizacionId}
                        disabled={isCotizacionDisabled}
                        />
                    </item>
                </Grid2>
                <Grid2 xs={2} container justifyContent={'space-between'}> 
                    <Grid2 >                
                    <Button onClick={handleOpenPopover}  >
                    <SearchIcon color='amarillo'/>
                    </Button>

                     {/* Popover para mostrar cotizaciones */}
                    <Popover
                        id={popoverId}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <List>
                            {cotizaciones.map((cotizacion) => (
                                <ListItem
                                    button
                                    key={cotizacion.id}
                                    onClick={() => handleSelectCotizacion(cotizacion)}
                                >
                                    <ListItemText
                                        primary={cotizacion.cliente}
                                        secondary={cotizacion.detalle}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Popover>
        
                    </Grid2>
                    
                    <Grid2  >                   
                        <Button >
                        <AddIcon color='amarillo'/>
                        </Button>
                    </Grid2>
                    <Grid2 >                     
                    <Grid2  >                     
                        <Button >
                        
                        </Button>                
                    </Grid2>                
                    </Grid2>
                </Grid2>
                <Grid2 size={1}></Grid2>
                <Grid2 size={2}>
                    <item>
                        <TextField id="outlined-basic"
                        
                        label="Cliente"
                        variant="outlined"
                        value={cotizacionText}
                        disabled={isCotizacionDisabled}/>
                    </item>
                </Grid2>
                <Grid2 xs={2} container justifyContent={'space-between'}>
                   
                    <Grid2 >
                        <Button >
                        <InfoIcon color='amarillo'/>
                        </Button>
                    </Grid2>
                    <Grid2 >
                        <Button >
                        <AddIcon color='amarillo' onClick={handleOpenAgregarCliente} />
                        <AgregarCliente 
                            open={openAgregarCliente} 
                            handleClose={() => setOpenAgregarCliente(false)} 
                        />    
                        </Button>
                    </Grid2>                   
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Vendedor"
                        defaultValue="Waton"
                        helperText="Por favor seleciona el vendedor"
                        color='amarillo'
                        sx={{width:'223px'}}
                        >
                        {vendedores.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid2>
                <Grid2 size={3.56}></Grid2>
                <Grid2 size={3.7} sx={{marginBottom:'25px'}} display={'flex'} alignItems={'center'}>
                    <item>
                        <TextField  
                
                        label="Dirección"
                        variant="outlined"
                        value={cotizaciondir}
                        disabled={isCotizacionDisabled}/>
                    </item>
                    <Grid2 >
                    <item>
                        <Button >
                        <EditIcon color='amarillo'/>
                        </Button>
                    </item>
                    </Grid2>
                </Grid2>
            </Grid2>
        <div className='Raya2'> 
            <span>
        <h2
                    id="parent-modal-title"
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'black',
                        zIndex: 1,
                        fontSize: '1.5rem',
                        marginTop:'-20px',
                        
                    }}
            >
                Entrega
        </h2>
        </span>
        </div>
        <Grid2 container rowSpacing={2}  style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
            <Grid2>
                <item>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Despachador"
                        defaultValue="Yailin"
                        color='amarillo'
                        helperText="Selecione el Despachador"
                        sx={{width:'223px'}}
                        >
                        {despachador.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </item>
            </Grid2>

            <Grid2 sx={{marginTop:'-22px'}}>
                <item>
                    <TextField
                color='amarillo' 
                label="Costo"
                variant="outlined"
                value={costo}
                disabled={true}
            />
                </item>
            </Grid2>

            <Grid2 sx={{marginTop:'-22px'}}>
                <item>
                    <TextField label="Fecha de entrega"
                                variant="outlined"
                                value={`${deliveryDateRange.startDate} <> ${deliveryDateRange.endDate}`}
                                disabled={true}
                                color='amarillo'/>
                </item>
            </Grid2>
            
        </Grid2>
        <Grid2 sx={{marginTop:'0px'}}>
            <item>
                <TextField fullWidth id="outlined-basic" label="Notas" variant="outlined"/>
            </item>
        </Grid2>
        <div className='Raya'></div>
        <TablaAnadir rows={selectedCotizacion ? selectedCotizacion.rows : []} />
        
        <Button
            sx={{
                backgroundColor: 'green',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                marginTop:'10px',
                marginLeft:'363px',
                padding: '12px 24px 10px',
                fontWeight: 'bold',
                '&:hover': {
                backgroundColor: '#388e3c', // Un verde más oscuro para el hover
                },
            }}
            onClick={handleOpenDialog}
            >
            <ConfirmationNumberIcon sx={{ marginRight: '8px' }} /> {/* Ícono de ticket */}
            Confirmar
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>¿Estás seguro de confirmar la compra?</DialogTitle>
            <DialogContent>
            <p>Esta acción no se puede deshacer. ¿Quieres continuar con la compra?</p>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog} color="amarillo">
                Cancelar
            </Button>
            <Button onClick={handleConfirm} color="amarillo">
                Confirmar
            </Button>
            </DialogActions>
        </Dialog>
        
            {ventaRealizada && (
            <Typography variant="h6" color="success.main" sx={{ textAlign: 'center', marginTop: '20px' }}>
                ¡Venta realizada con éxito!
            </Typography>
            )}
        
            


        </Box>
    )
};

export default AnadirVenta;
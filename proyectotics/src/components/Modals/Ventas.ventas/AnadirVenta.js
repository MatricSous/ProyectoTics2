import React, { useState ,useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, Grid2, Grid, item, MenuItem, Popover, List, ListItem, 
    ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment } from '@mui/material';
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
    height: 660,
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
        value: 'Francisco Soto',
        label: 'Francisco Soto'
    },
    {
        value: 'Joaquín Pérez',
        label: 'Joaquín Pérez'
    },
    {
        value: 'Mateo González',
        label: 'Mateo González'
    },
    {
        value: 'Gabriel Rivas',
        label: 'Gabriel Rivas'
    },
    {
        value: 'Santiago Martínez',
        label: 'Santiago Martínez'
    }
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
    ,
    { 
        id: 11, 
        cliente: 'Benjamín Cofré', 
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
const materiales = [
    { id: 1, nombre: 'Madera de Cedro', cantidad: 1, detalle: 'Madera de cedro para la estructura', precio: 2000, bodega: 'Bodega 2' },
    { id: 2, nombre: 'Cemento Portland', cantidad: 10, detalle: 'Cemento para construcción resistente', precio: 500, bodega: 'Bodega 2' },
    { id: 3, nombre: 'Arena Fina', cantidad: 5, detalle: 'Arena para mezcla de concreto', precio: 300, bodega: 'Bodega 2' },
    { id: 4, nombre: 'Ladrillos Rojos', cantidad: 500, detalle: 'Ladrillos para paredes', precio: 150, bodega: 'Bodega 2' },
    { id: 5, nombre: 'Tubos PVC', cantidad: 20, detalle: 'Tubos para plomería', precio: 800, bodega: 'Bodega 2' },
    { id: 6, nombre: 'Vidrios Templados', cantidad: 15, detalle: 'Vidrios para ventanas', precio: 2500, bodega: 'Bodega 2' },
    { id: 7, nombre: 'Clavos de Acero', cantidad: 1000, detalle: 'Clavos resistentes a la oxidación', precio: 50, bodega: 'Bodega 1' },
    { id: 8, nombre: 'Pintura Blanca', cantidad: 2, detalle: 'Pintura de alta cobertura', precio: 900, bodega: 'Bodega 1' },
    { id: 9, nombre: 'Alambre Galvanizado', cantidad: 30, detalle: 'Alambre para cercas', precio: 400, bodega: 'Bodega 2' },
    { id: 10, nombre: 'Tejas de Arcilla', cantidad: 50, detalle: 'Tejas para techos rústicos', precio: 180, bodega: 'Bodega 2' },
    { id: 11, nombre: 'Puerta de Madera', cantidad: 1, detalle: 'Puerta de madera maciza', precio: 3000, bodega: 'Bodega 2' },
    { id: 12, nombre: 'Ventilador de Techo', cantidad: 2, detalle: 'Ventiladores para ventilación interna', precio: 2200, bodega: 'Bodega 1' },
    { id: 13, nombre: 'Interruptores Eléctricos', cantidad: 10, detalle: 'Interruptores de alta calidad', precio: 250, bodega: 'Bodega 1' },
    { id: 14, nombre: 'Cableado Eléctrico', cantidad: 50, detalle: 'Cableado para conexiones eléctricas', precio: 1000, bodega: 'Bodega 2' },
    { id: 15, nombre: 'Azulejos Cerámicos', cantidad: 20, detalle: 'Azulejos para baños y cocinas', precio: 300, bodega: 'Bodega 2' },
    { id: 16, nombre: 'Tornillos Autorroscantes', cantidad: 500, detalle: 'Tornillos para metal y madera', precio: 120, bodega: 'Bodega 1' },
    { id: 17, nombre: 'Planchas de Yeso', cantidad: 10, detalle: 'Planchas para tabiques', precio: 450, bodega: 'Bodega 2' },
    { id: 18, nombre: 'Malla Electrosoldada', cantidad: 10, detalle: 'Malla para refuerzos de concreto', precio: 600, bodega: 'Bodega 2' },
    { id: 19, nombre: 'Láminas de Aluminio', cantidad: 5, detalle: 'Láminas para cubiertas ligeras', precio: 1500, bodega: 'Bodega 2' },
    { id: 20, nombre: 'Impermeabilizante Líquido', cantidad: 1, detalle: 'Impermeabilizante para techos', precio: 2800, bodega: 'Bodega 2' },
];

  
  const [open2, setOpen2] = useState(false); // Estado del modal
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const [selectedMaterial, setSelectedMaterial] = useState(null); // Estado para el material seleccionado
  const [quantity, setQuantity] = useState(0); // Para almacenar la cantidad seleccionada

  
  const [deliveryDateRange, setDeliveryDateRange] = useState({ startDate: '', endDate: '' });
  const handleMaterialClick = (material) => {
    // Cambiar el material seleccionado
    setSelectedMaterial(material);
    handleSelectMaterial(material);
};  



  // Filtrar materiales por nombre según la búsqueda
  const filteredMaterials = materiales.filter((materiales) =>
    materiales.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setSearchQuery(''); // Limpiar la búsqueda al cerrar
  };

  
  // Función que maneja la selección del material
  const handleSelectMaterial = (material) => {
    setSelectedMaterial(material);
  };

  // Función que maneja el cambio de cantidad
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value); // Actualiza la cantidad
  };

  // Función que maneja el confirmando la selección y cantidad
  const handleConfirm2 = () => {
    
        if (selectedMaterial && quantity > 0) {
            const precioTotal = selectedMaterial.precio * quantity;
        const newRow = {
            id: selectedMaterial.id, // Genera un ID único
            nombre: selectedMaterial.nombre,
            cantidad: quantity,
            detalle:selectedMaterial.detalle,
            precio: precioTotal,
        };

        // Agregar la nueva fila al estado de rows
        setRows((prevRows) => [...prevRows, newRow]);

        // Cerrar el modal después de agregar el material
        handleClose2();
    } else {
        alert('Por favor, selecciona un material y cantidad válidos.');
    }
};


    const handleOpenAgregarCliente = () => {
        setOpenAgregarCliente(true);  // Esto abrirá el modal
    };

  

  const handleOpenPopover = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
      setAnchorEl(null);
  };
  const [selectedCliente, setSelectedCliente] = useState('');
  
  const handleSelectCotizacion = (cotizacion) => {
    setCotizacionId(cotizacion.id); // Actualiza el ID en el TextField de Cotizaciones
    setSelectedCotizacion(cotizacion);
    setSelectedCliente(cotizacion.cliente);  // Actualiza el nombre del cliente
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

      const [searchTerm, setSearchTerm] = useState('');

        const filteredCotizaciones = cotizaciones.filter(
        (cotizacion) =>
            cotizacion.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cotizacion.detalle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        const calcularTotal = () => {
            return rows.reduce((total, row) => total + row.precio, 0);
          };
        
          const totalMateriales = calcularTotal();
    
          const handleSaveChanges = (updatedMaterial) => {
            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === updatedMaterial.id ? updatedMaterial : row
              )
            );
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
                            <Box sx={{ p: 2 }}>
                                {/* Input de búsqueda */}
                                <TextField
                                    fullWidth
                                    placeholder="Buscar cotización por ID o cliente..."
                                    variant="outlined"
                                    value={cotizacionText}
                                    onChange={(e) => setCotizacionText(e.target.value)}
                                />
                            </Box>

                            {/* Lista de cotizaciones filtrada */}
                            <List>
                                {cotizaciones
                                    .filter((cotizacion) =>
                                        cotizacion.cliente.toLowerCase().includes(cotizacionText.toLowerCase()) ||
                                        cotizacion.detalle.toLowerCase().includes(cotizacionText.toLowerCase()) ||
                                        cotizacion.id.toString().includes(cotizacionText)
                                    )
                                    .map((cotizacion) => (
                                        <ListItem
                                            button
                                            key={cotizacion.id}
                                            onClick={() => handleSelectCotizacion(cotizacion)}
                                        >
                                            <ListItemText
                                                primary={`Cliente: ${cotizacion.cliente}`}
                                                secondary={`N° de Cotización: ${cotizacion.id}`}
                                            />
                                        </ListItem>
                                    ))}
                            </List>

                            {/* Mostrar cliente seleccionado */}
                            {selectedCliente && (
                                <Box sx={{ mt: 2, p: 2, bgcolor: '#f1f1f1', borderRadius: 4 }}>
                                    <Typography variant="h6">
                                        Cliente Seleccionado: {selectedCliente}
                                    </Typography>
                                </Box>
                            )}
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
       
        <TablaAnadir rows={rows} setRows={setRows} onSaveChanges={handleSaveChanges} />

        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {/* Botón de Agregar Material */}
            <Button
                variant='contained'
                onClick={handleOpen2}
                color="amarillo"
                sx={{
                    marginTop: '10px',
                }}
            >
                Agregar Material
            </Button>
            <h2>Total de la Compra: ${totalMateriales}</h2>
            {/* Botón de Confirmar */}
            <Button
                sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    marginTop: '10px',
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
        </Box>


        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>¿Estás seguro de confirmar la compra?</DialogTitle>
            <DialogContent>
            <p>¿Quieres continuar con la compra de ${totalMateriales}? </p>
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
        
        {/* Modal*/}
        <Modal open={open2} onClose={handleClose2}>
        <Box sx={{ width: 400, position: 'absolute', height: 580, top: '50%', left: '50%', padding: 2, bgcolor: 'white', borderRadius: '8px', transform: 'translate(-50%, -50%)' }}>
            <Button onClick={() => handleClose2()} style={{ position: 'absolute', top: 10, right: 10 }}>
                <HighlightOffIcon style={{ color: '#b71c1c' }} />
            </Button>
            <h2>Seleccionar Material</h2>

            {/* Campo de búsqueda */}
            <TextField
                label="Buscar Material"
                variant="outlined"
                color='amarillo'
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Actualizar la búsqueda
                sx={{ marginBottom: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                {/* Lista de materiales filtrada */}
                <List>
                    {filteredMaterials.map((material) => (
                        <ListItem
                            button
                            key={material.id}
                            onClick={() => handleMaterialClick(material)}
                            sx={{
                                backgroundColor: selectedMaterial?.id === material.id ? 'rgba(0, 0, 0, 0.1)' : 'transparent', // Color más oscuro cuando se selecciona
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Hover color
                                },
                            }}
                        >
                            <ListItemText
                                color='amarillo'
                                primary={material.nombre}
                                secondary={`Cantidad: ${material.cantidad}, Precio: $${material.precio}, ${material.bodega}` }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Mostrar la cantidad para el material seleccionado */}
            {selectedMaterial && (
                <Box sx={{ marginTop: 2 }}>
                    <TextField
                        label="Cantidad"
                        color='amarillo'
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        fullWidth
                        variant="outlined"
                    />
                </Box>
            )}

            {/* Botón para confirmar la selección */}
            <Button
                variant="contained"
                color="amarillo"
                sx={{ marginTop: 2 }}
                onClick={handleConfirm2} // Agregar el material seleccionado a las filas
            >
                Confirmar
            </Button>
        </Box>
    </Modal>
        
        
            


        </Box>
    )
};

export default AnadirVenta;
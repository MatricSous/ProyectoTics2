import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {v4} from 'uuid';
import {
    Snackbar,
    Alert,
    Grid2, 
    Button, 
    Box, 
    Fab, 
    Modal, 
    styled, 
    alpha, 
    ListItem,
    ListItemButton,
    ListItemText,
    BottomNavigation,
    BottomNavigationAction,
    InputBase,
    InputLabel,
    Typography,
    FormControl,
    NativeSelect,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Select
} from '@mui/material';
import { FixedSizeList } from 'react-window';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Buscar from './buscar';
import { imageDb} from '../../firebase';
import {uploadBytes, getDownloadURL, ref} from 'firebase/storage'
import * as xlsx from "xlsx";
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

//Lista de materiales






function renderRow(index, material, style, handleDetailOpen){
    return (
        <ListItem 
            style={style} 
            key={material.id_material} 
            component="div" 
            disablePadding 
            secondaryAction={
                <Fab aria-label="comment" size="small" variant="extended" onClick={() => handleDetailOpen(material)} color='azulamarillo'>
                    <MoreHorizIcon/> Ver más
                </Fab>
            }>
            <ListItemButton>
                <ListItemText primary={`${index + 1} ${material.nombre_material}`} />
                <ListItemText style={{paddingRight: 50}} primary={`${material.tipo_material}`} />
            </ListItemButton>
        </ListItem>

    );
}
//Lista de materiales




//Formulario de información
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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const categorias = [
    { label: "Tornillos", value: "Tornillos" },
    { label: "Pinturas", value: "Pinturas" },
    { label: "Tapacantos", value: "Tapacantos" },
    
];



function InfoForm({ 
    foto, handleChangeFoto,
    nombre, handleChangeNombre, 
    descripcion, handleChangeDescripcion, 
    codigo, handleChangeCodigo, 
    categoria, iva, 
    discontinuado, secompra, sevende, 
    handleChangeCategoria, handleChangeIVA, 
    handleChangeDiscontinuado, handleChangeSecompra, handleChangeSevende
}) {

    return (
        <>
            <Box
                component="form"
                noValidate
                sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}
            >
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Código
                    </InputLabel>
                    <BootstrapInput id="codigo" value={codigo} onChange={handleChangeCodigo} />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Nombre del material
                    </InputLabel>
                    <BootstrapInput id="nombre" value={nombre} onChange={handleChangeNombre} />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="demo-customized-select-label">
                        Categoría
                    </InputLabel>
                    <NativeSelect
                        id="categoria"
                        value={categoria}
                        onChange={handleChangeCategoria}
                        input={<BootstrapInput />}
                    >
                        {categorias.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </Box>

            <Box
                component="form"
                noValidate
                sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 3 }}
            >
                <Grid2 container alignItems="center" spacing={1}>
                    <Grid2 item>
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel shrink htmlFor="iva">
                                IVA
                            </InputLabel>
                            <BootstrapInput 
                                id="iva" 
                                value={iva} 
                                onInput={handleChangeIVA} // Cambiado de onChange a onInput
                                sx={{ width: 70 }} 
                                inputProps={{ maxLength: 2 }} // Limitar a 2 dígitos
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 item>
                        <Typography>%</Typography>
                    </Grid2>
                </Grid2>
                
                <Grid2 container alignItems="center">
                    <Grid2 item large>
                        <FormControl sx={{ m: 1, width: '100%', minWidth: 543, right: 100 }} variant="standard">
                            <InputLabel shrink htmlFor="descripcion">
                                Descripción
                            </InputLabel>
                            <BootstrapInput 
                                id="descripcion" 
                                value={descripcion} 
                                onChange={handleChangeDescripcion} 
                                inputProps={{ maxLength: 100 }} // Limitar a 100 caracteres
                            />
                        </FormControl>
                    </Grid2>
                </Grid2>
            </Box>

            <Box
                component="form"
                noValidate
                sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 3 }}
            >
                <FormControlLabel 
                    sx={{ m: 1 }} 
                    control={<Checkbox checked={discontinuado} onChange={handleChangeDiscontinuado} />} 
                    label="Discontinuado" 
                />
                <FormControlLabel 
                    sx={{ m: 1 }}
                    control={<Checkbox checked={secompra} onChange={handleChangeSecompra} />} 
                    label="Se compra" 
                />
                <FormControlLabel 
                    sx={{ m: 1 }} 
                    control={<Checkbox checked={sevende} onChange={handleChangeSevende} />} 
                    label="Se vende" 
                />             
            </Box>

            <Button
                sx={{ m: 1 }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                color="primary"
            >
                Subir foto
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleChangeFoto}
                />
            </Button>
        </>
    );
}



//Formulario de precios
const currencies = [
    {
        value: '',
        label: '',
    },
    {
        value: 'CLP',
        label: 'Peso Chileno',
    },
    {
        value: 'USD',
        label: 'Dolar',
    },
    {
        value: 'EUR',
        label: 'Euro',
    },
    {
        value: 'BTC',
        label: 'Bitcoin',
    },
    {
        value: 'JPY',
        label: 'Yen',
    },
];

function PrecioForm({dctoMax, handleChangeDctoMax, moneda, unitario, coniva, costo, modificable, handleChangeMoneda, handleChangeUnitario, handleChangeConiva, handleChangeCosto, handleChangeModificable }) {
    return (
        <>
            <Box
                component="form"
                noValidate
                sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr 1fr' }, gap: 4 }}
            >
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="demo-customized-select-label">
                        Moneda
                    </InputLabel>
                    <NativeSelect
                        id="moneda"
                        value={moneda}
                        onChange={handleChangeMoneda}
                        input={<BootstrapInput />}
                    >
                        {/* Genera las opciones de categoría a partir del arreglo */}
                        {currencies.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Precio unitario
                    </InputLabel>
                    <BootstrapInput
                        id="preciounitario"
                        value={unitario}
                        onChange={handleChangeUnitario}
                    />
                </FormControl>


                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Costo compra
                    </InputLabel>
                    <BootstrapInput
                        id="costocompra"
                        value={costo}
                        onChange={handleChangeCosto}
                    />
                </FormControl>
            </Box>
            <Box component="form" noValidate>
                <FormControlLabel
                    sx={{ m: 1 }}
                    id="modificaprecio"
                    control={<Checkbox checked={modificable} onChange={handleChangeModificable} />}
                    label="Se puede modificar precio"
                />
            </Box>
            <Box>
                    {modificable ? 
                        <Box
                            component="form"
                            noValidate
                            sx={{display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}
                        >
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Descuento Maximo
                                </InputLabel>
                                <BootstrapInput id="dctoMax"
                                value={dctoMax}
                                onChange={handleChangeDctoMax} />
                            </FormControl>

                        </Box>
                    : ''}

                </Box>
        </>
    );
}




//Formulacio de stock
function StockForm({ unidad_medida, handleChangeUnidadMedida, unidad_alternativa, handleChangeUnidadAlternativa, factor, handleChangeFactor, afecto, handleChangeAfecto, 
    stockMinimo, handleChangeStockMinimo, stockMaximo, handleChangeStockMaximo }) {

    return(
        <>
            <Box
                component="form"
                noValidate
            >
                <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}>
                    <FormControl sx={{ m: 2 }} variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Unidad de medida
                        </InputLabel>
                        <BootstrapInput id="unidad de medida"  
                        value={unidad_medida}
                        onChange={handleChangeUnidadMedida} />
                    </FormControl>

                    <FormControl sx={{ m: 2 }} variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Unidad Alternativa
                        </InputLabel>
                        <BootstrapInput id="unidad alternativa"
                        value={unidad_alternativa}
                        onChange={handleChangeUnidadAlternativa}
                         />
                    </FormControl>

                    <FormControl sx={{ m: 2 }} variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Factor
                        </InputLabel>
                        <BootstrapInput id="factor"
                        value={factor}
                        onChange={handleChangeFactor} />
                    </FormControl>

                    

                </Box>

                <Box>
                    {afecto ? 
                        <Box
                            component="form"
                            noValidate
                            sx={{display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}
                        >
                            <FormControl sx={{ m: 2 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Stock mínimo
                                </InputLabel>
                                <BootstrapInput id="stockminimo"
                                value={stockMinimo}
                                onChange={handleChangeStockMinimo} />
                            </FormControl>

                            <FormControl sx={{ m: 2 }} variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Stock máximo
                                </InputLabel>
                                <BootstrapInput id="stockmaximo"
                                value={stockMaximo}
                                onChange={handleChangeStockMaximo} />
                            </FormControl>
                        </Box>
                    : ''}
                    <FormControl>
                        <FormControlLabel
                            sx={{ m: 1 }} 
                            id="afectostock"
                            control={<Checkbox checked={afecto} onChange={handleChangeAfecto} />}
                            label="Afecto a stock" 
                        />
                    </FormControl>
                </Box>
            </Box>
            
        </>
    );
};
//Formulario de stock




//Modal de detalle
function DetailModal({ open, handleClose }) {
    
    return (
      <React.Fragment>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
          >
              <Box sx={{ ...style, width: 400 }}>
                <Grid2 container alignItems="center" justifyContent="space-between">
                    <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                        <h2 id="parent-modal-title">Detalles</h2>
                    </Grid2>

                    <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                        <Button onClick={handleClose}>
                            <HighlightOffIcon style={{color: '#b71c1c'}}/>
                        </Button>
                    </Grid2>
                </Grid2>
              </Box>


          </Modal>
      </React.Fragment>
    );
  }


//Modal de agregar material
function ChildModal({ open, handleClose }) {
    const token = localStorage.getItem('token');
    const [value, setValue] = React.useState('info');
    const [showSaveMessage, setShowSaveMessage] = React.useState(false);

    //valores para info
    const [nombre, setNombre] = React.useState('');
    const [descripcion, setDescripcion] = React.useState('');
    const [codigo, setCodigo] = React.useState('');
    const [categoria, setCategoria] = React.useState('');
    const [discontinuado, setDiscontinuado] = React.useState(false);
    const [secompra, setSecompra] = React.useState(false);
    const [sevende, setSevende] = React.useState(false);

    //valores para precio
    const [moneda, setMoneda] = React.useState('');
    const [iva, setIVA] = React.useState(19);
    const [unitario, setUnitario] = React.useState('');
    const [coniva, setConiva] = React.useState('');
    const [costo, setCosto] = React.useState('');
    const [modificable, setModificable] = React.useState(false);
    const [dctoMax, setDctoMax] = useState(10);



    //valores para stock
    const [unidad_medida, setUnidadMedida] = React.useState('');
    const [unidad_alternativa, setUnidadAlternativa] = React.useState('');
    const [factor, setFactor] = React.useState(1);
    const [stockMinimo, setStockMinimo] = useState();
    const [stockMaximo, setStockMaximo] = useState();
    const [afecto, setAfecto] = useState(false);

    //foto
    const [foto, setFoto] = useState('')
    const [linkFoto, setLinkFoto] = useState('NF')

    //subir excel

    const [arregloExcel, setArregloExcel] = useState('');
 
    useEffect(() => {
        if (open) {
            setValue('info');
            setShowSaveMessage(false);
        }
    }, [open]);


    const handleChangeFoto = (event) => {
        console.log("handle foto")
        const file = event.target.files[0];
        setFoto(file); // Actualiza el estado
        //const imgRef = ref(imageDb, `fotos/${v4()}`);
        
        setLinkFoto("fotoSubida.Com")
    }
    
    
    const handleChangeLinkFoto = (event) =>{
        setLinkFoto(event.target.value);
    }

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const handleChangeDescripcion = (event) => {
        const value = event.target.value;
        if (value.length <= 100) {
            setDescripcion(value); // Llama al manejador si es válido
        }
    };

    const handleChangeCodigo = (event) => {
        setCodigo(event.target.value);
    };

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };


    const handleChangeMoneda = (event) => {
        setMoneda(event.target.value);
    };

    const handleChangeIVA = (event) => {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, ''); // Permite solo dígitos
        if (numericValue.length <= 2) {
            setIVA(numericValue); // Llama al manejador si es válido
        }
    };
    const handleChangeDiscontinuado = () => setDiscontinuado(prev => !prev);
    const handleChangeSecompra = () => setSecompra(prev => !prev);
    const handleChangeSevende = () => setSevende(prev => !prev);

    const handleChangeUnitario = (event) => {
        setUnitario(event.target.value);
    };

    const handleChangeConiva = (event) => {
        setConiva(event.target.value);
    };

    const handleChangeCosto = (event) => {
        setCosto(event.target.value);
    };

    const handleChangeModificable = () => setModificable(prev => !prev);

    const handleChangeDctoMax = (event) => {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, ''); // Permite solo dígitos
        if (numericValue.length <= 2) {
            setDctoMax(numericValue); // Llama al manejador si es válido
        }
    };

    const handleChangeUnidadMedida = (event) => {
        setUnidadMedida(event.target.value);
    };

    const handleChangeUnidadAlternativa= (event) => {
        setUnidadAlternativa(event.target.value);
    };

    const handleChangeFactor = (event) =>{
        setFactor(event.target.value);
    }
    const handleChangeAfecto = () => setAfecto(prev => !prev);

    const handleChangeStockMinimo = (event) => {
        const value = event.target.value;
        console.log(value)
        const numericValue = value.replace(/\D/g, '');
        console.log(numericValue) // Permite solo dígitos

        if (numericValue.length <= 5 ){
            setStockMinimo(numericValue)
        }
    };

    
    const handleChangeStockMaximo = (event) => {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, ''); // Permite solo dígitos
        if (numericValue.length <= 0) {
            setStockMaximo(0); // Llama al manejador si es válido
        }
        else if (numericValue.length <= 5){
            setStockMaximo(numericValue)
        }
    };
    
    
    const renderMessage = () => {
        switch (value) {
            case 'info':
                return <InfoForm
                    categoria={categoria} 
                    iva={iva} 
                    discontinuado={discontinuado} 
                    secompra={secompra} 
                    sevende={sevende}
                    nombre = {nombre}
                    descripcion = {descripcion}
                    codigo = {codigo}
                    foto = {foto}
                    handleChangeNombre={handleChangeNombre}
                    handleChangeCategoria={handleChangeCategoria} 
                    handleChangeIVA={handleChangeIVA} 
                    handleChangeDiscontinuado={handleChangeDiscontinuado} 
                    handleChangeSecompra={handleChangeSecompra} 
                    handleChangeSevende={handleChangeSevende}
                    handleChangeDescripcion = {handleChangeDescripcion}
                    handleChangeCodigo = {handleChangeCodigo}
                    handleChangeFoto={handleChangeFoto}
                />;
            case 'precio':
                return <PrecioForm 
                    moneda={moneda}
                    unitario={unitario} 
                    coniva={coniva} 
                    costo={costo} 
                    modificable={modificable} 
                    categoria = {categoria}
                    dctoMax = {dctoMax}
                    handleChangeCategoria = {handleChangeCategoria}
                    handleChangeMoneda={handleChangeMoneda} 
                    handleChangeUnitario={handleChangeUnitario} 
                    handleChangeConiva={handleChangeConiva} 
                    handleChangeCosto={handleChangeCosto} 
                    handleChangeModificable={handleChangeModificable}
                    handleChangeDctoMax={handleChangeDctoMax}
                />;
            case 'stock':
                return <StockForm 
                    unidad_medida={unidad_medida}
                    unidad_alternativa={unidad_alternativa}
                    factor={factor}
                    afecto={afecto}
                    stockMaximo={stockMaximo}
                    stockMinimo={stockMinimo}
                    handleChangeUnidadMedida={handleChangeUnidadMedida}
                    handleChangeUnidadAlternativa={handleChangeUnidadAlternativa}
                    handleChangeFactor={handleChangeFactor}
                    handleChangeAfecto={handleChangeAfecto}
                    handleChangeStockMaximo={handleChangeStockMaximo}
                    handleChangeStockMinimo={handleChangeStockMinimo}
                
                />;
            default:
                return "";
        }
    };
    const handleGuardar = async () => {
        const material = {
            "codigo_material": codigo,
            "nombre_material": nombre,
            "tipo_material": categoria,
            "valor_iva": iva,
            "descripcion_material": descripcion,
            discontinuado,
            "seCompra": secompra,
            "seVende": sevende,
            moneda,
            "precio_material": unitario,
            costo,
            "modificar_precio": modificable,
            "descuento_maximo": dctoMax,
            unidad_medida,
            unidad_alternativa,
            factor,
            afecto,
            stockMinimo,
            stockMaximo,
            "foto_material": linkFoto

        };

        console.log("Enviando solicitud POST a /materiales/crearMaterial con los datos:", material);


        try {
            await axios.post('http://localhost:8081/materiales/crearMaterial', material, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowSaveMessage(true); // Muestra mensaje de guardado exitoso
        } catch (error) {
            console.error('Error al guardar el material:', error);
        }
    };

    const handleNext = () => {
        if (value === 'info') {
            setValue('precio');
        } else if (value === 'precio'){
            setValue('stock');
        } else {
            handleGuardar();
            setTimeout(() => handleClose, 3000); // Oculta el mensaje después de 3 segundos

        }
    };

    const columnasEsperadas = ["columna 1", "columna 2", "prueba"]; // Agrega los nombres de columnas esperados
    const [mensaje, setMensaje] = useState({ texto: "", color: "" });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const subirExcel = (e) => {

        e.preventDefault();

        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

                // Obtener nombres de columnas del archivo
                const nombresColumnas = json[0];
                
                // Validar que las columnas coincidan con las esperadas
                const esValido = columnasEsperadas.every((col) => nombresColumnas.includes(col));

                if (esValido) {
                    // Convertir el contenido a JSON y mostrar mensaje de éxito
                    const productos = xlsx.utils.sheet_to_json(worksheet);
                    console.log(productos);
                    setMensaje({ texto: "Productos agregados exitosamente!", color: "success" });
                } else {
                    setMensaje({ texto: "La plantilla no cuenta con el formato correcto", color: "error" });
                }
                
                // Abrir la notificación
                setOpenSnackbar(true);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    


    const handleBack = () => {
        if (value === 'precio') {
            setValue('info');
        } else if (value === 'stock'){
            setValue('precio');
        }
    };

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        // Abre el explorador de archivos al hacer clic en el botón
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Llama a la función SubirExcel con el archivo seleccionado
            subirExcel(file);
        }
    };


    const isLastTab = value === 'stock';
    const isFirstTab = value === 'info';

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 700 }}>
                    <Grid2 container alignItems="center" justifyContent="space-between">
                        <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                            <h2 id="child-modal-title">Agregar nuevo material</h2>
                        </Grid2>

                        <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                            <Button onClick={handleClose}>
                                <HighlightOffIcon style={{color: '#b71c1c'}}/>
                            </Button>
                        </Grid2>
                    </Grid2>

                    <BottomNavigation
                        sx={{ width: 700,  bgcolor: "#e5e5e5"}} 
                        value={value} 
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction 
                            label="Información"
                            style={{
                                color: value === 'info' ? '#093d77' : 'gray',
                            }} 
                            value="info" 
                            icon={<InfoIcon sx={{
                                color: value === 'info' ? '#093d77' : 'gray',
                            }}/>} 
                             
                        />
                        <BottomNavigationAction 
                            label="Precio" 
                            value="precio" 
                            style={{
                                color: value === 'precio' ? '#093d77' : 'gray',
                            }} 
                            icon={<AttachMoneyIcon sx={{
                                color: value === 'precio' ? '#093d77' : 'gray',
                            }} />} 
                        />
                        <BottomNavigationAction 
                            label="Stock"
                            value="stock" 
                            style={{
                                color: value === 'stock' ? '#093d77' : 'gray',
                            }} 
                            icon={<ProductionQuantityLimitsIcon sx={{
                                color: value === 'stock' ? '#093d77' : 'gray',
                            }} />} 
                        />
                    </BottomNavigation>

                    <Box mt={2}>
                        <Typography variant="body1" align="center">
                            {renderMessage()}
                        </Typography>
                    </Box>
                    
                    {showSaveMessage && (
                        <Box mt={2}>
                            <Typography variant="body1" color="success.main" align="center">
                                Los cambios han sido guardados exitosamente.
                            </Typography>
                        </Box>
                    )}
                    <Box mt={2} display="flex" justifyContent="space-between">
                                {/* Botón izquierdo */}
                                {isFirstTab ? (
                                    <>
                                        <Button variant="contained" onClick={handleUploadClick} color="success">
                                            Subir Excel
                                        </Button>
                                        {/* Campo de entrada de archivo oculto */}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={subirExcel}
                                            accept=".xlsx, .xls"
                                            style={{ display: 'none' }}
                                        />
                                    </>
                                ) : (
                                    <Button variant="contained" onClick={handleBack} color="amarillo">
                                        Anterior
                                    </Button>
                                )}

                                {/* Botón derecho */}
                                <Button variant="contained" onClick={handleNext} color={isLastTab ? "success" : "amarillo"}>
                                    {isLastTab ? "Guardar" : "Siguiente"}
                                </Button>
                        </Box>

                </Box>
            </Modal>
        </React.Fragment>
    );
}




//Modal principal
export default function NestedModalProductos({open, handleClose}) {
    const [materiales, setMateriales] = useState([]);
   

    const [childOpen, setChildOpen] = React.useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);

    const [detailOpen, setDetailOpen] = React.useState(false);
    const handleDetailOpen = () => setDetailOpen(true);
    const handleDetailClose = () => setDetailOpen(false);

    const [ordenarPor, setOrdenarPor] = useState('nombre');

    const ordenarMateriales = (materiales) => {
        return [...materiales].sort((a, b) => {
            if (ordenarPor === 'nombre') {
                return a.nombre_material.localeCompare(b.nombre_material);
            } else if (ordenarPor === 'categoria') {
                return a.tipo_material.localeCompare(b.tipo_material);
            }
            return 0;
        });
    };

    
   
    const token = localStorage.getItem('token');


        // Función para obtener la lista de materiales cuando se abre el modal
    useEffect(() => {
        console.log(token)
        if (open && token) {
            console.log("enviando get")
            axios.get('http://localhost:8081/materiales/verMateriales', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => setMateriales(response.data.materiales))
            .catch(error => console.error('Error al obtener materiales:', error));
        }
    }, [open]);

    useEffect(() => {
        console.log("Materiales actualizados:", materiales);
    }, [materiales]); // Este efecto se ejecutará cada vez que 'materiales' cambie

    const [busqueda, setBusqueda] = useState('');
    const materialesFiltrados = materiales.filter(
        (material) => 
            material.nombre_material.toLowerCase().includes(busqueda.toLowerCase()) || 
            material.categoria_material.toLowerCase().includes(busqueda.toLowerCase())
    );
    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
    };

    const materialesOrdenados = ordenarMateriales(materialesFiltrados);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
            <Grid2 container alignItems="center" justifyContent="space-between">
                <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                    <h2 id="parent-modal-title">Productos</h2>
                </Grid2>

                <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                    <Button onClick={handleClose}>
                        <HighlightOffIcon style={{color: '#b71c1c'}}/>
                    </Button>
                </Grid2>
            </Grid2>

            <Grid2 container alignItems="center" justifyContent="space-between">
                <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                    <Fab color="amarillo" aria-label="add" variant="extended" onClick={handleChildOpen}>
                        <AddIcon/>Agregar
                    </Fab>
                </Grid2>

                <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                    <Buscar/>
                </Grid2>
            </Grid2>

            <Box
                sx={{ width: '100%', marginTop:2, height: 400, maxWidth: 500, bgcolor: '#e5e5e5' }}
            >
                <FormControl variant="standard">
                    <InputLabel htmlFor="ordenar-select">Ordenar por</InputLabel>
                    <Select
                        value={ordenarPor}
                        onChange={(e) => setOrdenarPor(e.target.value)}
                        inputProps={{ id: 'ordenar-select' }}
                    >
                        <MenuItem value="nombre">Nombre</MenuItem>
                        <MenuItem value="categoria">Categoría</MenuItem>
                    </Select>
                </FormControl>

                <FixedSizeList
                    height={370}
                    width={500}
                    itemSize={46}
                    itemCount={materialesOrdenados.length}
                    overscanCount={5}
                >
                    
                    {({ index, style }) => (
                        renderRow(
                            index,
                            materialesOrdenados[index],
                            style,
                            handleDetailOpen
                        )
                    )}
                
                </FixedSizeList>
            </Box>
            <ChildModal open={childOpen} handleClose={handleChildClose} />
            <DetailModal open={detailOpen} handleClose={handleDetailClose} />
        </Box>
      </Modal>
    </div>
  );
}

//{({ index, style }) => (
//    renderRow({
//        index,
//        style,
//        handleDetailOpen
//    })
//)}
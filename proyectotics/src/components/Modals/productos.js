import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Grid2, 
    Button, 
    Box, 
    Fab, 
    Modal, 
    styled, 
    alpha, 
    BottomNavigation,
    BottomNavigationAction,
    InputBase,
    InputLabel,
    Typography,
    FormControl,
    NativeSelect,
    FormControlLabel,
    Checkbox,
    Paper,
    Toolbar,
    Divider,
    List,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { imageDb} from '../../firebase';
import {uploadBytes, getDownloadURL, ref} from 'firebase/storage'
import * as xlsx from "xlsx";
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../images/LOGOrial.png'; // Ajusta la ruta de tu logo
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { TbTrolley } from "react-icons/tb";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NestedModalSubirExcel from './subirexcel';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import { 
    AspectRatio,
    Card,
    CardActions,
    CardContent,
    CardOverflow,
    CssVarsProvider,
    Textarea,
    IconButton as JoyIconButton,
    Typography as JoyTypography
} from '@mui/joy';

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

const style2 = {
    p:0,
    width: '100%',
    maxWidth: '100%',
    border: '1px solid #daa520',
    borderRadius: 2,
    borderColor: 'divider',
    marginTop: '20px',
    backgroundColor: '#daa520'
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
    descontinuado, secompra, sevende, 
    agregarCategoria,
    handleChangeCategoria, handleChangeIVA, 
    handleChangeDescontinuado, handleChangeSecompra, handleChangeSevende,
    handleChangeAgregarCategoria
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
            </Box>

            <Box>
                <Grid2 container alignItems="center" spacing={1}>
                    <Grid2 container alignItems="center" spacing={1} sx={{marginRight: 2}}>
                        <Grid2 item>
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel shrink htmlFor="iva">
                                    IVA
                                </InputLabel>
                                <BootstrapInput 
                                    id="iva" 
                                    value={iva} 
                                    onInput={handleChangeIVA} // Cambiado de onChange a onInput
                                    sx={{ width: 150}} 
                                    inputProps={{ maxLength: 2 }} // Limitar a 2 dígitos
                                />
                            </FormControl>
                        </Grid2>
                        <Grid2 item>
                            <Typography sx={{marginTop: 3 }}>%</Typography>
                        </Grid2>
                    </Grid2>

                    <Grid2 xs={4}>
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel shrink htmlFor="demo-customized-select-label">
                                Categoría
                            </InputLabel>
                            {agregarCategoria ? 
                                <BootstrapInput id="categoria" value={categoria} onChange={handleChangeCategoria} sx={{ width: 330 }}/>
                            : <NativeSelect
                                id="categoria"
                                value={categoria}
                                onChange={handleChangeCategoria}
                                input={<BootstrapInput />}
                                sx={{ width: 330 }}
                              >
                                {categorias.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </NativeSelect>
                            }
                        </FormControl>
                    </Grid2>
                    <Grid2>
                    {agregarCategoria ?
                        <Button
                            sx={{ m: 1, width: 115, height: 45, fontSize: 11, marginTop: 4}}
                            variant="contained"
                            startIcon={<SyncAltIcon sx={{marginLeft: 0}}/>}
                            color="negro"
                            onClick={handleChangeAgregarCategoria}
                        >
                            Seleccionar Categoría
                        </Button>
                    : <Button
                            sx={{ m: 1, width: 115, height: 45, fontSize: 11, marginTop: 4 }}
                            variant="contained"
                            startIcon={<AddIcon />}
                            color="negro"
                            onClick={handleChangeAgregarCategoria}
                        >
                            Añadir Categoría
                        </Button>
                    }
                    </Grid2>
                </Grid2>
            </Box>

            <FormControl sx={{ m: 1, width: '98%', minWidth: 543}} variant="standard">
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

            <Box
                component="form"
                noValidate
                sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 3 }}
            >
                <FormControlLabel 
                    sx={{ m: 1 }} 
                    control={<Checkbox checked={descontinuado} onChange={handleChangeDescontinuado} />} 
                    label="Descontinuado" 
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
                color="negro"
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

function PrecioForm({dctoMax, handleChangeDctoMax, moneda, unitario, costo, modificable, handleChangeMoneda, handleChangeUnitario, handleChangeCosto, handleChangeModificable }) {
    return (
        <>
            <Box
                component="form"
                noValidate
                sx={{ display: 'grid', gridTemplateColumns: { sm: modificable ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'}, gap: modificable ? 4 : 3 }}
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
                
                {modificable ?

                <Grid2 container alignItems="center" spacing={1}>
                <Grid2 item>
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Descuento Máximo
                        </InputLabel>
                        <BootstrapInput 
                            id="dctoMax"
                            value={dctoMax}
                            sx={{ width: 110}} 
                            onChange={handleChangeDctoMax} 
                        />
                    </FormControl>  
                </Grid2>
                <Grid2 item>
                    <Typography sx={{marginTop: 3 }}>%</Typography>
                </Grid2>
            </Grid2>
            : '' }

            </Box>
            <FormControlLabel
                sx={{ m: 1, marginTop: 4, marginRight:8 }}
                id="modificaprecio"
                control={<Checkbox checked={modificable} onChange={handleChangeModificable} />}
                label="Se puede modificar precio"
            />
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
                <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr' }, gap: 3 }}>
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

//Modal de excel

function Editar(param, ancho, color){
    return(
        <Textarea
            minRows={2}
            variant="soft"
            value={param}
            sx={{
            borderBottom: '2px solid #d5951d',
            borderColor: color,
            borderRadius: 0,
            width: ancho,
            height: 35,
            background: 'transparent',
            color: color,
            marginBottom: 1,
            '&::before': {
                border: '2px solid #d5951d',
                transform: 'scaleX(0)',
                left: 0,
                right: 0,
                bottom: '-2px',
                top: 'unset',
                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                borderRadius: 0,
            },
            '&:focus-within::before': {
                transform: 'scaleX(1)',
            },
            }}
        />
    );
}


function Transforma(valor){
    if (valor === true){
        valor = 'Si';
    }else{
        valor = 'No'
    }

return(
    valor
);
}

//Modal de detalle
function DetailModal({ open, handleClose, material, handleSelectInfo, selectInfo, handleSelectPrecio, selectPrecio, handleSelectStock, selectStock, selectDescrip, handleSelectDescrip, selectTitulo, handleSelectTitulo}) {
    if (!material) return null;
    let descontinuado = false;
    if (material.valor === true) {descontinuado = true};    
    let secompra = false;
    if (material.valor === true) {secompra = true};   
    let sevende = false;
    if (material.valor === true) {sevende = true};   
    let modificable = false;
    if (material.valor === true) {modificable = true}; 
    let afecto = false;
    if (material.valor === true) {afecto = true};  

    return (
      <React.Fragment>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
          >
              <Box 
                sx={{ 
                    ...style,
                    width: { xs: '90%', sm: '83%', md: '59%', lg: '48%' },
                    maxHeight: '90vh', // Limita la altura
                    overflowY: 'auto', // Agrega scroll en caso de contenido extenso
                    displey: 'flex',
                    overflowX: 'auto'
                }}
            >
                <Grid2 container alignItems="center" justifyContent="space-between">
                    <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                    <CssVarsProvider>
                        <JoyTypography level={selectTitulo ? "title-sm" : "title-lg"} component={selectTitulo ? "h6" : "h2"} sx={{ display: 'flex', alignItems: 'center', paddingBottom: 1}}>
                            {selectTitulo ? 
                            <>
                                <JoyTypography sx={{ paddingTop: 1}}>
                                    Nombre: &nbsp;
                                </JoyTypography>
                                {Editar(material.nombre_material, 200, 'black')}
                                &nbsp;

                                <JoyTypography sx={{ paddingTop: 1}}>
                                Código: &nbsp;
                                </JoyTypography>
                                {Editar(material.codigo, 150, 'black')}
                                </>
                                :
                                <>
                                {material.nombre_material} - {material.codigo}
                            </>
                            }
                            {selectTitulo ?
                            <>
                                <JoyIconButton
                                    aria-label="Edit" 
                                    sx={{
                                        "--IconButton-size": "38px",
                                        paddingLeft: 1,  
                                        color: '#093d77',
                                        '&:hover': {
                                            color: 'green',
                                            bgcolor: 'transparent'
                                        },
                                    }} 
                                    onClick={handleSelectTitulo}
                                >
                                    <CheckIcon sx={{ color: 'inherit' }}/>
                                </JoyIconButton>
                                <JoyIconButton
                                    aria-label="Edit" 
                                    sx={{
                                        "--IconButton-size": "38px",
                                        color: '#093d77',
                                        '&:hover': {
                                            color: '#b5301b',
                                            bgcolor: 'transparent'
                                        },
                                    }} 
                                    onClick={handleSelectTitulo}
                                >
                                    <CancelIcon sx={{ color: 'inherit' }}/>
                                </JoyIconButton>
                            </>    
                            : 
                                <JoyIconButton
                                    aria-label="Edit" 
                                    sx={{
                                        "--IconButton-size": "35px",
                                        paddingLeft: 1,  
                                        color: '#093d77', 
                                        '&:hover': {
                                            color: '#d5951d',
                                            bgcolor: 'transparent'
                                        },
                                    }} 
                                    onClick={handleSelectTitulo}
                                >
                                    <EditIcon sx={{ color: 'inherit' }}/>
                                </JoyIconButton>
                            }    
                        </JoyTypography>
                    </CssVarsProvider>
                    </Grid2>

                    <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                        <Button onClick={handleClose}>
                            <HighlightOffIcon style={{color: '#b71c1c'}}/>
                        </Button>
                    </Grid2>
                </Grid2>

                <Grid2 item style={{ textAlign: 'center',  justifyContent: 'center', alignItems: 'center' }}>
                    <Grid2 item xs={4} style={{ justifyContent: 'center' }}>
                        <img src={logo} alt="foto" style={{ width: '140px', height: '150px', border: '2px solid #093d77'}} />
                        {selectDescrip ? 
                            <div style={{paddingTop: 8}}>
                                <Button 
                                    startIcon={
                                        <ChangeCircleIcon 
                                            style={{ fontSize: '16px', paddingTop: 3 }}
                                        />
                                    } 
                                    variant="outlined" 
                                    size="sm" 
                                    color= '#daa520'
                                    sx={{
                                        color: '#daa520',
                                        '&:hover': {
                                            color: '#d5951d',
                                        },
                                    }}
                                >
                                    Cambiar foto
                                </Button>
                            </div>
                        : ''}
                    </Grid2>
                    <Grid2 item xs={6} style={{ textAlign: 'center', paddingLeft:'12px', display:'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 2 }}>
                        <CssVarsProvider>
                            <JoyTypography sx={{ marginRight: 1 }}>Descripción:</JoyTypography>
                            {selectDescrip ? 
                            <>
                                {Editar(material.codigo, 350, 'black')}
                            </>
                            : 
                            <>
                                {material.codigo}
                            </>
                            }
                            {selectDescrip ?
                            <>
                                <JoyIconButton 
                                    aria-label="Edit" 
                                    sx={{
                                        "--IconButton-size": "30px",
                                        paddingLeft: 1,  
                                        color: '#093d77',
                                        mt: 0.5,
                                        '&:hover': {
                                            color: 'green',
                                            bgcolor: 'transparent'
                                        },
                                    }} 
                                    onClick={handleSelectDescrip}
                                >
                                    <CheckIcon sx={{ color: 'inherit' }}/>
                                </JoyIconButton>
                                <JoyIconButton 
                                    aria-label="Edit" 
                                    sx={{
                                        "--IconButton-size": "26px",
                                        color: '#093d77',
                                        mt: 0.5,
                                        '&:hover': {
                                            color: '#b5301b',
                                            bgcolor: 'transparent'
                                        },
                                    }} 
                                    onClick={handleSelectDescrip}
                                >
                                    <CancelIcon sx={{ color: 'inherit' }}/>
                                </JoyIconButton>
                            </>
                            : 
                                <JoyIconButton 
                                    aria-label="Edit" 
                                    sx={{
                                        "--IconButton-size": "24px",
                                        paddingLeft: 1,  
                                        paddingBottom: 1,
                                        color: '#093d77', 
                                        mt: 0.5,
                                        '&:hover': {
                                            color: '#d5951d',
                                            bgcolor: 'transparent'
                                        },
                                    }} 
                                    onClick={handleSelectDescrip}
                                >
                                    <EditIcon sx={{ color: 'inherit' }}/>
                                </JoyIconButton>
                            }
                        </CssVarsProvider>
                    </Grid2>

                    <List sx={style2}>
                        <Divider component="li" />
                    </List>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',  // 3 cards per row
                            gap: 6,  // space between cards
                            paddingTop: 6,
                            paddingBottom: 0,
                            paddingLeft: 1,
                            paddingRight: 6,
                            overflow: 'hidden',  // Prevent overflow
                        }}
                    >
                        <CssVarsProvider>
                            <Card
                                data-resizable
                                sx={{
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    overflow: 'visible',
                                    '--icon-size': '100px',
                                    boxShadow: 'md', // Optional, adjust the card shadow
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center', // Centers content in the card
                                    position: 'relative', // Se añadió para poder posicionar el ícono encima
                                    bgcolor: '#093d77',
                                }}
                            >
                                <AspectRatio
                                    variant="outlined"
                                    color="warning"
                                    ratio="1"
                                    sx={{
                                        m: 'auto',
                                        transform: 'translateY(-20%)', // Ajuste para que quede fuera del borde superior
                                        borderRadius: '50%',
                                        width: '70px',
                                        boxShadow: 'sm',
                                        bgcolor: 'background.surface',
                                        position: 'absolute',
                                        top: '-30px',  // Ajusta para que la mitad del ícono salga del card
                                        zIndex: 10, // Asegura que el ícono esté por encima del card
                                    }}
                                >
                                    <InfoIcon sx={{color: '#daa520'}}/>
                                </AspectRatio>
                                <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 6)', color: 'white', paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                                    Información
                                    {selectInfo ?
                                    <>
                                        <JoyIconButton 
                                            aria-label="Edit" 
                                            sx={{
                                                "--IconButton-size": "30px",
                                                paddingLeft: 1,  
                                                color: 'white',
                                                mt: 0.5, 
                                                '&:hover': {
                                                    color: '#2fd407',
                                                    bgcolor: 'transparent'
                                                },
                                            }} 
                                            onClick={handleSelectInfo}
                                        >
                                            <CheckIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                        <JoyIconButton
                                            aria-label="Edit" 
                                            sx={{
                                                "--IconButton-size": "26px",
                                                color: 'white',
                                                mt: 0.5, 
                                                '&:hover': {
                                                    color: '#b5301b',
                                                    bgcolor: 'transparent'
                                                },
                                            }} 
                                            onClick={handleSelectInfo}
                                        >
                                            <CancelIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                    </>
                            
                                    : 
                                        <JoyIconButton 
                                            aria-label="Edit" 
                                                sx={{
                                                    "--IconButton-size": "26px",
                                                    paddingLeft: 1,  
                                                    color: 'white', 
                                                    mt: 0.5,
                                                    '&:hover': {
                                                        color: '#d5951d',
                                                        bgcolor: 'transparent'
                                                    },
                                                }} 
                                                onClick={handleSelectInfo}
                                        >
                                            <EditIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                    }

                                </Typography>
                                <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px' }}>
                                    {selectInfo ?
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Categoría:</Typography>
                                            {Editar(material.categoria_material, 100, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>IVA:</Typography>
                                            {Editar(material.codigo, 48, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Descontinuado:</Typography>
                                            {Editar(Transforma(descontinuado), 48, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Se Compra:</Typography>
                                            {Editar(Transforma(secompra), 48, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Se Vende:</Typography>
                                            {Editar(Transforma(sevende), 48, 'white')}
                                        </Box>
                                    </>
                                    : 
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Categoría: {material.categoria_material}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>IVA: {material.codigo}%</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Descontinuado: {Transforma(descontinuado)}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Se Compra: {Transforma(secompra)}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Se Vende: {Transforma(sevende)}</Typography>
                                        </Box>
                                    </>
                                    }
                                </CardContent>
                            </Card>

                            <Card
                                data-resizable
                                sx={{
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    overflow: 'visible',
                                    '--icon-size': '100px',
                                    boxShadow: 'md', // Optional, adjust the card shadow
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center', // Centers content in the card
                                    position: 'relative', // Se añadió para poder posicionar el ícono encima
                                    bgcolor: '#093d77',
                                }}
                            >
                                <AspectRatio
                                    variant="outlined"
                                    color="warning"
                                    ratio="1"
                                    sx={{
                                        m: 'auto',
                                        transform: 'translateY(-20%)', // Ajuste para que quede fuera del borde superior
                                        borderRadius: '50%',
                                        width: '70px',
                                        boxShadow: 'sm',
                                        bgcolor: 'background.surface',
                                        position: 'absolute',
                                        top: '-30px',  // Ajusta para que la mitad del ícono salga del card
                                        zIndex: 10, // Asegura que el ícono esté por encima del card
                                    }}
                                >
                                    <MonetizationOnIcon sx={{color: '#daa520'}}/>
                                </AspectRatio>
                                <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 6)', color: 'white', paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                                    Precio
                                    {selectPrecio ?
                                    <>
                                        <JoyIconButton 
                                            aria-label="Edit" 
                                            sx={{
                                                "--IconButton-size": "30px",
                                                paddingLeft: 1,  
                                                color: 'white',
                                                mt: 0.5, 
                                                '&:hover': {
                                                    color: '#2fd407',
                                                    bgcolor: 'transparent'
                                                },
                                            }} 
                                            onClick={handleSelectPrecio}
                                        >
                                            <CheckIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                        <JoyIconButton
                                            aria-label="Edit" 
                                            sx={{
                                                "--IconButton-size": "26px",
                                                color: 'white',
                                                mt: 0.5, 
                                                '&:hover': {
                                                    color: '#b5301b',
                                                    bgcolor: 'transparent'
                                                },
                                            }} 
                                            onClick={handleSelectPrecio}
                                        >
                                            <CancelIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                    </>
                            
                                    : 
                                        <JoyIconButton 
                                            aria-label="Edit" 
                                            sx={{
                                                "--IconButton-size": "26px",
                                                paddingLeft: 1,  
                                                color: 'white', 
                                                mt: 0.5,
                                                '&:hover': {
                                                    color: '#d5951d',
                                                    bgcolor: 'transparent'
                                                },
                                            }} 
                                            onClick={handleSelectPrecio}
                                        >
                                            <EditIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                    }
                                </Typography>
                                <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px'  }}>
                                    {selectPrecio ? 
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Tipo de moneda:</Typography>
                                            {Editar(material.codigo, 48, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Precio unitario:</Typography>
                                            {Editar(material.codigo, 70, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Costo compra:</Typography>
                                            {Editar(material.codigo, 70, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Modificable:</Typography>
                                            {Editar(Transforma(modificable), 48, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Descuento máximo:</Typography>
                                            {Editar(material.codigo, 48, 'white')}
                                        </Box>
                                    </>
                                    :
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Tipo de moneda: {material.codigo}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Precio unitario: ${material.codigo}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Costo compra: ${material.codigo}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Modificable: {Transforma(modificable)}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {modificable ?
                                                <Typography component="span" sx={{ mr: 1 }}>Descuento máximo: {material.codigo}%</Typography>
                                            : ''                           
                                            }
                                        </Box>
                                    </>
                                    }
                                </CardContent>
                            </Card>

                            <Card
                                data-resizable
                                sx={{
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    overflow: 'visible',
                                    '--icon-size': '100px',
                                    boxShadow: 'md', // Optional, adjust the card shadow
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center', // Centers content in the card
                                    position: 'relative', // Se añadió para poder posicionar el ícono encima
                                    bgcolor: '#093d77',
                                }}
                            >
                                <AspectRatio
                                    variant="outlined"
                                    ratio="1"
                                    sx={{
                                        color: 'warning',
                                        transform: 'translateY(-20%)', // Ajuste para que quede fuera del borde superior
                                        borderRadius: '50%',
                                        width: '70px',
                                        boxShadow: 'sm',
                                        bgcolor: 'background.surface',
                                        position: 'absolute',
                                        top: '-30px',  // Ajusta para que la mitad del ícono salga del card
                                        zIndex: 10, // Asegura que el ícono esté por encima del card
                                    }}
                                >
                                    <TbTrolley style={{color: '#daa520'}} />
                                </AspectRatio>
                                <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 6)', color: 'white', paddingLeft: 3, display: 'flex', alignItems: 'center'}}>
                                    Stock
                                    {selectStock ?
                                    <>
                                        <JoyIconButton 
                                            aria-label="Edit" 
                                            sx={{
                                                "--IconButton-size": "30px",
                                                paddingLeft: 1,  
                                                color: 'white',
                                                mt: 0.5, 
                                                '&:hover': {
                                                    color: '#2fd407',
                                                    bgcolor: 'transparent'
                                                },
                                            }} 
                                            onClick={handleSelectStock}
                                        >
                                            <CheckIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                        <JoyIconButton
                                            aria-label="Edit" 
                                            sx={{
                                                "--IconButton-size": "26px",
                                                color: 'white',
                                                mt: 0.5, 
                                                '&:hover': {
                                                    color: '#b5301b',
                                                    bgcolor: 'transparent'
                                                },
                                            }} 
                                            onClick={handleSelectStock}
                                        >
                                            <CancelIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                    </>
                                    : 
                                        <JoyIconButton
                                            aria-label="Edit" 
                                            sx={{
                                                "--IconButton-size": "26px",
                                                paddingLeft: 1,  
                                                color: 'white', 
                                                mt: 0.5,
                                                '&:hover': {
                                                    color: '#d5951d',
                                                    bgcolor: 'transparent'
                                                },
                                            }} 
                                            onClick={handleSelectStock}
                                        >
                                            <EditIcon sx={{ color: 'inherit' }}/>
                                        </JoyIconButton>
                                    }
                                </Typography>
                                <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px'  }}>
                                    {selectStock ? 
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Unidad de medida:</Typography>
                                            {Editar(material.codigo, 70, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Unidad alternativa:</Typography>
                                            {Editar(material.codigo, 70, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography component="span" sx={{ mr: 1 }}>Factor:</Typography>
                                                {Editar(material.codigo, 55, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography component="span" sx={{ mr: 1 }}>Afecto a stock:</Typography>
                                                {Editar(Transforma(afecto), 48, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography component="span" sx={{ mr: 1 }}>Stock máximo:</Typography>
                                                {Editar(material.codigo, 70, 'white')}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography component="span" sx={{ mr: 1 }}>Stock mínimo:</Typography>
                                                {Editar(material.codigo, 70, 'white')}
                                        </Box>
                                    </>
                                    :
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Unidad de medida: {material.codigo}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Unidad Alternativa: {material.codigo}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Factor: {material.codigo}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography component="span" sx={{ mr: 1 }}>Afecto a stock: {Transforma(afecto)}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {afecto ? (
                                            <>
                                                <Typography component="span" sx={{ mr: 1 }}>Stock Máximo: {material.codigo}</Typography>
                                            </>
                                            ): ''}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {afecto ? (
                                            <>
                                                <Typography component="span" sx={{ mr: 1 }}>Stock Mínimo: {material.codigo}</Typography>
                                            </>
                                            ): ''}
                                        </Box>
                                    </>
                                    }

                                </CardContent>
                            </Card>
                        </CssVarsProvider>
                    </Box>
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
    const [categoria, setCategoria] = React.useState(categorias[0].value);
    const [descontinuado, setDescontinuado] = React.useState(false);
    const [secompra, setSecompra] = React.useState(false);
    const [sevende, setSevende] = React.useState(false);
    const [agregarCategoria, setAgregarCategoria] = React.useState(false);

    //valores para precio
    const [moneda, setMoneda] = React.useState('');
    const [iva, setIVA] = React.useState(19);
    const [unitario, setUnitario] = React.useState('');
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
    const handleChangeDescontinuado = () => setDescontinuado(prev => !prev);
    const handleChangeSecompra = () => setSecompra(prev => !prev);
    const handleChangeSevende = () => setSevende(prev => !prev);

    const handleChangeAgregarCategoria = (event) => {
        setAgregarCategoria(prev => !prev);
        setCategoria(event.target.value)
    };

    const handleChangeUnitario = (event) => {
        setUnitario(event.target.value);
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
                    descontinuado={descontinuado} 
                    secompra={secompra} 
                    sevende={sevende}
                    nombre = {nombre}
                    descripcion = {descripcion}
                    codigo = {codigo}
                    foto = {foto}
                    agregarCategoria = {agregarCategoria}
                    handleChangeNombre = {handleChangeNombre}
                    handleChangeCategoria = {handleChangeCategoria} 
                    handleChangeIVA = {handleChangeIVA} 
                    handleChangeDescontinuado = {handleChangeDescontinuado} 
                    handleChangeSecompra = {handleChangeSecompra} 
                    handleChangeSevende = {handleChangeSevende}
                    handleChangeDescripcion = {handleChangeDescripcion}
                    handleChangeCodigo = {handleChangeCodigo}
                    handleChangeFoto = {handleChangeFoto}
                    handleChangeAgregarCategoria = {handleChangeAgregarCategoria}
                />;
            case 'precio':
                return <PrecioForm 
                    moneda={moneda}
                    unitario={unitario} 
                    costo={costo} 
                    modificable={modificable} 
                    categoria = {categoria}
                    dctoMax = {dctoMax}
                    handleChangeCategoria = {handleChangeCategoria}
                    handleChangeMoneda={handleChangeMoneda} 
                    handleChangeUnitario={handleChangeUnitario} 
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
            descontinuado,
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
                                    <Button variant="contained" onClick={handleBack} color="amarilloamarillo">
                                        Anterior
                                    </Button>
                                )}

                                {/* Botón derecho */}
                                <Button variant="contained" onClick={handleNext} color={isLastTab ? "success" : "amarilloamarillo"}>
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
    const materiales = [
        {id: 1, codigo: "abc1", nombre_material: "Torinillo1", categoria_material: "Tornillos", valor: true},
        {id: 2, codigo: "abc2", nombre_material: "Torinillo2", categoria_material: "Tornillos", valor: true},
        {id: 3, codigo: "abc3", nombre_material: "Torinillo3", categoria_material: "Tornillos", valor: false},
        {id: 4, codigo: "abc4", nombre_material: "Torinillo4", categoria_material: "Tornillos", valor: true},
        {id: 5, codigo: "abc5", nombre_material: "Torinillo5", categoria_material: "Tornillos", valor: false},
        {id: 6, codigo: "abc6", nombre_material: "Torinillo6", categoria_material: "Tornillos", valor: false},
        {id: 7, codigo: "abc7", nombre_material: "Torinillo7", categoria_material: "Tornillos", valor: true},
    ];

    const [material, setMateriales] = useState(materiales);
    const [materialSeleccionado, setMaterialSeleccionado] = useState(null);
   

    const [childOpen, setChildOpen] = React.useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);

    const [detailOpen, setDetailOpen] = React.useState(false);
    const handleDetailOpen = (material) => {
        setMaterialSeleccionado(material);
        setDetailOpen(true);

    };
    const handleDetailClose = () => {
        setDetailOpen(false);
        setMaterialSeleccionado(null);
    };

    const columns = [
        { 
            field: 'codigo', 
            headerName: 'Código', 
            width: 100 
        },
        { 
            field: 'nombre_material', 
            headerName: 'Nombre', 
            width: 190
        },
        { 
            field: 'categoria_material', 
            headerName: 'Tipo de Material', 
            width: 189
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
        ) },
    ];
   
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
    const materialesFiltrados = material.filter(
        (material) => 
            material.codigo.toLowerCase().includes(busqueda.toLowerCase()) || 
            material.nombre_material.toLowerCase().includes(busqueda.toLowerCase()) ||
            material.categoria_material.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
    };

    const [selectInfo, setSelectInfo] = useState('');
    const handleSelectInfo = () => {
        setSelectInfo(prev => !prev);
    };

    const [selectPrecio, setSelectPrecio] = useState('');
    const handleSelectPrecio = () => {
        setSelectPrecio(prev => !prev);
    };

    const [selectStock, setSelectStock] = useState('');
    const handleSelectStock = () => {
        setSelectStock(prev => !prev);
    };

    const [selectDescrip, setSelectDescrip] = useState('');
    const handleSelectDescrip = () => {
        setSelectDescrip(prev => !prev);
    };    
    
    const [selectTitulo, setSelectTitulo] = useState('');
    const handleSelectTitulo = () => {
        setSelectTitulo(prev => !prev);
    };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box 
            sx={{ 
                ...style,
                width: { xs: '90%', sm: '70%', md: '60%', lg: '42%' },
                maxHeight: '90vh', // Limita la altura
                overflowY: 'auto', // Agrega scroll en caso de contenido extenso
                displey: 'flex',
                overflowX: 'auto'
            }}
        >
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
                sx={{ width: '100%', marginTop:2, height: 400, maxWidth: 600, bgcolor: '#e5e5e5' }}
            >
                <Paper style={{  marginTop:10, height: 420, width: '100%' }} elevation={0}>
                    <DataGrid
                        headerHeight={50}
                        rowHeight={50}
                        rows={materialesFiltrados} 
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
                            fontSize: '0.9rem'
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
            <ChildModal open={childOpen} handleClose={handleChildClose} />
            <DetailModal 
                open={detailOpen} 
                handleClose={handleDetailClose} 
                material={materialSeleccionado}
                selectInfo={selectInfo}
                handleSelectInfo={handleSelectInfo}
                selectPrecio={selectPrecio}
                handleSelectPrecio={handleSelectPrecio}
                selectStock={selectStock}
                handleSelectStock={handleSelectStock}
                selectDescrip={selectDescrip}
                handleSelectDescrip={handleSelectDescrip}
                selectTitulo={selectTitulo}
                handleSelectTitulo={handleSelectTitulo}
            />
        </Box>
      </Modal>
    </div>
  );
}




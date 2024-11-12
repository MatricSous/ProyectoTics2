import React, { useState } from 'react';
import {
    Grid2, 
    Box, 
    Modal, 
    styled,
    alpha,
    InputBase,
    Toolbar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Fade
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { TbTrolley } from "react-icons/tb";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import { 
    AspectRatio,
    Card,
    CardActions,
    CardContent,
    CardOverflow,
    CssVarsProvider,
    Button,
    IconButton,
    Textarea
} from '@mui/joy';
import InfoIcon from '@mui/icons-material/Info';


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
            width: '15ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
//Barra de búsqueda


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

function Detalles({index, expanded, handleExpansion, materiales, handleSelectInfo, selectInfo, handleSelectPrecio, selectPrecio, handleSelectStock, selectStock, selectDescrip, handleSelectDescrip, selectTitulo}){

    return(    
        <Accordion
            expanded={selectTitulo ? false : expanded}
            onChange={selectTitulo ? (event) => {event.stopPropagation() } : handleExpansion}
            slots={{ transition: Fade }}
            slotProps={{ transition: { timeout: 400 } }}
            sx={[{                
                overflow:'visible'},
            expanded
                ? {
                    backgroundColor: 'transparent',
                    '& .MuiAccordion-region': {
                    height: 'auto',
                    },
                    '& .MuiAccordionDetails-root': {
                        display: 'block',
                        padding: 0, // Elimina el padding por defecto
                    },
                }
                : {
                    backgroundColor: 'transparent',
                    '& .MuiAccordion-region': {
                    height: 0,
                    },
                    '& .MuiAccordionDetails-root': {
                        display: 'none',
                        padding: 0, // Elimina el padding por defecto
                    },
                },
            ]}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}

        >
            <CssVarsProvider>
            <IconButton aria-label="delete" color="danger">
                <DeleteIcon />
            </IconButton>
            
          <Typography sx={{alignContent: 'center', display: 'flex', paddingTop: 1}}>
            {selectTitulo ? 
            <>
            
            <Typography sx={{ paddingTop: 1}}>
            Nombre del material: &nbsp;
            </Typography>
            {Editar(materiales.nombre, 200, 'black')}
            &nbsp;

            <Typography sx={{ paddingTop: 1}}>
            Código del material: &nbsp;
            </Typography>
            {Editar(materiales.codigo, 150, 'black')}
            </>
            :
            <>
            {materiales.nombre} - {materiales.codigo}
            </>
            }
            </Typography>
            </CssVarsProvider>
        </AccordionSummary>

        <AccordionDetails 
            sx={{ 
                padding: 0,
                maxHeight: '400px',  // Establece una altura máxima para el contenido
                overflowY: 'auto',   // Permite el scroll si el contenido es más grande
                position: 'relative',
                overflowX: 'auto',
            }}
        >
            <Box 
                sx={{
                    display: 'flex',
                    paddingBottom: 2,
                    paddingLeft: 3,
                    overflow: 'auto',  // Prevent overflow
                }}
            >
                <CssVarsProvider>
                <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 6)', display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                {selectDescrip ?
                    <>
                        <IconButton 
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
                    </IconButton>
                        <IconButton 
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
                    </IconButton>
                    </>
                    
                    : 
                        <IconButton 
                        aria-label="Edit" 
                        sx={{
                            "--IconButton-size": "26px",
                            paddingLeft: 1,  
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
                    </IconButton>
                }
                <Typography sx={{ marginRight: 1 }}>Descripción:</Typography>
                {selectDescrip ? 
                <>
                    {Editar(materiales.descripcion, 600, 'black')}
                </>
                : 
                <>
                    {materiales.descripcion}
                </>
                }
                
                
                </Typography>
                </CssVarsProvider>
            </Box>
            

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',  // 3 cards per row
                    gap: 6,  // space between cards
                    paddingTop: 6,
                    paddingBottom: 2,
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
                                <IconButton 
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
                            </IconButton>
                                <IconButton 
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
                            </IconButton>
                            </>
                            
                            : 
                                <IconButton 
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
                            </IconButton>
                            }

                        </Typography>
                        <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px' }}>
                            {selectInfo ?
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Categoría:</Typography>
                                    {Editar(materiales.categoria, 100, 'white')}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>IVA:</Typography>
                                    {Editar(materiales.iva, 48, 'white')}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Descontinuado:</Typography>
                                    {Editar(Transforma(materiales.descontinuado), 48, 'white')}

                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Se Compra:</Typography>
                                    {Editar(Transforma(materiales.secompra), 48, 'white')}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Se Vende:</Typography>
                                    {Editar(Transforma(materiales.sevende), 48, 'white')}
                                </Box>
                            </>
                            : 
                            <>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Categoría: {materiales.categoria}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>IVA: {materiales.iva}%</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Descontinuado: {Transforma(materiales.descontinuado)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Se Compra: {Transforma(materiales.secompra)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Se Vende: {Transforma(materiales.sevende)}</Typography>
                            </Box>
                                <div style={{paddingTop: 8}}>
                                    <Button 
                                        startDecorator={
                                            <CloudUploadIcon 
                                                style={{ fontSize: '16px', paddingTop: 3 }}
                                            />
                                        } 
                                        variant="soft" 
                                        size="sm" 
                                        color="warning" 
                                        sx={{
                                            color: '#daa520',
                                            '&:hover': {
                                                color: '#d5951d',
                                            },
                                        }}
                                    >
                                        Subir foto
                                    </Button>
                                </div>
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
                                <IconButton 
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
                            </IconButton>
                                <IconButton 
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
                            </IconButton>
                            </>
                            
                            : 
                                <IconButton 
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
                            </IconButton>
                            }
                        </Typography>
                        <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px'  }}>
                            {selectPrecio ? 
                            <>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Tipo de moneda:</Typography>
                                {Editar(materiales.moneda, 48, 'white')}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Precio unitario:</Typography>
                                {Editar(materiales.unitario, 70, 'white')}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Costo compra:</Typography>
                                {Editar(materiales.costo, 70, 'white')}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Modificable:</Typography>
                                {Editar(Transforma(materiales.modificable), 48, 'white')}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Descuento máximo:</Typography>
                                {Editar(materiales.dctoMax, 48, 'white')}
                                </Box>
                            </>
                            :
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Tipo de moneda: {materiales.moneda}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Precio unitario: ${materiales.unitario}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Costo compra: ${materiales.costo}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Modificable: {Transforma(materiales.modificable)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {materiales.modificable ?
                                        <Typography component="span" sx={{ mr: 1 }}>Descuento máximo: {materiales.dctoMax}%</Typography>
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
                                <IconButton 
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
                            </IconButton>
                                <IconButton 
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
                            </IconButton>
                            </>
                            
                            : 
                                <IconButton 
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
                            </IconButton>
                            }
                        </Typography>
                        <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px'  }}>
                            {selectStock ? 
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Unidad de medida:</Typography>
                                    {Editar(materiales.unidad_medida, 70, 'white')}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Unidad alternativa:</Typography>
                                    {Editar(materiales.unidad_alternativa, 70, 'white')}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Factor:</Typography>
                                    {Editar(materiales.factor, 55, 'white')}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Afecto a stock:</Typography>
                                    {Editar(Transforma(materiales.afecto), 48, 'white')}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Stock máximo:</Typography>
                                    {Editar(materiales.stockMaximo, 70, 'white')}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography component="span" sx={{ mr: 1 }}>Stock mínimo:</Typography>
                                    {Editar(materiales.stockMinimo, 70, 'white')}
                            </Box>
                            </>
                            :
                            <>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Unidad de medida: {materiales.unidad_medida}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Unidad Alternativa: {materiales.unidad_alternativa}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Factor: {materiales.factor}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" sx={{ mr: 1 }}>Afecto a stock: {Transforma(materiales.afecto)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {materiales.afecto ? (
                                <>
                                    <Typography component="span" sx={{ mr: 1 }}>Stock Máximo: {materiales.stockMaximo}</Typography>
                                </>
                                ): ''}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {materiales.afecto ? (
                                <>
                                    <Typography component="span" sx={{ mr: 1 }}>Stock Mínimo: {materiales.stockMinimo}</Typography>
                                </>
                                ): ''}
                            </Box>
                            </>
                            }

                        </CardContent>
                    </Card>
                </CssVarsProvider>
            </Box>
        </AccordionDetails>
      </Accordion>  
    );
}



//Modal principal
export default function NestedModalSubirExcel({open, handleClose, materiales}) {

    const [busqueda, setBusqueda] = useState('');
    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
    };
    const materialesFiltrados = materiales.filter(
        (material) => 
            material.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
            material.codigo.toLowerCase().includes(busqueda.toLowerCase())
    );

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

    const [expanded, setExpanded] = React.useState(false);
    const handleExpansion = (index) => {
      setExpanded((prevExpanded) => (prevExpanded === index ? false : index));
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
                width: { xs: '90%', sm: '70%', md: '60%', lg: '56%' },
                maxHeight: '90vh', // Limita la altura
                overflowY: 'auto', // Agrega scroll en caso de contenido extenso
                displey: 'flex',
                overflowX: 'auto'
            }}
        >
            <Grid2 container alignItems="center" justifyContent="space-between">
                <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                <CssVarsProvider>
                <Typography level="title-lg" component="h2" sx={{ display: 'flex', alignItems: 'center'}}>
                    Materiales Ingresados

                    {selectTitulo ?
                    <>
                        <IconButton 
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
                    </IconButton>
                        <IconButton 
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
                    </IconButton>
                    </>
                    
                    : 
                        <IconButton 
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
                    </IconButton>
                }
                </Typography>
                </CssVarsProvider>

                </Grid2>

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

                <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                <CssVarsProvider>
                    <Button onClick={handleClose} style={{ backgroundColor: '#e5e5e5'}}>
                        <HighlightOffIcon style={{color: '#b71c1c'}}/>
                    </Button>
                </CssVarsProvider>
                </Grid2>
            </Grid2>

            <Box
                sx={{ width: '100%', marginTop:2, height: 450, maxWidth: 800, maxHeight: '100%', overflowY:'auto', bgcolor: '#e5e5e5', overflowX:'auto' }}
            >
                {materialesFiltrados.map((material, index) => (
                    <Detalles 
                        key={index}
                        index={index}
                        expanded={expanded === index}
                        handleExpansion={() => handleExpansion(index)}
                        materiales={material}
                        selectInfo={selectInfo}
                        handleSelectInfo={handleSelectInfo}
                        selectPrecio={selectPrecio}
                        handleSelectPrecio={handleSelectPrecio}
                        selectStock={selectStock}
                        handleSelectStock={handleSelectStock}
                        selectDescrip={selectDescrip}
                        handleSelectDescrip={handleSelectDescrip}
                        selectTitulo={selectTitulo}
                    />
                ))}
            </Box>
            <CssVarsProvider>
            <Box display="flex" justifyContent="space-between">
            <Button variant='container' onClick={handleClose} style={{ backgroundColor: '#daa520', paddingBottom: 7}}> CANCELAR
            </Button>
            <Button variant='container' style={{ backgroundColor: 'green', color: 'white', paddingBottom: 7}}> GUARDAR
            </Button>
            </Box>
            </CssVarsProvider>
        </Box>
      </Modal>
    </div>
  );
}
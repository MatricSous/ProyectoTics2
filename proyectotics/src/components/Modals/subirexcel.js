import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    Fade,
    Snackbar,
    Alert
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

function Editar({ value, ancho, color, onChange }) {
    return (
        <Textarea
            minRows={2}
            variant="soft"
            value={value}
            onChange={onChange} // Aquí pasamos la función onChange
            sx={{
                borderBottom: '2px solid #d5951d',
                borderColor: color,
                borderRadius: 0,
                width: ancho,
                height: 40,
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

function Detalles({index, onChange, expanded, handleExpansion, materiales, handleSelectInfo, selectInfo, handleSelectPrecio, selectPrecio, handleSelectStock, selectStock, selectDescrip, handleSelectDescrip, selectTitulo}){

 


    // Cambia el valor del material
    const handleChange = (campo) => (event) => {
        const newValue = event.target.value;
        onChange(materiales.id, campo, newValue);

   
    };


          // Función para manejar los cambios en los campos



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

    <Typography sx={{ alignContent: 'center', display: 'flex', paddingTop: 1 }}>
      {selectTitulo ? (
        <>
          <Typography sx={{ paddingTop: 1 }}>
            Nombre: &nbsp;
          </Typography>
          <Editar
            value={materiales.nombre_material}
            ancho={'50%'}
            color="black"
            onChange={handleChange('nombre_material')}
          />
          &nbsp;

          <Typography sx={{ paddingTop: 1 }}>
            Código del material: &nbsp;
          </Typography>
          <Editar
            value={materiales.codigo}
            ancho={'40%'}
            color="black"
            onChange={handleChange('codigo')}
          />
        </>
      ) : (
        <>
          <Typography sx={{ paddingTop: 1 }}>
            {materiales.nombre_material} - {materiales.codigo}
          </Typography>
        </>
      )}
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
                overflow: 'auto', // Prevent overflow
            }}
            >
            <CssVarsProvider>
                <Typography
                level="title-lg"
                sx={{
                    mt: 'calc(var(--icon-size) / 6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                >
                {selectDescrip ? (
                    <>
                    <IconButton
                        aria-label="Confirm"
                        sx={{
                        "--IconButton-size": "30px",
                        paddingLeft: 1,
                        color: '#093d77',
                        mt: 0.5,
                        '&:hover': {
                            color: 'green',
                            bgcolor: 'transparent',
                        },
                        }}
                        onClick={handleSelectDescrip} // Confirmar edición
                    >
                        <CheckIcon sx={{ color: 'inherit' }} />
                    </IconButton>

                    <IconButton
                        aria-label="Cancel"
                        sx={{
                        "--IconButton-size": "26px",
                        color: '#093d77',
                        mt: 0.5,
                        '&:hover': {
                            color: '#b5301b',
                            bgcolor: 'transparent',
                        },
                        }}
                        onClick={handleSelectDescrip} // Cancelar edición
                    >
                        <CancelIcon sx={{ color: 'inherit' }} />
                    </IconButton>
                    </>
                ) : (
                    <IconButton
                    aria-label="Edit"
                    sx={{
                        "--IconButton-size": "26px",
                        paddingLeft: 1,
                        color: '#093d77',
                        mt: 0.5,
                        '&:hover': {
                        color: '#d5951d',
                        bgcolor: 'transparent',
                        },
                    }}
                    onClick={handleSelectDescrip} // Activar edición
                    >
                    <EditIcon sx={{ color: 'inherit' }} />
                    </IconButton>
                )}

                <Typography sx={{ marginRight: 1 }}>Descripción:</Typography>

                {selectDescrip ? (
                    <Editar
                    value={materiales.descripcion}
                    ancho={600}
                    color="black"
                    onChange={handleChange('descripcion')} // Maneja el cambio de la descripción
                    />
                ) : (
                    <>{materiales.descripcion}</>
                )}
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
                        top: '-30px', // Ajusta para que la mitad del ícono salga del card
                        zIndex: 10, // Asegura que el ícono esté por encima del card
                        }}
                    >
                        <InfoIcon sx={{ color: '#daa520' }} />
                    </AspectRatio>
                    <Typography
                        level="title-lg"
                        sx={{
                        mt: 'calc(var(--icon-size) / 6)',
                        color: 'white',
                        paddingLeft: 3,
                        display: 'flex',
                        alignItems: 'center',
                        }}
                    >
                        Información
                        {selectInfo ? (
                        <>
                            <IconButton
                            aria-label="Confirm"
                            sx={{
                                "--IconButton-size": "30px",
                                paddingLeft: 1,
                                color: 'white',
                                mt: 0.5,
                                '&:hover': {
                                color: '#2fd407',
                                bgcolor: 'transparent',
                                },
                            }}
                            onClick={handleSelectInfo}
                            >
                            <CheckIcon sx={{ color: 'inherit' }} />
                            </IconButton>
                            <IconButton
                            aria-label="Cancel"
                            sx={{
                                "--IconButton-size": "26px",
                                color: 'white',
                                mt: 0.5,
                                '&:hover': {
                                color: '#b5301b',
                                bgcolor: 'transparent',
                                },
                            }}
                            onClick={handleSelectInfo}
                            >
                            <CancelIcon sx={{ color: 'inherit' }} />
                            </IconButton>
                        </>
                        ) : (
                        <IconButton
                            aria-label="Edit"
                            sx={{
                            "--IconButton-size": "26px",
                            paddingLeft: 1,
                            color: 'white',
                            mt: 0.5,
                            '&:hover': {
                                color: '#d5951d',
                                bgcolor: 'transparent',
                            },
                            }}
                            onClick={handleSelectInfo}
                        >
                            <EditIcon sx={{ color: 'inherit' }} />
                        </IconButton>
                        )}
                    </Typography>
                    <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" sx={{ mr: 1 }}>
                            Categoría:
                        </Typography>
                        {selectInfo ? (
                            <Editar
                            value={materiales.categoria}
                            ancho={'70%'}
                            color="white"
                            onChange={handleChange('categoria')}
                            />
                        ) : (
                            materiales.categoria
                        )}
                        </Box>



                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" sx={{ mr: 1 }}>
                            IVA:
                        </Typography>
                        {selectInfo ? (
                            <Editar
                            value={materiales.valor_iva}
                            ancho={100}
                            color="white"
                            onChange={(e) => {
                                const newValue = e.target.value;
                                // Validar que solo sean números y de hasta 2 dígitos
                                if (/^\d{0,2}$/.test(newValue)) {
                                handleChange('valor_iva')(e);
                                }
                            }}
                            />
                        ) : (
                            materiales.valor_iva 
                        )}
                        %
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" sx={{ mr: 1 }}>
                            Descontinuado:
                        </Typography>
                        {selectInfo ? (
                            <select
                            value={materiales.descontinuado}
                            onChange={handleChange('descontinuado')}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: 'none',
                                borderBottom: '2px solid white',
                                fontSize: '14px',
                                padding: '4px',
                            }}
                            >
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                            </select>
                        ) : (
                            materiales.descontinuado
                        )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" sx={{ mr: 1 }}>
                            Se Compra: 
                        </Typography>
                        {selectInfo ? (
                            <select
                            value={materiales.se_compra}
                            onChange={handleChange('se_compra')}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: 'none',
                                borderBottom: '2px solid white',
                                fontSize: '14px',
                                padding: '4px',
                            }}
                            >
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                            </select>
                        ) : (
                            materiales.se_compra
                        )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component="span" sx={{ mr: 1 }}>
                            Se Vende:
                        </Typography>
                        {selectInfo ? (
                            <select
                            value={materiales.se_vende}
                            onChange={handleChange('se_vende')}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: 'none',
                                borderBottom: '2px solid white',
                                fontSize: '14px',
                                padding: '4px',
                            }}
                            >
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                            </select>
                        ) : (
                            materiales.se_vende
                        )}
                        </Box>

                        <div style={{ paddingTop: 8 }}>
                        <Button
                            startDecorator={
                            <CloudUploadIcon style={{ fontSize: '16px', paddingTop: 3 }} />
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
                            boxShadow: 'md',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            bgcolor: '#093d77',
                        }}
                        >
                        <AspectRatio
                            variant="outlined"
                            color="warning"
                            ratio="1"
                            sx={{
                            m: 'auto',
                            transform: 'translateY(-20%)',
                            borderRadius: '50%',
                            width: '70px',
                            boxShadow: 'sm',
                            bgcolor: 'background.surface',
                            position: 'absolute',
                            top: '-30px',
                            zIndex: 10,
                            }}
                        >
                            <MonetizationOnIcon sx={{ color: '#daa520' }} />
                        </AspectRatio>
                        <Typography
                            level="title-lg"
                            sx={{
                            mt: 'calc(var(--icon-size) / 6)',
                            color: 'white',
                            paddingLeft: 3,
                            display: 'flex',
                            alignItems: 'center',
                            }}
                        >
                            Precio
                            {selectPrecio ? (
                            <>
                                {/* Botón de confirmación de edición */}
                                <IconButton
                                aria-label="Confirm"
                                sx={{
                                    "--IconButton-size": "30px",
                                    paddingLeft: 1,
                                    color: 'white',
                                    mt: 0.5,
                                    '&:hover': { color: '#2fd407', bgcolor: 'transparent' },
                                }}
                                onClick={handleSelectPrecio}
                                >
                                <CheckIcon sx={{ color: 'inherit' }} />
                                </IconButton>

                                {/* Botón de cancelación de edición */}
                                <IconButton
                                aria-label="Cancel"
                                sx={{
                                    "--IconButton-size": "26px",
                                    color: 'white',
                                    mt: 0.5,
                                    '&:hover': { color: '#b5301b', bgcolor: 'transparent' },
                                }}
                                onClick={handleSelectPrecio}
                                >
                                <CancelIcon sx={{ color: 'inherit' }} />
                                </IconButton>
                            </>
                            ) : (
                            <IconButton
                                aria-label="Edit"
                                sx={{
                                "--IconButton-size": "26px",
                                paddingLeft: 1,
                                color: 'white',
                                mt: 0.5,
                                '&:hover': { color: '#d5951d', bgcolor: 'transparent' },
                                }}
                                onClick={handleSelectPrecio}
                            >
                                <EditIcon sx={{ color: 'inherit' }} />
                            </IconButton>
                            )}
                        </Typography>

                        <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px' }}>
                            {/* Tipo de moneda */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography component="span" sx={{ mr: 1 }}>
                                Tipo de moneda:
                            </Typography>
                            {selectPrecio ? (
                                <Editar
                                value={materiales.moneda}
                                ancho={48}
                                color="white"
                                onChange={(e) => {
                                    const value = e.target.value.toUpperCase(); // Convierte a mayúsculas
                                    if (/^[A-Z]{0,3}$/.test(value)) {
                                    handleChange('moneda')({ target: { value } }); // Aplica el cambio solo si cumple la validación
                                    }
                                }}
                                />
                            ) : (
                                materiales.moneda
                            )}
                            </Box>

                            {/* Precio unitario */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography component="span" sx={{ mr: 1 }}>
                                Precio unitario:
                            </Typography>
                            {selectPrecio ? (
                                <Editar
                                value={materiales.precio}
                                ancho={70}
                                color="white"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,9}(\.\d{0,2})?$/.test(value)) {
                                    handleChange('precio')({
                                        target: { value: value.replace(/,/g, '') }, // Elimina comas para almacenar el valor limpio
                                    });
                                    }
                                }}
                                />
                            ) : (
                                `$ ${Number(materiales.precio).toLocaleString('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                                })}`
                            )}
                            </Box>

                            {/* Costo compra */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography component="span" sx={{ mr: 1 }}>
                                Costo compra:
                            </Typography>
                            {selectPrecio ? (
                                <Editar
                                value={materiales.costo_compra}
                                ancho={70}
                                color="white"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,9}(\.\d{0,2})?$/.test(value)) {
                                    handleChange('costo_compra')({
                                        target: { value: value.replace(/,/g, '') }, // Elimina comas para almacenar el valor limpio
                                    });
                                    }
                                }}
                                />
                            ) : (
                                `$ ${Number(materiales.costo_compra).toLocaleString('en-US', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                                })}`
                            )}
                            </Box>

                            {/* Modificable */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <Typography component="span" sx={{ mr: 1 }}>
                                Modificable:
                            </Typography>
                            {selectPrecio ? (
                                <select
                                value={materiales.modificable}
                                onChange={handleChange('modificable')}
                                style={{
                                    width: '20%',
                                    backgroundColor: 'white',
                                    color: 'black', // Negro para las opciones por defecto
                                    border: '1px solid gray',
                                    borderRadius: '4px',
                                    padding: '4px',
                                    fontSize: '14px',
                                    fontFamily: 'inherit',
                                    appearance: 'none', // Elimina el estilo por defecto del select
                                }}
                                >
                                <option value="Sí" style={{ color: 'black' }}>Sí</option>
                                <option value="No" style={{ color: 'black' }}>No</option>
                                </select>
                            ) : (
                                <Typography sx={{ color: 'white' }}>{materiales.modificable}</Typography>
                            )}
                            </Box>


                            {/* Descuento máximo */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography component="span" sx={{ mr: 1 }}>
                                Descuento máximo:
                            </Typography>
                            {selectPrecio ? (
                                <Editar
                                value={materiales.descuento_maximo}
                                ancho={'48%'}
                                color="white"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Asegurarse de que el valor sea un número de hasta 2 dígitos
                                    if (/^\d{0,2}$/.test(value)) {
                                    handleChange('descuento_maximo')(e);
                                    }
                                }}
                                onBlur={() => {
                                    // Si el valor no es un número o es mayor de 99, asignamos 0
                                    if (!/^\d{1,2}$/.test(materiales.descuento_maximo)) {
                                    handleChange('descuento_maximo')({ target: { value: 0 } });
                                    }
                                }}
                                />
                            ) : (
                                `${materiales.descuento_maximo}%`
                            )}
                            </Box>
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
        {selectStock ? (
            <>
                <IconButton 
                    aria-label="Confirm"
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
                    aria-label="Cancel"
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
        ) : (
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
        )}
    </Typography>

    <CardContent sx={{ maxWidth: '40ch', color: 'white', fontSize: '14px' }}>
        {selectStock ? (
            <>
                {/* Unidad de medida */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="span" sx={{ mr: 1 }}>Unidad de medida:</Typography>
                    <Editar value={materiales.unidad_medida} ancho={70} color="white" onChange={handleChange('unidad_medida')} />
                </Box>

                {/* Unidad alternativa */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="span" sx={{ mr: 1 }}>Unidad alternativa:</Typography>
                    <Editar value={materiales.unidad_alternativa} ancho={70} color="white" onChange={handleChange('unidad_alternativa')} />
                </Box>

                {/* Factor */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="span" sx={{ mr: 1 }}>Factor:</Typography>
                    <Editar value={materiales.factor} ancho={55} color="white" onChange={handleChange('factor')} />
                </Box>

                {/* Afecto a stock */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="span" sx={{ mr: 1 }}>Afecto a stock:</Typography>
                    <select
                        value={materiales.afecto} 
                        onChange={(e) => handleChange('afecto')(e)} 
                        style={{
                            width: '20%',
                            backgroundColor: 'white',
                            color: 'black', // Negro para las opciones por defecto
                            border: '1px solid gray',
                            borderRadius: '4px',
                            padding: '4px',
                            fontSize: '14px',
                            fontFamily: 'inherit',
                            appearance: 'none', // Elimina el estilo por defecto del select
                        }}
                    >
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                </Box>

                {/* Stock máximo */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="span" sx={{ mr: 1 }}>Stock máximo:</Typography>
                    <Editar value={materiales.stockMaximo} ancho={70} color="white" onChange={handleChange('stockMaximo')} />
                </Box>

                {/* Stock mínimo */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="span" sx={{ mr: 1 }}>Stock mínimo:</Typography>
                    <Editar value={materiales.stockMinimo} ancho={70} color="white" onChange={handleChange('stockMinimo')} />
                </Box>
            </>
        ) : (
            <>
                {/* Visualización no editable */}
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
                {materiales.afecto && (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography component="span" sx={{ mr: 1 }}>Stock Máximo: {materiales.stockMaximo}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography component="span" sx={{ mr: 1 }}>Stock Mínimo: {materiales.stockMinimo}</Typography>
                        </Box>
                    </>
                )}
            </>
        )}
    </CardContent>
</Card>

                </CssVarsProvider>
            </Box>
        </AccordionDetails>
      </Accordion>  
    );
}



//Modal principal
export default function NestedModalSubirExcel({open, handleClose, materiales, handleChangeMateriales}) {

    const [test, setTest] = useState(false)
    useEffect(() => {
        console.log("asdadbbbasda: ", materiales)
        handleChangeMateriales(2, "categoria", "modificado master")
        setTest(true)
     }, []);

     useEffect(() => {
        console.log("test: ", materiales)

     }, [test]);


    const [busqueda, setBusqueda] = useState('');
    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
    };
    const materialesFiltrados = materiales.filter(
        (material) => 
            material.nombre_material.toLowerCase().includes(busqueda.toLowerCase()) || 
            material.codigo.toLowerCase().includes(busqueda.toLowerCase())
    );

    const [selectInfo, setSelectInfo] = useState(false);
    const handleSelectInfo = () => {
        setSelectInfo(prev => !prev);
    };

    const [selectPrecio, setSelectPrecio] = useState(false);
    const handleSelectPrecio = () => {
        setSelectPrecio(prev => !prev);
    };

    const [selectStock, setSelectStock] = useState(false);
    const handleSelectStock = () => {
        setSelectStock(prev => !prev);
    };

    const [selectDescrip, setSelectDescrip] = useState(false);
    const handleSelectDescrip = () => {
        setSelectDescrip(prev => !prev);
    };    
    
    const [selectTitulo, setSelectTitulo] = useState(false);
    const handleSelectTitulo = () => {
        setSelectTitulo(prev => !prev);
    };

    const [expanded, setExpanded] = React.useState(false);
    const handleExpansion = (index) => {
      setExpanded((prevExpanded) => (prevExpanded === index ? false : index));
    };

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const onClickGuardar = async () => {
        try {
            // Suponiendo que tienes el token en algún lugar, por ejemplo en localStorage o en el estado
            const token = localStorage.token;  // Reemplaza esto con el token real
    
            // Realiza la solicitud POST con Axios
            const response = await axios.post('http://localhost:8081/materiales/crearMateriales', {
                materiales: materiales
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Enviar el token en el header
                }
            });
    
            // Verifica si el ingreso fue exitoso
            if (response.status === 200) {
                // Mostrar Snackbar de éxito
                setSnackbarMessage('Ingreso Exitoso');
                setSnackbarSeverity('success');
                setSnackbarOpen(true); // Abrir el Snackbar
                handleClose(); // Cierra el modal
            } else {
                // Mostrar Snackbar de error
                setSnackbarMessage('Ingreso Fallido, intente nuevamente');
                setSnackbarSeverity('error');
                setSnackbarOpen(true); // Abrir el Snackbar
            }
        } catch (error) {
            // En caso de error (por ejemplo, error de red)
            console.error("Error al hacer la solicitud: ", error);
            setSnackbarMessage('Ingreso Fallido, intente nuevamente');
            setSnackbarSeverity('error');
            setSnackbarOpen(true); // Abrir el Snackbar
        }
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
                overflowX: 'auto'
            }}
        >
            <Grid2 container alignItems="center" justifyContent="space-between">
                <Grid2 item xs={4} style={{ textAlign: 'center' }}>
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
  sx={{ 
    display: 'flex', // Hace que los elementos se distribuyan en línea
    flexDirection: 'column', // Coloca los elementos verticalmente
    width: '100%', // Ocupa el 100% del espacio disponible
    height: '100%', // Asegura que ocupe toda la altura
    maxHeight: '90vh', // Limita la altura máxima
    overflowY: 'auto', // Permite desplazamiento si hay mucho contenido
    overflowX: 'auto', // Permite desplazamiento horizontal si es necesario
    marginBottom: 5
  }}
>
  {materialesFiltrados.map((material, index) => (
    <Detalles 
      key={material.id}
      index={index}
      expanded={expanded === index}
      handleExpansion={() => handleExpansion(index)}
      materiales={material}
      onChange={handleChangeMateriales}
      selectInfo={selectInfo}
      handleSelectInfo={handleSelectInfo}
      selectPrecio={selectPrecio}
      handleSelectPrecio={handleSelectPrecio}
      selectStock={selectStock}
      handleSelectStock={handleSelectStock}
      selectDescrip={selectDescrip}
      handleSelectDescrip={handleSelectDescrip}
      selectTitulo={selectTitulo}
      sx={{
        // Esto ajusta el ancho de cada componente de detalles
        display: 'flex', // Asegura que los detalles se distribuyan de manera flexible
        width: '100%', // Hace que ocupe todo el espacio disponible
        marginBottom: 2, // Espaciado entre los materiales
        padding: 2, // Añade algo de espacio interior
        boxSizing: 'border-box', // Para que el padding no afecte el tamaño total
        borderBottom: '1px solid #ccc', // Borde debajo de cada detalle
        bgcolor: '#fff' // Fondo blanco para cada detalle
      }}
    />
  ))}
</Box>
            <CssVarsProvider>
            <Box display="flex" justifyContent="space-between">
            <Button variant='container' onClick={handleClose} style={{ backgroundColor: '#daa520', paddingBottom: 7}}> CANCELAR
            </Button>


            <Button variant='container' onClick={onClickGuardar} style={{ backgroundColor: 'green', color: 'white', paddingBottom: 7}}> GUARDAR
            </Button>
            </Box>
            </CssVarsProvider>
        </Box>
      </Modal>
    </div>
  );
}
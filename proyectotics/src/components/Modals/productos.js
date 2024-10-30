import React, { useEffect, useState } from 'react';
import {
    Grid2, 
    Button, 
    Box, 
    Fab, 
    Modal, 
    styled, 
    alpha, 
    Toolbar,
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
} from '@mui/material';
import { FixedSizeList } from 'react-window';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';


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



//Lista de materiales
function renderRow(props) {
    const { index, style, handleDetailOpen } = props;
  
    return (
        <ListItem 
            style={style} 
            key={index} 
            component="div" 
            disablePadding 
            secondaryAction={
                <Fab aria-label="comment" size="small" variant="extended" onClick={() => handleDetailOpen(index)} color='azulamarillo'>
                    <MoreHorizIcon/> Ver más
                </Fab>
            }>
            <ListItemButton>
                <ListItemText primary={`Item ${index + 1}`} />
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

function InfoForm({ familia, clase, iva, discontinuado, secompra, sevende, handleChangeFamilia, handleChangeClase,  handleChangeIVA, handleChangeDiscontinuado, handleChangeSecompra, handleChangeSevende}) {
    return (
        <>
            <Box
                component="form"
                noValidate
                sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }}
            >
                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Código / Nombre del material
                    </InputLabel>
                    <BootstrapInput id="nombre" />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="demo-customized-select-label">
                        Familia
                    </InputLabel>
                    <NativeSelect
                        id="familia"
                        value={familia}
                        onChange={handleChangeFamilia}
                        input={<BootstrapInput />}
                    >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="demo-customized-select-label">
                        Clase
                    </InputLabel>
                    <NativeSelect
                        id="clase"
                        value={clase}
                        onChange={handleChangeClase}
                        input={<BootstrapInput />}
                    >
                        <option aria-label="None" value="" />
                        <option value={'producto terminado'}>Producto terminado</option>
                        <option value={'material'}>Material</option>
                    </NativeSelect>
                </FormControl>

                <Grid2 container sx={{ alignItems: 'center' }}>
                    <Grid2>
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                IVA
                            </InputLabel>
                            <BootstrapInput id="iva" defaultValue={19} sx={{width: 70}}/> 
                        </FormControl>
                    </Grid2>
                    <Grid2>
                        %
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
                    id="discontinuado" 
                    control={<Checkbox />} 
                    label="Discontinuado" 
                />
                <FormControlLabel 
                    sx={{ m: 1 }}
                    id="secompra"  
                    control={<Checkbox />} 
                    label="Se compra" 
                />
                <FormControlLabel 
                    sx={{ m: 1 }} 
                    id="sevende" 
                    control={<Checkbox />} 
                    label="Se vende" 
                />             
            </Box>

            <Button
                sx={{ m: 1 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                color='negroazul'
            >
                Subir foto
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                />
            </Button>
        </>
    );
}
//Formulario de información



//Formulario de precios
const currencies = [
    {
        value: '',
        label: '',
    },
    {
        value: 'CLP',
        label: '$ Peso Chileno',
    },
    {
        value: 'USD',
        label: '$ Dolar',
    },
    {
        value: 'EUR',
        label: '€ Euro',
    },
    {
        value: 'BTC',
        label: '฿ Bitcoin',
    },
    {
        value: 'JPY',
        label: '¥ Yen',
    },
];

function PrecioForm(moneda, unitario, coniva, costo, modificable, handleChangeMoneda, handleChangeUnitario, handleChangeConiva, handleChangeCosto, handleChangeModificable) {
    return(
        <>
            <Box
                component="form"
                noValidate
                sx={{display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr 1fr' }, gap: 4 }}
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
                    <BootstrapInput id="preciounitario"/>
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Precio con IVA
                    </InputLabel>
                    <BootstrapInput id="precioconiva"/>
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Costo compra
                    </InputLabel>
                    <BootstrapInput id="costocompra"/>
                </FormControl>

            </Box>
            <Box
                component="form"
                noValidate
            >
                <FormControlLabel 
                    sx={{ m: 1 }} 
                    id="modificaprecio" 
                    control={<Checkbox />} 
                    label="Se puede modificar precio" />
            </Box>
        </>
        
    );
};
//Formulario de precios




//Formulacio de stock
function StockForm() {
    const [afecto, setAfecto] = useState('');
    const handleChangeAfecto = (event) => {
        setAfecto(event.target.checked);
      };
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
                            <BootstrapInput id="unidad de medida" />
                        </FormControl>

                        <FormControl sx={{ m: 2 }} variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Factor
                            </InputLabel>
                            <BootstrapInput id="factor" />
                        </FormControl>
                </Box>

                <Box>

                <FormControl>
                    <FormControlLabel
                        sx={{ m: 1 }} 
                        id="afectostock"
                        control={<Checkbox checked={afecto} onChange={handleChangeAfecto} />}
                        label="Afecto a stock" 
                    />
                </FormControl>
                </Box>
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
                            <BootstrapInput id="stockminimo" />
                        </FormControl>

                        <FormControl sx={{ m: 2 }} variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Stock máximo
                            </InputLabel>
                            <BootstrapInput id="stockmaximo" />
                        </FormControl>
                    </Box>
                : ''}
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
    const [value, setValue] = React.useState('info');
    const [showSaveMessage, setShowSaveMessage] = React.useState(false);

    //valores para info
    const [familia, setFamilia] = React.useState('');
    const [clase, setClase] = React.useState('');
    const [discontinuado, setDiscontinuado] = React.useState(false);
    const [secompra, setSecompra] = React.useState(false);
    const [sevende, setSevende] = React.useState(false);

    //valores para precio
    const [moneda, setMoneda] = React.useState('');
    const [iva, setIVA] = React.useState('');
    const [unitario, setUnitario] = React.useState('');
    const [coniva, setConiva] = React.useState('');
    const [costo, setCosto] = React.useState('');
    const [modificable, setModificable] = React.useState('');



    //valores para stocks

    useEffect(() => {
        if (open) {
            setValue('info');
            setShowSaveMessage(false);
        }
    }, [open]);

    const handleChangeFamilia = (event) => {
        setFamilia(event.target.value);
    };

    const handleChangeClase = (event) => {
        setClase(event.target.value);
    };

    const handleChangeMoneda = (event) => {
        setMoneda(event.target.value);
    };

    const handleChangeIVA = (event) => {
        setIVA(event.target.value);
    };

    const handleChangeDiscontinuado = (event) => {
        setDiscontinuado(event.target.value);
    };

    const handleChangeSecompra = (event) => {
        setSecompra(event.target.value);
    };

    const handleChangeSevende = (event) => {
        setSevende(event.target.value);
    };

    const handleChangeUnitario = (event) => {
        setUnitario(event.target.value);
    };

    const handleChangeConiva = (event) => {
        setConiva(event.target.value);
    };

    const handleChangeCosto = (event) => {
        setCosto(event.target.value);
    };

    const handleChangeModificable = (event) => {
        setModificable(event.target.value);
    };

    const renderMessage = () => {
        switch (value) {
            case 'info':
                return <InfoForm
                    familia={familia} 
                    clase={clase} 
                    iva={iva} 
                    discontinuado={discontinuado} 
                    secompra={secompra} 
                    sevende={sevende} 
                    handleChangeFamilia={handleChangeFamilia} 
                    handleChangeClase={handleChangeClase} 
                    handleChangeIVA={handleChangeIVA} 
                    handleChangeDiscontinuado={handleChangeDiscontinuado} 
                    handleChangeSecompra={handleChangeSecompra} h
                    andleChangeSevende={handleChangeSevende}
                />;
            case 'precio':
                return <PrecioForm 
                    moneda={moneda}
                    unitario={unitario} 
                    coniva={coniva} 
                    costo={costo} 
                    modificable={modificable} 
                    handleChangeMoneda={handleChangeMoneda} 
                    handleChangeUnitario={handleChangeUnitario} 
                    handleChangeConiva={handleChangeConiva} 
                    handleChangeCosto={handleChangeCosto} 
                    handleChangeModificable={handleChangeModificable}
                />;
            case 'stock':
                return <StockForm />;
            default:
                return "";
        }
    };

    const handleNext = () => {
        if (value === 'info') {
            setValue('precio');
        } else if (value === 'precio'){
            setValue('stock');
        } else {
            setShowSaveMessage(true);
            setTimeout(() => setShowSaveMessage(false), 3000); // Oculta el mensaje después de 3 segundos
        }
    };

    //////////////////////////////////////////////////////
    const SubirExcel = () => {
        if (value === 'info') {
            setValue('precio');
        } else if (value === 'precio'){
            setValue('stock');
        } else {
            setShowSaveMessage(true);
            setTimeout(() => setShowSaveMessage(false), 3000); // Oculta el mensaje después de 3 segundos
        }
    };
    ///////////////////////////////////////////////////////7

    const handleBack = () => {
        if (value === 'precio') {
            setValue('info');
        } else if (value === 'stock'){
            setValue('precio');
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
                        <Button variant="contained" onClick={isFirstTab ? SubirExcel : handleBack} color={isFirstTab ? 'success' : "amarillo"}>
                            {isFirstTab ? "Subir Excel" : "Anterior"}
                        </Button>
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
export default function NestedModal({open, handleClose}) {
    const [childOpen, setChildOpen] = React.useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);

    const [detailOpen, setDetailOpen] = React.useState(false);
    const handleDetailOpen = () => setDetailOpen(true);
    const handleDetailClose = () => setDetailOpen(false);

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
                    <Toolbar>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Buscar…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </Grid2>
            </Grid2>

            <Box
                sx={{ width: '100%', marginTop:2, height: 400, maxWidth: 500, bgcolor: '#e5e5e5' }}
            >
                <FixedSizeList
                    height={400}
                    width={500}
                    itemSize={46}
                    itemCount={200}
                    overscanCount={5}
                >
                    {({ index, style }) => (
                        renderRow({
                            index,
                            style,
                            handleDetailOpen
                        })
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
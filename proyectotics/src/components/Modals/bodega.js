import React, { useState } from 'react';
import {
    Grid2, 
    Button, 
    Box, 
    Fab, 
    Modal, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    FormControlLabel,
    Checkbox,
    ListItem,
    ListItemButton,
    ListItemText,
    styled,
    alpha,
    InputBase,
    Toolbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { TableVirtuoso } from 'react-virtuoso';
import Chance from 'chance';
import { FixedSizeList } from 'react-window';
import {
    Badge,
    IconButton,
    Typography,
    Style
} from '@mui/joy';
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search'


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

// Simulación de datos
const materiales = [
    { id: 1, nombre: "Material 1", categoria: "Categoría A" },
    { id: 2, nombre: "Material 2", categoria: "Categoría B" },
    { id: 3, nombre: "Material 3", categoria: "Categoría C" },
    { id: 4, nombre: "Material 4", categoria: "Categoría D" },
    { id: 5, nombre: "Material 5", categoria: "Categoría E" },
    { id: 6, nombre: "Material 6", categoria: "Categoría F" },
    { id: 7, nombre: "Material 7", categoria: "Categoría G" },
    { id: 8, nombre: "Material 8", categoria: "Categoría H" },
    { id: 9, nombre: "Material 9", categoria: "Categoría I" },
    { id: 10, nombre: "Material 10", categoria: "Categoría J" },
    { id: 11, nombre: "Material 11", categoria: "Categoría K" },
    { id: 12, nombre: "Material 12", categoria: "Categoría L" },
    { id: 13, nombre: "Material 13", categoria: "Categoría M" },
    { id: 14, nombre: "Material 14", categoria: "Categoría N" },
    { id: 15, nombre: "Material 15", categoria: "Categoría Ñ" },
    { id: 16, nombre: "Material 16", categoria: "Categoría O" },
    { id: 17, nombre: "Material 17", categoria: "Categoría P" },
    { id: 18, nombre: "Material 18", categoria: "Categoría Q" },
    { id: 19, nombre: "Material 19", categoria: "Categoría R" },
    { id: 20, nombre: "Material 20", categoria: "Categoría S" },
];

function renderRow(index, event, material, style, agregar, handleChangeAgregar, count, handleChangeCount, showZero, handleChangeShowZero){

    return (
        <ListItem 
            style={{...style}} 
            key={material.id} 
            component="div" 
            disablePadding 
            secondaryAction={
                <Fab aria-label="comment" size="small" variant="extended" onClick={(event) => handleChangeAgregar(event)} color='azulamarillo'>
                    <AddIcon/> Agregar
                </Fab>
            }
        >
            <ListItemButton>
                <ListItemText primary={`${material.id} ${material.nombre}`} />
                <ListItemText style={{paddingRight: 50}} primary={`${material.categoria}`} />
                {agregar ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            mt: 4,
                        }}
                    >
                        <Badge badgeContent={count} showZero={showZero}>
                            <Typography level="h6" component="h2">
                            🛍
                            </Typography>
                        </Badge>
                        <Box
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            pt: 4,
                            mb: 2,
                            borderTop: '1px solid',
                            borderColor: 'background.level1',
                            }}
                        >
                            <IconButton
                            size="sm"
                            variant="outlined"
                            onClick={() => handleChangeCount((c) => c - 1)}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography textColor="text.secondary" sx={{ fontWeight: 'md' }}>
                                {count}
                            </Typography>
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={() => handleChangeCount((c) => c + 1)}
                            >
                                <Add />
                            </IconButton>
                        </Box>
                    </Box>
               ) : null}
            </ListItemButton>
        </ListItem>

    );
}


//Lista de materiales

const chance = new Chance(42);  // Semilla para generar datos consistentes
  
function createData(id) {
    return {
        id,
        codigo: chance.guid(),  // Genera un identificador único
        nombre: chance.word(),  // Genera un nombre de producto aleatorio
        descripcion: chance.sentence({ words: 5 }),  // Genera una descripción con 5 palabras
        stock: chance.integer({ min: 0, max: 100 }),  // Genera un número aleatorio para stock
        comprometido: chance.integer({ min: 0, max: 50 }),  // Genera un número aleatorio para comprometido
    };
}

const columns = [
    {
      width: 50,
      label: 'Código',
      dataKey: 'codigo',
    },
    {
      width: 70,
      label: 'Nombre',
      dataKey: 'nombre',
    },
    {
      width: 100,
      label: 'Descripción',
      dataKey: 'descripciion',
    },
    {
      width: 30,
      label: 'Stock',
      dataKey: 'stock',
    },
    {
      width: 100,
      label: 'Comprometido',
      dataKey: 'comprometido',
    },
];

const rows = Array.from({ length: 200 }, (_, index) => createData(index));

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={'right'}
            style={{width: column.width}}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

function rowContent(_index, row){
    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    align={'left'}
                >
                {row[column.dataKey]}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

//Modal de agregar material
function ChildModal({ open, handleClose }) {
    const [manual, setManual] = useState(false);
    const handleChangeManual = (event) => {
        setManual(event.target.checked);
        if (event.target.checked) {
            setOrden(false);
        }
    };

    const [orden, setOrden] = useState(false);
    const handleChangeOrden = (event) => {
        setOrden(event.target.checked);
        if (event.target.checked) {
            setManual(false);
        }
    };

    const [agregar, setAgregar] = useState(false);
    const handleChangeAgregar = () => {
        setAgregar(!agregar);
    };

    const [count, setCount] = useState(0);
    const handleChangeCount = (newCount) => {
        setCount(newCount);
    };

    const [showZero, setShowZero] = useState(false);
    const handleChangeShowZero = (checked) => {
        setShowZero(checked);
    };
    return(
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
                            <h2 id="child-modal-title">Ingresar nuevo material</h2>
                        </Grid2>

                        <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                            <Button onClick={handleClose}>
                                <HighlightOffIcon style={{color: '#b71c1c'}}/>
                            </Button>
                        </Grid2>
                    </Grid2>

                    <Box
                        component="form"
                        noValidate
                        mt={2}
                        align="center"
                    >
                        <Box sx={{ 
                            display: 'flex', 
                            gridTemplateColumns: { sm: '1fr 1fr' }, 
                            gap: 2, 
                            justifyContent: 'center',
                            alignItems: 'center'}}
                        >

                            <FormControl>
                                <FormControlLabel
                                    sx={{ m: 1 }} 
                                    id="manual"
                                    control={<Checkbox checked={manual} onChange={handleChangeManual} />}
                                    label="Ingresar de forma manual" 
                                />
                            </FormControl>

                            <FormControl>
                                <FormControlLabel
                                    sx={{ m: 1 }} 
                                    id="orden"
                                    control={<Checkbox checked={orden} onChange={handleChangeOrden} />}
                                    label="Ingresar con orden previa" 
                                />
                            </FormControl>
                        </Box>

                        <Box>
                            {manual ?
                                <FixedSizeList
                                    height={370}
                                    width={700}
                                    itemSize={46}
                                    itemCount={materiales.length}
                                    overscanCount={5}
                                >
                                
                                    {({ index, style }) => (
                                        renderRow(
                                            index,
                                            null,
                                            materiales[index],
                                            style,
                                            agregar,
                                            handleChangeAgregar,
                                            count,
                                            handleChangeCount,
                                            showZero,
                                            handleChangeShowZero
                                        )
                                    )}
                            
                                </FixedSizeList>
                            : ''}
                        </Box>
                    </Box> 

                </Box> 
            </Modal>
        </React.Fragment>
    );
}

//Modal principal
export default function NestedModalBodega({open, handleClose}) {
    const [ordenarPor, setOrdenarPor] = useState('nombre');
    const ordenarMateriales = (materiales) => {
        return [...materiales].sort((a, b) => {
            if (ordenarPor === 'nombre') {
                return a.nombre.localeCompare(b.nombre);
            } else if (ordenarPor === 'categoria') {
                return a.categoria.localeCompare(b.categoria);
            }
            return 0;
        });
    };

    const [busqueda, setBusqueda] = useState('');
    const materialesFiltrados = materiales.filter(
        (material) => 
            material.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
            material.categoria.toLowerCase().includes(busqueda.toLowerCase())
    );
    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
    };

    const materialesOrdenados = ordenarMateriales(materialesFiltrados);

    const [childOpen, setChildOpen] = React.useState(false);
    const handleChildOpen = () => setChildOpen(true);
    const handleChildClose = () => setChildOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 700 }}>
            <Grid2 container alignItems="center" justifyContent="space-between">
                <Grid2 item xs={4} style={{ textAlign: 'left' }}>
                    <h2 id="parent-modal-title">Bodega</h2>
                </Grid2>

                <Grid2 item xs={4} style={{ textAlign: 'right' }}>
                    <Button onClick={handleClose}>
                        <HighlightOffIcon style={{color: '#b71c1c'}}/>
                    </Button>
                </Grid2>
            </Grid2>

            <Grid2 container alignItems="center" justifyContent="space-between">
                <Grid2 item xs={4} style={{ textAlign: 'left' }} justifyContent="space-between">
                    <Fab color="amarillo" aria-label="add" variant="extended" onClick={handleChildOpen}> 
                        <AddIcon/>Ingreso
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
                <Grid2 item xs={4} style={{ textAlign: 'rigth' }} justifyContent="space-between">
                    <Fab color="amarillo" aria-label="add" variant="extended">
                        <AddIcon/>Salida
                    </Fab>
                </Grid2>
            </Grid2>

            <Box
                sx={{ width: '100%', marginTop:2, height: 400, maxWidth: 700, bgcolor: '#e5e5e5' }}
            >
                
                <Paper style={{ height: 400, width: '100%' }} elevation={0}>
                    <TableVirtuoso
                        data={rows}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={() => (
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.dataKey}
                                        variant="head"
                                        align={'left'}
                                        style={{
                                            width: column.width,
                                            backgroundColor: '#093d77',
                                            color: '#daa520', // Color de letra blanco
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}

                        //contenido de la tabla
                        itemContent={(_, row) => (
                            columns.map((column) => (
                                <TableCell
                                    key={column.dataKey}
                                    align={'left'}
                                >
                                    {row[column.dataKey]}
                                </TableCell>
                            ))
                        )}                        
                        sx={{bgcolor: '#e5e5e5'}}
                    />
                </Paper>
            </Box>
            <ChildModal open={childOpen} handleClose={handleChildClose} />
        </Box>
      </Modal>
    </div>
  );
}
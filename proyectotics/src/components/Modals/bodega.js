import React, { useState } from 'react';
import {
    Grid2, 
    Button, 
    Box, 
    Fab, 
    Modal, 
    styled, 
    alpha, 
    Toolbar,
    InputBase,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { TableVirtuoso } from 'react-virtuoso';
import Chance from 'chance';


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
                </Box>

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
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </Grid2>    





            </Modal>
        </React.Fragment>

    );
}

//Modal principal
export default function NestedModalBodega({open, handleClose}) {
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

//{({ index, style }) => (
//    renderRow({
//        index,
//        style,
//        handleDetailOpen
//    })
//)}
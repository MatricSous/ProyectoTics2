import React, { useState ,useEffect } from 'react';
import { Box, Button, Modal, TextField, Typography, Grid2, Grid, item, MenuItem } from '@mui/material';




function EditarVenta({material , open, onClose }) {
    
    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
  };

const [materialDetails, setMaterialDetails] = useState([]); // Estado para los materiales relacionados
const [loading, setLoading] = useState(true);
useEffect(() => {
    // Simulamos la obtención de materiales desde una base de datos.
    const fetchMaterialDetails = async () => {
    // AQUI SE REMPLAZA LA BASE DE DATOS POR LA QUE ESTAMOS BUSCANDO
      const associatedMaterials = [
        { id: 1, nombre: 'Material A', cantidad: 10, detalle: 'Detalle del Material A' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        { id: 2, nombre: 'Material B', cantidad: 5, detalle: 'Detalle del Material B' },
        
        { id: 3, nombre: 'Material C', cantidad: 8, detalle: 'Detalle del Material C' },
        { id: 4, nombre: 'Material D', cantidad: 2, detalle: 'Detalle del Material D' },
        { id: 5, nombre: 'Material E', cantidad: 12, detalle: 'Detalle del Material E' }
      ];
      
      // Agregamos el valor total a cada material basado en la cantidad
      const materialsWithTotal = associatedMaterials.map(material => ({
        ...material,
        total: material.cantidad * 100 // Precio fijo de 100 como ejemplo
      }));

      setMaterialDetails(materialsWithTotal); // Establecemos los materiales relacionados
      setLoading(false); // Cambiamos el estado a no cargando
    };

    fetchMaterialDetails(); // Llamamos a la función para obtener los detalles

  }, [material]); // Cada vez que cambie el material seleccionado, se ejecutará esta función
 

  return(
    <Box sx={style}>
            <div
                style={{
                    position: 'relative',
                    textAlign: 'center', // Centrar contenido dentro del contenedor
                    marginBottom: '1rem', // Espaciado entre título y raya
                    
                }}
                >
                <h2
                    id="parent-modal-title"
                    style={{
                    margin: 0, // Eliminar márgenes del título
                    color: 'black',
                    fontSize: '1.5rem',
                    zIndex: 1, // Garantiza que el título esté visible
                    wordWrap: 'break-word', // Permite que el texto se ajuste en varias líneas si es largo
                    }}
                >
                    {material.nombre}
                </h2>
                    <div
                    className="Raya"
                    style={{
                    height: '2px', // Espesor de la línea
                    backgroundColor: 'black', // Color de la "raya"
                    width: '100%', // Ajuste al ancho del contenedor
                    marginTop: '0.5rem', // Espaciado entre el título y la línea
                    }}>   
                    </div>
            </div>

        <h2 >Precio: {material.precio} </h2>
        
        <Grid2 container rowSpacing={2}  style={{ display: 'flex', alignItems: 'center'}}>
            <Grid2 size={2}>
            <item>
                hola
            </item>
            </Grid2>
            <Grid2 size={2}>
            <item>
                hola
            </item>
            </Grid2>
            <Grid2 size={2}>
            <item>
                hola
            </item>
            </Grid2>
            <Grid2 size={2}>
            <item>
                hola
            </item>
            </Grid2>

    
        </Grid2>
    </Box>

    
  )

};

export default EditarVenta;
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
    
        {
          value: 'ID 1',
          label: 'ID 1. nombre',
        },
        {
          value: 'ID 2',
          label: 'ID 2. nombre',
        },
        {
          value: 'ID 3',
          label: 'ID 3. nombre',
        },
        {
          value: 'ID 4',
          label: 'ID 4. nombre',
        },
        {
          value: 'ID 5',
          label: 'ID 5. nombre',
        },
        {
          value: 'ID 6',
          label: 'ID 6. nombre',
        },
        {
          value: 'ID 7',
          label: 'ID 7. nombre',
        },
        {
          value: 'ID 8',
          label: 'ID 8. nombre',
        },
        {
          value: 'ID 9',
          label: 'ID 9. nombre',
        },
        {
          value: 'ID 10',
          label: 'ID 10. nombre',
        },
        {
          value: 'ID 11',
          label: 'ID 11. nombre',
        },
        {
          value: 'ID 12',
          label: 'ID 12. nombre',
        },
        {
          value: 'ID 13',
          label: 'ID 13. nombre',
        },
        {
          value: 'ID 14',
          label: 'ID 14. nombre',
        },
        {
          value: 'ID 15',
          label: 'ID 15. nombre',
        },
        {
          value: 'ID 16',
          label: 'ID 16. nombre',
        },
        {
          value: 'ID 17',
          label: 'ID 17. nombre',
        },
        {
          value: 'ID 18',
          label: 'ID 18. nombre',
        },
        {
          value: 'ID 19',
          label: 'ID 19. nombre',
        },
        {
          value: 'ID 20',
          label: 'ID 20. nombre',
        }
];

export default function SelectTextFields() {
  return (
    
        <TextField
          id="outlined-select-currency"
          select
          label="Receta"
    
          helperText="Seleccionar Receta"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Landing from './pages/Landing';
import index from './pages/index';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@mui/material';

const theme = createTheme({
  palette: {
    azul: {
      light: '#f8f9sa',
      main: '#093d77',
      dark: '#2b2b2b',
      contrastText: '#00000',
    },
    celeste: {
      light: '#fff',
      main: '#3a7ca5',
      dark: '#fff',
      contrastText: '#fff',
    },
    
    amarillo: {
      light: '#fff',
      main: '#daa520',
      dark: '#fff',
      contrastText: '#fff',
    },
    blanco: {
      light: '#fff',
      main: '#f8f9fa',
      dark: '#fff',
      contrastText: '#fff',
    },
    negro: {
      light: '#fff',
      main: '#2b2b2b',
      dark: '#daa520',
      contrastText: '#093d77',
    },
  },
});

function App() {
  
  
  return (
    <>

    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
          <Routes>
            <Route path= '/' exact Component={index} />
            <Route path= '/Landing' exact Component={Landing} />
          </Routes>  
      </Router>
      </ThemeProvider>

    </>
    
  );
}

export default App;

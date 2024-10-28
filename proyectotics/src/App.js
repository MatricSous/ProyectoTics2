import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Landing from './pages/Landing';
import LandingProduccion from './pages/LandingProduccion';
import LandingVentas from './pages/LandingVentas';
import LandingCompras from './pages/LandingCompras';
import index from './pages/index';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    azul: {
      light: '#f8f9sa',
      main: '#093d77',
      dark: '#2b2b2b',
      contrastText: '#f8f9fa',
    },
    celeste: {
      light: '#fff',
      main: '#3a7ca5',
      dark: '#fff',
      contrastText: '#fff',
    },
    
    amarillo: {
      light: '#2b2b2b',
      main: '#daa520',
      dark: '#b98917',
      contrastText: '#2b2b2b',
    },

    amarillohoverblanco: {
      light: '#f8f9fa',
      main: '#daa520',
      dark: '#093d77',
      contrastText: '#f8f9fa',
      Text: 'f8f9fa',
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
      contrastText: '#f8f9fa',
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
            <Route path= '/LandingProduccion' exact Component={LandingProduccion} />
            <Route path= '/LandingVentas' exact Component={LandingVentas} />
            <Route path= '/LandingCompras' exact Component={LandingCompras} />
          </Routes>  
      </Router>
      </ThemeProvider>

    </>
    
  );
}

export default App;

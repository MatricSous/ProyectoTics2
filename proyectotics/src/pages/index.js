<<<<<<< HEAD
import React, { useState } from 'react';
import Axios from 'axios';
=======
import React from 'react';
//import Axios from 'axios';
>>>>>>> 0d1628e (CAMBIOS DEFINITIVOS)
import {
    Box, 
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Avatar,
    Typography
} from '@mui/material';
import '../index.css';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

function CustomEmailField({ email, setEmail }) {
    return (
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-email">Correo</InputLabel>
            <OutlinedInput
                id="email"
                name="email"
                type="email"
                size="small"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                endAdornment={ 
                    <InputAdornment position="end">
                        <AccountCircle fontSize="inherit" />
                    </InputAdornment>
                }
                label="Correo"
            />
        </FormControl>
    );
}

function CustomPasswordField({ password, setPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-password">Contraseña</InputLabel>
            <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? <VisibilityOff fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Contraseña"
            />
        </FormControl>
    );
}

export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:8081/login', { correo: email, clave: password });
            const { token } = response.data;
            

            if (token) {
                console.log(response)
                // Guardar el token en el localStorage o manejarlo según tu preferencia
                localStorage.setItem('token', token);
                navigate('/Landing'); // Navegar a la página deseada después del login
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <Box 
            sx={{
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100vh',
                position: 'relative'
            }}
        >
            {/* Contenedor para la imagen de fondo con overlay */}
            <Box 
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("https://comercialrebolledo.cl/wp-content/uploads/2022/04/cropped-2.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay oscuro
                    }
                }}
            />

            {/* Formulario, que estará por encima de la imagen y overlay */}
            <Box 
                component="form" 
                onSubmit={handleLogin}
                sx={{
                    backgroundColor: '#e5e5e5',
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 4,
                    width: '20%',
                    height: '45%',
                    zIndex: 1, // Asegura que el formulario esté encima del overlay
                }}
            >
                <Avatar sx={{ bgcolor: '#093d77', m: 1 }}>
                    <LockOutlinedIcon fontSize="small" />
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom>Iniciar Sesión</Typography>
                <CustomEmailField email={email} setEmail={setEmail} />
                <CustomPasswordField password={password} setPassword={setPassword} />
                <Button
                    type="submit"
                    variant="contained"
                    color="amarillohoverblanco"
                    size="small"
                    disableElevation
                    fullWidth
                    sx={{ my: 2 }}
                >
                    Ingresar
                </Button>
            </Box>
        </Box>
    );
}

=======
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

//const signIn = async (provider, formData) => {
//  const promise = new Promise((resolve) => {
//    setTimeout(() => {
//      const email = formData?.get('email');
//      const password = formData?.get('password');
      // preview-start (mensaje de error)
//      resolve({
//        type: 'CredentialsSignin',
//        error: 'Credenciales Inválidas.',
//      });
      // preview-end
//    }, 300);
//  });
//  return promise;
//};

const signIn = async (provider) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Sign in with ${provider.id}`);
        resolve();
      }, 500);
    });
    return promise;
  };

function CustomEmailField() {
    return (
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
        <InputLabel size="small" htmlFor="outlined-adornment-email">
           Correo
        </InputLabel>
        <OutlinedInput
            id="email"
            name="email"
            type="email"
            size="small"
            required
            fullWidth
            endAdornment={ 
                <InputAdornment position="end">
                    <AccountCircle fontSize="inherit" />
                </InputAdornment>
            
            }
            label="Correo"
      />
    </FormControl>

    );
}

function CustomPasswordField() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
        <InputLabel size="small" htmlFor="outlined-adornment-password">
            Contraseña
        </InputLabel>
        <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            size="small"
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="small"
                >
                {showPassword ? (
                    <VisibilityOff fontSize="inherit" />
                ) : (
                    <Visibility fontSize="inherit" />
                )}
                </IconButton>
            </InputAdornment>
            }
            label="Contraseña"
        />
        </FormControl>
    );
}

function CustomButton() {
    const navigate = useNavigate(); // Crea una instancia de navigate
    return (
        <Button
        onClick={() => navigate('/Landing')}
        variant="contained"
        color="amarillohoverblanco"
        size="small"
        disableElevation
        fullWidth
        sx={{ my: 2 }}
        >
        Ingresar
        </Button>
    );
}

//function ForgotPasswordLink() {
//    return (
//      <Link href="/" variant="body2">
//        Forgot password?
//      </Link>
//    );
//  }

export default function Index() {
    return (
        // preview-start
        <Box sx={{
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100vh', // Para ocupar toda la altura de la ventana
            backgroundColor: '#e5e5e5', // Color de fondo cuando no se carga la imagen
            backgroundSize: 'cover', // Para cubrir toda el área
            backgroundPosition: 'center', // Centrar la imagen
            
        }}>
            <Box component="form" 
            onSubmit={signIn}
            sx={{
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                p: 4,
                borderRadius: 3,
                boxShadow: 4,
                width: '28%',
                height: '50%'
            }}>
                <Avatar sx={{bgcolor:'#093d77', m: 1}}>
                    <LockOutlinedIcon fontSize="small"/>
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom >
                    Iniciar Sesión
                </Typography>
                <CustomEmailField />
                <CustomPasswordField />
                <CustomButton />
            </Box>
        </Box>
    );
}
>>>>>>> 0d1628e (CAMBIOS DEFINITIVOS)

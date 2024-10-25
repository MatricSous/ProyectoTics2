const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"1234",
    database: "rebolledo"
});

const users = [
    {
        correo:"test@mail.com",
        clave: bcrypt.hashSync('1234', 10)
    }

];

secret = "sous1234";

app.get("/", (req, res) => {
    return res.json("proobando el backend");
  });

app.get("/ping", (req, res) => {
    return res.json("pingeado master");
  });


app.get("/usuarios", (req, res) => {
    const q = "SELECT * FROM usuarios";
    db.query(q,(err,data)=>{
        if (err) return res.json("Error recuperando Usuarios");
        else return res.json(data);
    })
  });

app.post("/usuarios", (req, res) => {
    let {correo, clave, nombre_usuario, apellido_usuario, rol_usuario, rut_usuario} = req.body;
    clave = bcrypt.hashSync(clave, 5);
    // Consulta SQL para insertar un nuevo usuario
    const q = "INSERT INTO usuarios (correo, clave, nombre_usuario, apellido_usuario, rol_usuario, rut_usuario) VALUES (?, ?, ?, ?, ?, ?)";

    // Parámetros que se insertarán en la consulta
    const values = [correo, clave, nombre_usuario, apellido_usuario, rol_usuario, rut_usuario];

    // Ejecutar la consulta
    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error insertando usuario en la base de datos", error: err });
        }
        return res.status(201).json({ message: "Usuario registrado con éxito" });
    });
  });


  app.post('/login', (req, res) => {
    const { correo, clave } = req.body;

    // Consulta SQL para buscar al usuario por correo
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    // Ejecutar la consulta
    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario fue encontrado
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario o Contraseña Incorrectos' });
        }

        // El usuario fue encontrado, data[0] contiene la información
        const user = data[0];

        // Verificar la contraseña con bcrypt
        const isMatch = bcrypt.compareSync(clave, user.clave);
        if (!isMatch) {
            return res.status(401).json({ message: 'Usuario o Contraseña Incorrectos' });
        }

        // Generar el token JWT
        const token = jwt.sign({ correo: user.correo }, secret, { expiresIn: '1h' });

        // Retornar el token (sin el secreto en la respuesta)
        return res.json({ message: 'Login exitoso', token });
    });
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No se ha enviado un token' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido', secret, token });
        }
        req.user = decoded;
        next();
    });
};

// Endpoint protegido
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso concedido', user: req.user });
});

  
  

app.listen(8081, () => {
    console.log("listening");
})
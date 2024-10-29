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

// Materiales
app.post('/materiales/crearMaterial', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;
    console.log(req)

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario existe
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el rol del usuario es 0
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para crear un producto' });
        }

        // Aquí iría el código para crear el producto si el rol es 0
        const q2 = "INSERT INTO materiales (codigo_material, nombre_material, descripcion_material, tipo_material, precio_material, foto_material, modificar_precio, valor_iva, descuento_maximo) VALUES (?, ?, ?, ?, ?, ?,?,?,?)";
        const codigo_material = req.body.material.codigo_material;
        const nombre_material = req.body.material.nombre_material;
        const descripcion_material = req.body.material.descripcion_material;
        const tipo_material = req.body.material.tipo_material;
        const precio_material = req.body.material.precio_material;
        const foto_material = req.body.material.foto_material;
        const modificar_precio = req.body.material.modificar_precio;
        const valor_iva = req.body.material.valor_iva;
        const descuento_maximo = req.body.material.descuento_maximo;
        db.query(q2,[codigo_material, nombre_material,descripcion_material,tipo_material,precio_material,foto_material,modificar_precio,valor_iva,descuento_maximo], (err,data) =>{
            if (err){
                console.log(err)
                return res.status(500).json({message: 'Hubo un error ingresando el material'});
            }
            return res.json({message:'Material Ingresado Exitosamente', material: req.material});

        });
        
    });
});

// Ruta para obtener todos los materiales con sus 9 características
app.get('/materiales/verMateriales', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario existe
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el rol del usuario es adecuado para ver materiales
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para ver los materiales' });
        }

        // Consulta para obtener todos los materiales con sus 9 características
        const q3 = `
            SELECT 
                codigo_material, 
                nombre_material, 
                descripcion_material, 
                tipo_material, 
                precio_material, 
                foto_material, 
                modificar_precio, 
                valor_iva, 
                descuento_maximo 
            FROM materiales
        `;
        
        db.query(q3, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error al obtener materiales', error: err });
            }

            // Retornar los materiales en la respuesta
            return res.json({ message: 'Materiales obtenidos exitosamente', materiales: data });
        });
    });
});

// Ruta para obtener un solo material por codigo_material con sus 9 características
app.get('/materiales/verMaterial/:codigo_material', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario existe
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el rol del usuario es adecuado para ver materiales
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para ver el material' });
        }

        // Consulta para obtener el material por su codigo_material
        const q4 = `
            SELECT 
                codigo_material, 
                nombre_material, 
                descripcion_material, 
                tipo_material, 
                precio_material, 
                foto_material, 
                modificar_precio, 
                valor_iva, 
                descuento_maximo 
            FROM materiales 
            WHERE codigo_material = ?
        `;

        const codigo_material = req.params.codigo_material;

        db.query(q4, [codigo_material], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error al obtener el material', error: err });
            }

            // Verificar si el material existe
            if (data.length === 0) {
                return res.status(404).json({ message: 'Material no encontrado' });
            }

            // Retornar el material encontrado en la respuesta
            return res.json({ message: 'Material obtenido exitosamente', material: data[0] });
        });
    });
});



app.post('/materiales/eliminarMaterial', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario existe
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el rol del usuario es 0
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para eliminar un material' });
        }

        // Código para eliminar el material si el rol es 0
        const codigo_material = req.body.codigo_material;
        const q2 = "DELETE FROM materiales WHERE codigo_material = ?";

        db.query(q2, [codigo_material], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Hubo un error al eliminar el material' });
            }

            // Verificar si algún material fue eliminado
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Material no encontrado' });
            }

            return res.json({ message: 'Material eliminado exitosamente' });
        });
    });
});

// Ruta para crear una nueva bodega
app.post('/bodegas/crearBodega', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario existe
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el rol del usuario es adecuado para crear una bodega
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para crear una bodega' });
        }

        // Consulta para insertar una nueva bodega
        const q5 = "INSERT INTO bodegas (id_bodega, nombre_bodega) VALUES (?, ?)";

        const { id_bodega, nombre_bodega } = req.body;

        db.query(q5, [id_bodega, nombre_bodega], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error al crear la bodega', error: err });
            }

            // Retornar éxito si la bodega se ha creado correctamente
            return res.json({ message: 'Bodega creada exitosamente', bodega: { id_bodega, nombre_bodega } });
        });
    });
});

// Ruta para eliminar una bodega por id_bodega
app.delete('/bodegas/eliminarBodega/:id_bodega', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario existe
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el rol del usuario es adecuado para eliminar una bodega
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para eliminar una bodega' });
        }

        // Consulta para eliminar una bodega por su id_bodega
        const q6 = "DELETE FROM bodegas WHERE id_bodega = ?";

        const id_bodega = req.params.id_bodega;

        db.query(q6, [id_bodega], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error al eliminar la bodega', error: err });
            }

            // Verificar si alguna fila fue afectada (es decir, si la bodega existía)
            if (data.affectedRows === 0) {
                return res.status(404).json({ message: 'Bodega no encontrada' });
            }

            // Retornar éxito si la bodega se ha eliminado correctamente
            return res.json({ message: 'Bodega eliminada exitosamente', id_bodega });
        });
    });
});

// Ruta para actualizar el nombre de una bodega por id_bodega
app.put('/bodegas/actualizarNombre/:id_bodega', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario existe
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el rol del usuario es adecuado para actualizar el nombre de la bodega
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para actualizar el nombre de la bodega' });
        }

        // Consulta para actualizar el nombre de una bodega
        const q7 = "UPDATE bodegas SET nombre_bodega = ? WHERE id_bodega = ?";

        const { nombre_bodega } = req.body;
        const id_bodega = req.params.id_bodega;

        db.query(q7, [nombre_bodega, id_bodega], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error al actualizar el nombre de la bodega', error: err });
            }

            // Verificar si alguna fila fue afectada (es decir, si la bodega existía)
            if (data.affectedRows === 0) {
                return res.status(404).json({ message: 'Bodega no encontrada' });
            }

            // Retornar éxito si el nombre de la bodega se ha actualizado correctamente
            return res.json({ message: 'Nombre de la bodega actualizado exitosamente', id_bodega, nombre_bodega });
        });
    });
});


  
  

app.listen(8081, () => {
    console.log("listening");
})
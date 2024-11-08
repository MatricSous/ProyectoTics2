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
    password:"milla",
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
    console.log(req)
    console.log(correo)
    console.log(clave)

    // Consulta SQL para buscar al usuario por correo
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    // Ejecutar la consulta
    db.query(q, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        // Verificar si el usuario fue encontrado
        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario o Contraseña Incorrectsos' });
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

        console.log(req.body)

        // Aquí iría el código para crear el producto si el rol es 0
        const q2 = "INSERT INTO materiales (codigo_material, nombre_material, descripcion_material, tipo_material, precio_material, foto_material, modificar_precio, valor_iva, descuento_maximo, discontinuado, seCompra, seVende, moneda, costo, unidad_medida, unidad_alternativa, factor, afecto, stockMinimo, stockMaximo) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?)";
        const codigo_material = req.body.codigo_material;
        const nombre_material = req.body.nombre_material;
        const descripcion_material = req.body.descripcion_material;
        const tipo_material = req.body.tipo_material;
        const precio_material = req.body.precio_material;
        const foto_material = req.body.foto_material;
        const modificar_precio = req.body.modificar_precio;
        const valor_iva = req.body.valor_iva;
        const descuento_maximo = req.body.descuento_maximo;
        const discontinuado = req.body.discontinuado;
        const seCompra = req.body.seCompra;
        const seVende = req.body.seVende;
        const moneda = req.body.moneda;
        const costo = req.body.costo;
        const unidad_medida = req.body.unidad_medida;
        const unidad_alternativa = req.body.unidad_alternativa;
        const factor = req.body.factor;
        const afecto = req.body.afecto;
        const stockMinimo = req.body.stockMinimo;
        const stockMaximo = req.body.stockMaximo;

        

        db.query(q2,[codigo_material, nombre_material,descripcion_material,tipo_material,precio_material,foto_material,modificar_precio,valor_iva,descuento_maximo, discontinuado, seCompra, seVende, moneda, costo, unidad_medida, unidad_alternativa, factor, afecto, stockMinimo, stockMaximo], (err,data) =>{
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



app.post('/materiales/crearMateriales', verifyToken, (req, res) => {
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
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para crear materiales' });
        }

        // Insertar múltiples materiales si el rol es 0
        const materiales = req.body.materiales; // Asumimos que es un array de objetos con los datos de cada material

        if (!Array.isArray(materiales) || materiales.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar una lista de materiales para insertar' });
        }

        const q2 = `
            INSERT INTO materiales (codigo_material, nombre_material, descripcion_material, tipo_material, precio_material, foto_material, modificar_precio, valor_iva, descuento_maximo) 
            VALUES ?
        `;

        // Transformar cada material en un array de valores
        const values = materiales.map(material => [
            material.codigo_material,
            material.nombre_material,
            material.descripcion_material,
            material.tipo_material,
            material.precio_material,
            material.foto_material,
            material.modificar_precio,
            material.valor_iva,
            material.descuento_maximo
        ]);

        db.query(q2, [values], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Hubo un error al ingresar los materiales', error: err });
            }

            return res.json({ message: 'Materiales ingresados exitosamente', insertedRows: result.affectedRows });
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
        const codigo_material = req.body.material.codigo_material;
        const q2 = "DELETE FROM materiales WHERE codigo_material = ?";

        console.log(codigo_material)

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


app.post('/materiales/editarMaterial', verifyToken, (req, res) => {
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
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para editar un material' });
        }

        // Código para editar el material si el rol es 0
        const { codigo_material, nombre_material, descripcion_material, tipo_material, precio_material, foto_material, modificar_precio, valor_iva, descuento_maximo } = req.body.material;
        const q2 = `
            UPDATE materiales 
            SET nombre_material = ?, descripcion_material = ?, tipo_material = ?, precio_material = ?, foto_material = ?, modificar_precio = ?, valor_iva = ?, descuento_maximo = ?
            WHERE codigo_material = ?
        `;

        const values = [nombre_material, descripcion_material, tipo_material, precio_material, foto_material, modificar_precio, valor_iva, descuento_maximo, codigo_material];

        db.query(q2, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Hubo un error al actualizar el material' });
            }

            // Verificar si algún material fue actualizado
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Material no encontrado' });
            }

            return res.json({ message: 'Material actualizado exitosamente' });
        });
    });
});




// Ruta para crear una nueva bodega
app.post('/bodegas', verifyToken, (req, res) => {
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
        const q5 = "INSERT INTO bodegas ( nombre_bodega) VALUES (?)";

        const  nombre_bodega  = req.body.nombre_bodega;

        db.query(q5, [nombre_bodega], (err, data) => {
            if (err) {

                if (err.errno == "1062"){return res.status(500).json({ message: 'Bodega Ya Existe', error: err })}
                return res.status(500).json({ message: 'Error al crear la bodega', error: err });
            }

            // Retornar éxito si la bodega se ha creado correctamente
            return res.json({ message: 'Bodega creada exitosamente', bodega: {nombre_bodega } });
        });
    });
});

// Ruta para traer todos los datos del Inventario
app.get('/inventarios/getInventario', verifyToken, (req, res) => {
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

        // Verificar si el rol del usuario es adecuado para acceder al inventario
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para ver el inventario' });
        }

        // Consulta para obtener todas las bodegas y todos los datos de sus materiales relacionados
        const q5 = `
            SELECT b.nombre_bodega as bodega, m.codigo_material as codigo, m.nombre_material as material,
            bm.cantidad as stock, bm.cantidad_comprometida as stockComp, m.stockMaximo as stockMax,
            m.stockMinimo as stockMin, m.unidad_medida as unidad
            FROM bodegas AS b
            JOIN bodegas_materiales AS bm ON b.id_bodega = bm.id_bodega
            JOIN materiales AS m ON bm.id_material = m.id_materiales
        `;

        db.query(q5, (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener el inventario', error: err });
            }

            // Añadir un id único a cada fila
            const inventario = data.map((item, index) => ({
                id: index + 1,  // Crear un ID único para cada fila
                ...item
            }));

            // Retornar todas las bodegas y sus materiales asociados con todos los datos de cada material
            return res.json({ message: 'Inventario obtenido exitosamente', inventario });
        });
    });
});
// Ruta para crear una nueva bodega
app.post('/bodegas/agregarBodegas', verifyToken, (req, res) => {
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
        const q5 = "INSERT INTO bodegas ( nombre_bodega) VALUES (?)";

        const  nombre_bodega  = req.body.newBodega;

        db.query(q5, [nombre_bodega], (err, data) => {
            if (err) {

                if (err.errno == "1062"){return res.status(500).json({ message: 'Bodega Ya Existe', error: err })}
                return res.status(500).json({ message: 'Error al crear la bodega', error: err });
            }

            // Retornar éxito si la bodega se ha creado correctamente
            return res.json({ message: 'Bodega creada exitosamente', bodega: {nombre_bodega } });
        });
    });
});

// Ruta para eliminar una bodega por id_bodega
app.delete('/bodegas/:id_bodega', verifyToken, (req, res) => {
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
app.put('/bodegas/:id_bodega', verifyToken, (req, res) => {
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


//Recetas

// Materiales
app.post('/recetas/crearReceta', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado
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
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para crear una receta' });
        }

        // Extraer los datos de la receta y los materiales
        const { nombre_receta, materiales, precio_producto_unitario, foto_producto, notas_recetas, id_bodega } = req.body;
        const codigos = materiales.map(material => material.codigo_material);
        const cantidades = materiales.map(material => material.cantidad);

        // Crear un array de objetos con pares {codigo_material, cantidad}
        const materialesJson = materiales.map(material => ({
            codigo: material.codigo_material,
            cantidad: material.cantidad
        }));

        // Verificar si todos los códigos de materiales existen en la base de datos
        const q2 = "SELECT codigo_material FROM materiales WHERE codigo_material IN (?)";

        db.query(q2, [codigos], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al verificar materiales', error: err });
            }

            // Comprobar si todos los códigos enviados están en la base de datos
            const codigosEncontrados = result.map(row => row.codigo_material);
            if (codigosEncontrados.length !== codigos.length) {
                const codigosNoEncontrados = codigos.filter(codigo => !codigosEncontrados.includes(codigo));
                return res.status(404).json({
                    message: 'Algunos materiales no existen en la base de datos',
                    codigosNoEncontrados
                });
            }

            // Si todos los materiales existen, proceder a insertar la receta
            const q3 = `INSERT INTO recetas 
                (nombre_receta, materiales, precio_producto_unitario, foto_producto, notas_recetas, id_bodega) 
                VALUES (?, ?, ?, ?, ?, ?)`;

            // Convertir `materialesJson` a una cadena JSON para la inserción
            db.query(q3, [nombre_receta, JSON.stringify(materialesJson), precio_producto_unitario, foto_producto, notas_recetas, id_bodega], (err, recetaData) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al crear la receta', error: err });
                }

                return res.json({
                    message: 'Receta creada exitosamente',
                    recetaId: recetaData.insertId
                });
            });
        });
    });
});

// Eliminar una receta por ID con verificación de rol
app.delete('/recetas/:id', verifyToken, (req, res) => {
    const correo = req.user.correo;
    const recetaId = req.params.id;

    // Verificación del rol del usuario
    const q = "SELECT * FROM usuarios WHERE correo = ?";
    db.query(q, [correo], (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al verificar usuario', error: err });
        if (data.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const user = data[0];
        if (user.rol_usuario !== 0) return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para eliminar una receta' });

        // Eliminar receta si el usuario tiene permisos
        const deleteQuery = "DELETE FROM recetas WHERE id_recetas = ?";
        db.query(deleteQuery, [recetaId], (err, result) => {
            if (err) return res.status(500).json({ message: 'Error al eliminar la receta', error: err });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Receta no encontrada' });
            res.json({ message: 'Receta eliminada exitosamente' });
        });
    });
});



// Traer todas las recetas
app.get('/recetas', (req, res) => {
    const q = "SELECT * FROM recetas";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al obtener recetas', error: err });
        res.json({ recetas: data });
    });
});

// Traer una receta por ID
app.get('/recetas/:id', (req, res) => {
    const recetaId = req.params.id;
    const q = "SELECT * FROM recetas WHERE id_recetas = ?";

    db.query(q, [recetaId], (err, data) => {
        if (err) return res.status(500).json({ message: 'Error al obtener la receta', error: err });
        if (data.length === 0) return res.status(404).json({ message: 'Receta no encontrada' });
        res.json({ receta: data[0] });
    });
});
  
  

app.listen(8081, () => {
    console.log("listening");
})
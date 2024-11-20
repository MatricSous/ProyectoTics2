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
app.get('/materiales/verMaterialesAll', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    console.log("materiales");

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
            SELECT *
            FROM materiales 
        `;
        
        db.query(q3, (err, materiales) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error al obtener materiales', error: err });
            }

            // Modificar los nombres de las variables en la respuesta
            const materialesModificados = materiales.map(material => {
                return {
                    id: material.id_materiales,
                    codigo: material.codigo_material, // Cambiar el nombre de 'codigo_material' a 'codigo'
                    nombre_material: material.nombre_material, // Cambiar el nombre de 'nombre_material' a 'nombre'
                    categoria_material: material.tipo_material, // Cambiar 'cantidad' a 'stock'
                    stockComprometido: material.cantidad_comprometida, // Cambiar 'cantidad_comprometida' a 'stockComprometido'
                    valor: material.valor
                };
            });

            // Retornar los materiales con los nombres modificados
            console.log(materialesModificados);
            return res.json({ message: 'Materiales obtenidos exitosamente', materiales: materialesModificados });
        });
    });
});


// Ruta para obtener todos los materiales con sus 9 características
app.get('/materiales/verMateriales', verifyToken, (req, res) => {
    // Extraer el correo del token decodificado (asumimos que está en req.user)
    const correo = req.user.correo;

    // Consulta SQL para buscar al usuario por correo y verificar el rol
    const q = "SELECT * FROM usuarios WHERE correo = ?";

    console.log("materiales")

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
            SELECT *
            FROM materiales where afecto = 1
        `;
        
        db.query(q3, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error al obtener materiales', error: err });
            }

            // Retornar los materiales en la respuesta
            console.log(data)
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
                id_materiales,
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

        // Procesar los materiales para hacer las conversiones necesarias
        const processedMateriales = materiales.map(material => {
            // Convertir "Si" y "No" a booleanos
            const seCompra = material.seCompra === 'Si';
            const seVende = material.seVende === 'Si';
            const afecto = material.afecto === 'Si';
            const modificable = material.modificable === 'Si';

            // Si "afecto" es "No", setear stockMaximo y stockMinimo a 0
            if (!afecto) {
                material.stockMaximo = 0;
                material.stockMinimo = 0;
            }

            // Si "modificable" es "No", setear descuentoMaximo a 0
            if (!modificable) {
                material.descuentoMaximo = 0;
            }

            // Retornar el material procesado con los valores convertidos y las modificaciones aplicadas
            return {
                ...material,
                seCompra,
                seVende,
                afecto,
                modificable
            };
        });

        const q2 = `
            INSERT INTO materiales (codigo_material, nombre_material, descripcion_material, tipo_material, precio_material, foto_material, modificar_precio, valor_iva, descuento_maximo, stockMaximo, stockMinimo, unidad_alternativa, unidad_medida, factor, seCompra, seVende, moneda, afecto, costo) 
            VALUES ?
        `;

        // Transformar cada material procesado en un array de valores
        const values = processedMateriales.map(material => [
            codigo_material = material.codigo,
            material.nombre_material,
            descripcion_material = material.descripcion,
            tipo_material = material.categoria,
            precio_material = material.precio,
            material.foto_material,
            modificar_precio = material.modificable,
            material.valor_iva,
            material.descuento_maximo,
            material.stockMaximo,
            material.stockMinimo,
            material.unidad_alternativa,
            material.unidad_medida,
            material.factor,
            material.seCompra,
            material.seVende,
            material.moneda,
            material.afecto,
            material.costo_compra
        ]);

        // Ejecutar la consulta para insertar los materiales
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


// Ruta para crear una nueva bodega
app.post('/bodegas/bodegasMateriales', verifyToken, (req, res) => {
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

        // Extraer datos del cuerpo de la solicitud
        const id_bodega = req.body.id_bodega;
        const id_material = req.body.id_material;
        const cantidad = req.body.cantidad;

        // Verificar si el id_bodega existe en la tabla bodegas
        const q1 = "SELECT * FROM bodegas WHERE id_bodega = ?";

        db.query(q1, [id_bodega], (err, bodegaData) => {
            if (err) {
                return res.status(500).json({ message: 'Error al verificar la bodega en la base de datos', error: err });
            }

            if (bodegaData.length === 0) {
                return res.status(404).json({ message: 'Bodega no encontrada' });
            }

            // Verificar si el par (id_bodega, id_material) existe en la tabla bodegas_materiales
            const q2 = `
                SELECT * 
                FROM bodegas_materiales 
                WHERE id_bodega = ? AND id_material = ?
                ORDER BY fecha_creacion DESC 
                LIMIT 1;
            `;
            
            db.query(q2, [id_bodega, id_material], (err, materialData) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al verificar el material en la base de datos', error: err });
                }

                let nuevaCantidad = cantidad; // Si no existe un registro previo, la cantidad es la nueva
                if (materialData.length > 0) {
                    // Si hay un registro previo, sumamos la cantidad existente
                    const material = materialData[0];
                    nuevaCantidad += material.cantidad;
                }

                // Crear un nuevo registro con la cantidad actualizada
                const q3 = `
                    INSERT INTO bodegas_materiales (id_bodega, id_material, cantidad, fecha_creacion) 
                    VALUES (?, ?, ?, NOW());
                `;

                db.query(q3, [id_bodega, id_material, nuevaCantidad], (err, insertData) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al agregar el material a la bodega', error: err });
                    }

                    return res.json({
                        message: 'Material agregado a la bodega exitosamente con registro histórico',
                        bodega: { id_bodega, id_material, cantidad: nuevaCantidad }
                    });
                });
            });
        });
    });
});

// Ruta para actualizar el inventario
app.post('/inventarios/actualizarInventario', verifyToken, (req, res) => {
    const { codigo_material, cantidad, bodega } = req.body;

    // Verificar que todos los parámetros estén presentes
    if (!codigo_material || !cantidad || !bodega) {
        return res.status(400).json({ message: 'Faltan parámetros: codigo_material, cantidad o bodega' });
    }

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

        // Verificar si el rol del usuario es adecuado para actualizar el inventario
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'Acceso denegado: no tienes permisos para actualizar el inventario' });
        }

        // Verificar si el material existe en la tabla materiales y obtener su id_materiales
        const qMaterial = "SELECT id_materiales FROM materiales WHERE codigo_material = ?";
        db.query(qMaterial, [codigo_material], (err, materialData) => {
            if (err) {
                return res.status(500).json({ message: 'Error al buscar el material', error: err });
            }

            if (materialData.length === 0) {
                return res.status(404).json({ message: `El material con código ${codigo_material} no existe` });
            }

            const id_material = materialData[0].id_materiales;

            // Buscar el id_bodega correspondiente al nombre de la bodega
            const qBodega = "SELECT id_bodega FROM bodegas WHERE nombre_bodega = ?";
            db.query(qBodega, [bodega], (err, bodegaData) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al buscar la bodega', error: err });
                }

                if (bodegaData.length === 0) {
                    return res.status(404).json({ message: `La bodega con nombre ${bodega} no existe` });
                }

                const id_bodega = bodegaData[0].id_bodega;

                // Insertar la nueva entrada en bodegas_materiales
                const insertQuery = `
                    INSERT INTO bodegas_materiales (id_bodega, id_material, cantidad, fecha_creacion)
                    VALUES (?, ?, ?, NOW());
                `;
                db.query(insertQuery, [id_bodega, id_material, cantidad], (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al actualizar el inventario', error: err });
                    }

                    // Retornar éxito
                    return res.json({ message: 'Inventario actualizado exitosamente' });
                });
            });
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

        // Consulta para obtener los registros más recientes de cada par bodega-material, filtrando por cantidad > 0
        const q5 = `
            SELECT 
                b.nombre_bodega AS bodega, 
                m.codigo_material AS codigo, 
                m.nombre_material AS material,
                bm.cantidad AS stock, 
                bm.cantidad_comprometida AS stockComp, 
                m.stockMaximo AS stockMax,
                m.stockMinimo AS stockMin, 
                m.unidad_medida AS unidad
            FROM bodegas AS b
            JOIN bodegas_materiales AS bm ON b.id_bodega = bm.id_bodega
            JOIN materiales AS m ON bm.id_material = m.id_materiales
            WHERE (bm.id_bodega, bm.id_material, bm.fecha_creacion) IN (
                SELECT 
                    id_bodega, id_material, MAX(fecha_creacion)
                FROM bodegas_materiales
                GROUP BY id_bodega, id_material
            )
            AND bm.cantidad > 0;  -- Filtrar solo los registros con cantidad mayor a 0
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

            // Retornar todas las bodegas y sus materiales asociados con los datos más recientes de cada material
            return res.json({ message: 'Inventario obtenido exitosamente', inventario });
        });
    });
});


// Ruta para traer todos los datos del Inventario
app.get('/bodegas/getBodegas', verifyToken, (req, res) => {
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
            SELECT *
            FROM bodegas
        `;

        db.query(q5, (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener el inventario', error: err });
            }

            // Añadir un id único a cada fila
            const bodegas = data.map((item, index) => ({
                id: index + 1,  // Crear un ID único para cada fila
                ...item
            }));

            // Retornar todas las bodegas y sus materiales asociados con todos los datos de cada material
            return res.json({ message: 'Inventario obtenido exitosamente', bodegas });
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
app.get('/recetas', verifyToken, (req, res) => {
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
  
  
// Endpoint para crear cotización
app.post('/ordenes/crearOC', verifyToken, (req, res) => {
    const { id_proveedor, numero_cotizacion = null, forma_pago, materiales } = req.body;

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

        // Verificar si el rol del usuario es 0 (permitido)
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
        }

        // Validación de los datos recibidos
        if (!id_proveedor || !forma_pago || !Array.isArray(materiales) || materiales.length === 0) {
            return res.status(400).json({ error: 'Datos insuficientes o formato incorrecto' });
        }

        // Inserción de la cotización
        db.query(
            'INSERT INTO orden_compra (id_proveedor, forma_pago) VALUES ( ?, ?)',
            [id_proveedor, numero_cotizacion, forma_pago],
            (err, result) => {
                if (err) {
                    console.error('Error al insertar la cotización:', err);
                    return res.status(500).json({ error: 'Error en el servidor al insertar la cotización' });
                }

                const cotizacionId = result.insertId;

                // Inserción de materiales
                const materialValues = materiales.map(material => [cotizacionId, material.codigo_material, material.cantidad]);
                db.query(
                    'INSERT INTO materiales_orden_compra (id_orden_compra, codigo_material, cantidad) VALUES ?',
                    [materialValues],
                    (err) => {
                        if (err) {
                            console.error('Error al insertar materiales:', err);
                            return res.status(500).json({ error: 'Error en el servidor al insertar materiales' });
                        }

                        res.status(201).json({ message: 'Cotización creada exitosamente', id_orden_compra: cotizacionId });
                    }
                );
            }
        );
    });
});

app.get('/ordenes/obtenerOC/:id', verifyToken, (req, res) => {
    const id_orden_compra = req.params.id;

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

        // Verificar si el rol del usuario es 0 (permitido)
        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
        }

        // Consultar la cotización específica y sus materiales
        const cotizacionQuery = `
            SELECT oc.id_orden, oc.id_proveedor, oc.forma_pago, p.nombre AS proveedor
            FROM orden_compra AS oc
            JOIN proveedores AS p ON oc.id_proveedor = p.id_proveedores
            WHERE oc.id_orden = ?;
        `;
        
        db.query(cotizacionQuery, [id_orden_compra], (err, cotizacionData) => {
            if (err) {
                console.error('Error al buscar la cotización:', err);
                return res.status(500).json({ error: 'Error en el servidor al buscar la cotización' });
            }

            // Verificar si la cotización existe
            if (cotizacionData.length === 0) {
                return res.status(404).json({ message: 'Cotización no encontrada' });
            }

            const cotizacion = cotizacionData[0];

            // Consultar los materiales de la cotización, seleccionando el más reciente por código de material
            const materialesQuery = `
                SELECT moc.codigo_material, moc.cantidad, moc.cantidad_recibida, 
                       m.nombre_material, m.descripcion_material, m.precio_material
                FROM materiales_orden_compra AS moc
                JOIN materiales AS m ON moc.codigo_material = m.codigo_material
                WHERE moc.id_orden_compra = ?
                AND moc.fecha_creacion = (
                    SELECT MAX(fecha_creacion) 
                    FROM materiales_orden_compra 
                    WHERE codigo_material = moc.codigo_material AND id_orden_compra = ?
                )
                HAVING moc.cantidad != moc.cantidad_recibida; -- Excluir materiales completos
            `;

            db.query(materialesQuery, [id_orden_compra, id_orden_compra], (err, materialesData) => {
                if (err) {
                    console.error('Error al buscar los materiales:', err);
                    return res.status(500).json({ error: 'Error en el servidor al buscar los materiales' });
                }

                // Estructurar la respuesta final
                res.status(200).json({
                    detalles: {
                        id_orden_compra: cotizacion.id_orden,
                        id_proveedor: cotizacion.id_proveedor,
                        forma_pago: cotizacion.forma_pago,
                        proveedor: cotizacion.proveedor,
                    },
                    materiales: materialesData.map(material => ({
                        codigo_material: material.codigo_material,
                        nombre_material: material.nombre_material,
                        descripcion: material.descripcion_material,
                        cantidad: material.cantidad,
                        precio_unitario: material.precio_material
                    }))
                });
            });
        });
    });
});


app.post('/ordenes/actualizarOC', verifyToken, (req, res) => {
    const { id_proveedor, id_orden, forma_pago, materiales, bodega } = req.body;
    console.log(id_proveedor, id_orden, forma_pago, materiales, bodega);

    // Extraer el correo del token decodificado
    const correo = req.user.correo;

    // Consulta para verificar el usuario
    const userQuery = "SELECT * FROM usuarios WHERE correo = ?";
    db.query(userQuery, [correo], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario en la base de datos', error: err });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = data[0];
        if (user.rol_usuario !== 0) {
            return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
        }

        if (!id_proveedor || !id_orden || !forma_pago || !Array.isArray(materiales) || materiales.length === 0) {
            return res.status(400).json({ error: 'Datos insuficientes o formato incorrecto' });
        }

        // Consulta para obtener los materiales más recientes por cada par (id_orden_compra, codigo_material)
        const checkOrderQuery = `
            SELECT moc.codigo_material, moc.cantidad, moc.cantidad_recibida, moc.fecha_creacion
            FROM materiales_orden_compra moc
            WHERE moc.id_orden_compra = ?
            AND moc.fecha_creacion = (
                SELECT MAX(sub.fecha_creacion)
                FROM materiales_orden_compra sub
                WHERE sub.id_orden_compra = moc.id_orden_compra
                AND sub.codigo_material = moc.codigo_material
            );
        `;

        db.query(checkOrderQuery, [id_orden], (err, existingMaterials) => {
            if (err) {
                console.error('Error al obtener materiales de la orden:', err);
                return res.status(500).json({ error: 'Error al verificar materiales de la orden' });
            }

            if (existingMaterials.length === 0) {
                return res.status(404).json({ error: 'La orden de compra no tiene materiales registrados' });
            }

            // Verificar si recibido es mayor que cantidad
            const sobrantes = materiales.filter(material => material.recibido > material.cantidad);
            if (sobrantes.length > 0) {
                return res.status(400).json({
                    error: 'Materiales con cantidades recibidas superiores a las solicitadas',
                    materiales_sobrantes: sobrantes.map(mat => ({
                        codigo_material: mat.codigo_material,
                        cantidad: mat.cantidad,
                        recibido: mat.recibido
                    }))
                });
            }

            // Consultas para actualizar materiales en la orden de compra y registrar en bodega
            const updateMaterialsQuery = `
                UPDATE materiales_orden_compra 
                SET cantidad_recibida = ?
                WHERE id_orden_compra = ? AND codigo_material = ?;
            `;

            const insertMaterialsQuery = `
                INSERT INTO materiales_orden_compra (id_orden_compra, codigo_material, cantidad, cantidad_recibida, fecha_creacion)
                VALUES (?, ?, ?, ?, NOW());
            `;

            const insertBodegaMaterialQuery = `
                INSERT INTO bodegas_materiales (id_bodega, id_material, cantidad, cantidad_comprometida, fecha_creacion)
                VALUES (?, ?, ?, 0, NOW());
            `;

            const updatePromises = materiales.map(material => {
                return new Promise((resolve, reject) => {
                    const existingMaterial = existingMaterials.find(
                        mat => mat.codigo_material === material.codigo_material
                    );
            
                    if (!existingMaterial) {
                        return reject(`Material ${material.codigo_material} no encontrado en la orden.`);
                    }
            
                    const cantidadRestante = existingMaterial.cantidad - material.recibido;
            
                    // Primero, actualizamos los materiales en la orden de compra
                    const cantidadRecibida = parseInt(material.recibido, 10);
            
                    console.log("cantidad recibida ", cantidadRecibida, "cantidad restante", cantidadRestante);
            
                    db.query(
                        updateMaterialsQuery,
                        [cantidadRecibida, id_orden, material.codigo_material],
                        (err) => {
                            if (err) {
                                console.error('Error al actualizar el material existente en la orden:', err);
                                return reject(err);
                            }
            
                            // Si la cantidad recibida es menor que la cantidad solicitada, insertamos una nueva entrada
                            if (cantidadRestante > 0) {
                                db.query(
                                    insertMaterialsQuery,
                                    [id_orden, material.codigo_material, cantidadRestante, 0], // cantidad restante, recibido 0
                                    (err) => {
                                        if (err) {
                                            console.error('Error al insertar nueva entrada para el material:', err);
                                            return reject(err);
                                        }
                                        console.log(`Nueva entrada creada para material ${material.codigo_material}, cantidad restante: ${cantidadRestante}`);
                                    }
                                );
                            }
            
                            // Insertar material en la tabla bodegas_materiales
                            const getIdMaterialQuery = "SELECT id_materiales FROM materiales WHERE codigo_material = ?";
                            db.query(getIdMaterialQuery, [material.codigo_material], (err, result) => {
                                if (err) {
                                    console.error('Error al obtener id_material:', err);
                                    return reject(err);
                                }
            
                                if (result.length === 0) {
                                    return reject(`No se encontró el material con código ${material.codigo_material}`);
                                }
            
                                const id_material = result[0].id_materiales;
                                const cantidadEnBodegaQuery = `
                                    SELECT cantidad
                                    FROM bodegas_materiales
                                    WHERE id_bodega = ? AND id_material = ?
                                    ORDER BY fecha_creacion DESC LIMIT 1;
                                `;
            
                                // Verificamos si existe un material en la bodega
                                db.query(cantidadEnBodegaQuery, [bodega, id_material], (err, bodegaMaterial) => {
                                    if (err) {
                                        console.error('Error al verificar material en la bodega:', err);
                                        return reject(err);
                                    }
            
                                    let cantidadBodega = 0;
                                    if (bodegaMaterial.length > 0) {
                                        cantidadBodega = bodegaMaterial[0].cantidad;
                                    }
            
                                    // Insertamos un nuevo registro con la suma de la cantidad en bodega y la cantidad recibida
                                    db.query(
                                        insertBodegaMaterialQuery,
                                        [bodega, id_material, cantidadBodega + material.recibido],
                                        (err) => {
                                            if (err) {
                                                console.error('Error al insertar material en la bodega:', err);
                                                return reject(err);
                                            }
                                            resolve();
                                        }
                                    );
                                });
                            });
                        }
                    );
                });
            });
            
            Promise.all(updatePromises)
                .then(() => {
                    res.status(200).json({
                        message: 'Orden de compra actualizada exitosamente y materiales registrados en la bodega',
                        id_orden_compra: id_orden
                    });
                })
                .catch(err => {
                    console.error('Error durante la actualización de materiales en la orden o en la bodega:', err);
                    res.status(500).json({ error: 'Error al actualizar los materiales en la orden o en la bodega', detalle: err });
                });
            


        });
    });
});



app.listen(8081, () => {
    console.log("listening");
})
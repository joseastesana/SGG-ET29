// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const bcrypt = require('bcrypt'); // <--- 1. Importamos el encriptador de claves

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// RUTA DE PRUEBA
// ==========================================
app.get('/api/test', (req, res) => {
    res.json({ mensaje: "¡Hola! El servidor Node.js y Express está vivo 🚀" });
});

// ==========================================
// RUTA 1: REGISTRO DE USUARIOS
// ==========================================
app.post('/api/registro', async (req, res) => {
    // A. Desarmamos el paquete que nos mandó el Frontend
    const { nombre, apellido, email, password, fechaNacimiento } = req.body;

    try {
        // B. Le preguntamos a MySQL si ese email ya existe
        const sqlCheck = 'SELECT * FROM usuarios WHERE email = ?';
        
        db.query(sqlCheck, [email], async (error, resultados) => {
            if (error) {
                console.error("Error en DB:", error);
                return res.status(500).json({ mensaje: 'Error al buscar usuario en la DB' });
            }

            // Si "resultados" tiene algo adentro, el usuario ya existe
            if (resultados.length > 0) {
                return res.status(400).json({ mensaje: 'Este correo ya está registrado.' });
            }

            // C. Encriptamos la contraseña (Ciberseguridad)
            // El número 10 es el "costo" o nivel de encriptación (más alto = más seguro pero más lento)
            const salt = await bcrypt.genSalt(10);
            const passwordEncriptada = await bcrypt.hash(password, salt);

            // D. Guardamos el nuevo usuario en MySQL
            // Usamos signos de interrogación (?) para evitar inyecciones SQL (Hackers)
            const sqlInsert = 'INSERT INTO usuarios (nombre, apellido, email, password, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)';
            
            db.query(sqlInsert, [nombre, apellido, email, passwordEncriptada, fechaNacimiento], (error, resultado) => {
                if (error) {
                    console.error("Error al insertar:", error);
                    return res.status(500).json({ mensaje: 'Error al guardar el usuario' });
                }
                
                // E. Le avisamos al Frontend que todo salió perfecto
                res.status(201).json({ mensaje: '¡Registro exitoso en SGG!' });
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

// ==========================================
// ENCENDIDO DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`✅ Servidor SGG corriendo a toda velocidad en http://localhost:${PORT}`);
});
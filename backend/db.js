// backend/db.js
const mysql = require('mysql2');

// Creamos la conexión con los datos de tu compu
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         // Tu usuario de MySQL (por defecto es root)
    password: '<SebasMySQL26<', // ⚠️ ¡CAMBIÁ ESTO POR LA CLAVE QUE LE PUSISTE AL INSTALAR!
    database: 'sgg_db' // (o 'sgg_db' si decidiste cambiarle el nombre)
});

// Probamos si el cable se conectó bien
db.connect((error) => {
    if (error) {
        console.error('❌ Error al conectar con la base de datos SGG:', error.message);
        return;
    }
    console.log('✅ Base de datos SGG conectada con éxito.');
});

// Exportamos la conexión para poder usarla en otros archivos
module.exports = db;
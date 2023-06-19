import { createConnection } from 'mysql';

const connection = createConnection({
    host: process.env.MYSQLHOST || 'localhost',
    port: process.env.MYSQLPORT || '3306',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || 'siveo'
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

function guardarUsuario(username, password, name) {
    const query = `INSERT INTO usuarios (username, password, name) VALUES ('${username}', '${password}', '${name}')`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error al guardar el usuario:', err);
            return;
        }
        console.log('Usuario guardado correctamente');
    });
}

function buscarUsuario(username, callback) {
    const query = `SELECT * FROM usuarios WHERE username = '${username}'`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return callback(err, null);
        }
        if (result.length === 0) {
            return callback(null, null);
        }
        return callback(null, result[0]);
    });
}

function actualizarUsuario(username, password, name) {
    const query = `UPDATE usuarios SET password = '${password}', name = '${name}' WHERE username = '${username}'`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            return;
        }
        console.log('Usuario actualizado correctamente');
    });
}

function eliminarUsuario(username) {
    const query = `DELETE FROM usuarios WHERE username = '${username}'`;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return;
        }
        console.log('Usuario eliminado correctamente');
    });
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    buscarUsuario(username, (err, usuario) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return;
        }
        if (usuario) {
            actualizarUsuario(username, password, name);
        } else {
            guardarUsuario(username, password, name);
        }
    });
});

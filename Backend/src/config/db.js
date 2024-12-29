const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // e.g., 'localhost'
    user: process.env.DB_USER,       // e.g., 'root'
    password: process.env.DB_PASS,   // e.g., 'yourpassword'
    database: process.env.DB_NAME,   // e.g., 'taskmanager'
});

// Promisify the connection for async/await
const promisePool = pool.promise();

module.exports = promisePool;

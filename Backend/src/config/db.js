const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Your Aiven MySQL host
    user: process.env.DB_USER,       // Aiven MySQL user
    password: process.env.DB_PASS,   // Aiven MySQL password
    database: process.env.DB_NAME,   // Database name (defaultdb)
    port: process.env.DB_PORT,       // Aiven MySQL port
    waitForConnections: true,        // Wait if all connections are in use
    connectionLimit: 10,             // Limit number of concurrent connections
    queueLimit: 0,                   // Unlimited queue
    ssl: {                           // Aiven requires SSL for secure connections
        rejectUnauthorized: false,   // Allow self-signed or custom certs
    },
});

// Promisify the connection for async/await usage
const promisePool = pool.promise();

module.exports = promisePool;

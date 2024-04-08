const { Pool } = require('pg');

// Load environment variables from .env file
require('dotenv').config();

// Create a new pool instance
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;

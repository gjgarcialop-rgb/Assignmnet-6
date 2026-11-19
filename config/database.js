// this is the database connection file, it connects to the database using the connection string from the .env file
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = pool;


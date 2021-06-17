const { createPool } = require('mysql')

const pool = createPool({
    port: 3306,
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: 'users',
    connectionLimit: 10
})

module.exports = pool;
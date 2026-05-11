// MYSQL connection setup

const mysql = require('mysql2')
require('dotenv').config()

// Pool - a way to manage multiple database connections efficiently.

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
})

module.exports = pool.promise()

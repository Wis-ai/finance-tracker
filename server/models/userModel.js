// queries for users table

const db = require('../config/db')

const findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    return rows[0]
}

const createUser = async (name, email, password, contact_number) => {
    const [result] = await db.query(
        'INSERT INTO users (name, email, password, contact_number) VALUES (?, ?, ?, ?)',
        [name, email, password, contact_number]
    )
    return result
}

module.exports = { findUserByEmail, createUser }
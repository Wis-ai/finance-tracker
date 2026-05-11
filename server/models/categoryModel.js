// queries for categories table

const db = require('../config/db')


const getCategories = async () => {
    const [rows] = await db.query('SELECT * FROM categories')
    return rows
}

const getCategoriesByType = async (type) => {
    const [rows] = await db.query(
        'SELECT * FROM categories WHERE type = ?',
        [type]
    )
    return rows
}

module.exports = { getCategories, getCategoriesByType}

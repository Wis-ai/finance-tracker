// queries for transactions table

const db = require('../config/db')

const getAllTransactions = async (user_id) => {
    const [rows] = await db.query(
        `SELECT t.*, c.name as category
        FROM transactions t
        JOIN categories c on t.category_id = c.id
        WHERE t.user_id = ? 
        ORDER BY t.date DESC`,
        [user_id]
    )
    return rows
}

const createTransaction = async (user_id, type, amount, category_id, goal_id, description, date) => {
        const [result] = await db.query(
            `INSERT INTO transactions
            (user_id, type, amount, category_id, goal_id, description, date)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_id, type, amount, category_id, goal_id, description, date]
        )
    return result
}
const updateTransaction = async (id, user_id, type, amount, category_id, goal_id, description, date) => {
    const [result] = await db.query(
        `UPDATE transactions 
        SET type=?, amount=?, category_id=?, goal_id=?, description=?, date=?
        WHERE id=? AND user_id=?`,
        [type, amount, category_id, goal_id, description, date, id, user_id]
    )
    return result
}

const deleteTransaction = async (id, user_id) => {
    const [result] = await db.query(
        'DELETE FROM transactions WHERE id=? AND user_id=?',
        [id, user_id]
    )
    return result
}

module.exports = { getAllTransactions, createTransaction, updateTransaction, deleteTransaction }

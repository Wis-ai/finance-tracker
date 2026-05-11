// queries for goal table

const db = require('../config/db')


const getGoals = async (user_id) => {
    const [rows] = await db.query(
        `SELECT 
            sg.*,
            COALESCE(SUM(t.amount), 0) AS current_amount
        FROM savings_goals sg
        LEFT JOIN transactions t
            ON sg.id = t.goal_id
            AND t.user_id = sg.user_id
        WHERE sg.user_id = ?
        GROUP BY sg.id
        ORDER BY sg.deadline ASC`,
        [user_id]
    )
    return rows
}

const createGoal = async (user_id, name, target_amount, deadline) => {
    const [result] = await db.query(
        `INSERT INTO savings_goals
        (user_id, name, target_amount, deadline) VALUES (?, ?, ?, ?)`, 
        [user_id, name, target_amount, deadline]
    )
    return result
}

const updateGoal = async (id, user_id, name, target_amount, deadline) => {
    const [result] = await db.query(`UPDATE savings_goals SET name=?, target_amount=?, deadline=?
    WHERE id=? AND user_id=?`,
    [name, target_amount, deadline, id, user_id]
    ) 
    return result
}

const deleteGoal = async (id, user_id) => {
    const [result] = await db.query(
        'DELETE FROM savings_goals WHERE id=? AND user_id=?',
        [id, user_id]
    )
    return result
}


module.exports = { getGoals, createGoal, updateGoal, deleteGoal}



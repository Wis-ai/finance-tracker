const { getAllTransactions, createTransaction, updateTransaction, deleteTransaction } = require('../models/transactionModel')

const getTransactions = async (req, res) => {
  try {
    const transactions = await getAllTransactions(req.user.id)
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

const addTransaction = async (req, res) => {
  try {
    const { type, amount, category_id, goal_id, description, date } = req.body
    await createTransaction(req.user.id, type, amount, category_id, goal_id || null, description, date)
    res.status(201).json({ message: 'Transaction added successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

const editTransaction = async (req, res) => {
  try {
    const { type, amount, category_id, goal_id, description, date } = req.body
    await updateTransaction(req.params.id, req.user.id, type, amount, category_id, goal_id || null, description, date)
    res.json({ message: 'Transaction updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

const removeTransaction = async (req, res) => {
  try {
    await deleteTransaction(req.params.id, req.user.id)
    res.json({ message: 'Transaction deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

module.exports = { getTransactions, addTransaction, editTransaction, removeTransaction }
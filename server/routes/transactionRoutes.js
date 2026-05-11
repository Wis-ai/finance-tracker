/* 

api/transactions

*/

const express = require('express')
const router = express.Router()
const { getTransactions, addTransaction, editTransaction, removeTransaction } = require('../controllers/transactionController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getTransactions)
router.post('/', authMiddleware, addTransaction)
router.put('/:id', authMiddleware, editTransaction)
router.delete('/:id', authMiddleware, removeTransaction)

module.exports = router
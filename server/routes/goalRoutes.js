const express = require('express')
const router = express.Router()
const { getAllGoals, addGoal, editGoal, removeGoal } = require('../controllers/goalController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getAllGoals)
router.post('/', authMiddleware, addGoal)
router.put('/:id', authMiddleware, editGoal)
router.delete('/:id', authMiddleware, removeGoal)

module.exports = router

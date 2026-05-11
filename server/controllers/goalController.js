const { getGoals, createGoal, updateGoal, deleteGoal } = require('../models/goalModel')

const getAllGoals = async (req, res) => {
  try {
    const goals = await getGoals(req.user.id)
    res.json(goals)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

const addGoal = async (req, res) => {
  try {
    const { name, target_amount, deadline } = req.body
    await createGoal(req.user.id, name, target_amount, deadline)
    res.status(201).json({ message: 'Goal added successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

const editGoal = async (req, res) => {
  try {
    const { name, target_amount, deadline } = req.body
    await updateGoal(req.params.id, req.user.id, name, target_amount, deadline)
    res.json({ message: 'Goal updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

const removeGoal = async (req, res) => {
  try {
    await deleteGoal(req.params.id, req.user.id)
    res.json({ message: 'Goal deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

module.exports = { getAllGoals, addGoal, editGoal, removeGoal }

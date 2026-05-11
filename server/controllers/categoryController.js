const { getCategories, getCategoriesByType } = require('../models/categoryModel')

const getAllCategories = async (req, res) => {
    try {
        const categories = await getCategories()
        res.json(categories)
    } catch (error) {
    res.status(500).json({ message: 'Server error', error})
    }
}

const getCategoriesByTypeController = async (req, res) => {
    try {
        const categories = await getCategoriesByType(req.params.type)
        res.json(categories)
    } catch (error) {
    res.status(500).json({ message: 'Server error', error})
    }
}

module.exports = { getAllCategories, getCategoriesByTypeController }

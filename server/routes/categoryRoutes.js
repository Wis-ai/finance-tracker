/* 

api/categories

*/

const express = require('express')
const router = express.Router()
const { getAllCategories, getCategoriesByTypeController } = require('../controllers/categoryController')

router.get('/', getAllCategories)
router.get('/:type', getCategoriesByTypeController)

module.exports = router
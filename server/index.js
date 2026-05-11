// entry point

const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || '*'
}))
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Stresh API is running!' })
})



const transactionRoutes = require('./routes/transactionRoutes')
app.use('/api/transactions', transactionRoutes)

const categoryRoutes = require('./routes/categoryRoutes')
app.use('/api/categories', categoryRoutes)

const goalRoutes = require('./routes/goalRoutes')
app.use('/api/goals', goalRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

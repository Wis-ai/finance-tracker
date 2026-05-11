    // login, register logic
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')
    const { findUserByEmail, createUser } = require('../models/userModel')
    require('dotenv').config()

    const register = async (req, res) => {
    try {
        const { name, email, password, contact_number } = req.body

        // check if user already exists
        const existingUser = await findUserByEmail(email)
        if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // save user to database
        await createUser(name, email, hashedPassword, contact_number)

        res.status(201).json({ message: 'User registered successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
    }

    const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // find user by email
        const user = await findUserByEmail(email)
        if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' })
        }

        // generate token
        const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
        )

        res.json({
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            contact_number: user.contact_number
        }
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
    }

    module.exports = { register, login }
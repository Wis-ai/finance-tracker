import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'

function Register () {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [contact_number, setContactNumber] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async () => {
        if (!name || !email || !password || !contact_number) {
        setError('Please fill in all fields')
        return
    }


    const result = await api.register(name, email, password, contact_number)

    if (result.message === 'User registered successfully'){
        navigate('/login')
    }else {
        setError(result.message)
    }
}


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl border border-gray-200 w-96">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Stresh Account</h1>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-4">
            <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan dela Cruz"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="mb-4">
            <label className="text-sm text-gray-500 mb-1 block">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="mb-4">
            <label className="text-sm text-gray-500 mb-1 block">Contact Number</label>
            <input
                type="text"
                value={contact_number}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="09123456789"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="mb-6">
            <label className="text-sm text-gray-500 mb-1 block">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
            Create Account
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
            </p>
        </div>
        </div>
    )
}


export default Register
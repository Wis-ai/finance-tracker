import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { api } from "../services/api";

function Login({ setToken }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password){
            setError('Please fill in all fields')
            return
        }

    const result = await api.login(email, password)

    if (result.message === 'Login successful'){
        localStorage.setItem('token', result.token)
            localStorage.setItem('user', JSON.stringify(result.user))
            setToken(result.token)
            navigate('/dashboard')
        }else {
            setError(result.message)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl border border-gray-200 w-96">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Login to Stresh</h1>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="text-sm text-gray-500 mb-1 block">Email</label>
                    <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
            
                <div className="mb-6">
                    <label className="text-sm text-gray-500 mb-1 block">Password</label>
                    <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>

                <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >Login</button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-600 cursor-pointer hover:underline">Register</Link>
                </p>

            </div>
        </div>
    )
}

export default Login
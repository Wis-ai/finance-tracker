/*

Skeleton of the page: wraps everything in the BrowserRouter, shows the sidebar always, shows the correct page of the url
also the routing
*/ 

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


// import pages
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'




//import sidebar

import Sidebar from './components/Sidebar'




function App() {
    return(
        <BrowserRouter>
        <AppContent />
        </BrowserRouter>
    )
}

function AppContent(){

    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            setToken(savedToken)
        }
        setLoading(false)
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    if (!token) {

        return (
            <Routes>
                <Route path='/login' element={<Login setToken={setToken} />} />
                <Route path='/register' element={<Register />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        )
    }

    return (
            <div className="flex h-screen bg-gray-100">
                <Sidebar setToken={setToken}/>
                <div className="flex-1 overflow-y-auto">
                    {/* Shows content of each pages that have its own components */}
                    <Routes>
                        {/* automatically goes to /dashboard */}
                        <Route path="/" element={<Navigate to="/dashboard"  replace/>} /> 

                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Routes>
                </div>
            </div>
    )

}


export default App
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
// icons import
import { 
    Home, 
    List, 
    BarChart2,
    PiggyBank,
    UserCircle,
    LayoutDashboard,
    ArrowLeftRight,
    LogOut
} 
from 'lucide-react'




function Sidebar({ setToken }) {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        navigate('/login')
        alert('You have successfully logged out!')
    }

    const navItems = [

        {to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        {to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
        {to: '/analytics', label: 'Analytics', icon: BarChart2 },
    ]

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
            
            {/* App name */}
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2x1 font-bold">Stresh</h1>
            </div>

            {/* navigation links */}
            <nav className="flex-1 p-4 flex flex-col gap-1">
                {navItems.map((item) => (
                        <NavLink 
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => 
                                `flex items-centerz gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive 
                                ? 'bg-gray-200 text-600' 
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                }`
                            }
                        >
                        <item.icon size={20} />
                        {item.label}
                        </NavLink>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200 flex items-center gap-3">
                <UserCircle size={32} className="text-gray-400" />
                <div className='flex w-full justify-between items-center'>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Juan dela Cruz</p>
                        <p className="text-xs text-gray-400">juan@email.com</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Logout"
                        >
                        <LogOut size={20} />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Sidebar
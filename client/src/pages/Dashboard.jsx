import { useEffect, useState } from 'react'
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import SummaryCard from '../components/dashboard/SummaryCard'
import GoalList from '../components/goals/GoalList'
import IncomeVExpense from '../components/charts/IncomeVExpense'
import SpendingByCategory from '../components/charts/SpendingByCategory'
import TransactionList from '../components/transactions/TransactionList'
import { api } from '../services/api'
import {
    getMonthlyIncomeExpense,
    getSpendingByCategory,
    getTransactionTotals,
} from '../utils/transactionStats'

function Dashboard() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true)
            const data = await api.getTransactions(token)
            setTransactions(Array.isArray(data) ? data : [])
            setLoading(false)
        }

        fetchDashboardData()
    }, [])

    const totals = getTransactionTotals(transactions)
    const monthlyData = getMonthlyIncomeExpense(transactions)
    const categoryData = getSpendingByCategory(transactions)
    const recentTransactions = transactions.slice(0, 5)

    const summaryData = [
        {
            title: 'Total Balance',
            amount: `PHP ${totals.balance.toLocaleString()}`,
            icon: Wallet,
            color: 'blue',
        },
        {
            title: 'Total Income',
            amount: `PHP ${totals.income.toLocaleString()}`,
            icon: TrendingUp,
            color: 'green',
        },
        {
            title: 'Total Expenses',
            amount: `PHP ${totals.expenses.toLocaleString()}`,
            icon: TrendingDown,
            color: 'red',
        }
    ]

    if (loading) {
        return <div className="p-6 text-gray-500">Loading Dashboard...</div>
    }

    return <div className="p-6">

        {/* header */}
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back, {user.name || 'user'}</p>
        </div>

        {/* prop */}
        <div className="grid grid-cols-3 gap-4 mb-6">
            {summaryData.map((items) => (
                <SummaryCard
                    key={items.title}
                    title={items.title}
                    amount={items.amount}
                    icon={items.icon}
                    color={items.color}
                />
            ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
            <IncomeVExpense data={monthlyData}></IncomeVExpense>
            <SpendingByCategory data={categoryData}></SpendingByCategory>
        </div>

        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
            <TransactionList transactions={recentTransactions} showFilters={false} />
        </div>

        <GoalList />
       

    </div>
}

export default Dashboard

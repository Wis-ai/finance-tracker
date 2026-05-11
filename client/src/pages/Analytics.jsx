import { useEffect, useState } from 'react'
import MonthlyTrend from '../components/charts/MonthlyTrend'
import SpendingByCategory from '../components/charts/SpendingByCategory'
import AverageDailySpending from '../components/insights/AverageDailySpending'
import TopSpendingCategory from '../components/insights/TopSpendingCategory'
import SavingsRate from '../components/insights/SavingsRate'
import { api } from '../services/api'
import {
    getMonthlySpendingTrend,
    getSpendingByCategory,
    getTransactionTotals,
} from '../utils/transactionStats'

function Analytics() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true)
            const data = await api.getTransactions(token)
            setTransactions(Array.isArray(data) ? data : [])
            setLoading(false)
        }

        fetchTransactions()
    }, [])

    const totals = getTransactionTotals(transactions)
    const spendingByCategory = getSpendingByCategory(transactions)
    const monthlyTrend = getMonthlySpendingTrend(transactions)

    if (loading) {
        return <div className="p-6 text-gray-500">Loading Analytics...</div>
    }

    return(

        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
                <p className="text-sm text-gray-500">Your financial insights</p>
            </div>


            <div className="grid grid-cols-2 gap-4 mb-6">
                <MonthlyTrend data={monthlyTrend} />
                <SpendingByCategory data={spendingByCategory} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Insights</h3>
            <div className="grid grid-cols-3 gap-4">
                <TopSpendingCategory data={spendingByCategory} />
                <AverageDailySpending totalExpenses={totals.expenses} />
                <SavingsRate totalIncome={totals.income} totalExpenses={totals.expenses} />
            </div>
        </div>
    )


}

export default Analytics

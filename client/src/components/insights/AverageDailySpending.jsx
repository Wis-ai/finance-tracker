import { TrendingDown } from 'lucide-react'
import InsightCard from './InsightCard'

function AverageDailySpending({ totalExpenses }) {
    const days = new Date().getDate()
    const average = days > 0 ? Math.round(totalExpenses / days) : 0

    return (
        <InsightCard
            title="Avg Daily Spending"
            value={`PHP ${average.toLocaleString()}`}
            subtitle={`Based on ${days} days`}
            icon={TrendingDown}
            color="red"
        />
    )
}

export default AverageDailySpending

import { PiggyBank } from 'lucide-react'
import InsightCard from './InsightCard'

function SavingsRate({ totalIncome, totalExpenses }) {
    const rate = totalIncome > 0
        ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
        : 0

    return (
        <InsightCard
            title="Savings Rate"
            value={`${rate}%`}
            subtitle="of income saved"
            icon={PiggyBank}
            color="green"
        />
    )
}

export default SavingsRate

import { ShoppingBag } from 'lucide-react'
import InsightCard from './InsightCard'

function TopSpendingCategory({ data }) {
    const top = data.length > 0
        ? data.reduce((max, item) => item.value > max.value ? item : max, data[0])
        : null

    return (
        <InsightCard
            title="Top Spending Category"
            value={top ? top.name : 'None yet'}
            subtitle={top ? `PHP ${top.value.toLocaleString()} this month` : 'No expenses yet'}
            icon={ShoppingBag}
            color="blue"
        />
    )
}

export default TopSpendingCategory

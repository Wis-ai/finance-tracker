const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const getTransactionTotals = (transactions) => {
    return transactions.reduce((totals, transaction) => {
        const amount = Number(transaction.amount) || 0

        if (transaction.type === 'income') {
            totals.income += amount
        }

        if (transaction.type === 'expense') {
            totals.expenses += amount
        }

        totals.balance = totals.income - totals.expenses
        return totals
    }, { income: 0, expenses: 0, balance: 0 })
}

export const getMonthlyIncomeExpense = (transactions) => {
    const grouped = new Map()

    transactions.forEach((transaction) => {
        const date = new Date(transaction.date)
        const key = `${date.getFullYear()}-${date.getMonth()}`
        const month = monthNames[date.getMonth()]
        const amount = Number(transaction.amount) || 0

        if (!grouped.has(key)) {
            grouped.set(key, { key, month, income: 0, expense: 0 })
        }

        const row = grouped.get(key)

        if (transaction.type === 'income') {
            row.income += amount
        }

        if (transaction.type === 'expense') {
            row.expense += amount
        }
    })

    return Array.from(grouped.values())
        .sort((a, b) => a.key.localeCompare(b.key))
        .slice(-6)
}

export const getSpendingByCategory = (transactions) => {
    const grouped = new Map()

    transactions
        .filter((transaction) => transaction.type === 'expense')
        .forEach((transaction) => {
            const category = transaction.category || 'Uncategorized'
            const amount = Number(transaction.amount) || 0
            grouped.set(category, (grouped.get(category) || 0) + amount)
        })

    return Array.from(grouped, ([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
}

export const getMonthlySpendingTrend = (transactions) => {
    return getMonthlyIncomeExpense(transactions)
        .filter((item) => item.expense > 0)
        .map((item) => ({
            month: item.month,
            spending: item.expense,
        }))
}

import { useState } from "react";
import TransactionItem from "./TransactionItem";

function TransactionList ({ transactions, onDelete, onEdit, showFilters = true }) {
    // 2 seperate states - filter will track type filter (all, income, expense)
    // categoryFilter - tracks category filter (food,rent, etc)
    const [filter, setFilter] = useState('all')
    const [categoryFilter, setCategoryFilter] = useState('')

    // The filter button
    const filters = ['all', 'income', 'expense']

    // actual filtering logic
    // inside the parenthesis of a callback is a paramater that acts as a placeholder - it is used for each item in the array as .filter() loops through it
    // the parameter did not came from other files 
    const filteredTransactions = transactions.filter((transaction) => { 
        // Checks if the selected filter matches the transaction
        const typeMatch = filter === 'all' || transaction.type === filter 
        const categoryMatch = categoryFilter === '' || transaction.category === categoryFilter
        return typeMatch && categoryMatch
    })



    const allCategories = [...new Set(transactions.map((t) => t.category))]

    return (
        <div className="bg-white rounded-xl border border-gray-200">

            {showFilters && (
                <div className="p-4 border-b border-gray-200 flex items-center gap-2 flex-wrap">

                {/* type filters - filter buttons
                the f inside is from the const filters (f)
                */} 
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className = {`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f
                            ? 'bg-gray-600 text-white'
                            : 'bg-gray-200 text-gray-500 hover:bg-gray200'
                        }`}
                        >
                    {f}
                    </button>
                ))}

                {/* category filter */}
                <select
                // because of the value - the select is controlled - the value is always tied to the state
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="ml-auto border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    {allCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                </div>
            )}


            {/* Transaction Items */}
            <div>
                {filteredTransactions.length === 0 ? (
                    <div className="p-6 text-center text-gray-400 text-sm">No transactions found
                    </div>
                ) : (
                    filteredTransactions.map((transaction) => (
                        // Passed to transactionItem as a prop
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default TransactionList

// Displays one row
import { Pencil, Trash2 } from 'lucide-react'

function TransactionItem({ transaction, onDelete, onEdit }) {
    // Destructuring
    // names inside must match on the parent
    const { type, amount, category, description, date } = transaction

    const formattedDate = new Date(date).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
            {/* Left side */}
            <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${type === 'income' ? 'bg-gray-500' : 'bg-red-500'}`}></div>
                <div className="">
                    <p className="text-sm font-medium text-gray-800">{description}</p>
                    <p className="text-xs text-gray-400">{formattedDate} - {category}</p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                <p className={`text-sm font-semibold ${type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                    {type === 'income' ? '+' : '-'}PHP {Number(amount).toLocaleString()}
                </p>

                {onEdit && (
                    <button
                        onClick={() => onEdit(transaction)}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Edit transaction"
                    >
                        <Pencil size={15} />
                    </button>
                )}

                {onDelete && (
                    <button
                        onClick={() => onDelete(transaction.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Delete transaction"
                    >
                        <Trash2 size={15} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default TransactionItem

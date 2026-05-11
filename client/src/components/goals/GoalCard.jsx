import { Trash2 } from 'lucide-react'

function GoalCard({ goal, onDelete }) {
    const { name, target_amount, current_amount, deadline } = goal

    const targetAmount = Number(target_amount) || 0
    const currentAmount = Number(current_amount) || 0
    const percentage = targetAmount > 0
        ? Math.min(Math.round((currentAmount / targetAmount) * 100), 100)
        : 0

    const formattedDeadline = new Date(deadline).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
    })

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                    <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
                    <span className="text-xs text-gray-400">Due {formattedDeadline}</span>
                </div>

                <button
                    onClick={() => onDelete(goal.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    title="Delete goal"
                >
                    <Trash2 size={15} />
                </button>
            </div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">
                    PHP {currentAmount.toLocaleString()} saved
                </span>
                <span className="text-xs font-medium text-gray-700">
                    PHP {targetAmount.toLocaleString()} goal
                </span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="text-xs text-right text-gray-400">{percentage}% complete</p>
        </div>
    )
}

export default GoalCard

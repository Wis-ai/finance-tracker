import { useState } from "react";

function GoalForm({ onAdd }) {

    const [name, setName] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [deadline, setDeadline] = useState('')

    const handleSubmit = () => {
        if (!name || !targetAmount || !deadline){
            alert('Please fill in all fields')
            return
        }

        const goal = {
            name,
            target_amount: Number(targetAmount),
            current_amount: 0,
            deadline,
        }

        onAdd(goal)

        setName('')
        setTargetAmount('')
        setDeadline('')
    }

    return (

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-4">New Saving Goal</h4>

            {/* Goal Name */}
            <div className="mb-3">
                <label className="text-xs text-gray-500 mb-1 block">Goal Name</label>
                <input type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tuition"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Target Amount */}
            <div className="mb-3">
                <label className="text-xs text-gray-500 mb-1 block">Target Amount</label>
                <input 
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="e.g. 10000"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            {/* deadline */}
            <div className="mb-4">
                <label htmlFor="" className="text-xs text-gray-500 mb-1 block">Deadline</label>
                <input type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
        </div>

        <button onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >Add Goal
        </button>

        </div>
    )
}

export default GoalForm
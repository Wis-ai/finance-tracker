import { useState, useEffect } from "react";
import { api } from '../../services/api'

function TransactionForm ({ onAdd, onUpdate, editingTransaction, onCancelEdit }) {

    const [type, setType ] = useState('income');
    const [amount, setAmount ] = useState('');
    const [category, setCategory ] = useState('');

    const today = new Date().toISOString().split("T")[0];
    const [date, setDate ] = useState(today);

    const [description, setDescription ] = useState('');
    const [goalId, setGoalId] = useState('');
    const [categories, setCategories] = useState([])
    const [goals, setGoals] = useState([])
    const token = localStorage.getItem('token')
    const isEditing = Boolean(editingTransaction)

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await api.getCategoriesByType(type)
            setCategories(data)
            if (!isEditing) {
                setCategory('')
            }
        }
        fetchCategories()
    }, [type, isEditing])

    useEffect(() => {
        const fetchGoals = async () => {
            const data = await api.getGoals(token)
            setGoals(Array.isArray(data) ? data : [])
        }

        fetchGoals()
    }, [])

    useEffect(() => {
        if (!editingTransaction) {
            return
        }

        setType(editingTransaction.type)
        setAmount(editingTransaction.amount)
        setCategory(editingTransaction.category_id || '')
        setDate(editingTransaction.date?.slice(0, 10) || '')
        setDescription(editingTransaction.description || '')
        setGoalId(editingTransaction.goal_id || '')
    }, [editingTransaction])


    const handleSubmit = () => {
        if (!amount || !category || !date ) {
            alert('Please fill in all required fields')
            return
        }


        const transaction = { 
            type, 
            amount: Number(amount), 
            category_id: Number(category), 
            goal_id: goalId || null,
            date, 
            description, 
        }

        if (isEditing) {
            onUpdate(editingTransaction.id, transaction)
        } else {
            onAdd(transaction)
        }

        setAmount('')
        setCategory('')
        setDate('')
        setDescription('')
        setGoalId('')
    }

    const changeType = (nextType) => {
        setType(nextType)
        setCategory('')
    }

    return (

        <div className="bg-white rounded-xl border border-gray-200 p-6">

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {isEditing ? 'Edit Transaction' : 'Add Transaction'}
                </h3>
                {isEditing && (
                    <button
                        onClick={onCancelEdit}
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Type toggling */}
            <div className="flex gap-2 mb-4">
                <button onClick = {() => changeType('income')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                        ${type === 'income'
                        ? 'bg-gray-500 text-600'
                        : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                    Income
                </button>

            

                <button onClick = {() => changeType('expense')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                        ${type === 'expense'
                       ? 'bg-gray-500 text-600'
                        : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                    Expense
                </button>
            </div>

            <div className="mb-4">
                <label className="text-sm text-gray-500 mb-1 block">Amount</label>
                <input 
                    type = "number"
                    value = {amount}
                    onChange = {(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="" className="text-sm text-gray-500 mb-1 block">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="" className="text-sm text-gray-500 mb-1 block">Date</label>
                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
            </div>

            <div className="mb-4">
                <label className="text-sm text-gray-500 mb-1 block">Goal</label>
                <select
                    value={goalId}
                    onChange={(e) => setGoalId(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">No goal</option>
                    {goals.map((goal) => (
                        <option key={goal.id} value={goal.id}>{goal.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="text-sm text-gray-500 mb-1 block">Note</label>
                <input 
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                {isEditing ? 'Save Changes' : 'Add Transaction'}
            </button>
        </div>
    )
}

export default TransactionForm

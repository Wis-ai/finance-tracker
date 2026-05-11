import { useEffect, useState } from "react";
import { Plus, X } from 'lucide-react'
import { api } from '../../services/api'
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";


function GoalList(){
    const [goals, setGoals] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')

    const fetchGoals = async () => {
        setLoading(true)
        const data = await api.getGoals(token)
        setGoals(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    useEffect(() => {
        fetchGoals()
    }, [])

    const addGoal = async (goal) => {
        await api.addGoal(token, goal)
        await fetchGoals()
        setShowForm(false)
    }

    const removeGoal = async (id) => {
        await api.deleteGoal(token, id)
        await fetchGoals()
    }

    return (

        <div className="mt-6">

            {/* header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Saving Goals</h3>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        {showForm ? <X size={16}/>: <Plus size={16} />}
                        {showForm ? 'Cancel':'Add Goal'}
                    </button>
            </div>

            {/* Form - on;y shpws when it is true */}
            {showForm && <GoalForm onAdd={addGoal} />}

            {/* Goal Cards */}
            {loading ? (
                <div className="text-center text-gray-400 text-sm py-6">
                    Loading goals...
                </div>
            ) : goals.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-6">
                    No goals yet. Add your first goal.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goals.map((goal) => (
                        <GoalCard key={goal.id} goal={goal} onDelete={removeGoal} />
                    ))}
                </div>
            )
            }

        </div>

    )
    
}


export default GoalList

import TransactionForm from "../components/transactions/TransactionForm"
import TransactionList from "../components/transactions/TransactionList"
import { useState, useEffect } from "react"
import { api } from '../services/api'


function Transactions() {
    // the state lives in the common parent - both TransactionList and TransactionForm used the data on this - single source of the truth
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingTransaction, setEditingTransaction] = useState(null)
    const token = localStorage.getItem('token')

    //fetch transactions when page loads
    useEffect(() => {
        fetchTransactions()
    }, [])
    

    const fetchTransactions = async () => {
        setLoading(true)
        const data = await api.getTransactions(token)
        setTransactions(data)
        setLoading(false)
    }

//   created addTransaction where the parent lives because that is where the state lives
    const addTransaction = async (transaction) => {
        await api.addTransaction(token, transaction)
        fetchTransactions()
    }

    const updateTransaction = async (id, transaction) => {
        await api.updateTransaction(token, id, transaction)
        setEditingTransaction(null)
        fetchTransactions()
    }

    const deleteTransaction = async (id) => {
        await api.deleteTransaction(token, id)
        if (editingTransaction?.id === id) {
            setEditingTransaction(null)
        }
        fetchTransactions()
    }

    if (loading) {
        return <div className="p-6 text-gray-500">Loading Transactions...</div>
    }




   return (
    <div className="p-6">
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
            <p className="text-sm text-gray-500">Manage your transactions</p>
        </div>
        {/* We pass the data down via Props - TransactionForm and TransactionList */}
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
                {/* Transaction form needs the data to add */}
                <TransactionForm
                    onAdd={addTransaction}
                    onUpdate={updateTransaction}
                    editingTransaction={editingTransaction}
                    onCancelEdit={() => setEditingTransaction(null)}
                />
            </div>
            <div className="col-span-2">
                {/* Transaction list needs the data to display */}
                <TransactionList
                    transactions={transactions}
                    onDelete={deleteTransaction}
                    onEdit={setEditingTransaction}
                />
            </div>
        </div>
    </div>
   )



}

export default Transactions

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from "recharts"

function IncomeVExpense({ data }) {
    return(
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Income vs Expense
            </h3>
            {data.length === 0 ? (
                <div className="h-[250px] flex items-center justify-center text-sm text-gray-400">
                    No transaction data yet
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"></CartesianGrid>
                        <XAxis dataKey="month" tick={{ fontSize:12 }}></XAxis>
                        <YAxis tick={{ fontSize:12 }}></YAxis>
                        <Tooltip formatter={(value) => `PHP ${Number(value).toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]}></Bar>
                        <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]}></Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export default IncomeVExpense

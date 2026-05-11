import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']

function SpendingByCategory({ data }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Spending by Category</h3>

            {data.length === 0 ? (
                <div className="h-[250px] flex items-center justify-center text-sm text-gray-400">
                    No expense data yet
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${entry.name}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `PHP ${Number(value).toLocaleString()}`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export default SpendingByCategory

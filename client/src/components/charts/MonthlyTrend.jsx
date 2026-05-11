import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function MonthlyTrend({ data }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Monthly Spending Trend</h3>

            {data.length === 0 ? (
                <div className="h-[250px] flex items-center justify-center text-sm text-gray-400">
                    No spending data yet
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"></CartesianGrid>
                        <XAxis dataKey="month" tick={{ fontSize: 12 }}></XAxis>
                        <YAxis tick={{ fontSize: 12 }}></YAxis>
                        <Tooltip formatter={(value) => `PHP ${Number(value).toLocaleString()}`}></Tooltip>
                        <Line
                            type="monotone"
                            dataKey="spending"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ fill: '#3b82f6', r: 4 }}
                            activeDot={{ r: 6 }}
                        ></Line>
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export default MonthlyTrend

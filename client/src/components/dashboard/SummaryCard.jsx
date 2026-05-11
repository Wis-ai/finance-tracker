// Visuals for the summary

function SummaryCard ({title, amount, icon: Icon, color}){

    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        red: 'bg-red-50 text-red-600',
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                <Icon size = {24} />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-800">{amount}</p>
        </div>
        </div>
    )
}

export default SummaryCard

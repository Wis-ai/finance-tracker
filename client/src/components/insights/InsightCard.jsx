function InsightCard({ title, value, subtitle, icon: Icon, color}) {

    const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return(

    <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${colors[color]}`}>
                <Icon size={18}/>
            </div>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
        <p className="text-2xl font-semibold text-gray-800 mb-1">{value}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
    </div>

  )

}

export default InsightCard

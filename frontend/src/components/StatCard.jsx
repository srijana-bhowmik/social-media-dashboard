import React from 'react'

const StatCard = ({title, value}) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-slate-400">{title}</h3>
        <p className="text-white text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}

export default StatCard

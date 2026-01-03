import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

export function SalesLine({ data }){
  return (
    <div style={{width:'100%', height:300}}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top:10, right:20, left:-20, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#2e7d32" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SalesBar({ data }){
  return (
    <div style={{width:'100%', height:300}}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top:10, right:20, left:-20, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#66bb6a" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DemandPie({ data }){
  const colors = ['#2e7d32', '#fdd835', '#e53935']
  return (
    <div style={{width:'100%', height:300}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((_, i)=>(<Cell key={i} fill={colors[i%colors.length]} />))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

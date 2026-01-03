import React, { useEffect, useState } from 'react'
import { getDashboardSummary, getSalesTrends, getLowStock } from '../services/api'
import { SalesLine, SalesBar } from '../components/Charts'

export default function Dashboard(){
  const [summary, setSummary] = useState({ totalProducts:0, lowStock:0, monthlySales:0, highDemand:0 })
  const [trend, setTrend] = useState([])
  const [lowStockList, setLowStockList] = useState([])
  useEffect(()=>{
    getDashboardSummary().then(setSummary)
    getSalesTrends().then(setTrend)
    getLowStock().then(setLowStockList)
  },[])
  return (
    <div className="d-grid gap-4">
      <div className="row g-3">
        <div className="col-6 col-lg-3">
          <div className="card card-agro shadow-sm p-3">
            <div className="text-muted small">Total Products</div>
            <div className="display-6">{summary.totalProducts}</div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card card-agro shadow-sm p-3">
            <div className="text-muted small">Low Stock Items</div>
            <div className="display-6">{summary.lowStock}</div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card card-agro shadow-sm p-3">
            <div className="text-muted small">Monthly Sales</div>
            <div className="display-6">₹{summary.monthlySales}</div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card card-agro shadow-sm p-3">
            <div className="text-muted small">Predicted High-Demand</div>
            <div className="display-6">{summary.highDemand}</div>
          </div>
        </div>
      </div>
      {lowStockList.length>0 && (
        <div className="alert alert-low">
          <div className="fw-semibold mb-1">Low stock alert</div>
          <div className="small">Refill soon: {lowStockList.map(p=>p.name).join(', ')}</div>
        </div>
      )}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card card-agro p-3 shadow-sm">
            <div className="fw-semibold mb-2">Monthly Sales (Line)</div>
            <SalesLine data={trend} />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card card-agro p-3 shadow-sm">
            <div className="fw-semibold mb-2">Monthly Sales (Bar)</div>
            <SalesBar data={trend} />
          </div>
        </div>
      </div>
    </div>
  )
}

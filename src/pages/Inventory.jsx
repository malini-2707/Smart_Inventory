import React, { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../services/api'

export default function Inventory(){
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('All')
  useEffect(()=>{ getProducts().then(setProducts) },[])
  const filtered = useMemo(()=> products.filter(p=> category==='All' ? true : p.category===category), [products, category])
  return (
    <div className="d-grid gap-3">
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
        <h5 className="mb-0">Inventory</h5>
        <div className="d-flex gap-2">
          <select className="form-select" value={category} onChange={e=>setCategory(e.target.value)}>
            <option>All</option>
            <option>Fertilizer</option>
            <option>Seed</option>
            <option>Medicine</option>
          </select>
        </div>
      </div>
      <div className="row g-3">
        {filtered.map(p=> (
          <div className="col-12 col-md-6 col-lg-4" key={p.id}>
            <div className="card shadow-sm p-3 h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-semibold">{p.name}</div>
                  <div className="text-muted small">{p.category}</div>
                </div>
                <span className={`badge ${p.quantity<10?'text-bg-danger':'text-bg-success'}`}>{p.quantity<10?'Low':'Normal'}</span>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <div>Stock: <span className={p.quantity<10?'low-stock fw-bold':''}>{p.quantity}</span></div>
                <div>Price: ₹{p.price}</div>
              </div>
              <div className="text-muted small mt-2">Expiry: {p.expiry}</div>
            </div>
          </div>
        ))}
        {filtered.length===0 && <div className="col-12 text-center text-muted py-4">No items</div>}
      </div>
    </div>
  )
}

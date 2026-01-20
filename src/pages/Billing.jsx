import React, { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../services/api'

export default function Billing(){
  const [products, setProducts] = useState([])
  const [items, setItems] = useState([{ productId:'', qty:1 }])
  const [success, setSuccess] = useState('')
  useEffect(()=>{ getProducts().then(setProducts) },[])
  const addRow = () => setItems([...items, { productId:'', qty:1 }])
  const updateRow = (i, field, value) => setItems(items.map((r,idx)=> idx===i ? { ...r, [field]: value } : r))
  const removeRow = i => setItems(items.filter((_,idx)=>idx!==i))
  const enriched = useMemo(()=> items.map(r=> ({...r, product: products.find(p=>p.id===r.productId)})),[items,products])
  const total = useMemo(()=> enriched.reduce((s,r)=> s + ((r.product?.price||0) * (Number(r.qty)||0)), 0), [enriched])
  const submit = e => { e.preventDefault(); setSuccess('Bill generated successfully'); setTimeout(()=>setSuccess(''), 2000); setItems([{productId:'', qty:1}]) }
  return (
    <div className="d-grid gap-3">
      <h5>Billing / Sales</h5>
      {success && <div className="alert alert-success py-2">{success}</div>}
      <form onSubmit={submit} className="card p-3 shadow-sm">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th style={{minWidth:220}}>Product</th>
                <th style={{width:140}}>Quantity</th>
                <th style={{width:140}}>Unit Price</th>
                <th style={{width:140}}>Total</th>
                <th style={{width:80}}></th>
              </tr>
            </thead>
            <tbody>
              {enriched.map((r,i)=> (
                <tr key={i}>
                  <td>
                    <select className="form-select" value={r.productId} onChange={e=>updateRow(i,'productId', e.target.value)}>
                      <option value="">Select product</option>
                      {products.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </td>
                  <td>
                    <input type="number" className="form-control" min={1} value={r.qty} onChange={e=>updateRow(i,'qty', e.target.value)} />
                  </td>
                  <td>₹{r.product?.price||0}</td>
                  <td>₹{(r.product?.price||0) * (Number(r.qty)||0)}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>removeRow(i)} disabled={items.length===1}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button type="button" className="btn btn-light" onClick={addRow}>Add Item</button>
          <div className="fs-5">Grand Total: <span className="fw-bold">₹{total}</span></div>
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-agro">Generate Bill</button>
        </div>
      </form>
      <div className="card p-3 shadow-sm">
        <div className="fw-semibold mb-2">Bill Preview</div>
        <div className="d-flex justify-content-between">
          <div>
            {enriched.filter(r=>r.product).map((r,i)=> (
              <div key={i} className="small">{r.product.name} x {r.qty} = ₹{(r.product.price||0) * (Number(r.qty)||0)}</div>
            ))}
          </div>
          <div className="fw-bold">₹{total}</div>
        </div>
      </div>
    </div>
  )
}

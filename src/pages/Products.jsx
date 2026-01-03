import React, { useEffect, useMemo, useState } from 'react'
import { addProduct, deleteProduct, getProducts, updateProduct } from '../services/api'
import ProductForm from '../components/ProductForm'
import { FaEdit, FaTrash } from 'react-icons/fa'

export default function Products(){
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [q, setQ] = useState('')
  const load = () => getProducts().then(setProducts)
  useEffect(()=>{ load() },[])
  const filtered = useMemo(()=>products.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())),[products,q])
  const onSave = async (data) => {
    if(editing) await updateProduct(editing.id, data)
    else await addProduct(data)
    setShowForm(false); setEditing(null); load()
  }
  const stockLabel = (qty) => qty < 10 ? 'Low' : 'Normal'
  return (
    <div className="d-grid gap-3">
      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
        <h5 className="mb-0">Product Management</h5>
        <div className="d-flex gap-2">
          <input className="form-control" placeholder="Search products" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn btn-agro" onClick={()=>{setShowForm(true); setEditing(null)}}>Add Product</button>
        </div>
      </div>
      {showForm && (
        <div className="card p-3 shadow-sm">
          <ProductForm onSubmit={onSave} onCancel={()=>{setShowForm(false); setEditing(null)}} initial={editing||undefined} />
        </div>
      )}
      <div className="card p-0 shadow-sm">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Expiry</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p=> (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td className={p.quantity<10?'low-stock':''}>{p.quantity}</td>
                  <td>{p.expiry}</td>
                  <td>
                    <span className={`badge ${p.quantity<10?'text-bg-danger':'text-bg-success'}`}>{stockLabel(p.quantity)}</span>
                  </td>
                  <td className="text-end">
                    <button className="icon-btn me-2" onClick={()=>{setEditing(p); setShowForm(true)}}><FaEdit/></button>
                    <button className="icon-btn text-danger" onClick={async()=>{await deleteProduct(p.id); load()}}><FaTrash/></button>
                  </td>
                </tr>
              ))}
              {filtered.length===0 && (
                <tr><td colSpan={7} className="text-center text-muted py-4">No products found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

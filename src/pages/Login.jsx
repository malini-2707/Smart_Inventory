import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login as loginApi } from '../services/api'

export default function Login({ onSuccess }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()
  const loc = useLocation()
  const submit = async e => {
    e.preventDefault()
    setError('')
    if(!username || !password){ setError('Please enter username and password'); return }
    setLoading(true)
    try{
      await loginApi({ username, password })
      onSuccess()
      const to = loc.state?.from?.pathname || '/dashboard'
      nav(to, { replace: true })
    }catch(err){
      setError('Invalid credentials')
    }finally{ setLoading(false) }
  }
  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight:'100vh', background:'#e8f5e9'}}>
      <div className="card shadow-sm p-4" style={{minWidth:340}}>
        <div className="text-center mb-3">
          <div className="agro-bg rounded-circle d-inline-flex align-items-center justify-content-center" style={{width:56,height:56}}>🌱</div>
          <h5 className="mt-3 mb-0">Smart Agro-Retail</h5>
          <div className="text-muted small">Login to continue</div>
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={submit} className="d-grid gap-3">
          <div>
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button className="btn btn-agro" disabled={loading}>{loading?'Logging in...':'Login'}</button>
        </form>
      </div>
    </div>
  )
}

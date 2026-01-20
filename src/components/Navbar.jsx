import React from 'react'
import { FaBars } from 'react-icons/fa'

export default function Navbar({ onMenuClick, onLogout }){
  return (
    <div className="navbar-agro py-2 px-3 d-flex align-items-center justify-content-between">
      <button className="btn btn-link text-dark d-lg-none" onClick={onMenuClick}><FaBars size={20}/></button>
      <div className="fw-semibold agro-accent">Smart Agro-Retail Inventory</div>
      <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>Logout</button>
    </div>
  )
}

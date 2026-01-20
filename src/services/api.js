import axios from 'axios'

let PRODUCTS = [
  { id: 'p1', name: 'Urea 46% N', category: 'Fertilizer', price: 600, quantity: 25, expiry: '2026-12-31' },
  { id: 'p2', name: 'DAP 18-46-0', category: 'Fertilizer', price: 1450, quantity: 8, expiry: '2026-10-01' },
  { id: 'p3', name: 'Hybrid Maize Seeds', category: 'Seed', price: 2500, quantity: 40, expiry: '2027-06-15' },
  { id: 'p4', name: 'Cotton Pesticide', category: 'Medicine', price: 950, quantity: 6, expiry: '2026-03-20' },
  { id: 'p5', name: 'Potash 60% K', category: 'Fertilizer', price: 1200, quantity: 15, expiry: '2026-08-30' }
]

const wait = (ms)=> new Promise(res=>setTimeout(res, ms))

export async function login({ username, password }){
  await wait(500)
  if(username && password) return { token: 'ok' }
  throw new Error('Invalid')
}

export async function getProducts(){ await wait(200); return [...PRODUCTS] }
export async function addProduct(data){ await wait(200); PRODUCTS = [{ id: 'p'+(Date.now()), ...data }, ...PRODUCTS] }
export async function updateProduct(id, data){ await wait(200); PRODUCTS = PRODUCTS.map(p=> p.id===id ? { ...p, ...data } : p) }
export async function deleteProduct(id){ await wait(200); PRODUCTS = PRODUCTS.filter(p=> p.id!==id) }
export async function getLowStock(){ await wait(150); return PRODUCTS.filter(p=> p.quantity<10) }

export async function getDashboardSummary(){
  await wait(150)
  const totalProducts = PRODUCTS.length
  const lowStock = PRODUCTS.filter(p=>p.quantity<10).length
  const monthlySales = 78500
  const highDemand = 3
  return { totalProducts, lowStock, monthlySales, highDemand }
}

export async function getSalesTrends(){
  await wait(150)
  return [
    { month:'Jan', sales: 4200 },
    { month:'Feb', sales: 5100 },
    { month:'Mar', sales: 4800 },
    { month:'Apr', sales: 6200 },
    { month:'May', sales: 6800 },
    { month:'Jun', sales: 7200 },
    { month:'Jul', sales: 7000 },
    { month:'Aug', sales: 7600 },
    { month:'Sep', sales: 6900 },
    { month:'Oct', sales: 8100 },
    { month:'Nov', sales: 8400 },
    { month:'Dec', sales: 9000 }
  ]
}

// prediction module removed

export async function getExpiryRisks(daysThreshold = 120){
  await wait(150)
  const now = new Date()
  const thresholdMs = daysThreshold * 24 * 60 * 60 * 1000
  return PRODUCTS
    .map(p => ({
      ...p,
      daysToExpiry: Math.ceil((new Date(p.expiry) - now) / (24*60*60*1000))
    }))
    .filter(p => p.daysToExpiry >= 0 && (new Date(p.expiry) - now) <= thresholdMs)
}

export const api = axios.create({ baseURL: '/api' })

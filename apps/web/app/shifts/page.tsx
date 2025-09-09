'use client'
import { useEffect, useState } from 'react'

export default function ShiftsPage() {
  const [org, setOrg] = useState('')
  const [items, setItems] = useState<any[]>([])

  const load = async () => {
    const res = await fetch(`/api/shifts?org=${org}`)
    setItems(await res.json())
  }
  useEffect(()=>{ load() }, [])

  const start = async () => {
    const body = { organization_id: org || '00000000-0000-0000-0000-000000000000', user_id: '00000000-0000-0000-0000-000000000000', device_battery: 80 }
    await fetch('/api/shifts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)})
    load()
  }

  const end = async (id: string) => {
    await fetch(`/api/shifts/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ended_at: new Date().toISOString(), device_battery: 55 }) })
    load()
  }

  return (
    <main className="container">
      <h2>Turnos</h2>
      <div style={{display:'flex', gap:8, margin:'8px 0'}}>
        <input placeholder="org_id" value={org} onChange={e=>setOrg(e.target.value)} />
        <button className="btn" onClick={load}>Recarregar</button>
        <button className="btn secondary" onClick={start}>Iniciar turno</button>
      </div>
      <div className="grid">
        {items.map(it => (
          <div key={it.id} className="card">
            <div><b>Início:</b> {new Date(it.started_at).toLocaleString()}</div>
            <div><b>Fim:</b> {it.ended_at ? new Date(it.ended_at).toLocaleString() : '-'}</div>
            {!it.ended_at && <button className="btn" style={{marginTop:8}} onClick={()=>end(it.id)}>Encerrar</button>}
          </div>
        ))}
      </div>
    </main>
  )
}

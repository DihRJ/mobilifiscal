'use client'
import { useEffect, useState } from 'react'

export default function IncidentsPage() {
  const [org, setOrg] = useState('')
  const [type, setType] = useState('evazao_receita')
  const [items, setItems] = useState<any[]>([])

  const load = async () => {
    const params = new URLSearchParams()
    if (org) params.set('org', org)
    if (type) params.set('type', type)
    const res = await fetch(`/api/incidents?${params.toString()}`)
    setItems(await res.json())
  }
  useEffect(()=>{ load() }, [])

  const createIncident = async () => {
    const body = {
      organization_id: org || '00000000-0000-0000-0000-000000000000',
      type, description: 'Ocorrência registrada em campo',
      lat: -22.84 + (Math.random()-0.5)*0.1,
      lon: -42.10 + (Math.random()-0.5)*0.1,
      created_by: '00000000-0000-0000-0000-000000000000'
    }
    await fetch('/api/incidents', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)})
    load()
  }

  return (
    <main className="container">
      <h2>Ocorrências</h2>
      <div style={{display:'flex', gap:8, margin:'8px 0', flexWrap:'wrap'}}>
        <input placeholder="org_id" value={org} onChange={e=>setOrg(e.target.value)} />
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="evazao_receita">Evasão de receita</option>
          <option value="avaria_abrigo">Avaria em abrigo</option>
          <option value="acidente">Acidente</option>
        </select>
        <button className="btn" onClick={load}>Recarregar</button>
        <button className="btn secondary" onClick={createIncident}>Nova ocorrência</button>
      </div>
      <div className="grid">
        {items.map(it => (
          <div key={it.id} className="card">
            <div><b>Tipo:</b> {it.type}</div>
            <div><b>Quando:</b> {new Date(it.created_at).toLocaleString()}</div>
            <div><b>Local:</b> {it.lat?.toFixed(5)}, {it.lon?.toFixed(5)}</div>
            <div><b>Descrição:</b> {it.description}</div>
          </div>
        ))}
      </div>
    </main>
  )
}

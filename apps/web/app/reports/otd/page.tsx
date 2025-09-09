'use client'
import { useEffect, useState } from 'react'

export default function OTDReport() {
  const [rows, setRows] = useState<any[]>([])

  useEffect(()=>{
    (async () => {
      const res = await fetch('/api/reports/otd')
      setRows(await res.json())
    })()
  }, [])

  return (
    <main className="container">
      <h2>Relatório OTD (simplificado)</h2>
      <p className="small">Agrega autos por linha/dia a partir de <code>v_infractions_daily</code>.</p>
      <div className="grid">
        {rows.map((r, i) => (
          <div className="card" key={i}>
            <div><b>Linha:</b> {r.line_id || '-'}</div>
            <div><b>Dia:</b> {r.day}</div>
            <div><b>Total Autos:</b> {r.total}</div>
          </div>
        ))}
      </div>
    </main>
  )
}

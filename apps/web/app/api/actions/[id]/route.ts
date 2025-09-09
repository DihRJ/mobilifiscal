import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const b = await req.json()
  const fields = ['description','due_date','status']
  const sets = []
  const vals: any[] = []
  let idx = 1
  for (const f of fields) if (f in b) { sets.push(`${f}=$${idx++}`); vals.push(b[f]) }
  if (!sets.length) return NextResponse.json({ error: 'no fields' }, { status: 400 })
  vals.push(params.id)
  const { rows } = await pool.query(`update actions set ${sets.join(',')} where id=$${idx} returning *`, vals)
  return NextResponse.json(rows[0])
}

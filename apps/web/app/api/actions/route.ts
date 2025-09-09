import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const inf = url.searchParams.get('infraction_id')
  const { rows } = await pool.query(
    `select * from actions
     where ($1::uuid is null or infraction_id=$1::uuid)
     order by created_at desc limit 200`,
    [inf]
  )
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const b = await req.json()
  const { infraction_id, description, due_date=null, status='pendente', created_by } = b
  const { rows } = await pool.query(
    `insert into actions (infraction_id, description, due_date, status, created_by)
     values ($1,$2,$3,$4,$5) returning *`,
    [infraction_id, description, due_date, status, created_by]
  )
  return NextResponse.json(rows[0], { status: 201 })
}

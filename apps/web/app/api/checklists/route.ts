import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  const { rows } = await pool.query(`select * from checklists order by id asc limit 50`)
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const b = await req.json()
  const { organization_id=null, name, items } = b
  const { rows } = await pool.query(
    `insert into checklists (organization_id, name, items) values ($1,$2,$3) returning *`,
    [organization_id, name, items]
  )
  return NextResponse.json(rows[0], { status: 201 })
}

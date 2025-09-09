import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const org = url.searchParams.get('org') || null
  const type = url.searchParams.get('type') || null
  const { rows } = await pool.query(
    `select * from incidents
     where ($1::uuid is null or organization_id=$1::uuid)
       and ($2::text is null or type=$2)
     order by created_at desc limit 300`,
    [org, type]
  )
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const b = await req.json()
  const { organization_id, type, description=null, lat=null, lon=null, created_by } = b
  const { rows } = await pool.query(
    `insert into incidents (organization_id, type, description, lat, lon, created_by)
     values ($1,$2,$3,$4,$5,$6) returning *`,
    [organization_id, type, description, lat, lon, created_by]
  )
  return NextResponse.json(rows[0], { status: 201 })
}

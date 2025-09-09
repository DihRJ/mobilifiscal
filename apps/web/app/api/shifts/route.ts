import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const org = url.searchParams.get('org') || null
  const { rows } = await pool.query(
    `select * from shifts where ($1::uuid is null or organization_id=$1::uuid) order by started_at desc limit 200`,
    [org]
  )
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const b = await req.json()
  const { organization_id, user_id, lat_start=null, lon_start=null, device_battery=null } = b
  const { rows } = await pool.query(
    `insert into shifts (organization_id, user_id, lat_start, lon_start, device_battery)
     values ($1,$2,$3,$4,$5) returning *`,
    [organization_id, user_id, lat_start, lon_start, device_battery]
  )
  return NextResponse.json(rows[0], { status: 201 })
}

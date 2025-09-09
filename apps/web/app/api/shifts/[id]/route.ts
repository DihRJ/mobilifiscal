import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const b = await req.json()
  const { ended_at=null, lat_end=null, lon_end=null, device_battery=null } = b
  const { rows } = await pool.query(
    `update shifts set
      ended_at = coalesce($1, ended_at),
      lat_end = coalesce($2, lat_end),
      lon_end = coalesce($3, lon_end),
      device_battery = coalesce($4, device_battery)
     where id=$5 returning *`,
    [ended_at, lat_end, lon_end, device_battery, params.id]
  )
  return NextResponse.json(rows[0] || null)
}

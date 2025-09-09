import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  const { rows } = await pool.query(`select line_id, day, total from v_infractions_daily order by day desc, line_id asc limit 200`)
  return NextResponse.json(rows)
}

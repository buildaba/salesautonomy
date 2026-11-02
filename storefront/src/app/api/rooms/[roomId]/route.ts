import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key'
)

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params
  const { data, error } = await getSupabaseAdmin()
    .from('discovery_rooms')
    .select('*')
    .eq('id', roomId)
    .single()

  if (error || !data) {
    return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, value: data })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params
  const body = await req.json()

  const { error } = await getSupabaseAdmin()
    .from('discovery_rooms')
    .update(body)
    .eq('id', roomId)

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export async function POST() {
  await supabase.from('proposal_response').insert({
    response: 'YES'
  })

  return NextResponse.json({ success: true })
}

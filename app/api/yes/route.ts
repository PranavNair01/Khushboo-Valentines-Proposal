export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabaseServer'
import { sendYesEmail } from '@/lib/sendEmail'
import { sendYesWhatsapp } from '@/lib/sendWhatsapp'

export async function POST() {
  const timestamp = format(new Date(), 'd MMMM yyyy, hh:mm a')

  // 1️⃣ Try inserting YES
  const { error } = await supabase
    .from('khushboo_response')
    .insert({
      response: 'YES',
    })

  // 2️⃣ If already exists → silently ignore
  if (error && error.code === '23505') {
    return NextResponse.json({
      success: true,
      alreadyAnswered: true,
    })
  }

  // 3️⃣ Any other DB error
  if (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    )
  }

  // 4️⃣ Send notifications (ONLY once)
  await Promise.all([
    sendYesEmail(timestamp),
    sendYesWhatsapp(timestamp),
  ])

  return NextResponse.json({
    success: true,
    firstTime: true,
    timestamp,
  })
}

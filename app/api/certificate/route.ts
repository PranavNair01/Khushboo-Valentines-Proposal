import { NextResponse } from 'next/server'
import { format } from 'date-fns'

export async function GET() {
  const time = format(new Date(), 'dd MMM yyyy, hh:mm a')

  const html = `
    <html>
      <body style="font-family: serif; text-align: center; padding: 50px;">
        <h1>💍 She Said YES 💍</h1>
        <p>This certifies that on</p>
        <h3>${time}</h3>
        <p>she agreed to be my forever ❤️</p>
      </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

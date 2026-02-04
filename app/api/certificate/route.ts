export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import { format } from 'date-fns'

async function loadFont(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to load font: ${url}`)
  }
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export async function GET() {
  // 🕒 Timestamp
  const timestamp = format(new Date(), 'd MMMM yyyy, hh:mm a')

  // 🌸 Load fonts (NO fs)
  const playfair = await loadFont(
    `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/PlayfairDisplay-Regular.ttf`
  )
  const playfairBold = await loadFont(
    `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/PlayfairDisplay-Bold.ttf`
  )
  const poppins = await loadFont(
    `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/Poppins-Regular.ttf`
  )
  const poppinsItalic = await loadFont(
    `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/Poppins-Italic.ttf`
  )

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 80, bottom: 80, left: 60, right: 60 },
  })

  const chunks: Buffer[] = []
  doc.on('data', (chunk) => chunks.push(chunk))

  const pdfPromise = new Promise<Buffer>((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)))
  })

  // Register fonts
  doc.registerFont('Playfair', playfair)
  doc.registerFont('PlayfairBold', playfairBold)
  doc.registerFont('Poppins', poppins)
  doc.registerFont('PoppinsItalic', poppinsItalic)

  /* ---------- DESIGN ---------- */

  // Border
  doc
    .rect(30, 30, 535, 782)
    .lineWidth(2)
    .stroke('#e5b3c8')

  doc.moveDown(2)

  // Title
  doc
    .font('PlayfairBold')
    .fontSize(36)
    .fillColor('#000')
    .text('She Said YES', { align: 'center' })

  // 💍 Vector ring (emoji replacement)
  const ringX = 297.5
  const ringY = doc.y - 60


  doc
    .circle(ringX, ringY, 10)
    .lineWidth(2)
    .stroke('#e5b3c8')

  doc
    .circle(ringX, ringY, 4)
    .fill('#e5b3c8')

  doc.moveDown(1)

  doc
    .moveTo(220, doc.y)
    .lineTo(375, doc.y)
    .lineWidth(1)
    .stroke('#e5b3c8')

  doc.moveDown(2)


  // Body
  doc
    .font('Poppins')
    .fontSize(16)
    .fillColor('#000')
    .text('This certifies that on', { align: 'center' })

  doc.moveDown(0.5)

  doc
    .fontSize(20)
    .text(timestamp, { align: 'center' })

  doc.moveDown(2)

  doc
    .font('Playfair')
    .fontSize(20)
    .text('Khushboo agreed to be my forever.', {
      align: 'center',
    })

  doc.moveDown(2)

  // Footer text
  doc
    .font('PoppinsItalic')
    .fontSize(14)
    .fillColor('#444')
    .text('A moment chosen with love,', {
      align: 'center',
    })

  // ❤️ Vector heart (emoji replacement)
  const heartX = 297.5
  doc.moveDown(1)
  const heartY = doc.y


  doc
    .moveTo(heartX, heartY)
    .bezierCurveTo(
      heartX - 10, heartY - 10,
      heartX - 22, heartY + 6,
      heartX, heartY + 20
    )
    .bezierCurveTo(
      heartX + 22, heartY + 6,
      heartX + 10, heartY - 10,
      heartX, heartY
    )
    .fill('#e2557a')

  doc.moveDown(2)

  doc
    .fontSize(14)
    .fillColor('#444')
    .text('remembered for a lifetime.', {
      align: 'center',
    })

  doc.moveDown(4)

  doc
    .font('PoppinsItalic')
    .fontSize(14)
    .fillColor('#666')
    .text('— Always us', { align: 'center' })

  doc.end()

  const pdfBuffer = await pdfPromise

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="She-Said-YES.pdf"',
    },
  })
}

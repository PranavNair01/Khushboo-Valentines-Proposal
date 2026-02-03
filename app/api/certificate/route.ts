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

  // 🌸 Load fonts via fetch (NO fs)
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

  // ✅ Register fonts from Buffers
  doc.registerFont('Playfair', playfair)
  doc.registerFont('PlayfairBold', playfairBold)
  doc.registerFont('Poppins', poppins)
  doc.registerFont('PoppinsItalic', poppinsItalic)

  /* ---------- DESIGN ---------- */

  doc.rect(30, 30, 535, 782).lineWidth(2).stroke('#e5b3c8')

  doc.moveDown(2)

  doc
    .font('PlayfairBold')
    .fontSize(36)
    .text('She Said YES 💍', { align: 'center' })

  doc.moveDown(2)

  doc
    .font('Poppins')
    .fontSize(16)
    .text('This certifies that on', { align: 'center' })

  doc.moveDown(1)

  doc
    .font('Poppins')
    .fontSize(20)
    .text(timestamp, { align: 'center' })

  doc.moveDown(2)

  doc
    .font('Playfair')
    .fontSize(18)
    .text('Khushboo agreed to be my forever.', { align: 'center' })

  doc.moveDown(2)

  doc
    .font('PoppinsItalic')
    .fontSize(14)
    .text(
      'A moment chosen with love,\nand remembered for a lifetime ❤️',
      { align: 'center' }
    )

  doc.moveDown(4)

  doc
    .font('PoppinsItalic')
    .fontSize(14)
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

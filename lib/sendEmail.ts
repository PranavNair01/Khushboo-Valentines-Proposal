import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendYesEmail(timestamp: string) {
  // 1️⃣ Fetch the certificate PDF
  const certRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/certificate`
  )

  if (!certRes.ok) {
    throw new Error('Failed to fetch certificate PDF')
  }

  const arrayBuffer = await certRes.arrayBuffer()
  const pdfBase64 = Buffer.from(arrayBuffer).toString('base64')

  // 2️⃣ Send email with attachment
  await resend.emails.send({
    from: 'Proposal 💍 <onboarding@resend.dev>',
    to: process.env.NOTIFY_EMAIL!,
    subject: 'SHE SAID YES 💍❤️',
    html: `
      <h2>She said YES 💍</h2>
      <p><strong>Khushboo</strong> said YES.</p>
      <p><strong>Time:</strong> ${timestamp}</p>
      <p>This moment is saved forever ❤️</p>
      <br />
      <p>📎 The certificate is attached.</p>
    `,
    attachments: [
      {
        filename: 'She-Said-YES.pdf',
        content: pdfBase64,
      },
    ],
  })
}

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendYesEmail(timestamp: string) {
  await resend.emails.send({
    from: 'Proposal 💍 <onboarding@resend.dev>',
    to: process.env.NOTIFY_EMAIL!,
    subject: 'SHE SAID YES 💍❤️',
    html: `
      <h2>She said YES 💍</h2>
      <p><strong>Khushboo</strong> said YES.</p>
      <p>Time: ${timestamp}</p>
      <p>This moment is saved forever ❤️</p>
    `,
  })
}

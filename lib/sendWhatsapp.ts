import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function sendYesWhatsapp(timestamp: string) {
  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM!,
    to: process.env.TWILIO_WHATSAPP_TO!,
    body: `💍 SHE SAID YES ❤️

Khushboo said YES!
Time: ${timestamp}

This moment is saved forever.`,
  })
}

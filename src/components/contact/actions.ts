'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email required').max(255),
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  message: z.string().trim().min(10, 'Message too short').max(5000),
})

export async function sendContactEmail(formData: FormData) {
  // Extract data from FormData
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  }

  const parsed = schema.safeParse(rawData)
  if (!parsed.success) {
    return { success: false, error: 'Invalid transmission parameters.' }
  }

  try {
    const { name, email, subject, message } = parsed.data
    const toEmail = 'info@dipaloventures.com'
    const fromEmail = process.env.RESEND_DEFAULT_FROM_EMAIL || 'onboarding@resend.dev'

    const { error } = await resend.emails.send({
      from: `Dipalo Inquiry <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[INQUIRY] ${subject} - from ${name}`,
      text: `Source: Dipalo Contact Terminal\nName: ${name}\nEmail: ${email}\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    })

    if (error) {
      console.error('Transmission Error (Resend):', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Operational Failure (Server):', error)
    return { success: false, error: error?.message || 'Internal transmission failure.' }
  }
}

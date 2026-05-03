'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email required').max(255),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  type: z.enum(['founder', 'investor', 'general']),
  message: z.string().trim().min(10, 'Tell us a bit more (10+ chars)').max(5000),
})

export async function submitContactForm(data: z.infer<typeof schema>) {
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: 'Invalid form data.' }
  }

  try {
    const { name, email, company, type, message } = parsed.data

    // Route email based on the intent
    let toEmail = 'info@dipaloventures.com'
    if (type === 'founder') toEmail = 'deals@dipaloventures.com'
    if (type === 'investor') toEmail = 'investors@dipaloventures.com'

    const fromEmail = process.env.RESEND_DEFAULT_FROM_EMAIL || 'onboarding@resend.dev'

    const { error } = await resend.emails.send({
      from: `Dipalo Contact Form <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New Contact Request: ${type.toUpperCase()} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nType: ${type}\n\nMessage:\n${message}`,
    })

    if (error) {
      console.error('Resend API Error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Contact Form Server Error:', error)
    return { success: false, error: error?.message || 'Internal server error.' }
  }
}

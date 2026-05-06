'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email required').max(255),
  company: z.string().trim().max(150).optional(),
  inquiryType: z.enum(['general', 'founder', 'investor']),
  message: z.string().trim().min(5, 'Message too short').max(5000),
})

export async function sendContactEmail(formData: FormData) {
  // Extract data from FormData
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    inquiryType: formData.get('inquiryType'),
    message: formData.get('message'),
  }

  const parsed = schema.safeParse(rawData)
  if (!parsed.success) {
    return { success: false, error: 'Invalid transmission parameters.' }
  }

  try {
    const { name, email, company, inquiryType, message } = parsed.data
    const toEmail = 'info@dipaloventures.com'
    const fromEmail = process.env.RESEND_DEFAULT_FROM_EMAIL || 'onboarding@resend.dev'

    const { error } = await resend.emails.send({
      from: `Dipalo Inquiry <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[${inquiryType.toUpperCase()}] Inquiry from ${name}`,
      html: `
        <div style="background-color: #fcfbf9; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #171717;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f5f5f5; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <!-- Header -->
            <div style="padding: 32px 40px; border-bottom: 1px solid #f5f5f5; background-color: #ffffff;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <div style="width: 6px; height: 6px; border-radius: 50%; background-color: #fbbf24;"></div>
                <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; color: #a3a3a3; font-weight: bold;">
                  Inquiry Terminal · Transmission
                </span>
              </div>
              <h1 style="font-size: 24px; font-weight: 600; margin: 0; letter-spacing: -0.02em;">Technical Briefing</h1>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <div style="margin-bottom: 32px;">
                <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #a3a3a3; font-weight: bold; margin-bottom: 8px;">
                  Operator Identity
                </div>
                <div style="font-size: 16px; font-weight: 500;">${name}</div>
                <div style="font-size: 14px; color: #737373; margin-top: 4px;">${email}</div>
                ${company ? `<div style="font-size: 12px; color: #a3a3a3; margin-top: 4px;">${company}</div>` : ''}
              </div>

              <div style="margin-bottom: 32px;">
                <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #a3a3a3; font-weight: bold; margin-bottom: 8px;">
                  Transmission Category
                </div>
                <span style="display: inline-block; padding: 4px 12px; background-color: #fbbf241a; color: #fbbf24; border-radius: 99px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 10px; text-transform: uppercase; font-weight: bold;">
                  ${inquiryType}
                </span>
              </div>

              <div style="padding-top: 32px; border-top: 1px solid #f5f5f5;">
                <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #fbbf24; font-weight: bold; margin-bottom: 16px;">
                  Content Archive
                </div>
                <div style="font-size: 15px; line-height: 1.6; color: #404040; white-space: pre-wrap; font-style: italic; border-left: 2px solid #fbbf2433; padding-left: 20px;">
                  ${message}
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 24px 40px; background-color: #fcfbf9; border-top: 1px solid #f5f5f5; text-align: center;">
              <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #d4d4d4; font-weight: bold;">
                Ref: DV-TX-${Date.now().toString().slice(-6)} · Node: CHI_HUB_01
              </div>
            </div>
          </div>
        </div>
      `,
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

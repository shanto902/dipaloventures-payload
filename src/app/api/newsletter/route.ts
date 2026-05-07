import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const API_KEY = process.env.MAILCHIMP_API
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  const API_SERVER = process.env.MAILCHIMP_API_SERVER

  if (!API_KEY || !AUDIENCE_ID || !API_SERVER) {
    return NextResponse.json({ error: 'Mailchimp configuration missing' }, { status: 500 })
  }

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

  const data = {
    email_address: email,
    status: 'subscribed',
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.status >= 400) {
      const errorData = await response.json()
      // If user is already subscribed, treat it as success
      if (errorData.title === 'Member Exists') {
         return NextResponse.json({ message: 'Success' }, { status: 200 })
      }
      return NextResponse.json({ error: errorData.detail || 'There was an error' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}

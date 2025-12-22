import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { writeClient } from '@/lib/sanity/client'

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }
  return new Resend(apiKey)
}

// Simple rate limiting: store in memory (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 }) // 1 minute window
    return true
  }

  if (limit.count >= 5) {
    // Max 5 requests per minute
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, message, intent, sourceUrl } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Store lead in Sanity
    try {
      await writeClient.create({
        _type: 'lead',
        name,
        email,
        message,
        intent: intent || 'other',
        sourceUrl: sourceUrl || '',
        status: 'new',
        createdAt: new Date().toISOString(),
      })
    } catch (sanityError) {
      console.error('Error storing lead in Sanity:', sanityError)
      // Continue even if Sanity write fails - still send email
    }

    // Send email via Resend
    const resend = getResend()
    if (!resend) {
      console.warn('RESEND_API_KEY not configured, skipping email send')
    } else {
      try {
        await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@productivitytech.io',
          to: process.env.RESEND_TO_EMAIL || 'sindre@nettsmed.no',
        subject: `New Contact Form Submission: ${intent || 'General'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Intent:</strong> ${intent || 'Not specified'}</p>
          <p><strong>Source URL:</strong> ${sourceUrl || 'Not specified'}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        })
      } catch (resendError) {
        console.error('Error sending email:', resendError)
        return NextResponse.json(
          { error: 'Failed to send email. Please try again later.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}


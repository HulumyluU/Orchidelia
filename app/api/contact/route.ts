import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      partnerFirst,
      partnerLast,
      email,
      phone,
      sessionType,
      date,
      referral,
      venue,
      importance,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !sessionType || !referral) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      
      ${partnerFirst ? `<p><strong>Partner's Name:</strong> ${partnerFirst} ${partnerLast || ''}</p>` : ''}
      
      <h3>Session Details</h3>
      <p><strong>Session Type:</strong> ${sessionType}</p>
      ${date ? `<p><strong>Date:</strong> ${date}</p>` : ''}
      <p><strong>How They Heard About You:</strong> ${referral}</p>
      
      ${venue ? `<h3>Venue Information</h3><p>${venue}</p>` : ''}
      
      ${importance ? `<h3>Photography Importance</h3><p>${importance}</p>` : ''}
      
      <hr>
      <p><em>This message was sent from the Orhideia Photography contact form.</em></p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Orhideia Photography <onboarding@resend.dev>',
      to: 'ms3713287@gmail.com',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

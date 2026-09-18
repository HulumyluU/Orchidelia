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
        { error: 'Будь ласка, заповніть усі обов\'язкові поля' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Будь ласка, введіть дійсну email адресу' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Будь ласка, введіть дійсний номер телефону' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
      <h2>Нове повідомлення з контактної форми</h2>
      
      <h3>Контактна інформація</h3>
      <p><strong>Ім'я:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      
      ${partnerFirst ? `<p><strong>Ім'я партнера:</strong> ${partnerFirst} ${partnerLast || ''}</p>` : ''}
      
      <h3>Деталі сеансу</h3>
      <p><strong>Тип сеансу:</strong> ${sessionType}</p>
      ${date ? `<p><strong>Дата:</strong> ${date}</p>` : ''}
      <p><strong>Як про вас дізналися:</strong> ${referral}</p>
      
      ${venue ? `<h3>Інформація про майданчик</h3><p>${venue}</p>` : ''}
      
      ${importance ? `<h3>Важливість фотографії</h3><p>${importance}</p>` : ''}
      
      <hr>
      <p><em>Це повідомлення надіслано з контактної форми Orhideia Photography.</em></p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Orhideia Photography <onboarding@resend.dev>',
      to: 'galynasovyk@gmail.com',
      subject: `Нове повідомлення з контактної форми від ${firstName} ${lastName}`,
      html: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Не вдалося надіслати повідомлення. Спробуйте ще раз.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Повідомлення успішно надіслано!' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Сталася помилка. Спробуйте ще раз.' },
      { status: 500 }
    );
  }
}

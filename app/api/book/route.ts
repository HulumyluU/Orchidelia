import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';
import { randomBytes } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, serviceType, notes } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !serviceType) {
      return NextResponse.json(
        { error: 'Всі обов\'язкові поля мають бути заповнені' },
        { status: 400 }
      );
    }

    // Check if the time slot is already booked (in confirmed bookings)
    const { data: existingBooking, error: checkError } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('booking_date', date)
      .eq('booking_time', time)
      .single();

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Цей час вже заброньовано. Будь ласка, оберіть інший час.' },
        { status: 409 }
      );
    }

    // Check if there's already a pending booking for this slot
    const { data: pendingBooking } = await supabaseAdmin
      .from('pending_bookings')
      .select('id')
      .eq('booking_date', date)
      .eq('booking_time', time)
      .single();

    if (pendingBooking) {
      return NextResponse.json(
        { error: 'Цей час очікує підтвердження. Будь ласка, оберіть інший час.' },
        { status: 409 }
      );
    }

    // Generate confirmation token
    const confirmationToken = randomBytes(32).toString('hex');

    // Insert into pending_bookings
    const { data: pendingData, error: insertError } = await supabaseAdmin
      .from('pending_bookings')
      .insert({
        client_name: name,
        client_email: email,
        phone_number: phone,
        booking_date: date,
        booking_time: time,
        service_type: serviceType,
        additional_notes: notes || null,
        confirmation_token: confirmationToken,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw new Error('Failed to create pending booking');
    }

    // Send confirmation email with link
    try {
      const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/confirm-booking?token=${confirmationToken}`;
      
      await resend.emails.send({
        from: 'Orhideia Photo Studio <onboarding@resend.dev>',
        to: email,
        subject: 'Підтвердьте ваше бронювання - Orhideia Photo Studio',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Підтвердьте ваше бронювання</h1>
            <p>Шановний(а) ${name},</p>
            <p>Дякуємо за ваш інтерес до бронювання в Orhideia Photo Studio. Будь ласка, підтвердьте ваше бронювання, натиснувши кнопку нижче:</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Послуга:</strong> ${serviceType}</p>
              <p><strong>Дата:</strong> ${new Date(date).toLocaleDateString('uk-UA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Час:</strong> ${time}</p>
              <p><strong>Телефон:</strong> ${phone}</p>
              ${notes ? `<p><strong>Примітки:</strong> ${notes}</p>` : ''}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" style="background-color: #333; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Підтвердити бронювання
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">Це посилання діє 24 години.</p>
            <p>Якщо ви не запитували це бронювання, будь ласка, ігноруйте цей лист.</p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Orhideia Photo Studio<br>
              Збараж, Україна<br>
              galynasovyk@gmail.com<br>
              +1 (416) 555-0123
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Delete pending booking if email fails
      await supabaseAdmin.from('pending_bookings').delete().eq('id', pendingData.id);
      throw new Error('Failed to send confirmation email');
    }

    return NextResponse.json(
      { message: 'Лист підтвердження надіслано. Перевірте свою пошту для підтвердження бронювання.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in booking API:', error);

    return NextResponse.json(
      { error: error.message || 'Не вдалося створити бронювання' },
      { status: 500 }
    );
  }
}

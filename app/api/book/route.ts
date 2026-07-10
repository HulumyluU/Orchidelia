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
        { error: 'All required fields must be provided' },
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
        { error: 'This time slot is already booked. Please choose another time.' },
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
        { error: 'This time slot is currently pending confirmation. Please choose another time.' },
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
        subject: 'Confirm Your Booking - Orhideia Photo Studio',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Confirm Your Booking</h1>
            <p>Dear ${name},</p>
            <p>Thank you for your interest in booking with Orhideia Photo Studio. Please confirm your booking by clicking the button below:</p>
            
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Service:</strong> ${serviceType}</p>
              <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" style="background-color: #333; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Confirm Booking
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
            <p>If you did not request this booking, please ignore this email.</p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Orhideia Photo Studio<br>
              123 Photography Lane, Toronto, ON M5H 2N2<br>
              info@orhideiaphotostudio.com<br>
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
      { message: 'Confirmation email sent. Please check your email to confirm your booking.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in booking API:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}

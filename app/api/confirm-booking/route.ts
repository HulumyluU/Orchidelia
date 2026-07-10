import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/?error=invalid_token', request.url));
    }

    // Find the pending booking with this token
    const { data: pendingBooking, error: fetchError } = await supabaseAdmin
      .from('pending_bookings')
      .select('*')
      .eq('confirmation_token', token)
      .single();

    if (fetchError || !pendingBooking) {
      return NextResponse.redirect(new URL('/?error=invalid_token', request.url));
    }

    // Check if the token has expired
    if (new Date(pendingBooking.expires_at) < new Date()) {
      // Delete expired pending booking
      await supabaseAdmin.from('pending_bookings').delete().eq('id', pendingBooking.id);
      return NextResponse.redirect(new URL('/?error=expired_token', request.url));
    }

    // Check if the time slot is still available (in case someone else booked it)
    const { data: existingBooking } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('booking_date', pendingBooking.booking_date)
      .eq('booking_time', pendingBooking.booking_time)
      .single();

    if (existingBooking) {
      // Delete pending booking since slot is taken
      await supabaseAdmin.from('pending_bookings').delete().eq('id', pendingBooking.id);
      return NextResponse.redirect(new URL('/?error=slot_taken', request.url));
    }

    // Insert the confirmed booking
    const { error: insertError } = await supabaseAdmin
      .from('bookings')
      .insert({
        client_name: pendingBooking.client_name,
        client_email: pendingBooking.client_email,
        phone_number: pendingBooking.phone_number,
        booking_date: pendingBooking.booking_date,
        booking_time: pendingBooking.booking_time,
        service_type: pendingBooking.service_type,
        additional_notes: pendingBooking.additional_notes,
      });

    if (insertError) {
      console.error('Failed to confirm booking:', insertError);
      return NextResponse.redirect(new URL('/?error=confirmation_failed', request.url));
    }

    // Delete the pending booking
    await supabaseAdmin.from('pending_bookings').delete().eq('id', pendingBooking.id);

    // Redirect to success page
    return NextResponse.redirect(new URL('/booking-confirmed', request.url));
  } catch (error) {
    console.error('Error confirming booking:', error);
    return NextResponse.redirect(new URL('/?error=server_error', request.url));
  }
}

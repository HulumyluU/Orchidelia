import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const timeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    // Get all confirmed bookings for the selected date
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('booking_date', date);

    // Get all pending bookings for the selected date (that haven't expired)
    const { data: pendingBookings, error: pendingError } = await supabase
      .from('pending_bookings')
      .select('booking_time')
      .eq('booking_date', date)
      .gt('expires_at', new Date().toISOString());

    if (bookingsError || pendingError) {
      console.error('Supabase query error:', bookingsError || pendingError);
      // Return all slots as available if there's an error
      return NextResponse.json({ 
        availableSlots: timeSlots.map(time => ({ time, available: true }))
      });
    }

    const bookedTimes = bookings?.map(b => b.booking_time) || [];
    const pendingTimes = pendingBookings?.map(b => b.booking_time) || [];
    const unavailableTimes = [...bookedTimes, ...pendingTimes];

    const availableSlots = timeSlots.map(time => ({
      time,
      available: !unavailableTimes.includes(time),
    }));

    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error('Error in availability API:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}

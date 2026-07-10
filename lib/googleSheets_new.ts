import { GoogleSpreadsheet } from 'google-spreadsheet';

// These will be loaded from environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || '';
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/"/g, '') || '';

let doc: GoogleSpreadsheet | null = null;

async function getSheet() {
  if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Sheets credentials not configured');
  }

  if (!doc) {
    doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo();
  }

  return doc;
}

export async function getOrCreateSheet() {
  const sheet = await getSheet();
  
  // Look for a sheet named 'Bookings'
  let bookingsSheet = sheet.sheetsByTitle['Bookings'];
  
  if (!bookingsSheet) {
    // Create the sheet if it doesn't exist
    bookingsSheet = await sheet.addSheet({
      title: 'Bookings',
      headerValues: ['Date', 'Time', 'Name', 'Email', 'Phone', 'Service Type', 'Notes', 'Created At'],
    });
  } else {
    // Load the sheet to get headers
    await bookingsSheet.loadHeaderRow();
  }

  return bookingsSheet;
}

export async function checkSlotAvailability(date: string, time: string): Promise<boolean> {
  try {
    const sheet = await getOrCreateSheet();
    const rows = await sheet.getRows();

    // Check if there's already a booking for this date and time
    const isBooked = rows.some(
      (row) => row.get('Date') === date && row.get('Time') === time
    );

    return !isBooked;
  } catch (error) {
    console.error('Error checking slot availability:', error);
    throw error;
  }
}

export async function getAvailableSlots(date: string): Promise<{ time: string; available: boolean }[]> {
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  try {
    const sheet = await getOrCreateSheet();
    const rows = await sheet.getRows();

    const bookedTimes = rows
      .filter((row) => row.get('Date') === date)
      .map((row) => row.get('Time'));

    return timeSlots.map((time) => ({
      time,
      available: !bookedTimes.includes(time),
    }));
  } catch (error) {
    console.error('Error getting available slots:', error);
    // Return all slots as available if there's an error
    return timeSlots.map((time) => ({ time, available: true }));
  }
}

export async function addBooking(bookingData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceType: string;
  notes: string;
}): Promise<void> {
  try {
    const sheet = await getOrCreateSheet();
    
    // Double-check availability before booking
    const isAvailable = await checkSlotAvailability(bookingData.date, bookingData.time);
    
    if (!isAvailable) {
      throw new Error('This time slot is already booked');
    }

    await sheet.addRow({
      Date: bookingData.date,
      Time: bookingData.time,
      Name: bookingData.name,
      Email: bookingData.email,
      Phone: bookingData.phone,
      'Service Type': bookingData.serviceType,
      Notes: bookingData.notes,
      'Created At': new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error adding booking:', error);
    throw error;
  }
}

'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import PageHero from '@/components/PageHero';
import { placeholderImages } from '@/lib/placeholders';

export default function Book() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    serviceType: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const serviceTypes = [
    'Portrait Photography',
    'Event Photography',
    'Commercial Photography',
    'Wedding Photography',
    'Family Session',
    'Corporate Headshots'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Confirmation email sent! Please check your email to confirm your booking.' 
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          serviceType: '',
          notes: ''
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create booking' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-[72px] md:pt-[80px]">
      <PageHero
        title="Book"
        imageSrc={placeholderImages.hero.studio}
        imageAlt="Photo studio"
      />

      <div className="max-w-[800px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-white p-8 md:p-12 lg:p-16">
          <p className="section-label mb-4">Schedule Your Session</p>
          <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-widest text-gray-800 text-center mb-4 font-normal">
            Book Your Appointment
          </h2>
          <p className="font-serif text-gray-600 text-sm text-center mb-10 leading-relaxed">
            Select your preferred date and time to schedule your photography session
          </p>

          {message && (
            <div
              className={`mb-8 p-4 text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="form-label">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
                placeholder="+1 (416) 555-0000"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="date" className="form-label">
                  Select Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  min={format(new Date(), 'yyyy-MM-dd')}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="time" className="form-label">
                  Select Time <span className="text-red-400">*</span>
                </label>
                <select
                  id="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="form-select"
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="serviceType" className="form-label">
                Service Type <span className="text-red-400">*</span>
              </label>
              <select
                id="serviceType"
                required
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="form-select"
              >
                <option value="">Select a service</option>
                {serviceTypes.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="form-label">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="form-input resize-none"
                placeholder="Any special requests or additional information..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xs uppercase tracking-widest text-muted-dark font-light mb-4">
              Booking Information
            </h3>
            <ul className="space-y-2 font-serif text-sm text-gray-600">
              <li>Working hours: 9:00 AM - 5:00 PM</li>
              <li>Bookings are confirmed on a first-come, first-served basis</li>
              <li>You will receive a confirmation email to verify your booking</li>
              <li>Booking is only confirmed after clicking the email link</li>
              <li>Confirmation link expires in 24 hours</li>
              <li>Cancellations must be made at least 24 hours in advance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import { placeholderImages } from '@/lib/placeholders';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    partnerFirst: '',
    partnerLast: '',
    email: '',
    phone: '',
    sessionType: '',
    date: '',
    referral: '',
    venue: '',
    importance: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Message sent successfully! We\'ll get back to you within 48 hours.' });
        setFormData({
          firstName: '',
          lastName: '',
          partnerFirst: '',
          partnerLast: '',
          email: '',
          phone: '',
          sessionType: '',
          date: '',
          referral: '',
          venue: '',
          importance: '',
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to send message. Please try again.' });
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
        title="Contact"
        imageSrc={placeholderImages.hero.wedding}
        imageAlt="Wedding couple"
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-white p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column - Intro Text */}
            <div className="md:col-span-2">
              <h2 className="text-sm uppercase tracking-widest text-muted-dark font-light mb-8 leading-relaxed">
                You Deserve the Absolute Best.
              </h2>
              <div className="font-serif text-gray-700 text-sm md:text-base leading-relaxed space-y-6">
                <p>
                  Whether you&apos;re planning an intimate elopement, a grand celebration, or
                  anything in between, I&apos;m here to capture the essence of your love story.
                  Diversity and inclusivity are at the heart of what I do – every love story is
                  unique and deserves to be celebrated. I welcome couples of all backgrounds,
                  genders, and identities.
                </p>
                <p>
                  Fill out the contact form below, and I&apos;ll get back to you within 48 hours.
                  I can&apos;t wait to hear about your love and discuss how we can make your
                  wedding day unforgettable.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted font-light">
                  Toronto, ON M5H 2N2
                </p>
                <p className="text-xs text-muted font-light">
                  info@orhideiaphotostudio.com
                </p>
                <p className="text-xs text-muted font-light">
                  +1 (416) 555-0123
                </p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                {message && (
                  <div
                    className={`mb-6 p-4 text-sm ${
                      message.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="form-label">
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="form-label">
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="partnerFirst" className="form-label">
                      Partner&apos;s First Name
                    </label>
                    <input
                      type="text"
                      id="partnerFirst"
                      value={formData.partnerFirst}
                      onChange={(e) => setFormData({ ...formData, partnerFirst: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="partnerLast" className="form-label">
                      Partner&apos;s Last Name
                    </label>
                    <input
                      type="text"
                      id="partnerLast"
                      value={formData.partnerLast}
                      onChange={(e) => setFormData({ ...formData, partnerLast: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sessionType" className="form-label">
                    Session Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="sessionType"
                    required
                    value={formData.sessionType}
                    onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select session type</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="event">Event Photography</option>
                    <option value="commercial">Commercial Photography</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="referral" className="form-label">
                    How Did You Hear About Me? <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="referral"
                    required
                    value={formData.referral}
                    onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select an option</option>
                    <option value="instagram">Instagram</option>
                    <option value="google">Google Search</option>
                    <option value="referral">Friend Referral</option>
                    <option value="weddingwire">Wedding Wire</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="venue" className="form-label">
                      Where Are You Getting Married? (Venues Too!)
                    </label>
                    <textarea
                      id="venue"
                      rows={4}
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="form-input resize-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="importance" className="form-label">
                      How Important Is Wedding Photography to You?
                    </label>
                    <textarea
                      id="importance"
                      rows={4}
                      value={formData.importance}
                      onChange={(e) => setFormData({ ...formData, importance: e.target.value })}
                      className="form-input resize-none"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

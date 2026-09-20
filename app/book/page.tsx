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
    '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const serviceTypes = [
    'Індивідуальна фотосесія (1 година) - 1500 грн',
    'Сімейна фотосесія (1 година) - 1800 грн',
    'Дитяча фотосесія (1 година) - 1500 грн',
    'Міні фотосесія (30 хв) - 800 грн',
    'Оренда студії (1 година) - 700 грн',
    'Оренда студії (2 години) - 1300 грн',
    'Оренда студії (3 години) - 2000 грн'
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
          text: 'Лист підтвердження надіслано! Перевірте свою пошту для підтвердження бронювання.'
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
        setMessage({ type: 'error', text: data.error || 'Не вдалося створити бронювання' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Сталася помилка. Спробуйте ще раз.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-[72px] md:pt-[80px]">
      <PageHero
        title="Бронювання"
        imageSrc={placeholderImages.hero.studio}
        imageAlt="Photo studio"
      />

      <div className="max-w-[800px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-white p-8 md:p-12 lg:p-16">
          <p className="section-label mb-4">Заплануйте свій сеанс</p>
          <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-widest text-gray-800 text-center mb-4 font-normal">
            Забронюйте зустріч
          </h2>
          <p className="font-serif text-gray-600 text-sm text-center mb-10 leading-relaxed">
            Оберіть бажану дату та час для планування вашого фотосеансу
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
                  Повне ім'я <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  placeholder="Ваше повне ім'я"
                />
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email адреса <span className="text-red-400">*</span>
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
                Номер телефону <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
                placeholder="+380971462799"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="date" className="form-label">
                  Оберіть дату <span className="text-red-400">*</span>
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
                  Оберіть час <span className="text-red-400">*</span>
                </label>
                <select
                  id="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="form-select"
                >
                  <option value="">Оберіть час</option>
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
                Тип послуги <span className="text-red-400">*</span>
              </label>
              <select
                id="serviceType"
                required
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="form-select"
              >
                <option value="">Оберіть послугу</option>
                {serviceTypes.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-serif text-sm uppercase tracking-widest text-gray-800 mb-4">
                Що входить в індивідуальну зйомку з фотографом:
              </h4>
              <ul className="space-y-2 font-serif text-sm text-gray-600">
                <li>• Консультація щодо образів</li>
                <li>• Зйомка</li>
                <li>• 25-30 оброблених фото, інші - корекція кольору</li>
                <li>• Готові фото в електронному вигляді на Telegram</li>
              </ul>
            </div>

            <div>
              <label htmlFor="notes" className="form-label">
                Додаткові примітки
              </label>
              <textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="form-input resize-none"
                placeholder="Будь-які особливі запити або додаткова інформація..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Обробка...' : 'Підтвердити бронювання'}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xs uppercase tracking-widest text-muted-dark font-light mb-4">
              Інформація про бронювання
            </h3>
            <ul className="space-y-2 font-serif text-sm text-gray-600">
              <li>Робочий час: 9:00 - 17:00</li>
              <li>Бронювання підтверджується в порядку черговості</li>
              <li>Ви отримаєте лист підтвердження для перевірки бронювання</li>
              <li>Бронювання підтверджується тільки після натискання посилання в листі</li>
              <li>Посилання підтвердження діє 24 години</li>
              <li>Скасування має бути зроблено принаймні за 24 години</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

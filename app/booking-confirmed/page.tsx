import Link from 'next/link';

export default function BookingConfirmed() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Бронювання підтверджено!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ваш фотосеанс успішно заброньовано. Чекаємо на вас!
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Що далі?</h2>
          <ul className="text-left space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              Ви отримаєте лист підтвердження з усіма деталями
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              Будь ласка, прибути за 10 хвилин до запланованого часу
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              Якщо вам потрібно змінити час, зв'яжіться з нами принаймні за 24 години
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              Наша команда зв'яжеться з вами, якщо будуть будь-які зміни
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
          >
            Повернутися на головну
          </Link>
          <div className="text-gray-600">
            <p>Потрібно зробити інше бронювання?</p>
            <Link href="/book" className="text-gray-900 hover:underline">
              Забронювати інший сеанс
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

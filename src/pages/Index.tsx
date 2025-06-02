import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <main className="bg-white text-gray-900 font-sans">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold bg-transparent rounded-md z-[1000]">
        <span className="text-2xl font-bold text-blue-800 text-shadow-lg">Life</span>
        <span className="text-2xl font-bold text-gray-800 text-shadow-lg">Rank</span>
      </div>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-blue-100">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl text-black">
          🌍 Find your place in the world
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-xl">
          We help digital nomads, travelers, and expats discover European cities that fit their
          lifestyle — based on real data.
        </p>
        <Link
          to="/europe"
          className="mt-10 px-6 py-4 bg-blue-800 text-white text-base font-medium rounded-md inline-flex items-center gap-3 hover:bg-blue-700 transition"
        >
          Explore the Map
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </section>

      {/* Why Map Section */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-6">🗺️ Start exploring the map</h2>
          <p className="text-gray-600 text-lg">
            Exploration is spatial. Our map gives you an intuitive way to visually compare cities
            and choose where to go next — without digging through dozens of tabs.
          </p>
          <p className="text-gray-500 text-sm mt-8 text-center">
            (Just find a city you like and click on the pin to get the data.)
          </p>
        </div>
      </section>

      {/* What You Get Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
            What you'll discover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: '💸',
                title: 'Cost of Living',
                desc: 'Compare expected monthly budgets in each city.',
              },
              {
                icon: '🌤️',
                title: 'Weather Patterns',
                desc: 'Explore average temperatures and seasonality.',
              },
              {
                icon: '🔒',
                title: 'Crime & Safety',
                desc: 'Get a sense of how safe each place is to live in.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {icon} {title}
                </h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-8 text-center">(More data is coming soon!)</p>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-6">
          Your next big adventure could be one click away
        </h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          Explore the map to find cities that match your lifestyle goals and values.
        </p>
        <Link
          to="/europe"
          className="px-6 py-4 bg-blue-800 text-white text-base font-medium rounded-md inline-flex items-center gap-3 hover:bg-blue-700 transition"
        >
          Start Exploring
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}

export default Index;

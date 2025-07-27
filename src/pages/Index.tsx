import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import Newsletter from '../components/Basic/Newsletter';
import { trackPageview } from '../utils/analytics';
import { useEffect } from 'react';

function Index() {
  useEffect(() => {
    trackPageview('/');
  }, []);

  return (
    <main className="bg-white text-gray-900 font-sans">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold bg-transparent rounded-md z-[1000]">
        <span className="text-2xl font-bold text-blue-800 text-shadow-lg">Life</span>
        <span className="text-2xl font-bold text-gray-800 text-shadow-lg">Rank</span>
      </div>
      {/* Hero Section */}
      <section className="min-h-[500px] flex flex-col justify-center items-center text-center px-6 py-18 md:py-26 bg-blue-50">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-4xl text-black lg:mt-16">
          Peaceful & Affordable Places to Live in Europe – Find Your New Home
        </h1>
        <p className="mt-6 lg:mt-12 text-md md:text-lg md:text-xl text-gray-700 max-w-2xl">
          🌞 Start exploring vibrant and quiet places in Europe - where life slows down, communities
          thrive, and your budget stretches further.
        </p>
        <Link
          to="/europe?layerTypeId=1&centerLat=48.07649&centerLng=16.32731&north=58.40171&south=35.13787&east=40.73730&west=-8.04199&zoom=5&budget=7000&size=9007199254740991&sea=false&rank=false"
          className="mt-10 lg:mt-20 px-6 py-4 bg-blue-800 text-white text-base font-medium rounded-md inline-flex items-center gap-3 hover:bg-blue-700 transition"
        >
          Explore the Map
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
        <p className="text-gray-500 text-xs md:text-sm mt-8 text-center">
          (Click on any town or city pin to get instant access to budget details and lifestyle
          highlights, making your search simple and rewarding.)
        </p>
      </section>

      <section className="py-8 px-6 text-center bg-gray-50">
        <Newsletter />
      </section>

      {/* Why Map Section */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium mb-6">🗺️ Discover places you may like</h2>
          <p className="text-gray-600 text-md md:text-lg">
            Use the interactive map to explore peaceful European towns worth visiting — or maybe
            even calling home. Each pin opens up local insights to help you decide where to go next.
          </p>
          <p className="text-gray-500 text-sm mt-8 text-center">
            (Click any pin to discover what life there feels like.)
          </p>
        </div>
      </section>

      {/* What You Get Grid */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-12">
            What you'll find in each city profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: '💸',
                title: 'Cost of Living',
                desc: 'Compare expected monthly budgets for solo travelers, couples, and families.',
              },
              {
                icon: '🔒',
                title: 'Crime & Safety',
                desc: 'Get a clear picture of safety levels and recent crime trends.',
              },
              {
                icon: '🧭',
                title: 'Lifestyle Snapshot',
                desc: 'Discover the vibe, nature access, seasonality, and culture of each place.',
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
          <p className="text-gray-500 text-sm mt-8 text-center">
            (More insights and features coming soon!)
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-blue-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Discover Affordable, Peaceful Places to Live in Europe
          </h2>
          <p className="text-gray-700 text-md md:text-lg">
            Whether you’re dreaming of early retirement, pursuing FIRE, or planning a mindful
            relocation, our interactive map helps you explore small towns and cities across Europe
            where life is more affordable, calm, and connected.
          </p>
          <p className="text-gray-600 mt-4">
            Browse budget-friendly destinations in Portugal, the Balkans, Spain, Italy, and more —
            with insights on safety, cost of living, and local lifestyle.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-medium mb-6">
          Dreaming of a better life with more meaning?
        </h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          Explore calmer places in Europe where life can feel more connected and relaxed. Your next
          chapter starts here.
        </p>
        <Link
          to="/europe?layerTypeId=1&centerLat=48.07649&centerLng=16.32731&north=58.40171&south=35.13787&east=40.73730&west=-8.04199&zoom=5&budget=7000&size=9007199254740991&sea=false&rank=false"
          className="px-6 py-4 bg-blue-800 text-white text-base font-medium rounded-md inline-flex items-center gap-3 hover:bg-blue-700 transition"
        >
          Begin your journey
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}

export default Index;

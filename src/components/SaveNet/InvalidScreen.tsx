import { Link } from 'react-router-dom';
import { flowCounties } from '../../utils/saveNet';

function InvalidScreen({ cityName }: { cityName: string }) {
  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <h1 className="text-xl text-center font-bold text-gray-800 mb-8">
        At this moment we can't provide net & save data for {cityName}
      </h1>

      <p className="mb-4">At the moment, we have net & save data for cities in these countries:</p>

      <ul className="w-full text-left space-y-3 mb-6">
        {flowCounties.map((item) => (
          <li className="flex items-start" key={item}>
            <span className="text-green-600 text-lg mr-2">✅</span>
            <span className="text-gray-700">
              <strong>{item}</strong>
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/europe?layerTypeId=1&centerLat=48.07649&centerLng=16.32731&north=58.40171&south=35.13787&east=40.73730&west=-8.04199&zoom=5&budget=7000&size=9007199254740991&sea=false&rank=false"
        className="w-full md:w-[300px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors mt-4"
      >
        Back on the Map
      </Link>
    </div>
  );
}

export default InvalidScreen;

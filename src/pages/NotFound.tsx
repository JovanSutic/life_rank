import { Link } from 'react-router-dom';
import TopLogo from '../components/Basic/TopLogo';

function NotFound() {
  return (
    <div className="w-full h-full">
      <div className="w-[320px] mx-auto">
        <TopLogo />
        <div className="mt-20 text-center">
          <h1 className="text-gray-800 font-bold text-2xl text-center">404 - Page Not Found</h1>
          <p className="mt-4 mb-10 text-gray-800 text-lg text-center">
            Oops, we couldn't find that page.
          </p>
          <Link to="/" className="underline text-blue-600">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

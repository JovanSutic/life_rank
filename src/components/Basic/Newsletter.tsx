import { ExclamationTriangleIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, type FormEvent } from 'react';

const Newsletter = () => {
  const [honeypot, setHoneypot] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  // Use useMutation for handling the subscription API call
  const mutation = useMutation({
    mutationFn: (email: string) => {
      // Note: In a real app, VITE_API_URL would be configured. Here we use a placeholder.
      return axios.post(`${import.meta.env.VITE_API_URL}/specials/subscriber`, { email });
    },
    onSuccess: () => {
      setEmail('');
      setError(null);
      setSuccess(true);
    },
    onError: (error) => {
      let message = 'There was an error. Please, close this window and try try again later.';
      if (error.message === 'Request failed with status code 404') {
        message =
          'You are using email of an existing or unsubscribed user which can not be processed at the moment.';
      }
      setApiError(message);
    },
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setApiError(null);
    setSuccess(null);

    // Basic bot detection using honeypot field
    if (honeypot !== '') {
      console.warn('Bot detected - honeypot field was filled.');
      return;
    }

    // Client-side email validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    mutation.mutate(email);
  };

  const isLoading = mutation.isPending;

  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800">
        <span className="mr-2 text-4xl">📧</span>
        Subscribe To Our Newsletter
      </h3>
      <p className="mt-4 text-lg text-gray-600">
        Get notified about places with most friendly best taxes, cost of living and quality of life.
      </p>

      {/* Conditional rendering for success, error, and form */}
      {success || apiError ? (
        <div
          className={`mt-6 p-4 rounded-xl flex items-center justify-center space-x-2 ${success ? 'bg-green-100' : 'bg-red-100'}`}
        >
          {success ? (
            <FaceSmileIcon className="h-6 w-6 text-green-600" />
          ) : (
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          )}
          <p className={`text-sm font-medium ${success ? 'text-green-800' : 'text-red-800'}`}>
            {success ? 'Thanks for subscribing! Check your inbox for a confirmation.' : apiError}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          {/* Honeypot field for bot prevention */}
          <input
            type="text"
            name="honeypot"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />

          <input
            aria-label="email"
            type="email"
            className="w-full sm:w-auto flex-grow px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 transition"
            placeholder="Your email address"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer sm:w-auto px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gray-700 hover:bg-gray-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Newsletter;

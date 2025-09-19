import { ExclamationTriangleIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState, type FormEvent } from 'react';
import { Button } from './Button';

const Newsletter = () => {
  const [honeypot, setHoneypot] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const mutation = useMutation({
    mutationFn: (email: string) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/specials/subscriber`, { email });
    },
    onSuccess: () => {
      setEmail('');
      setError(null);
      setSuccess(true);
    },
    onError: (error) => {
      let message = 'There was an error. Please, close this window and try again later.';
      if (error.message === 'Request failed with status code 404') {
        message =
          'You are using an email of an existing or unsubscribed user which cannot be processed at the moment.';
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

    if (honeypot !== '') {
      console.warn('Bot detected - honeypot field was filled.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    mutation.mutate(email);
  };

  const isLoading = mutation.isPending;

  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-200 max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800">
        <span className="mr-2 text-4xl">📧</span>
        Subscribe To Our Newsletter
      </h3>
      <p className="mt-4 text-lg text-gray-600">
        Get exclusive insights on where remote workers can earn more and spend less. All in one
        email.
      </p>

      {success || apiError ? (
        <div
          className={`mt-6 p-4 rounded-lg border text-sm flex items-center gap-3 transition ${
            success
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {success ? (
            <FaceSmileIcon className="h-5 w-5 text-green-500" />
          ) : (
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
          )}
          <p className="font-medium">
            {success ? 'Thanks for subscribing! Check your inbox for a confirmation.' : apiError}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full"
        >
          {/* Honeypot field */}
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
            placeholder="Your email address"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isLoading}
            required
            className="w-full sm:w-auto flex-grow rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 transition"
          />
          <Button type="submit" variant="neutral" disabled={isLoading}>
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Newsletter;

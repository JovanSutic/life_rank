import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const mutation = useMutation({
    mutationFn: (email: string) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/specials/subscribers`, { email });
    },
    onSuccess: () => {
      setEmail('');
      setError(null);
      setSuccess(true);
    },
    onError: (error) => {
      //   console.error('Subscription failed', error);
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

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    mutation.mutate(email);
  };

  useEffect(() => {
    return () => {
      setEmail('');
      setError(null);
      setApiError(null);
      setSuccess(null);
    };
  }, []);

  const isLoading = mutation.isPending;

  return (
    <div>
      <div className="bg-gray-50 ml-form-embedContainer ml-subscribe-form ml-subscribe-form-27008806">
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <div className="ml-form-embedContent">
                <h4 className="text-2xl md:text-3xl font-medium mb-3">📧 Newsletter</h4>
                <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                  Hey each week, we share handpicked insights on{' '}
                  <strong>European towns and cities</strong> where life moves slower, costs less,
                  and feels more meaningful.
                  <br />
                  Drop your email to start receiving our weekly newsletter.
                </p>
              </div>
              {apiError && (
                <div className="w-full mb-6">
                  <p className="py-4 text-red-500 text-md lg:text-lg text-center font-semibold">
                    {apiError}
                  </p>
                </div>
              )}
              {success && (
                <div className="w-full mb-6">
                  <p className="py-4 text-gray-800 text-md lg:text-lg  text-center font-semibold">
                    🎉 You're all set! Thanks for subscribing to our newsletter.
                  </p>
                </div>
              )}
              {success === null && apiError === null && (
                <div>
                  <div className="w-full mb-6">
                    <input
                      aria-label="email"
                      aria-required="true"
                      type="email"
                      className="form-control w-full md:w-[360px] px-4 py-2 text-16 border border-gray-400 rounded-lg bg-white disabled:opacity-50"
                      name="fields[email]"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      disabled={isLoading}
                      required
                    />
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-800 text-white text-base font-medium rounded-md inline-flex items-center gap-3 hover:bg-blue-700 transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

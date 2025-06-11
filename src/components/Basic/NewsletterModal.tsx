import { useEffect, useState } from 'react';
import Modal from './Modal';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function NewsletterModal({ show, onClose }: { show: boolean; onClose: () => void }) {
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
    if (!show) {
      setEmail('');
      setError(null);
      setApiError(null);
      setSuccess(null);
    }
  }, [show]);

  const isLoading = mutation.isPending;

  return (
    <Modal show={show}>
      <h3 className="text-xl font-semibold mb-3 text-center">📧 Newsletter</h3>
      <p className="text-sm text-gray-600 text-center mb-6">
        Hey each week, we share handpicked insights on <strong>European towns and cities</strong>{' '}
        where life moves slower, costs less, and feels more meaningful.
        <br />
        Drop your email to start receiving our weekly newsletter.
      </p>
      {apiError && (
        <div className="w-full mb-6">
          <p className="py-4 text-red-500 text-md text-center font-semibold">{apiError}</p>
        </div>
      )}
      {success && (
        <div className="w-full mb-6">
          <p className="py-4 text-gray-800 text-md text-center font-semibold">
            🎉 You're all set! Thanks for subscribing to our newsletter.
          </p>
        </div>
      )}
      {success === null && apiError === null && (
        <div className="w-full mb-6">
          <input
            aria-label="email"
            aria-required="true"
            type="email"
            className="form-control w-full px-4 py-2 text-16 border border-gray-400 rounded-lg bg-white disabled:opacity-50"
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
      )}

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          disabled={isLoading || email === '' || success === true || apiError !== null}
          className={`flex items-center text-sm text-white transition bg-blue-500 hover:bg-blue-600 cursor-pointer py-2 px-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="flex items-center text-sm text-black hover:bg-gray-300 transition cursor-pointer py-2 px-4 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default NewsletterModal;

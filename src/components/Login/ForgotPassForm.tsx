import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';

const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

const resetSchema = z
  .object({
    code: z.string().length(6, { message: 'Code must be 6 digits' }),
    newPassword: z
      .string()
      .min(8, { message: 'Must be at least 8 characters' })
      .regex(/[a-z]/, { message: 'At least one lowercase letter' })
      .regex(/[A-Z]/, { message: 'At least one uppercase letter' })
      .regex(/\d/, { message: 'At least one number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'At least one special character' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type EmailData = z.infer<typeof emailSchema>;
type ResetData = z.infer<typeof resetSchema>;

type ForgotPasswordFormProps = {
  loading: boolean;
  onRequestReset: (email: string) => Promise<void>;
  onSubmitNewPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  error: string | null;
};

function ForgotPasswordForm({
  loading,
  onRequestReset,
  onSubmitNewPassword,
  error,
}: ForgotPasswordFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isValid },
    reset,
  } = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors, isValid: resetIsValid },
    reset: resetReset,
  } = useForm<ResetData>({
    resolver: zodResolver(resetSchema),
    mode: 'all',
  });

  const handleEmail = async (data: EmailData) => {
    try {
      await onRequestReset(data.email);
      setEmail(data.email);
      setStep(2);
    } catch (err) {
      console.error('Reset request error', err);
    }
  };

  const handleReset = async (data: ResetData) => {
    try {
      await onSubmitNewPassword(email, data.code, data.newPassword);
      navigate('/login?type=login');
    } catch (err) {
      console.error('Reset confirmation error', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg space-y-5">
      {step === 1 && (
        <form onSubmit={handleEmailSubmit(handleEmail)} className="space-y-4">
          <div>
            <p className="text-center text-sm text-gray-600">
              Enter your email to receive a password reset code.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...registerEmail('email')}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
            />
            {emailErrors.email && (
              <p className="text-sm text-red-500">{emailErrors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending code...' : 'Send Confirmation Code'}
          </button>
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center bg-red-100 border border-red-300 rounded p-2">
              {error}
            </div>
          )}
          <div className="mt-4 flex flex-col items-center text-sm text-gray-600 space-y-2">
            <p>
              You remember your password?{' '}
              <Link to="/login?type=login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetSubmit(handleReset)} className="space-y-4">
          <div>
            <p className="text-center text-sm text-gray-600">
              We have sent you confirmation email. Please, check out your email and enter the
              6-digit code we have sent to you.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmation Code</label>
            <input
              type="text"
              maxLength={6}
              {...registerReset('code')}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
            />
            {resetErrors.code && <p className="text-sm text-red-500">{resetErrors.code.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              {...registerReset('newPassword')}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
            />
            {resetErrors.newPassword && (
              <p className="text-sm text-red-500">{resetErrors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              {...registerReset('confirmPassword')}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
            />
            {resetErrors.confirmPassword && (
              <p className="text-sm text-red-500">{resetErrors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!resetIsValid || loading}
            className="w-full cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting password...' : 'Reset Password'}
          </button>
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center bg-red-100 border border-red-300 rounded p-2">
              {error}
            </div>
          )}
          <div className="mt-4 flex flex-col items-center text-sm text-gray-600 space-y-2">
            <p>
              You did't get the email?{' '}
              <button
                onClick={() => {
                  setEmail('');
                  reset();
                  resetReset();
                  setStep(1);
                }}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Try one more time
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default ForgotPasswordForm;

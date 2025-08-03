import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters' })
    .regex(/[a-z]/, { message: 'At least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'At least one uppercase letter' })
    .regex(/\d/, { message: 'At least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'At least one special character' }),
});

const codeSchema = z.object({
  code: z.string().length(6, { message: 'Confirmation code must be 6 digits' }),
});

type SignUpData = z.infer<typeof signupSchema>;
type CodeData = z.infer<typeof codeSchema>;

type SignUpFormProps = {
  onSignup: (data: SignUpData) => Promise<void>;
  onConfirm: (email: string, code: string) => Promise<void>;
  loading?: boolean;
  error: string | null;
};

function SignUpForm({ onSignup, onConfirm, loading, error }: SignUpFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [emailForConfirmation, setEmailForConfirmation] = useState<string>('');
  const navigate = useNavigate();

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isValid },
  } = useForm<SignUpData>({
    resolver: zodResolver(signupSchema),
    mode: 'all',
  });

  const {
    register: registerCode,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors, isValid: codeIsValid },
  } = useForm<CodeData>({
    resolver: zodResolver(codeSchema),
  });

  const handleSignUp = async (data: SignUpData) => {
    try {
      await onSignup(data);
      setEmailForConfirmation(data.email);
      setStep(2);
    } catch (err) {
      console.error('Sign up error:', err);
    }
  };

  const handleCodeConfirm = async (data: CodeData) => {
    try {
      await onConfirm(emailForConfirmation, data.code);
      navigate('/login?type=loginSignSuccess');
    } catch (err) {
      console.error('Code confirmation error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg space-y-5">
      {step === 1 && (
        <form onSubmit={handleSignupSubmit(handleSignUp)} className="space-y-4">
          <div>
            <p className="mb-2 text-center text-sm text-gray-600">
              Create your account by entering your details below
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...registerSignup('name')}
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring"
            />
            {signupErrors.name && (
              <p className="text-sm text-red-500">{signupErrors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...registerSignup('email')}
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring"
            />
            {signupErrors.email && (
              <p className="text-sm text-red-500">{signupErrors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...registerSignup('password')}
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring"
            />
            {signupErrors.password && (
              <p className="text-sm text-red-500">{signupErrors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center bg-red-100 border border-red-300 rounded p-2">
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-col items-center text-sm text-gray-600 space-y-2">
            <p>
              You have an account?{' '}
              <Link to="/login?type=login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCodeSubmit(handleCodeConfirm)} className="space-y-4">
          <div>
            <p className="text-center text-sm text-gray-600">
              We have sent you confirmation email. Please, enter the 6-digit code we sent to your
              email.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmation Code</label>
            <input
              type="text"
              maxLength={6}
              {...registerCode('code')}
              className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring"
            />
            {codeErrors.code && <p className="text-sm text-red-500">{codeErrors.code.message}</p>}
          </div>

          <button
            type="submit"
            disabled={!codeIsValid || loading}
            className="w-full cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Account
          </button>
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center bg-red-100 border border-red-300 rounded p-2">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default SignUpForm;

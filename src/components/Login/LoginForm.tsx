import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-z]/, { message: 'Must include a lowercase letter' })
    .regex(/[A-Z]/, { message: 'Must include an uppercase letter' })
    .regex(/\d/, { message: 'Must include a number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Must include a special character' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onLogin: (data: LoginFormData) => Promise<void>;
  loading?: boolean;
  error: string | null;
  success?: boolean;
};

function LoginForm({ onLogin, loading, error, success }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="max-w-md mx-auto bg-white p-6 rounded-lg space-y-5"
    >
      <div>
        <p className="mb-2 text-center text-sm text-gray-600">
          {success
            ? 'You have successfully create new account, now you need to sign in using your email and password.'
            : 'Enter your credentials to login.'}
        </p>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>

      {error && (
        <div className="mb-4 text-sm text-red-600 text-center bg-red-100 border border-red-300 rounded p-2">
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-col items-center text-sm text-gray-600 space-y-2">
        <p>
          Forgot your password?{' '}
          <Link to="/login?type=forgotPass" className="text-blue-600 hover:underline">
            Reset it here
          </Link>
        </p>
        <p>
          Don't have an account?{' '}
          <Link to="/login?type=signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;

import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import SignUpForm from '../components/Login/SignUpForm';
import ForgotPasswordForm from '../components/Login/ForgotPassForm';
import { useEffect, useState } from 'react';
import {
  signIn,
  signUp,
  confirmSignUp,
  forgotPassword,
  confirmForgotPassword,
} from '../utils/cognitoService';
import { useMapStore } from '../stores/mapStore';

interface LoginTitles {
  login: string;
  signup: string;
  loginSignSuccess: string;
  forgotPass: string;
}
const titles: LoginTitles = {
  login: 'Sign in to your account',
  signup: 'Create a new account',
  loginSignSuccess: 'Sign in to your account',
  forgotPass: '	Reset your password',
};

const getTitle = (field: keyof LoginTitles | null) => {
  if (!field) return titles.login;

  return titles[field];
};

function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') as keyof LoginTitles | null;
  const navigate = useNavigate();
  const { setIsAuthenticated } = useMapStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn(data.email, data.password);
      console.log('Login success:', result);
      setIsAuthenticated(true);
      navigate('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signUp(data.name, data.email, data.password);
      console.log('Sign up success:', result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      throw Error(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const onConfirm = async (email: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await confirmSignUp(email, code);
      console.log('Confirmation success:', result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Confirmation failed');
      throw Error(err.message || 'Confirmation failed');
    } finally {
      setLoading(false);
    }
  };

  const onForgetPass = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await forgotPassword(email);
      console.log('Forget pass success:', result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Forget pass failed');
      throw Error(err.message || 'Forget pass failed');
    } finally {
      setLoading(false);
    }
  };

  const onForgetPassConfirm = async (email: string, code: string, newPass: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await confirmForgotPassword(email, code, newPass);
      console.log('Confirm password success:', result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Confirm password failed');
      throw Error(err.message || 'Confirm password failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Object.keys(titles).includes(type as string)) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('type', 'login');
      setSearchParams(newParams, { replace: true });
    }
    if (error) {
      setError(null);
    }
  }, [type]);

  return (
    <>
      <article>
        <title>{`Healthcare quality in ${name} | LifeRank`}</title>
        <meta
          name="description"
          content={`Healthcare in ${name} for expats and nomads looking for peaceful & affordable places`}
        />
        <meta
          name="keywords"
          content={`${name}, healthcare, public healthcare, private healthcare, expat healthcare, healthcare insurance, healthcare benchmarks`}
        />
      </article>
      <div className="relative flex flex-col min-h-screen w-full px-6 pb-6 pt-2">
        <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xl md:text-2xl font-bold bg-transparent rounded-md z-[1000]">
            <span className="text-blue-800 text-shadow-lg">Life</span>
            <span className="text-gray-800 text-shadow-lg">Rank</span>
          </div>
          <h1 className="text-xl font-semibold text-center text-gray-800 mt-8">{getTitle(type)}</h1>
          {(type === 'loginSignSuccess' || type === 'login') && (
            <LoginForm
              loading={loading}
              error={error}
              onLogin={onLogin}
              success={type === 'loginSignSuccess'}
            />
          )}

          {type === 'signup' && (
            <SignUpForm loading={loading} error={error} onSignup={onSignup} onConfirm={onConfirm} />
          )}

          {type === 'forgotPass' && (
            <ForgotPasswordForm
              loading={loading}
              error={error}
              onRequestReset={onForgetPass}
              onSubmitNewPassword={onForgetPassConfirm}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;

import { jwtDecode } from 'jwt-decode';
import { refreshSession } from './cognitoService';

type JwtPayload = {
  exp?: number;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded?.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (error) {
    // If decoding fails, treat the token as expired
    console.error('Failed to decode token:', error);
    return true;
  }
};

export const checkAndRefreshToken = async (): Promise<boolean> => {
  const idToken = sessionStorage.getItem('idToken');
  const refreshToken = sessionStorage.getItem('refreshToken');

  if (!idToken) return false;

  if (!isTokenExpired(idToken)) return true;

  if (refreshToken) {
    try {
      const result = await refreshSession(refreshToken);
      if (result) return true;
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return false;
};

import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  type InitiateAuthCommandInput,
  type SignUpCommandInput,
  type ConfirmSignUpCommandInput,
  type ForgotPasswordCommandInput,
  ForgotPasswordCommand,
  type ConfirmForgotPasswordCommandInput,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const config = {
  region: import.meta.env.VITE_APP_REGION,
  userPoolId: import.meta.env.VITE_APP_COGNITO_USER_POOL_ID,
  clientId: import.meta.env.VITE_APP_COGNITO_CLIENT_ID,
};

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

export const signIn = async (username: string, password: string) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      sessionStorage.setItem('idToken', AuthenticationResult.IdToken || '');
      sessionStorage.setItem('accessToken', AuthenticationResult.AccessToken || '');
      sessionStorage.setItem('refreshToken', AuthenticationResult.RefreshToken || '');
      return AuthenticationResult;
    }
  } catch (error) {
    console.error('Error signing in: ', error);
    throw error;
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  const params: SignUpCommandInput = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'name',
        Value: name,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log('Sign up success: ', response);
    return response;
  } catch (error) {
    console.error('Error signing up: ', error);
    throw error;
  }
};

export const confirmSignUp = async (username: string, code: string) => {
  const params: ConfirmSignUpCommandInput = {
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log('User confirmed successfully');
    return true;
  } catch (error) {
    console.error('Error confirming sign up: ', error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  const params: ForgotPasswordCommandInput = {
    ClientId: config.clientId,
    Username: email,
  };

  try {
    const command = new ForgotPasswordCommand(params);
    const response = await cognitoClient.send(command);
    console.log('Forgot password request sent:', response);
    return response;
  } catch (error) {
    console.error('Error in forgot password:', error);
    throw error;
  }
};

export const confirmForgotPassword = async (
  email: string,
  confirmationCode: string,
  newPassword: string
) => {
  const params: ConfirmForgotPasswordCommandInput = {
    ClientId: config.clientId,
    Username: email,
    ConfirmationCode: confirmationCode,
    Password: newPassword,
  };

  try {
    const command = new ConfirmForgotPasswordCommand(params);
    const response = await cognitoClient.send(command);
    console.log('Password reset successful:', response);
    return response;
  } catch (error) {
    console.error('Error confirming forgot password:', error);
    throw error;
  }
};

export const refreshSession = async (refreshToken: string) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: import.meta.env.VITE_APP_COGNITO_CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };

  const client = new CognitoIdentityProviderClient({
    region: import.meta.env.VITE_APP_REGION,
  });

  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await client.send(command);

    if (AuthenticationResult) {
      sessionStorage.setItem('idToken', AuthenticationResult.IdToken || '');
      sessionStorage.setItem('accessToken', AuthenticationResult.AccessToken || '');
      // Refresh token isn't returned again, keep the original
      return AuthenticationResult;
    }
  } catch (err) {
    console.error('Token refresh failed:', err);
    throw err;
  }
};

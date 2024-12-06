import { AuthToken, User } from '../../types/auth';

export const AUTH_ACTIONS = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',
  LOGOUT: 'AUTH/LOGOUT',
  SET_TOKENS: 'AUTH/SET_TOKENS',
} as const;

export const loginRequest = () => ({
  type: AUTH_ACTIONS.LOGIN_REQUEST,
});

export const loginSuccess = (user: User, tokens: AuthToken) => ({
  type: AUTH_ACTIONS.LOGIN_SUCCESS,
  payload: { user, tokens },
});

export const loginFailure = (error: string) => ({
  type: AUTH_ACTIONS.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT,
});

interface LoginSuccessAction {
  type: typeof AUTH_ACTIONS.LOGIN_SUCCESS;
  payload: {
    tokens: AuthToken;
    user: User;
  };
}

interface LogoutAction {
  type: typeof AUTH_ACTIONS.LOGOUT;
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction; 
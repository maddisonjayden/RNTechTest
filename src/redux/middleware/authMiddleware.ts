import { Middleware } from 'redux';
import { AUTH_ACTIONS, AuthActionTypes } from '../actions/authActions';
import { authService } from '../../services/authService';

export const authMiddleware: Middleware = () => (next) => (action: any): any => {
  if ((action as AuthActionTypes).type) {
    switch (action.type) {
      case AUTH_ACTIONS.LOGIN_SUCCESS:
        authService.setTokens(action.payload.tokens);
        authService.setUser(action.payload.user);
        break;
      case AUTH_ACTIONS.LOGOUT:
        authService.clearAuth();
        break;
    }
  }
  return next(action);
}; 
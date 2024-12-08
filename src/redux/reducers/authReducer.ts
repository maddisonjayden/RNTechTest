import { AuthState } from '../../types/auth';
import { AUTH_ACTIONS } from '../actions/authActions';
import { authService } from '../../services/authService';

const initialState: AuthState = {
  user: authService.getUser(),
  tokens: authService.getTokens(),
  isLoggedIn: !!authService.getTokens(),
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      authService.setTokens(action.payload.tokens);
      authService.setUser(action.payload.user);
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      authService.clearAuth();
      return initialState;
    default:
      return state;
  }
};

export default authReducer; 
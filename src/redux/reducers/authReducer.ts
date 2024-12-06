import { AuthState } from '../../types/auth';
import { AUTH_ACTIONS } from '../actions/authActions';

const initialState: AuthState = {
  user: null,
  tokens: null,
  isLoggedIn: false,
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
      return initialState;
    default:
      return state;
  }
};

export default authReducer; 
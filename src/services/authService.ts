import { MMKV } from 'react-native-mmkv';
import { AuthToken, User } from '../types/auth';

const storage = new MMKV();
const AUTH_TOKENS_KEY = 'auth_tokens';
const USER_KEY = 'user';

class AuthService {
  setTokens(tokens: AuthToken) {
    storage.set(AUTH_TOKENS_KEY, JSON.stringify(tokens));
  }

  getTokens(): AuthToken | null {
    const tokens = storage.getString(AUTH_TOKENS_KEY);
    return tokens ? JSON.parse(tokens) : null;
  }

  setUser(user: User) {
    storage.set(USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = storage.getString(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  clearAuth() {
    storage.delete(AUTH_TOKENS_KEY);
    storage.delete(USER_KEY);
  }

  isTokenExpired(token: AuthToken): boolean {
    return Date.now() >= token.expiresIn;
  }
}

export const authService = new AuthService(); 
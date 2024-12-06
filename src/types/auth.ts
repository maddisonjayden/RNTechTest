export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: number;
  name: string;
  emailAddress: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthToken | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
} 
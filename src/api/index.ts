import { MMKV } from 'react-native-mmkv';
import { AuthToken, User } from '@/types/auth';
import logger from './logger';

const storage = new MMKV();
const MOCK_ACCOUNT_KEY = 'mock_account';

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

const getMockAccount = (): Account | null => {
  const account = storage.getString(MOCK_ACCOUNT_KEY);
  return account ? JSON.parse(account) : null;
};

const setMockAccount = (account: Account | null) => {
  if (account) {
    storage.set(MOCK_ACCOUNT_KEY, JSON.stringify(account));
  } else {
    storage.delete(MOCK_ACCOUNT_KEY);
  }
};

interface LoginResponse {
  tokens: AuthToken;
  user: User;
}

export const login = async (): Promise<LoginResponse> => {
  await sleep(1000);
  return {
    tokens: {
      accessToken: 'mock-access-token-123',
      refreshToken: 'mock-refresh-token-456',
      expiresIn: Date.now() + 3600000
    },
    user: {
      id: 1,
      name: 'Joe Davis',
      emailAddress: 'joe@test.com'
    }
  };
};

type Account = {
  status: 'pending' | 'completed';
  balance: number;
  version: 'v1' | 'v2';
  createdAt: null | number;
};

export const createAccount = async () => {
  try {
    await sleep(500);
    const account: Account = {
      status: 'pending' as const,
      balance: 0,
      version: 'v1',
      createdAt: Date.now(),
    };
    setMockAccount(account);
    return account;
  } catch (e: any) {
    logger.error(e);
    throw new Error('Failed to create account');
  }
};

export const resetAccount = async () => {
  setMockAccount(null);
};

export const getAccount = async (
  getNewerAccountVersion?: boolean,
): Promise<Account | null> => {
  try {
    await sleep(500);
    const mockAccount = getMockAccount();

    if (!mockAccount) {
      return null;
    }

    const createdTime = mockAccount.createdAt || Date.now();

    // Simulate status update to "completed" after 10 seconds
    if (mockAccount.status === 'pending' && Date.now() - createdTime > 10000) {
      const updatedAccount: Account = {
        ...mockAccount,
        status: 'completed' as const,
        balance: mockAccount.balance + 100,
      };
      setMockAccount(updatedAccount);
      return updatedAccount;
    }

    if (mockAccount.status === 'completed') {
      const updatedAccount = {
        ...mockAccount,
        balance: mockAccount.balance + 100,
      };
      setMockAccount(updatedAccount);
      return updatedAccount;
    }

    return mockAccount;
  } catch (e: any) {
    console.error(e);
    throw new Error('Failed to retrieve account');
  }
};

import logger from './logger';

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async () => {
  try {
    // Simulate a delay of 1000ms
    await sleep(1000);
    return {
      id: 1,
      name: 'Joe Davis',
      emailAddress: 'joe@test.com',
    };
  } catch (e: any) {
    logger.error(e);
  }
};

type Account = {
  status: 'pending' | 'completed';
  balance: number;
  version: 'v1' | 'v2';
  createdAt: null | number;
};

let mockAccount: Account | null = null;

export const createAccount = async () => {
  try {
    await sleep(500);
    mockAccount = {
      status: 'pending',
      balance: 0,
      version: 'v1',
      createdAt: Date.now(),
    };
    return mockAccount;
  } catch (e: any) {
    logger.error(e);
    throw new Error('Failed to create account');
  }
};

export const resetAccount = async () => {
  mockAccount = null;
};

export const getAccount = async (
  getNewerAccountVersion?: boolean,
): Promise<Account | null> => {
  try {
    await sleep(500);

    if (!mockAccount) {
      throw new Error('Account not found');
    }

    const createdTime = mockAccount?.createdAt || Date.now();

    // Simulate status update to "completed" after 10 seconds
    if (mockAccount.status === 'pending' && Date.now() - createdTime > 10000) {
      mockAccount.status = 'completed';
    }
    if (mockAccount.status === 'completed') {
      mockAccount.balance = mockAccount?.balance + 100;
    }

    return {
      ...mockAccount,
      version: getNewerAccountVersion ? 'v2' : mockAccount?.version,
    };
  } catch (e: any) {
    logger.error(e);
    throw new Error('Failed to retrieve account');
  }
};

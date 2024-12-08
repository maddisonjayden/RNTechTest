import { useQuery } from '@tanstack/react-query';

import { getAccount } from '@/api';

interface Account {
  status: 'pending' | 'completed';
  balance?: number;
}

const useAccount = () => {
  const queryFn = async (): Promise<Account | null> => {
    try {
      const account = await getAccount();
      return account;
    } catch (e: unknown) {
      throw e;
    }
  };

  return useQuery<Account | null, Error>({
    queryFn,
    queryKey: ['account'],
    refetchInterval: (query) => {
      return query.state.data?.status === 'completed' ? false : 2000;
    },
    refetchIntervalInBackground: false,
    staleTime: 0,
  });
};

export default useAccount;

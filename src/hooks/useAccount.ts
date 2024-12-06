import { useQuery } from '@tanstack/react-query';

import { getAccount } from '@/api';
import { queryClient } from '@/App';

const useAccount = () => {
  const queryFn = async () => {
    const account = await getAccount();
    return account;
  };

  const invalidateAccountQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['account'] });
  };

  return {
    invalidateAccountQuery,
    ...useQuery({
      queryFn,
      queryKey: ['account'],
      refetchInterval: 2000,
      refetchIntervalInBackground: false,
      staleTime: 0,
    }),
  };
};

export default useAccount;

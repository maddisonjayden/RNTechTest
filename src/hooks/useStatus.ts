import { useState } from 'react';

type Status = 'idle' | 'loading' | 'error' | 'success';
type StatusState = {
  status: Status;
  /**
   * The data here is the data related to the status.
   * When the status is "error" we have any infos related to this error in this data and ...etc.
   */
  data?: any | null;
};

export function useStatus(
  defaultStatus: StatusState = { status: 'idle', data: null },
) {
  const [state, setState] = useState<StatusState>(defaultStatus);

  return { ...state, setStatus: setState };
}

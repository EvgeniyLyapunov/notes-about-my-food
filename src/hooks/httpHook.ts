import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [process, setProcess] = useState('waiting');

  const request = useCallback(
    async <T>(
      url: string,
      method = 'GET',
      body = null,
      headers = { 'Content-type': 'application/json' }
    ): Promise<T> => {
      setProcess('loading');

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (ex) {
        setProcess('error');
        throw ex;
      }
    },
    // eslint-disable-next-line
    []
  );

  const clearError = useCallback(() => {
    setProcess('loading');
    // eslint-disable-next-line
  }, []);

  return { request, clearError, process, setProcess };
};

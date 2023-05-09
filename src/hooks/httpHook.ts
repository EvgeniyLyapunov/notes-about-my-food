export const useHttp = () => {
  const request = async <T>(
    url: string,
    method = 'GET',
    body: string | null = null,
    headers = { 'Content-type': 'application/json' }
  ): Promise<T> => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (ex) {
      throw ex;
    }
  };
  return { request };
};

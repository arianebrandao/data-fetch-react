import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

// tipado como generic T
export function useApi<T = unknown>(url: string, options?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    axios
      .get(url, options)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setFetchError(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return { data, isFetching, fetchError };
}

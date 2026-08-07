"use client";

import { useCallback, useEffect, useState } from "react";

interface UseFetchOptions<T> {
  onError?: (error: unknown) => void;
  enabled?: boolean;
  transform?: (data: unknown) => T;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
  options: UseFetchOptions<T> = {}
) {
  const { onError, enabled = true, transform } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let active = true;

    fetcher()
      .then((result) => {
        if (!active) return;
        setData(transform ? transform(result) : result);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
        onError?.(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, tick, ...deps]);

  const reload = useCallback(() => {
    setLoading(true);
    setTick((t) => t + 1);
  }, []);

  return { data, loading, error, reload, setData };
}

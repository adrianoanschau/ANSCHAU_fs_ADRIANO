import { useEffect, useState } from "react";
import dataMapper from "../helpers/dataMapper";
import { useFetch } from "./useFetch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApi<T, D extends Record<string, any>>(
  type: string,
  method: "GET" | "POST" | "DELETE" = "GET",
  path: string,
) {
  const [url, setUrl] = useState<string>();
  const [body, setBody] = useState<D>();
  const { data: apiResponse, error } = useFetch<ApiDataResponse<T>>(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const [payload, setPayload] = useState<T>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) return;
    if (!apiResponse) return;
    if (!apiResponse.data) return;
    if (apiResponse.type !== type) return;

    setPayload(dataMapper<T>(apiResponse));
    setLoading(false);
    setBody(undefined);
    setUrl(undefined);
  }, [apiResponse, error, type]);

  useEffect(() => {
    if (!error) return;

    setLoading(false);
  }, [error]);

  const fetch = (data?: D, newPath?: string) => {
    if (method === "POST") {
      setBody(data);
    }

    setLoading(true);
    setUrl(newPath ?? path);
  };

  return { data: payload, error, loading, fetch };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApiGet<T, D extends Record<string, string | number> = any>(
  type: string,
  path: string,
) {
  return useApi<T, D>(type, "GET", path);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApiPost<T, D extends Record<string, any> = any>(
  type: string,
  path: string,
) {
  return useApi<T, D>(type, "POST", path);
}

export function useApiDelete<
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  D extends Record<string, string | number> = any,
>(type: string, path: string) {
  const { fetch, ...api } = useApi<T, D>(type, "DELETE", path);

  const handleFetch = (data: D) => {
    const newPath = Object.entries(data).reduce((acc, [key, value]) => {
      return acc.replace(`{${key}}`, `${value}`);
    }, path);

    fetch(data, newPath);
  };

  return { ...api, fetch: handleFetch };
}

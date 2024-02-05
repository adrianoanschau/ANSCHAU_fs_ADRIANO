import { useEffect, useState } from "react";
import dataMapper from "../helpers/dataMapper";
import { useFetch } from "./useFetch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApi<T, D = any>(
  type: string,
  method: "GET" | "POST" = "GET",
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

  const fetch = (data?: D) => {
    setLoading(true);
    setBody(data);
    setUrl(path);
  };

  return { data: payload, error, loading, fetch };
}

export function useApiGet<T>(type: string, path: string) {
  return useApi<T>(type, "GET", path);
}

export function useApiPost<T, D>(type: string, path: string) {
  return useApi<T, D>(type, "POST", path);
}

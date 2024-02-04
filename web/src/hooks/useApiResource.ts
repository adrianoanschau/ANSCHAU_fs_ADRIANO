import { useFetch } from "usehooks-ts";
import { useEffect, useState } from "react";
import ApiDataMapper from "../helpers/ApiDataMapper";

export function useApiResource<T>(type: string, path: string) {
  const { data: apiResponse, error } = useFetch<ApiDataResponse<T>>(
    `/api/${path}`,
  );
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (error) return;
    if (!apiResponse) return;
    if (!apiResponse.data) return;
    if (apiResponse.type !== type) return;

    setData(ApiDataMapper<T>(apiResponse));
    setLoading(false);
  }, [apiResponse, error, type]);

  useEffect(() => {
    if (!error) return;

    setLoading(false);
  }, [error]);

  return { data, error, loading };
}

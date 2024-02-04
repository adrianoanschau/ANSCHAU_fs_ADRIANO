import { useFetch } from "usehooks-ts";
import { useEffect, useState } from "react";
import ApiDataMapper from "../helpers/ApiDataMapper";

export function useApiResource<T>(type: string, path: string) {
  const { data: apiResponse, error } = useFetch<ApiDataResponse<T>>(
    `/api/${path}`,
  );
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (error) return;
    if (!apiResponse) return;
    if (!apiResponse.data) return;
    if (apiResponse.type !== type) return;

    setData(ApiDataMapper<T>(apiResponse));
  }, [apiResponse, error, type]);

  return data;
}

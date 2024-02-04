import { useFetch } from "usehooks-ts";
import { useEffect, useState } from "react";
import ApiDataMapper from "../helpers/ApiDataMapper";

function buildUrl(
  path: string,
  searchParams: Record<string, string | number> = {},
) {
  const transformedSearchParams = Object.entries(searchParams).reduce(
    (acc, [key, value]) => {
      acc[key] = `${value}`;

      return acc;
    },
    {} as Record<string, string>,
  );
  const search = new URLSearchParams(transformedSearchParams).toString();

  return `/api/${path.replace(/^\//, "")}?${search}`;
}

export function useApiResource<T>(
  type: string,
  path: string,
  searchParams?: Record<string, string | number>,
) {
  const { data: apiResponse, error } = useFetch<ApiDataResponse<T>>(
    buildUrl(path, searchParams),
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

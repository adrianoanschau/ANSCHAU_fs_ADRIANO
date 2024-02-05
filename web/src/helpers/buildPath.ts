export function buildPath(
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

  return `/${path.replace(/^\//, "")}?${search}`;
}

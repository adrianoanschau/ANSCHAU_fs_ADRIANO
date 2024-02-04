function ProductEntityMapper(data: ProductOfCatalog) {
  return {
    id: data.id,
    name: data.name,
    brand: "Brand 1",
    price: 149,
    oldPrice: 199,
  } as LegacyProductEntity;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mappers: Record<string, (data: any) => any> = {
  "legacy-products": ProductEntityMapper,
};

export default function ApiDataMapper<T>(apiDataResponse: ApiDataResponse<T>) {
  if (!Object.keys(mappers).includes(apiDataResponse.type))
    return apiDataResponse.data;

  const mapper = mappers[apiDataResponse.type];

  if (Array.isArray(apiDataResponse.data)) {
    return apiDataResponse.data.map((value) => mapper(value)) as T;
  }

  return mapper(apiDataResponse.data) as T;
}

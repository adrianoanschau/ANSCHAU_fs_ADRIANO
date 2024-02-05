function legacyProductsMapper(data: ApiCatalogProduct) {
  return {
    id: data.id,
    name: data.name,
    brand: data.brand,
    price: data.price,
    oldPrice: data.oldPrice,
  } as LegacyProductEntity;
}

function productsMapper(data: ApiProduct) {
  return {
    id: data.id,
    name: data.name,
    price: data.price,
    quantity: data.quantity,
  } as OrderProductEntity;
}

function ordersMapper(data: ApiOrder) {
  return {
    id: data.id,
    products: data.products.map((value) => productsMapper(value)),
  } as OrderEntity;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mappers: Record<string, (data: any) => any> = {
  "legacy-products": legacyProductsMapper,
  orders: ordersMapper,
};

export default function dataMapper<T>(apiDataResponse: ApiDataResponse<T>) {
  if (!Object.keys(mappers).includes(apiDataResponse.type))
    return apiDataResponse.data;

  const mapper = mappers[apiDataResponse.type];

  if (Array.isArray(apiDataResponse.data)) {
    return apiDataResponse.data.map((value) => mapper(value)) as T;
  }

  return mapper(apiDataResponse.data) as T;
}

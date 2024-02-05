type ApiDataResponse<T> = {
  type: string;
  message: string;
  data: T;
};

type ApiCatalogProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice: number;
  suppliers: number[];
};

type ApiProduct = {
  id: string;
  name: string;
  externalId: number;
  price: number;
  quantity: number;
};

type ApiOrder = {
  id: string;
  products: Array<ApiProduct>;
};

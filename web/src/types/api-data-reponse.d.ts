type ApiDataResponse<T> = {
  type: string;
  message: string;
  data: T;
};

type ApiCatalogProduct = {
  id: string;
  name: string;
  suppliers: number[];
};

type ApiProduct = {
  id: string;
  name: string;
  externalId: number;
};

type ApiOrder = {
  id: string;
  products: Array<ApiProduct>;
};

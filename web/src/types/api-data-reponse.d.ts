type ApiDataResponse<T> = {
  type: string;
  message: string;
  data: T;
};

type ProductOfCatalog = {
  id: string;
  name: string;
  suppliers: number[];
};

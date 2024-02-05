type LegacyProductEntity = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice: number;
};

type ProductEntity = {
  id: string;
  name: string;
};

type OrderEntity = {
  id: string;
  products: Array<ProductEntity>;
};

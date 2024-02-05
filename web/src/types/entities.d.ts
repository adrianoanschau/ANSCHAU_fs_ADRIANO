type LegacyProductEntity = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice: number;
};

type OrderProductEntity = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type OrderEntity = {
  id: string;
  products: Array<OrderProductEntity>;
};

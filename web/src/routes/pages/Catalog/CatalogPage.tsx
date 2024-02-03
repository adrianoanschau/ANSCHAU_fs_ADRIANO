import { ProductEntity } from "../../../types/ProductEntity";
import ProductCardList from "./components/ProductCardList";

const products: Array<ProductEntity> = [
  {
    id: "1",
    name: "Product 1",
    brand: "Brand 1",
    price: 149,
    oldPrice: 199,
  },
  {
    id: "2",
    name: "Product 2",
    brand: "Brand 2",
    price: 149,
    oldPrice: 199,
  },
  {
    id: "3",
    name: "Product 3",
    brand: "Brand 3",
    price: 149,
    oldPrice: 199,
  },
];

export default function CatalogPage() {
  return (
    <section id="catalog">
      <div className="p-2 text-center">
        <h1 className="mb-4 text-4xl font-bold">Catalog</h1>
        <h4 className="text-2xl">Products List</h4>
      </div>
      <ProductCardList products={products} />
    </section>
  );
}

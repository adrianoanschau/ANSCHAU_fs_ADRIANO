import ProductCardList from "./components/ProductCardList";
import { useApiResource } from "../../../hooks/useApiResource";

export default function CatalogPage() {
  const products = useApiResource<Array<LegacyProductEntity>>(
    "legacy-products",
    "/catalog?page=1",
  );

  return (
    <section id="catalog">
      <div className="p-2 text-center">
        <h1 className="mb-4 text-4xl font-bold">Catalog</h1>
        <h4 className="text-2xl">Products List</h4>
      </div>
      {products && <ProductCardList products={products} />}
    </section>
  );
}

import ProductCardList from "./components/ProductCardList";
import { useApiResource } from "../../../hooks/useApiResource";
import SpinnerIcon from "../../../components/icons/SpinnerIcon";

export default function CatalogPage() {
  const { data: products, loading } = useApiResource<
    Array<LegacyProductEntity>
  >("legacy-products", "/catalog?page=1");

  return (
    <section id="catalog">
      <div className="p-2 text-center">
        <h1 className="mb-4 text-4xl font-bold">Catalog</h1>
        <h4 className="text-2xl">Products List</h4>
      </div>
      <div className="m-5 text-center">
        {loading && <SpinnerIcon />}
        {!loading && products && <ProductCardList products={products} />}
      </div>
    </section>
  );
}

import ProductCardList from "./components/ProductCardList";
import SpinnerIcon from "../../../components/icons/SpinnerIcon";
import Page from "../../../components/layout/Page";
import { useCartContext } from "../../../contexts/cart";
import { useCatalogContext } from "../../../contexts/catalog";

export default function CatalogPage() {
  const { products, loading, newPageRequested, hasMorePages, onLoadMore } =
    useCatalogContext();
  const { addItemToCart } = useCartContext();

  const handleAddProductToCart = (product: LegacyProductEntity) => {
    addItemToCart(product);
  };

  return (
    <Page id="catalog" title="Catalog" subtitle="Products List">
      <div className="m-5 flex justify-center text-center">
        {(loading || newPageRequested) && (
          <div className="fixed rounded-xl bg-slate-50/[.9] px-40 py-20">
            <SpinnerIcon size={20} />
          </div>
        )}
        {!loading && (
          <div>
            <ProductCardList
              products={products}
              onAddProductToCart={handleAddProductToCart}
            />
            <button
              type="button"
              disabled={!hasMorePages}
              className={[
                "text-md mb-2 me-2 rounded-lg border bg-teal-100 px-5 py-2.5 font-medium text-teal-700 focus:outline-none focus:ring-4 focus:ring-blue-300",
                !hasMorePages && "disabled:opacity-0",
                hasMorePages && "hover:bg-teal-200",
              ].join(" ")}
              onClick={onLoadMore}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </Page>
  );
}

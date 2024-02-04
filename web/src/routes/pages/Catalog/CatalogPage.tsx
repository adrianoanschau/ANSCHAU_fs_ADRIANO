import { useEffect, useState } from "react";
import ProductCardList from "./components/ProductCardList";
import { useApiResource } from "../../../hooks/useApiResource";
import SpinnerIcon from "../../../components/icons/SpinnerIcon";
import Page from "../../../components/layout/Page";

export default function CatalogPage() {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const { data, error, loading } = useApiResource<Array<LegacyProductEntity>>(
    "legacy-products",
    "/catalog",
    { page, limit: itemsPerPage },
  );
  const [products, setProducts] = useState<Array<LegacyProductEntity>>([]);
  const [newPageRequested, setNewPageRequested] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    if (error || !data) return;

    setNewPageRequested(false);
    setProducts((prevState) =>
      prevState.concat(
        data.filter(({ id }) => !prevState.map(({ id }) => id).includes(id)),
      ),
    );
    if (data.length < itemsPerPage) {
      setHasMorePages(false);
    }
  }, [data, error]);

  const handleLoadMore = () => {
    if (!hasMorePages) return;
    setNewPageRequested(true);
    setPage(page + 1);
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
            <ProductCardList products={products} />
            <button
              type="button"
              disabled={!hasMorePages}
              className={[
                "mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300",
                !hasMorePages && "disabled:opacity-50",
                hasMorePages && "hover:bg-blue-800",
              ].join(" ")}
              onClick={handleLoadMore}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </Page>
  );
}

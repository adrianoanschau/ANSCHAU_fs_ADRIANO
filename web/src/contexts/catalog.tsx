import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApiGet } from "../hooks/api";
import { buildPath } from "../helpers/buildPath";

type CatalogContextProps = {
  products: Array<LegacyProductEntity>;
  loading: boolean;
  newPageRequested: boolean;
  hasMorePages: boolean;
  onLoadCatalog: () => void;
  onLoadMore: () => void;
};

const initialContextState: CatalogContextProps = {
  products: [],
  loading: true,
  newPageRequested: false,
  hasMorePages: true,
  onLoadCatalog: () => {},
  onLoadMore: () => {},
};

const CatalogContext = createContext(initialContextState);

function CatalogContextProvider({ children }: PropsWithChildren) {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const catalog = useApiGet<Array<LegacyProductEntity>>(
    "legacy-products",
    buildPath("/api/catalog", { page, limit: itemsPerPage }),
  );
  const [products, setProducts] = useState<Array<LegacyProductEntity>>([]);
  const [newPageRequested, setNewPageRequested] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    if (catalog.error || !catalog.data) return;

    setNewPageRequested(false);
    setProducts((prevState) =>
      prevState.concat(
        catalog.data?.filter(
          ({ id }) => !prevState.map(({ id }) => id).includes(id),
        ) ?? [],
      ),
    );
    if (catalog.data.length < itemsPerPage) {
      setHasMorePages(false);
    }
  }, [catalog.data, catalog.error]);

  const handleLoadMore = () => {
    if (!hasMorePages) return;
    setNewPageRequested(true);
    setPage(page + 1);
  };

  const handleLoadCatalog = () => {
    catalog.fetch();
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        loading: catalog.loading,
        newPageRequested,
        hasMorePages,
        onLoadMore: handleLoadMore,
        onLoadCatalog: handleLoadCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

function useCatalogContext() {
  return useContext(CatalogContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { CatalogContextProvider, useCatalogContext };

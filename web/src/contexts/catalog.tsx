import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApiResource } from "../hooks/useApiResource";

type CatalogContextProps = {
  products: Array<LegacyProductEntity>;
  loading: boolean;
  newPageRequested: boolean;
  hasMorePages: boolean;
  onLoadMore: () => void;
};

const initialContextState: CatalogContextProps = {
  products: [],
  loading: true,
  newPageRequested: false,
  hasMorePages: true,
  onLoadMore: () => {},
};

const CatalogContext = createContext(initialContextState);

function CatalogContextProvider({ children }: PropsWithChildren) {
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
    <CatalogContext.Provider
      value={{
        products,
        loading,
        newPageRequested,
        hasMorePages,
        onLoadMore: handleLoadMore,
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

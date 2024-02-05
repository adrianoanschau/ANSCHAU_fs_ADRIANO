import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useCartContext } from "./cart";
import { useApiDelete, useApiGet, useApiPost } from "@/hooks/api";
import { buildPath } from "@/helpers/buildPath";

type OrdersContextProps = {
  listing: {
    fetching: boolean;
    data?: Array<OrderEntity>;
  };
  creating: {
    fetching: boolean;
  };
  deleting: {
    fetching: boolean;
  };
  onLoadOrders: () => void;
  onCreateOrder: () => void;
  onDeleteOrder: (id: string) => void;
};

const initialContextState: OrdersContextProps = {
  listing: {
    fetching: false,
  },
  creating: {
    fetching: false,
  },
  deleting: {
    fetching: false,
  },
  onLoadOrders: () => {},
  onCreateOrder: () => {},
  onDeleteOrder: () => {},
};

const OrdersContext = createContext(initialContextState);

function OrdersContextProvider({ children }: PropsWithChildren) {
  const { cart, resetCart } = useCartContext();
  const listing = useApiGet<Array<OrderEntity>>(
    "orders",
    buildPath("/api/orders"),
  );
  const creating = useApiPost<LegacyProductEntity, CreateOrderDTO>(
    "orders",
    buildPath("/api/orders"),
  );
  const deleting = useApiDelete<object, { id: string }>(
    "orders",
    buildPath("/api/orders/{id}"),
  );

  const handleLoadOrders = () => {
    listing.fetch();
  };

  const handleCreateOrder = () => {
    creating.fetch({
      products: cart.map(({ item, quantity }) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
      })),
    });
    resetCart();
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm("Do you really want to delete this order?")) {
      deleting.fetch({ id });
    }
  };

  useEffect(() => {
    if (!deleting.message) return;

    handleLoadOrders();
    deleting.resetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleting.message]);

  return (
    <OrdersContext.Provider
      value={{
        listing,
        creating,
        deleting,
        onCreateOrder: handleCreateOrder,
        onLoadOrders: handleLoadOrders,
        onDeleteOrder: handleDeleteOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

function useOrdersContext() {
  return useContext(OrdersContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { OrdersContextProvider, useOrdersContext };

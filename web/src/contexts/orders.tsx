import { PropsWithChildren, createContext, useContext } from "react";
import { useCartContext } from "./cart";
import { useApiGet, useApiPost } from "../hooks/api";
import { buildPath } from "../helpers/buildPath";

type OrdersContextProps = {
  listing: {
    loading: boolean;
    data?: Array<OrderEntity>;
  };
  creating: {
    loading: boolean;
  };
  onLoadOrders: () => void;
  onCreateOrder: () => void;
  onDeleteOrder: () => void;
};

const initialContextState: OrdersContextProps = {
  listing: {
    loading: false,
  },
  creating: {
    loading: false,
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

  const handleLoadOrders = () => {
    listing.fetch();
  };

  const handleCreateOrder = () => {
    creating.fetch({
      products: cart.map(({ item }) => ({
        id: item.id,
        name: item.name,
      })),
    });
    resetCart();
  };

  const handleDeleteOrder = () => {};

  return (
    <OrdersContext.Provider
      value={{
        listing,
        creating,
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

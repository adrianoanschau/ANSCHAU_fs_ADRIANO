import { PropsWithChildren, createContext, useContext } from "react";
import { useCartContext } from "./cart";
import { useApiPost } from "../hooks/api";
import { buildPath } from "../helpers/buildPath";

type OrdersContextProps = {
  loading: boolean;
  onCreateOrder: () => void;
};

const initialContextState: OrdersContextProps = {
  loading: false,
  onCreateOrder: () => {},
};

const OrdersContext = createContext(initialContextState);

function OrdersContextProvider({ children }: PropsWithChildren) {
  const { cart, resetCart } = useCartContext();
  const { loading, fetch: createOrder } = useApiPost<
    LegacyProductEntity,
    CreateOrderDTO
  >("orders", buildPath("/api/orders"));

  const handleCreateOrder = () => {
    createOrder({
      products: cart.map(({ item }) => ({
        id: item.id,
        name: item.name,
      })),
    });
    resetCart();
  };

  return (
    <OrdersContext.Provider
      value={{ loading, onCreateOrder: handleCreateOrder }}
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

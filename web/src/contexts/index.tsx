import { PropsWithChildren } from "react";
import { CartContextProvider } from "./cart";
import { CatalogContextProvider } from "./catalog";
import { OrdersContextProvider } from "./orders";

export default function AppContextProvider({ children }: PropsWithChildren) {
  return (
    <CartContextProvider>
      <CatalogContextProvider>
        <OrdersContextProvider>{children}</OrdersContextProvider>
      </CatalogContextProvider>
    </CartContextProvider>
  );
}

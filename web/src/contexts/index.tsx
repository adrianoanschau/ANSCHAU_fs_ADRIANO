import { PropsWithChildren } from "react";
import { CartContextProvider } from "./cart";
import { CatalogContextProvider } from "./catalog";

export default function AppContextProvider({ children }: PropsWithChildren) {
  return (
    <CartContextProvider>
      <CatalogContextProvider>{children}</CatalogContextProvider>
    </CartContextProvider>
  );
}

import { PropsWithChildren } from "react";
import { CartContextProvider } from "./cart";

export default function AppContextProvider({ children }: PropsWithChildren) {
  return <CartContextProvider>{children}</CartContextProvider>;
}

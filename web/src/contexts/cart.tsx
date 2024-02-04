import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartProps = {
  item: LegacyProductEntity;
  quantity: number;
};

type CartContextProps = {
  cart: Array<CartProps>;
  addItemToCart: (item: LegacyProductEntity) => void;
  removeItemFromCart: (item: LegacyProductEntity) => void;
  resetCart: () => void;
};

const initialContextState: CartContextProps = {
  cart: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  resetCart: () => {},
};

const CartContext = createContext(initialContextState);

function CartContextProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Array<CartProps>>([]);

  const addItemToCart = (item: LegacyProductEntity) => {
    setCart((prevState) => prevState.concat({ item, quantity: 1 }));
  };
  const removeItemFromCart = (item: LegacyProductEntity) => {
    setCart((prevState) =>
      prevState.filter((cartItem) => cartItem.item.id !== item.id),
    );
  };
  const resetCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCartContext() {
  return useContext(CartContext);
}

export { CartContextProvider, useCartContext };

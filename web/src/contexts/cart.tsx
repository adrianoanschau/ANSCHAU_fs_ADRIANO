import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartProps = {
  item: LegacyProductEntity;
  quantity: number;
};

type CartContextProps = {
  cart: Array<CartProps>;
  addItemToCart: (item: LegacyProductEntity, quantity?: number) => void;
  removeItemFromCart: (
    item: LegacyProductEntity,
    quantity?: number | null,
  ) => void;
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

  const addItemToCart = (item: LegacyProductEntity, quantity = 1) => {
    setCart((prevState) => {
      const itemExist = prevState.find(({ item: { id } }) => id === item.id);

      if (!itemExist) {
        return prevState.concat({ item, quantity });
      }

      return prevState.map((cartItem) => {
        if (cartItem.item.id === item.id) {
          cartItem.quantity += quantity;
        }

        return cartItem;
      });
    });
  };

  const removeItemFromCart = (
    item: LegacyProductEntity,
    quantity: number | null = null,
  ) => {
    setCart((prevState) => {
      if (quantity === null)
        return prevState.filter((cartItem) => cartItem.item.id !== item.id);

      return prevState
        .map((cartItem) => {
          if (cartItem.item.id === item.id) {
            cartItem.quantity -= quantity;
          }

          return cartItem;
        })
        .filter(({ quantity }) => quantity > 0);
    });
  };

  const resetCart = () => setCart([]);

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

// eslint-disable-next-line react-refresh/only-export-components
export { CartContextProvider, useCartContext };

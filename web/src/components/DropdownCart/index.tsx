import { useEffect, useRef, useState } from "react";
import CartIcon from "../icons/CartIcon";
import { useCartContext } from "../../contexts/cart";
import ItemCartControls from "./ItemCartControls";
import CartResetControls from "./CartRestControls";

export default function DropdownCart() {
  const { cart, addItemToCart, removeItemFromCart, resetCart } =
    useCartContext();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(!cart.length);
  const containerRef = useRef(null);

  useEffect(() => {
    if (cartEmpty && cart.length > 0) {
      setShowCartDropdown(true);
    }
    setCartEmpty(!cart.length);
  }, [cart, cartEmpty]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="relative inline-flex items-center rounded-lg p-3 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300"
        onClick={() => setShowCartDropdown(!showCartDropdown)}
      >
        <CartIcon color="white" />
        {cart.length > 0 && (
          <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
            {cart.length}
          </div>
        )}
      </button>

      <div
        className={[
          "absolute right-0 z-10 w-80 divide-y divide-gray-100 rounded-lg bg-white shadow",
          !showCartDropdown && "hidden",
        ].join(" ")}
      >
        <ul
          className=" py-2 text-sm text-gray-700"
          aria-labelledby="dropdownDefaultButton"
        >
          {cart.length < 1 && <li className="p-4">Your cart is empty</li>}
          {cart.map(({ item, quantity }) => (
            <li key={item.id} className="flex items-center border-b">
              <div className="text-md flex w-full flex-col justify-center p-4 hover:bg-gray-100">
                <div>
                  <span>{item.name}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <div>{quantity}</div>
                  <div className="flex justify-end">
                    <ItemCartControls
                      onIncreaseItem={() => addItemToCart(item, 1)}
                      onDecreaseItem={() => removeItemFromCart(item, 1)}
                      onRemoveItem={() => removeItemFromCart(item)}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
          {!!cart.length && (
            <li className="flex justify-end border-t p-4">
              <CartResetControls onReset={() => resetCart()} />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

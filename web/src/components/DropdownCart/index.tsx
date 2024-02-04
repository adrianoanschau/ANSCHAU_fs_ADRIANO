import { useEffect, useRef, useState } from "react";
import CartIcon from "../icons/CartIcon";
import { useCartContext } from "../../contexts/cart";
import { useOnClickOutside } from "usehooks-ts";

export default function DropdownCart() {
  const { cart } = useCartContext();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(!cart.length);
  const containerRef = useRef(null);

  useEffect(() => {
    if (cartEmpty && cart.length > 0) {
      setShowCartDropdown(true);
    }
    setCartEmpty(!cart.length);
  }, [cart, cartEmpty]);

  const handleClickOutside = () => {
    setShowCartDropdown(false);
  };

  useOnClickOutside(containerRef, handleClickOutside);

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
          "absolute right-0 z-10 w-60 divide-y divide-gray-100 rounded-lg bg-white shadow",
          !showCartDropdown && "hidden",
        ].join(" ")}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {cart.map(({ item, quantity }) => (
            <li key={item.id}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                <span>{item.name}</span> <span>{quantity}</span>
              </a>
            </li>
          ))}
          <li className="border-t-2">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Cart
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import CartIcon from "../icons/CartIcon";
import { useCartContext } from "../../contexts/cart";

export default function DesktopNav() {
  const { cart } = useCartContext();

  return (
    <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
      <div className="text-sm lg:flex-grow">
        <Link
          to="catalog"
          className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
        >
          Catalog
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="relative inline-flex items-center rounded-lg p-3 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
          <CartIcon color="white" />
          {cart.length > 0 && (
            <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
              {cart.length}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

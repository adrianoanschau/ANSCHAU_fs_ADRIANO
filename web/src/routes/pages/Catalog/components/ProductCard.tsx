import CartIcon from "@/components/icons/CartIcon";

type ProductCardProps = {
  product: LegacyProductEntity;
  onAddToCart: () => void;
};

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const { name, brand, price, oldPrice } = product;

  return (
    <div className="w-72 rounded-xl bg-white shadow-md duration-500 hover:shadow-2xl">
      <div className="border-b-2 border-neutral-100 px-6 py-3">
        <span className="mr-3 text-xs uppercase text-gray-400">{brand}</span>
      </div>
      <div className="mb-5 mt-2 flex flex-col items-center justify-center">
        <p className="block truncate text-lg font-bold capitalize text-black">
          {name}
        </p>
        <div className="mt-5 flex flex-col items-center">
          <del>
            <p className="text-sm text-gray-600">${oldPrice}</p>
          </del>
          <p className="text-2xl font-semibold text-red-700">${price}</p>
        </div>
      </div>
      <div className="flex justify-center border-t-2 border-neutral-100 px-6 py-3">
        <button
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="flex justify-between rounded bg-teal-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-teal-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-teal-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-teal-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          onClick={() => onAddToCart()}
        >
          <div className="mr-2">
            <CartIcon />
          </div>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}

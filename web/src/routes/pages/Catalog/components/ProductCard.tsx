import CartIcon from "../../../../components/icons/CartIcon";

type ProductCardProps = {
  product: LegacyProductEntity;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { name, brand, price, oldPrice } = product;

  return (
    <div className="w-72 rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <div className="w-72 px-4 py-3">
          <span className="mr-3 text-xs uppercase text-gray-400">{brand}</span>
          <p className="block truncate text-lg font-bold capitalize text-black">
            {name}
          </p>
          <div className="flex items-center">
            <p className="my-3 cursor-auto text-lg font-semibold text-black">
              ${price}
            </p>
            <del>
              <p className="ml-2 cursor-auto text-sm text-gray-600">
                ${oldPrice}
              </p>
            </del>
            <div className="ml-auto">
              <CartIcon />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

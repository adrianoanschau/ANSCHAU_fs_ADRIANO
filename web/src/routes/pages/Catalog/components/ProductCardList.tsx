import { ProductEntity } from "../../../../types/ProductEntity";
import ProductCard from "./ProductCard";

type ProductCardListProps = {
  products: Array<ProductEntity>;
};

export default function ProductCardList({ products }: ProductCardListProps) {
  return (
    <div className="mx-auto mb-5 mt-10 grid w-fit grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

// Best Sellers is a manual curation for now — there's no order data to
// calculate real sales rankings without a backend. Edit this array of
// product ids to control which items show here.
const bestSellerIds = ["2", "1"];
const bestSellers = products.filter((p) => bestSellerIds.includes(p.id));

export function BestSellers() {
  return (
    <div className="container-abfk py-12">
      <h1 className="text-3xl sm:text-4xl mb-8">Best Sellers</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
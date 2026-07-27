import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

// "New" is defined here as the last 3 products added to the data file.
// Once there are enough real products with real dates, swap this for
// a proper `dateAdded` field sorted descending.
const newArrivals = products.slice(-3);

export function NewArrivals() {
  return (
    <div className="container-abfk py-12">
      <h1 className="text-3xl sm:text-4xl mb-8">New Arrivals</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
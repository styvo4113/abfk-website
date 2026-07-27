import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";

export function Wishlist() {
  const { wishlistIds } = useWishlist();
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="container-abfk py-30 text-center">
        <h1 className="text-2xl mb-3">Your wishlist is empty</h1>
        <p className="text-sm text-brand-black/50 mb-6">
          Tap the heart icon on any product to save it here. This is saved in
          your browser, so it clears if you clear your browser data.
        </p>
        <Link to="/shop" className="btn-primary inline-block">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-abfk py-12">
      <h1 className="text-3xl sm:text-4xl mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
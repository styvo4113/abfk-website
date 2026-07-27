import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { getStartingPrice, isInStock } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

export function ProductCard({ product }: { product: Product }) {
  const inStock = isInStock(product);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group block">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-brand-black/5 rounded-lg mb-3 flex items-center justify-center text-brand-black/30 text-sm relative overflow-hidden">
          Image Placeholder
          {!inStock && (
            <span className="absolute top-2 right-2 bg-brand-black text-brand-white text-[10px] uppercase tracking-wide px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-2 left-2 w-8 h-8 rounded-full bg-brand-white/90 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 ${wishlisted ? "fill-brand-gold text-brand-gold" : "text-brand-black"}`}
            />
          </button>
        </div>
        <p className="text-xs uppercase tracking-wide text-brand-black/50 mb-1">{product.category}</p>
        <h3 className="font-semibold text-sm mb-1 group-hover:text-brand-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-bold">KES {getStartingPrice(product).toLocaleString()}</p>
      </Link>
    </div>
  );
}
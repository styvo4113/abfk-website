import { useParams, Link } from "react-router-dom";
import { getProductById } from "@/data/products";
import { useBasket } from "@/context/BasketContext";
import { trackProductViewed, trackAddedToOrder } from "@/lib/analytics";
import { useEffect, useMemo, useState } from "react";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addItem } = useBasket();

  const sizes = useMemo(
    () => (product ? Array.from(new Set(product.variants.map((v) => v.size))) : []),
    [product]
  );
  const colors = useMemo(
    () => (product ? Array.from(new Set(product.variants.map((v) => v.color))) : []),
    [product]
  );

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      trackProductViewed(product.id, product.name);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-abfk py-30 text-center">
        <h1 className="text-2xl mb-2">Product Not Found</h1>
        <Link to="/shop" className="text-brand-gold hover:underline text-sm">
          Back to Shop
        </Link>
      </div>
    );
  }

  const selectedVariant = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );
  const isSelectedOutOfStock = !selectedVariant || selectedVariant.stock === 0;

  function isCombinationOutOfStock(size: string, color: string) {
    const variant = product!.variants.find((v) => v.size === size && v.color === color);
    return !variant || variant.stock === 0;
  }

  function handleAddToOrder() {
    if (!selectedVariant || isSelectedOutOfStock) return;
    addItem(product!, selectedVariant, quantity);
    trackAddedToOrder(product!.id, product!.name, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }
  return (
    <div className="container-abfk py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Gallery — placeholders until real photos are supplied */}
        <div>
          <div className="aspect-square bg-brand-black/5 rounded-lg mb-3 flex items-center justify-center text-brand-black/30 text-sm">
            Main Image Placeholder
          </div>
          <div className="grid grid-cols-4 gap-3">
            {["Front", "Back", "Side", "Detail"].map((angle) => (
              <div
                key={angle}
                className="aspect-square bg-brand-black/5 rounded flex items-center justify-center text-brand-black/30 text-[10px] text-center"
              >
                {angle}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-wide text-brand-black/50 mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl sm:text-3xl mb-3">{product.name}</h1>
          <p className="text-xl font-bold mb-4">
            KES {(selectedVariant?.price ?? product.variants[0].price).toLocaleString()}
          </p>
          <p className="text-brand-black/70 mb-8 leading-relaxed">{product.description}</p>

          {/* Size selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => {
                const disabled = isCombinationOutOfStock(s, selectedColor);
                return (
                  <button
                    key={s}
                    disabled={disabled}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 text-sm border rounded transition-colors ${
                      selectedSize === s
                        ? "border-brand-gold text-brand-gold"
                        : "border-brand-black/20"
                    } ${disabled ? "opacity-30 cursor-not-allowed line-through" : "hover:border-brand-gold"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => {
                const disabled = isCombinationOutOfStock(selectedSize, c);
                return (
                  <button
                    key={c}
                    disabled={disabled}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-sm border rounded transition-colors ${
                      selectedColor === c
                        ? "border-brand-gold text-brand-gold"
                        : "border-brand-black/20"
                    } ${disabled ? "opacity-30 cursor-not-allowed line-through" : "hover:border-brand-gold"}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock status */}
          <p className={`text-sm mb-6 ${isSelectedOutOfStock ? "text-red-600" : "text-green-700"}`}>
            {isSelectedOutOfStock ? "Out of Stock for this combination" : "In Stock"}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Quantity</h3>
            <div className="flex items-center border border-brand-black/20 rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg hover:bg-brand-black/5"
              >
                −
              </button>
              <span className="px-4 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg hover:bg-brand-black/5"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToOrder}
            disabled={isSelectedOutOfStock}
            className="btn-primary w-full sm:w-auto disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {added ? "Added to Order ✓" : "Add to Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
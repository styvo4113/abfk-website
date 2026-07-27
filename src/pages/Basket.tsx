import { Link } from "react-router-dom";
import { useBasket } from "@/context/BasketContext";
import { trackCheckoutStarted } from "@/lib/analytics";

export function Basket() {
  const { items, removeItem, updateQuantity } = useBasket();

  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container-abfk py-30 text-center">
        <h1 className="text-2xl mb-3">Your basket is empty</h1>
        <Link to="/shop" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-abfk py-12">
      <h1 className="text-3xl sm:text-4xl mb-8">Your Order Basket</h1>

      <div className="space-y-6 mb-10">
        {items.map((item) => (
          <div
            key={item.variant.sku}
            className="flex items-center gap-4 border-b border-brand-black/10 pb-6"
          >
            <div className="w-20 h-20 bg-brand-black/5 rounded flex items-center justify-center text-brand-black/30 text-[10px] text-center shrink-0">
              Image
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{item.product.name}</h3>
              <p className="text-xs text-brand-black/50 mb-1">
                Size: {item.variant.size} · Color: {item.variant.color}
              </p>
              <p className="text-sm font-bold">KES {item.variant.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center border border-brand-black/20 rounded">
              <button
                onClick={() => updateQuantity(item.variant.sku, Math.max(1, item.quantity - 1))}
                className="px-3 py-1 text-lg hover:bg-brand-black/5"
              >
                −
              </button>
              <span className="px-4 text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.variant.sku, item.quantity + 1)}
                className="px-3 py-1 text-lg hover:bg-brand-black/5"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.variant.sku)}
              className="text-xs text-red-600 hover:underline ml-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-8">
        <span className="text-lg font-semibold">Subtotal</span>
        <span className="text-lg font-bold">KES {subtotal.toLocaleString()}</span>
      </div>

      <Link to="/checkout" onClick={trackCheckoutStarted} className="btn-primary inline-block">
        Proceed to Checkout
      </Link>
    </div>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBasket } from "@/context/BasketContext";
import { deliveryAreas } from "@/data/delivery-areas";
import { brandCopy } from "@/lib/design-tokens";
import { z } from "zod";
import { trackWhatsAppCheckoutInitiated } from "@/lib/analytics";


const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+254)[0-9]{9}$/, "Enter a valid Kenyan phone number, e.g. 07XXXXXXXX."),
});
export function Checkout() {
  const { items, clearBasket } = useBasket();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [areaName, setAreaName] = useState(deliveryAreas[0].name);
  const [notes, setNotes] = useState("");
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);
  const [error, setError] = useState("");

  const selectedArea = deliveryAreas.find((a) => a.name === areaName) ?? deliveryAreas[0];
  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);
  const total = subtotal + selectedArea.fee;

  // Strips characters that could break the wa.me URL or message formatting
  function sanitize(text: string): string {
    return text.replace(/[<>"]/g, "").trim();
  }

  function buildWhatsAppMessage(): string {
    const lines: string[] = [];
    lines.push(`*New Order — A Boy From Kibera*`);
    lines.push(``);
    lines.push(`*Customer:* ${sanitize(name)}`);
    lines.push(`*Phone:* ${sanitize(phone)}`);
    lines.push(`*Delivery Area:* ${selectedArea.name} (KES ${selectedArea.fee})`);
    if (notes.trim()) {
      lines.push(`*Notes:* ${sanitize(notes)}`);
    }
    lines.push(``);
    lines.push(`*Items:*`);
    items.forEach((item) => {
      lines.push(
        `- ${sanitize(item.product.name)} | Size: ${item.variant.size} | Color: ${item.variant.color} | Qty: ${item.quantity} | KES ${(item.variant.price * item.quantity).toLocaleString()}`
      );
    });
    lines.push(``);
    lines.push(`*Subtotal:* KES ${subtotal.toLocaleString()}`);
    lines.push(`*Delivery:* KES ${selectedArea.fee.toLocaleString()}`);
    lines.push(`*Total:* KES ${total.toLocaleString()}`);
    return lines.join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = checkoutSchema.safeParse({ name, phone });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    if (items.length === 0) {
      setError("Your basket is empty.");
      return;
    }

   const message = buildWhatsAppMessage();
    const phoneForLink = "254" + brandCopy.whatsappNumber.replace(/^0/, "");
    const whatsappUrl = `https://wa.me/${phoneForLink}?text=${encodeURIComponent(message)}`;

    trackWhatsAppCheckoutInitiated(total);
    const newWindow = window.open(whatsappUrl, "_blank");

    // Fallback: if the browser blocks the popup or WhatsApp isn't available
    // (e.g. desktop without WhatsApp installed), show a copyable summary instead.
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      setFallbackMessage(message);
    } else {
      clearBasket();
      navigate("/");
    }
  }

  if (items.length === 0 && !fallbackMessage) {
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
    <div className="container-abfk py-12 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl mb-8">Checkout</h1>

      {fallbackMessage ? (
        <div className="border border-brand-black/20 rounded-lg p-6">
          <p className="text-sm mb-4">
            We couldn't open WhatsApp automatically. You can message us directly at{" "}
            <strong>{brandCopy.whatsappNumber}</strong>, or copy your order summary below and
            send it manually.
          </p>
          <textarea
            readOnly
            value={fallbackMessage}
            className="w-full h-64 p-3 text-xs font-mono border border-brand-black/20 rounded mb-4"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(fallbackMessage);
            }}
            className="btn-outline"
          >
            Copy Order Summary
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-brand-black/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-brand-black/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              placeholder="07XX XXX XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Delivery Area</label>
            <select
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              className="w-full px-4 py-2 border border-brand-black/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
            >
              {deliveryAreas.map((area) => (
                <option key={area.name} value={area.name}>
                  {area.name} — KES {area.fee}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Delivery Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border border-brand-black/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              rows={3}
              placeholder="Landmark, gate code, preferred time, etc."
            />
          </div>

          <div className="border-t border-brand-black/10 pt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>KES {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery ({selectedArea.name})</span>
              <span>KES {selectedArea.fee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            Send Order via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
/**
 * GA4 event helpers. Requires the gtag script to be loaded in index.html
 * with a real Measurement ID before these will actually send data.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export function trackProductViewed(productId: string, productName: string) {
  track("view_item", { item_id: productId, item_name: productName });
}

export function trackAddedToOrder(productId: string, productName: string, quantity: number) {
  track("add_to_cart", { item_id: productId, item_name: productName, quantity });
}

export function trackCheckoutStarted() {
  track("begin_checkout");
}

export function trackWhatsAppCheckoutInitiated(total: number) {
  track("whatsapp_checkout_initiated", { value: total, currency: "KES" });
}

export function trackNewsletterSignup() {
  track("newsletter_signup");
}

export function trackSearchUsed(searchTerm: string) {
  track("search", { search_term: searchTerm });
}
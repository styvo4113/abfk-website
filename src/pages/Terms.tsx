export function Terms() {
  return (
    <div className="container-abfk py-12 max-w-3xl">
      <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-4 text-sm text-brand-black/70 mb-8">
        <strong>Draft for review:</strong> this is a starting template. Please
        read through and let us know what needs to change before this goes live.
      </div>

      <h1 className="text-3xl sm:text-4xl mb-8">Terms & Conditions</h1>

      <div className="space-y-6 text-sm text-brand-black/70 leading-relaxed">
        <h2 className="text-lg font-semibold text-brand-black mt-8 mb-2">Orders</h2>
        <p>
          All orders placed through this website are sent to us via WhatsApp
          for manual confirmation. An order is only confirmed once we've
          verified stock availability and received payment.
        </p>

        <h2 className="text-lg font-semibold text-brand-black mt-8 mb-2">Payment</h2>
        <p>
          Payment is currently handled manually via M-Pesa, arranged directly
          with us over WhatsApp after your order is submitted. We do not
          process any payment automatically through this website.
        </p>

        <h2 className="text-lg font-semibold text-brand-black mt-8 mb-2">Pricing & Stock</h2>
        <p>
          Prices and stock levels shown on the site are updated manually and
          are accurate to the best of our knowledge at the time of your
          order. In rare cases where an item sells out before we confirm your
          order, we'll let you know and offer an alternative or refund.
        </p>

        <h2 className="text-lg font-semibold text-brand-black mt-8 mb-2">Delivery</h2>
        <p>
          Delivery fees vary by Nairobi area and are shown at checkout.
          Delivery timelines will be communicated directly with you after
          order confirmation.
        </p>

        <h2 className="text-lg font-semibold text-brand-black mt-8 mb-2">Returns</h2>
        <p>
          We accept returns within 3 days of delivery, provided the item is
          unworn, unwashed, and in its original condition. Contact us via
          WhatsApp to arrange a return.
        </p>

        <h2 className="text-lg font-semibold text-brand-black mt-8 mb-2">Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          site after changes means you accept the updated terms.
        </p>

        <p className="text-xs text-brand-black/40 mt-8">Last updated: draft, pending Peter's review.</p>
      </div>
    </div>
  );
}
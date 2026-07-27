import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { deliveryAreas } from "@/data/delivery-areas";
import { brandCopy } from "@/lib/design-tokens";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the Shop page, add items to your basket with your chosen size and color, then head to checkout. Your order details are sent to us directly via WhatsApp for confirmation.",
  },
  {
    question: "How does payment work?",
    answer:
      "Once you send your order via WhatsApp, we'll confirm availability and share M-Pesa payment details. Payment is manual and confirmed directly with us over WhatsApp.",
  },
  {
    question: "What areas do you deliver to?",
    answer: `We deliver across Nairobi, including ${deliveryAreas
      .slice(0, -1)
      .map((a) => a.name)
      .join(", ")}, and more. Delivery fees vary by area and are shown at checkout.`,
  },
  {
    question: "Can I return an item?",
    answer:
      "Yes, we offer a 3-day return window from the day you receive your item, provided it's unworn and in its original condition. Reach out to us on WhatsApp to arrange a return.",
  },
  {
    question: "How do I know if an item is in stock?",
    answer:
      "Each product page shows real-time stock status for every size and color combination. Out-of-stock options are shown crossed out and can't be selected.",
  },
  {
    question: "How can I contact you directly?",
    answer: `You can reach us anytime on WhatsApp at ${brandCopy.whatsappNumber}, or via the Contact page.`,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="container-abfk py-12 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl mb-8">Frequently Asked Questions</h1>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="border border-brand-black/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between text-left px-5 py-4 font-semibold text-sm"
                aria-expanded={isOpen}
              >
                {faq.question}
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-sm text-brand-black/70 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
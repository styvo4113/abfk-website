import { MessageCircle } from "lucide-react";
import { brandCopy } from "@/lib/design-tokens";

export function WhatsAppButton() {
  const phoneForLink = "254" + brandCopy.whatsappNumber.replace(/^0/, "");

  return (
    <a
      href={`https://wa.me/${phoneForLink}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform duration-200"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </a>
  );
}
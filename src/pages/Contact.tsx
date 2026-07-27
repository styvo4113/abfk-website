import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { brandCopy } from "@/lib/design-tokens";

export function Contact() {
  const phoneForLink = "254" + brandCopy.whatsappNumber.replace(/^0/, "");

  return (
    <div className="container-abfk py-12 max-w-2xl">
      <h1 className="text-3xl sm:text-4xl mb-8">Contact Us</h1>
      <p className="text-brand-black/70 mb-10">
        Have a question about an order, sizing, or just want to chat? Reach out
        through any of the channels below.
      </p>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-black/5 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Phone / WhatsApp</p>
            <a href={`https://wa.me/${phoneForLink}`} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-black/70 hover:text-brand-gold">
              {brandCopy.whatsappNumber}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-black/5 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Email</p>
            <a href="mailto:hello@aboyfromkibera.co.ke" className="text-sm text-brand-black/70 hover:text-brand-gold">
              hello@aboyfromkibera.co.ke
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-black/5 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Location</p>
            <p className="text-sm text-brand-black/70">Nairobi, Kenya</p>
          </div>
        </div>

        <a href={`https://wa.me/${phoneForLink}`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 mt-4">
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
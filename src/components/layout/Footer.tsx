import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { brandCopy } from "@/lib/design-tokens";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white mt-30">
      <div className="container-abfk py-18 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <img src="/images/logo-full.png" alt="A Boy From Kibera — Thrift & Style" className="h-24 w-auto mb-4" />
          <p className="text-sm text-brand-white/70">{brandCopy.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-brand-white/70">
            <li><Link to="/shop" className="hover:text-brand-gold">All Products</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-brand-gold">New Arrivals</Link></li>
            <li><Link to="/best-sellers" className="hover:text-brand-gold">Best Sellers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-brand-white/70">
            <li><Link to="/about" className="hover:text-brand-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-brand-gold">FAQ</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-brand-gold">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-gold">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Get In Touch</h4>
          <ul className="space-y-2 text-sm text-brand-white/70">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {brandCopy.whatsappNumber}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> hello@aboyfromkibera.co.ke
            </li>
          </ul>
        <div className="flex gap-4 mt-4 text-sm">
            <a href="#" className="hover:text-brand-gold underline">Instagram</a>
            <a href="#" className="hover:text-brand-gold underline">Facebook</a>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-white/10 py-6">
        <p className="text-center text-xs text-brand-white/50">
          © {year} A Boy From Kibera. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
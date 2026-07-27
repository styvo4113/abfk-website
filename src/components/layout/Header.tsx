import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react";
import { useBasket } from "@/context/BasketContext";

const navLinks = [
  { label: "Shop", to: "/shop" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Best Sellers", to: "/best-sellers" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useBasket();

  return (
    <header className="sticky top-0 z-40 bg-brand-white border-b border-brand-black/10">
      <div className="container-abfk flex items-center justify-between h-18 py-4">
        <Link to="/" aria-label="A Boy From Kibera home">
          <img src="/images/logo-icon.png" alt="A Boy From Kibera logo" className="h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? "text-brand-gold" : "text-brand-black hover:text-brand-gold"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hover:text-brand-gold transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className="hover:text-brand-gold transition-colors">
            <Heart className="w-5 h-5" />
          </Link>
          <Link to="/basket" aria-label="Order basket" className="relative hover:text-brand-gold transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-brand-black/10 bg-brand-white">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-semibold uppercase tracking-wide border-b border-brand-black/5 ${
                      isActive ? "text-brand-gold" : "text-brand-black"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
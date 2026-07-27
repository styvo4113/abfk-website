import { Link } from "react-router-dom";
import { ArrowRight, Gem, Shirt, Leaf, MapPin } from "lucide-react";

const valueProps = [
  { icon: Gem, label: "Premium Thrift" },
  { icon: Shirt, label: "Unique Style" },
  { icon: Leaf, label: "Sustainable Fashion" },
  { icon: MapPin, label: "Rooted in Kibera" },
];

export function HeroSection() {
  return (
    <section className="bg-brand-white">
      <div className="container-abfk grid md:grid-cols-2 min-h-[600px]">
        {/* Left: message */}
        <div className="flex flex-col justify-center py-12 md:pr-12">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-4">
            Thrift &amp; Style
          </span>

          <h1 className="text-5xl md:text-6xl font-black text-brand-black leading-[1.05] mb-6">
            Wear Confidence.
            <br />
            Own Your Story.
          </h1>

          <div className="w-16 h-1 bg-brand-gold mb-6" />

          <p className="text-brand-black/70 text-lg mb-8 max-w-md">
            Premium thrifted pieces. Unique style. Rooted in Kibera. Driven by
            purpose.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand-black text-brand-gold font-bold uppercase tracking-wide px-8 py-4 w-fit hover:bg-brand-black/90 transition-colors"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-brand-black/10">
            {valueProps.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <Icon className="w-6 h-6 text-brand-black" strokeWidth={1.5} />
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-black/80">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: product photo */}
        <div className="relative hidden md:block">
          <img
            src="/images/hero-product.jpg"
            alt="A Boy From Kibera thrifted denim jacket and hoodie on display"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
import { Link } from "react-router-dom";
import { promoConfig } from "@/data/promo-config";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const featuredProducts = products.slice(0, 4);

const pillars = [
  "Premium Thrift",
  "Affordable Luxury",
  "Unique Style",
  "Sustainable Fashion",
];

export function Home() {
  return (
    <div>
      {/* Hero section — coded placeholder until the real brand photo is supplied.
          TODO: once abfk-hero-banner.jpg is ready, replace this whole <section>
          with: <img src={heroImage} alt="..." className="w-full h-auto object-cover" /> */}
      <section className="bg-brand-black text-brand-white py-24 sm:py-32">
        <div className="container-abfk text-center">
          <h1 className="text-4xl sm:text-6xl mb-4">
            A BOY FROM <span className="text-brand-gold">KIBERA</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-white/80 mb-10">
            Wear Confidence. Own Your Story.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {pillars.map((pillar) => (
              <div
                key={pillar}
                className="border border-brand-gold/40 rounded-lg py-4 px-2 text-xs sm:text-sm uppercase tracking-wide text-brand-gold font-semibold"
              >
                {pillar}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-abfk py-18">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl">Featured Products</h2>
          <Link to="/shop" className="text-sm font-semibold uppercase tracking-wide text-brand-gold hover:underline">
            View All
          </Link>
        </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand story teaser */}
      <section className="bg-brand-black text-brand-white py-18">
        <div className="container-abfk grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl mb-4">Our Story</h2>
            <p className="text-brand-white/70 mb-6 leading-relaxed">
              A Boy From Kibera started with a simple idea: everyone deserves to
              wear confidence, no matter their budget. What began as a small
              thrift hustle has grown into a movement for premium, sustainable
              streetwear that tells a story.
            </p>
            <Link to="/about" className="btn-primary inline-block bg-brand-gold text-brand-black hover:bg-brand-white">
              Read Our Story
            </Link>
          </div>
          <div className="aspect-video bg-brand-white/10 rounded-lg flex items-center justify-center text-brand-white/40 text-sm">
            Brand Story Image Placeholder
          </div>
        </div>
      </section>

      {/* Promotional banner */}
      {/* Promotional banner — editable via src/data/promo-config.ts */}
      {promoConfig.enabled && (
        <section className="container-abfk py-18">
          <div className="bg-brand-gold rounded-lg p-10 sm:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl mb-3 text-brand-black">
              {promoConfig.heading}
            </h2>
            <p className="text-brand-black/70 mb-6">{promoConfig.message}</p>
            <Link to={promoConfig.buttonLink} className="btn-primary inline-block">
              {promoConfig.buttonText}
            </Link>
          </div>
        </section>
      )}

      <NewsletterSignup />
    </div>
  );
}
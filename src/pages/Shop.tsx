import { useMemo, useState } from "react";
import { products, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";
import { trackSearchUsed } from "@/lib/analytics";

const ALL_CATEGORIES: Category[] = [
  "T-Shirts", "Shirts", "Hoodies", "Jackets", "Jeans",
  "Trousers", "Dresses", "Shoes", "Bags", "Caps",
];

const ALL_SIZES = Array.from(
  new Set(products.flatMap((p) => p.variants.map((v) => v.size)))
);

export function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [size, setSize] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      const matchesSize = size === "All" || p.variants.some((v) => v.size === size);
      const matchesPrice = p.variants.some((v) => v.price <= maxPrice);
      return matchesSearch && matchesCategory && matchesSize && matchesPrice;
    });
  }, [search, category, size, maxPrice]);

  return (
    <div className="container-abfk py-12">
      <h1 className="text-3xl sm:text-4xl mb-8">Shop All</h1>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/40" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
  setSearch(e.target.value);
  if (e.target.value.length > 2) trackSearchUsed(e.target.value);
}}
          className="w-full pl-10 pr-4 py-2 border border-brand-black/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Filters */}
        <aside className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">Category</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCategory("All")}
                className={`text-left text-sm ${category === "All" ? "text-brand-gold font-semibold" : "text-brand-black/70"}`}
              >
                All Categories
              </button>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left text-sm ${category === cat ? "text-brand-gold font-semibold" : "text-brand-black/70"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSize("All")}
                className={`px-3 py-1 text-xs border rounded ${size === "All" ? "border-brand-gold text-brand-gold" : "border-brand-black/20"}`}
              >
                All
              </button>
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 text-xs border rounded ${size === s ? "border-brand-gold text-brand-gold" : "border-brand-black/20"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Max Price: KES {maxPrice.toLocaleString()}
            </h3>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-gold"
            />
          </div>
        </aside>

        {/* Product grid */}
        <div>
          {filtered.length === 0 ? (
            <p className="text-brand-black/50 text-sm">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
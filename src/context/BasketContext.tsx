import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product, ProductVariant } from "@/data/products";

export interface BasketItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface BasketContextValue {
  items: BasketItem[];
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextValue | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);

  function addItem(product: Product, variant: ProductVariant, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((item) => item.variant.sku === variant.sku);
      if (existing) {
        return prev.map((item) =>
          item.variant.sku === variant.sku
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, variant, quantity }];
    });
  }

  function removeItem(sku: string) {
    setItems((prev) => prev.filter((item) => item.variant.sku !== sku));
  }

  function updateQuantity(sku: string, quantity: number) {
    setItems((prev) =>
      prev.map((item) => (item.variant.sku === sku ? { ...item, quantity } : item))
    );
  }

  function clearBasket() {
    setItems([]);
  }

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}
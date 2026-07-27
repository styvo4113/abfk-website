/**
 * ============================================================
 * PRODUCT DATA FILE — A Boy From Kibera
 * ============================================================
 * This file is the ENTIRE product catalog. There is no database.
 * To update stock, prices, or add new items, edit this file directly,
 * save, commit, and push to redeploy the live site.
 *
 * HOW TO ADD A NEW PRODUCT:
 * 1. Copy one of the existing product objects below as a template.
 * 2. Give it a new unique `id` (just increment the number as a string).
 * 3. Fill in name, description, category (must be one of the
 *    CATEGORY values listed below).
 * 4. Add one or more `variants` — each variant is a specific
 *    size + color combination with its own price, stock, and SKU.
 * 5. Use `generateSKU()` to build each variant's sku, don't type it by hand.
 *
 * HOW TO ADD A NEW VARIANT TO AN EXISTING PRODUCT:
 * 1. Find the product by name below.
 * 2. Copy one of its existing variant objects.
 * 3. Change size / color / price / stock as needed.
 * 4. Generate a fresh SKU with generateSKU() — do not reuse an SKU.
 *
 * HOW TO MARK SOMETHING OUT OF STOCK:
 * Set that variant's `stock` to 0. Do NOT delete the variant —
 * keeping it lets the product page show it as "Out of Stock"
 * instead of hiding it, which is what we want.
 *
 * HOW TO CHANGE A PRICE:
 * Edit the `price` field on the specific variant. Prices are
 * per-variant, not per-product, since size/color can affect price.
 * ============================================================
 */

export type Category =
  | "T-Shirts"
  | "Shirts"
  | "Hoodies"
  | "Jackets"
  | "Jeans"
  | "Trousers"
  | "Dresses"
  | "Shoes"
  | "Bags"
  | "Caps";

// Short codes used inside SKUs — add new ones here if you add a new category
const CATEGORY_CODES: Record<Category, string> = {
  "T-Shirts": "TEE",
  "Shirts": "SHT",
  "Hoodies": "HOD",
  "Jackets": "JKT",
  "Jeans": "JNS",
  "Trousers": "TRS",
  "Dresses": "DRS",
  "Shoes": "SHO",
  "Bags": "BAG",
  "Caps": "CAP",
};

// Short codes used inside SKUs for color — add new ones as needed
const COLOR_CODES: Record<string, string> = {
  Black: "BLK",
  White: "WHT",
  Gold: "GLD",
  Grey: "GRY",
  Blue: "BLU",
  Brown: "BRN",
  Green: "GRN",
  Red: "RED",
  Beige: "BEI",
  Navy: "NVY",
};

/**
 * Generates a SKU in the format:
 * ABFK-<CATEGORY CODE>-<running number, 3 digits>-<COLOR CODE>-<SIZE>
 * Example: ABFK-TEE-001-BLK-M
 */
export function generateSKU(
  category: Category,
  runningNumber: number,
  color: string,
  size: string
): string {
  const categoryCode = CATEGORY_CODES[category];
  const colorCode = COLOR_CODES[color] ?? color.slice(0, 3).toUpperCase();
  const paddedNumber = String(runningNumber).padStart(3, "0");
  return `ABFK-${categoryCode}-${paddedNumber}-${colorCode}-${size.toUpperCase()}`;
}

export interface ProductVariant {
  size: string;
  color: string;
  price: number; // in KES
  stock: number; // 0 means out of stock, keep the variant, don't delete it
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  variants: ProductVariant[];
  images?: string[]; // populated once real product photos are supplied
}

export const products: Product[] = [
  {
    id: "1",
    name: "Vintage Denim Jacket",
    description:
      "A timeless denim jacket with a lived-in wash, sourced and thrifted for a one-of-a-kind streetwear look.",
    category: "Jackets",
    variants: [
      {
        size: "M",
        color: "Blue",
        price: 2500,
        stock: 4,
        sku: generateSKU("Jackets", 1, "Blue", "M"),
      },
      {
        size: "L",
        color: "Blue",
        price: 2500,
        stock: 0, // out of stock — kept visible, marked disabled on the product page
        sku: generateSKU("Jackets", 1, "Blue", "L"),
      },
    ],
  },
  {
    id: "2",
    name: "Classic Crewneck Tee",
    description:
      "A soft, breathable crewneck tee in a relaxed fit — an everyday streetwear staple.",
    category: "T-Shirts",
    variants: [
      {
        size: "S",
        color: "Black",
        price: 800,
        stock: 10,
        sku: generateSKU("T-Shirts", 1, "Black", "S"),
      },
      {
        size: "M",
        color: "Black",
        price: 800,
        stock: 6,
        sku: generateSKU("T-Shirts", 1, "Black", "M"),
      },
      {
        size: "M",
        color: "White",
        price: 800,
        stock: 3,
        sku: generateSKU("T-Shirts", 1, "White", "M"),
      },
    ],
  },
  {
    id: "3",
    name: "Street Cargo Trousers",
    description:
      "Utility-inspired cargo trousers with multiple pockets, built for comfort and street style.",
    category: "Trousers",
    variants: [
      {
        size: "32",
        color: "Grey",
        price: 1800,
        stock: 5,
        sku: generateSKU("Trousers", 1, "Grey", "32"),
      },
      {
        size: "34",
        color: "Grey",
        price: 1800,
        stock: 2,
        sku: generateSKU("Trousers", 1, "Grey", "34"),
      },
      {
        size: "34",
        color: "Black",
        price: 1900,
        stock: 0,
        sku: generateSKU("Trousers", 1, "Black", "34"),
      },
    ],
  },
];

/** Returns a single product by id, or undefined if not found. */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Returns the lowest variant price for a product — used on cards/grids. */
export function getStartingPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}

/** Returns true if at least one variant of the product has stock. */
export function isInStock(product: Product): boolean {
  return product.variants.some((v) => v.stock > 0);
}
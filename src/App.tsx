import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Shop } from "@/pages/Shop";
import { NewArrivals } from "@/pages/NewArrivals";
import { BestSellers } from "@/pages/BestSellers";
import { BasketProvider } from "@/context/BasketContext";
import { ProductDetail } from "@/pages/ProductDetail";
import { Basket } from "@/pages/Basket";
import { Checkout } from "@/pages/Checkout";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { FAQ } from "@/pages/FAQ";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { Terms } from "@/pages/Terms";
import { WishlistProvider } from "@/context/WishlistContext";
import { Wishlist } from "@/pages/Wishlist";

function App() {
  return (
    <WishlistProvider>
      <BasketProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="new-arrivals" element={<NewArrivals />} />
              <Route path="best-sellers" element={<BestSellers />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="basket" element={<Basket />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BasketProvider>
    </WishlistProvider>
  );
}

export default App;
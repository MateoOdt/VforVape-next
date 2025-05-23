import { HeroSection } from "@/components/sections/hero-section";
import { ProductsSection } from "@/components/sections/products-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ShopSection } from "@/components/sections/shop-section";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ProductsSection />
      <AboutSection />
      <ShopSection />
      <ContactSection />
    </main>
  );
}
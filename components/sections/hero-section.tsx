"use client";

import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import Image from "next/image";

export function HeroSection() {
  const scrollToSection = useScrollToSection();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center container-padding bg-background">
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center py-24">
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Welcome 
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
            Experience premium vaping products crafted for enthusiasts. Discover our curated collection of high-quality devices and accessories.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => scrollToSection("products")}
          >
            Explore Products
          </Button>
        </div>
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?auto=format&fit=crop&q=80"
            alt="Premium Vaping Device"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
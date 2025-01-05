"use client";

import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import Image from "next/image";
import logo2 from '@/public/logo2.jpg';
import { useGradientAnimation } from "@/hooks/use-gradient-animation";
import { SocialIcons } from "../social-icons";

export function HeroSection() {
  const scrollToSection = useScrollToSection();
  const position = useGradientAnimation();

  const gradientStyle = {
    background: 'linear-gradient(to right, red, #b30c20, #750d7a)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    backgroundPosition: `${position}% 60%`,
    transition: 'background-position 0.2s ease-in-out',
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center container-padding bg-background">
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center py-24">
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <span style={gradientStyle}>
              Votre nouvelle référence en vape et CBD.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
          Découvrez une expérience premium avec nos produits de vape et CBD, soigneusement sélectionnés pour répondre aux attentes des passionnés.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => scrollToSection("products")}
          >
            Voir nos produits
          </Button>
        </div>
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src={logo2}
            alt="Logo here pahe"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <SocialIcons />
    </section>
  );
}
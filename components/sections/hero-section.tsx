"use client";

import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import Image from "next/image";
import logo2 from '@/public/logo2.jpg';
import { useGradientAnimation } from "@/hooks/use-gradient-animation";
import { SocialIcons } from "../social-icons";
import { LogoutButton } from "../logout-button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
      }}
      className="bg-black"
    >
      <section id="home" className="min-h-screen flex items-center justify-center container-padding bg-background">
        <motion.div
          className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center py-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center md:text-left space-y-6">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              variants={itemVariants}
            >
              <span style={gradientStyle}>
                Votre nouvelle référence en vape et CBD.
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0"
              variants={itemVariants}
            >
              Découvrez une expérience premium avec nos produits de vape et CBD, soigneusement sélectionnés pour répondre aux attentes des passionnés.
            </motion.p>
            <motion.div variants={itemVariants}>
              <motion.div
                style={{ width: 'fit-content' }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => scrollToSection("products")}
                >
                  Voir nos produits
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <Image
              src={logo2}
              alt="Logo here page"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
        <SocialIcons />
        <LogoutButton />
      </section>
    </motion.div>
  );
}
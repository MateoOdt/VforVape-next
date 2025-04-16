"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import shop from '@/assets/shop.jpeg';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGradientAnimation } from "@/hooks/use-gradient-animation";

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

export function ShopSection() {
  const router = useRouter();
  const position = useGradientAnimation();

  const buttonGradientStyle = {
    background: 'linear-gradient(to right, red, #b30c20, #750d7a)',
    backgroundSize: '220% auto',
    backgroundPosition: `${position}% 90%`,
    transition: 'background-position 0.15s ease-in-out',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: '-150px' }}
      transition={{ duration: 0.6 }}
      className="bg-muted/50"
    >
      <section id="shop" className="py-28 container-padding bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative h-[570px] w-full"
              initial={{ y: 0 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <Image
                src={shop}
                alt="Notre boutique"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold">Notre Boutique</h2>
              <p className="text-lg text-muted-foreground">
                Notre boutique physique est votre destination pour une expérience de vape personnalisée. 
                Nos experts en sevrage tabagique sont là pour vous guider dans votre parcours vers une vie sans tabac.
              </p>
              <p className="text-lg text-muted-foreground">
                Actuellement, nous ne proposons pas encore de commerce en ligne, mais notre équipe de professionnels 
                est disponible en magasin pour vous offrir des conseils personnalisés et vous aider à trouver 
                les solutions adaptées à vos besoins.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6"
                  style={buttonGradientStyle}
                  onClick={() => router.push("/conseil")}
                >
                  Découvrir nos conseils
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
} 
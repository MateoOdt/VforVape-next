"use client";

import { motion } from "framer-motion";
import { useGradientAnimation } from "@/hooks/use-gradient-animation";
import Image from "next/image";
import box from '@/assets/chooseBox.png';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import product from '@/assets/chooseProduct.jpeg';

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

export default function ConseilPage() {
  const position = useGradientAnimation();
  const router = useRouter();

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

  const buttonGradientStyle = {
    background: 'linear-gradient(to right, red, #b30c20, #750d7a)',
    backgroundSize: '220% auto',
    backgroundPosition: `${position}% 90%`,
    transition: 'background-position 0.15s ease-in-out',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Section 1: Présentation */}
      <section className="py-28 container-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="max-w-2xl mx-auto text-center space-y-4 mb-16 mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold"
              variants={itemVariants}
            >
              <span style={gradientStyle}>
                Nos conseils
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground"
              variants={itemVariants}
            >
              Découvrez nos conseils personnalisés pour vous accompagner dans votre expérience de vape.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Choisis ta vape */}
      <section className="py-28 container-padding bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative h-[540px] w-full"
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: [0, -10, 0],
                opacity: [1, 1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <Image
                src={box}
                alt="Choisir sa vape"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold">Choisis ta vape</h2>
              <p className="text-lg text-muted-foreground">
                Trouvez le dispositif qui correspond à vos besoins et à votre style de vie. 
                Que vous soyez débutant ou vapoteur expérimenté, nous avons la solution adaptée.
              </p>
              <ul className="space-y-2">
                <li>• Dispositifs pour débutants</li>
                <li>• Vapes avancées</li>
                <li>• Pods et cigarettes électroniques</li>
                <li>• Matériel de reconstruction</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Choisis ton goût */}
      <section className="py-28 container-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="space-y-4 order-2 md:order-1"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold">Choisis ton goût</h2>
              <p className="text-lg text-muted-foreground">
                Explorez notre large gamme de saveurs pour trouver celle qui vous correspond. 
                Des classiques aux créations uniques, il y en a pour tous les palais.
              </p>
              <ul className="space-y-2">
                <li>• Saveurs fruitées</li>
                <li>• Saveurs gourmandes</li>
                <li>• Saveurs mentholées</li>
                <li>• Saveurs tabac</li>
              </ul>
            </motion.div>
            <motion.div 
              className="relative h-[570px] w-full order-1 md:order-2"
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
                src={product}
                alt="Choisir son goût"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Choisis ton taux de nicotine */}
      <section className="py-28 container-padding bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative h-[400px] w-full"
              variants={itemVariants}
            >
              <Image
                src="/images/nicotine.jpg"
                alt="Choisir son taux de nicotine"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold">Choisis ton taux de nicotine</h2>
              <p className="text-lg text-muted-foreground">
                Déterminez le taux de nicotine qui vous convient. 
                Que vous souhaitiez réduire progressivement ou maintenir votre consommation, 
                nous vous guidons dans votre choix.
              </p>
              <ul className="space-y-2">
                <li>• Taux élevé (20mg/ml)</li>
                <li>• Taux moyen (10-12mg/ml)</li>
                <li>• Taux faible (3-6mg/ml)</li>
                <li>• Sans nicotine</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Bouton de redirection */}
      <section className="py-28 container-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={itemVariants}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-bold">Prêt à découvrir nos produits ?</h2>
              <p className="text-lg text-muted-foreground">
                Jetez un coup d'œil à notre catalogue de produits
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                style={buttonGradientStyle}
                onClick={() => router.push("/catalog")}
              >
                Voir notre catalogue
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
} 
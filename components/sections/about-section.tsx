"use client";

import { Building2, Award, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Établi depuis 2016",
    description: "Nous sommes fiers de servir nos clients depuis 2016 avec des produits de qualité et un service exceptionnel."
  },
  {
    icon: Award,
    title: "Qualité Premium",
    description: "Nous sélectionnons et testons soigneusement tous nos produits pour garantir qu'ils respectent les plus hauts standards de qualité et de sécurité."
  },
  {
    icon: Shield,
    title: "La Sécurité Avant Tout",
    description: "Tous nos produits sont conformes aux normes de sécurité internationales et aux réglementations pour votre tranquillité d'esprit."
  },
  {
    icon: Users,
    title: "Support Expert",
    description: "Notre équipe compétente est toujours prête à vous aider à trouver les produits parfaits pour vos besoins."
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 container-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">À propos</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Nous sommes passionnés par l'idée d'offrir la meilleure expérience de vapotage grâce à des produits de qualité et un service exceptionnel.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
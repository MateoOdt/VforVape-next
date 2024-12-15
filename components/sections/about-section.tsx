"use client";

import { Building2, Award, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Established Since 2015",
    description: "Nearly a decade of experience in providing premium vaping products and expert guidance to our community."
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "We carefully select and test all our products to ensure they meet the highest standards of quality and safety."
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "All our products comply with international safety standards and regulations for your peace of mind."
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Our knowledgeable team is always ready to help you find the perfect products for your needs."
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 container-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">About Us</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            We're passionate about providing the best vaping experience through quality products and exceptional service.
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
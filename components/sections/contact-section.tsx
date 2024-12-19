"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-36 container-padding bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Nous contacter</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Vous avez des questions, nous sommes là pour vous aider. <br />Contactez-nous par l'un de ces canaux.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8 bg-background p-6 sm:p-8 rounded-xl shadow-md">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">Vforvape77@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Téléphone</h3>
                <p className="text-muted-foreground">01 60 32 93 09</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Adresse</h3>
                <p className="text-muted-foreground">
                  Rue du Maréchal Gallieni, 77165 Saint-Soupplets
                </p>
              </div>
            </div>
          </div>

          <form className="space-y-6 bg-background p-6 sm:p-8 rounded-xl shadow-md">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="How can we help?"
                className="min-h-[150px] resize-none"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">
              Envoyer le mail
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { LatLngExpression } from "leaflet";
import { motion } from "framer-motion";
import ContactMap from "../map-container";

export function ContactSection() {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    /**
     * 
    const name = (e.target as any).name.value;
    const email = (e.target as HTMLFormElement).email.value;
    const message = (e.target as HTMLFormElement).message.value;

    const resend = new Resend('re_1AD47oz2_66mXJ5jKb2HQ2uYt6jaCbfvW');

    resend.emails.send({
      from: email,
      to: 'mateo@bamptee.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    
    console.log(name, email, message);
     */

    // Set up the email data to send
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        margin: '-150px'
      }}
      transition={{
        duration: 0.6,
      }}
      className="bg-black"
    >
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
                </div>
              </div>
              <ContactMap />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-background p-6 sm:p-8 rounded-xl shadow-md">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nom
                  </label>
                  <Input id="name" name="name" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="Votre mail" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="min-h-[150px] resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Envoyer le mail
              </Button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
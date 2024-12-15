"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-28 container-padding bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Contact Us</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Have questions? We're here to help. Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8 bg-background p-6 sm:p-8 rounded-xl shadow-md">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-muted-foreground">support@vforvape.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Visit Us</h3>
                <p className="text-muted-foreground">
                  123 Vape Street<br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>

          <form className="space-y-6 bg-background p-6 sm:p-8 rounded-xl shadow-md">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
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
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
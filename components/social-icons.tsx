"use client";

import { Facebook, Instagram } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SocialIcons() {
  return (
    <div className="fixed bottom-8 left-8 flex flex-col gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://www.facebook.com/Vforvape77/?locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg text-gray-400 hover:text-[#1877F2] hover:bg-white transition-all duration-300 transform hover:scale-105"
            >
              <Facebook className="h-6 w-6" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-sm">
            <p>Facebook</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://www.instagram.com/vforvape77/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg text-gray-400 hover:text-[#E4405F] hover:bg-white transition-all duration-300 transform hover:scale-105"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-sm">
            <p>Instagram</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
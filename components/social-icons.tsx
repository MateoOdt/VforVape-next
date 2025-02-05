"use client";

import { Facebook, Instagram, QrCode } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import qrCode from '@/assets/qrcode.png';
import Image from "next/image";

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

        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center justify-center w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg text-gray-400 hover:text-purple-500 hover:bg-white transition-all duration-300 transform hover:scale-105">
                  <QrCode className="h-6 w-6" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
                <span className="text-lg">Fydll QR Code</span>
                <div className="flex justify-center mt-4">
                  <Image src={qrCode} alt="Fydll QR Code" width={300} height={300} />
                </div>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-sm">
            <p>Fydll</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
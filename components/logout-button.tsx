'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useEffect, useState } from "react";

export function LogoutButton() {
  const { toast } = useToast();
  const [jwt, setJwt] = useState<string | null>(null);

  function handleLogout() {
    fetch(`${process.env.API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem('jwtToken');
        setTimeout(() => {
          location.reload();
        }, 1000);
        toast({
          description: 'Déconnecté avec succès',
        })
      } else {
        toast({
          description: 'Une erreur est survenue',
          action: <ToastAction altText="Essaye encore">Essaye encore</ToastAction>,
        })
      }
    }).catch((error) => {
      toast({
        description: 'Une erreur est survenue',
        action: <ToastAction altText="Essaye encore">Essaye encore</ToastAction>,
      })
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setJwt(token);
  }, []);

  return (
    <>
      {jwt && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={handleLogout}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-border shadow-lg text-gray-400 bg-background-600 hover:text-white hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-sm">
                <p>Deconnection</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  );
}
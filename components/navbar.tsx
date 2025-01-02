"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import Logo from '@/public/logo.png';
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = useScrollToSection();
  const router = useRouter();
  const path = usePathname();

  const [activeSection, setActiveSection] = useState(path.slice(1) || "home");
  const currentSection = useScrollSpy(navItems.map(item => item.id));

  const handleSectionClick = (sectionId: string) => {
    if (path === "/catalog") {
      router.push("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 200);
    } else {
      setActiveSection(sectionId);
      scrollToSection(sectionId);
    }
  
    setIsMenuOpen(false);
  };

  const handleCatalogClick = () => {
    router.push("/catalog");
    setActiveSection("");
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setActiveSection(currentSection);
    if (path === "/catalog") {
      setActiveSection("catalog");
    }
  }, [currentSection, path]);

  return (
    <>
      {path !== "/admin" && (
        <div className="fixed w-full z-50 px-4 py-4">
          <nav className="max-w-7xl mx-auto bg-background/90 backdrop-blur-sm border border-border rounded-2xl px-6 shadow-lg">
            <div className="flex justify-between h-16 items-center">
              <Image src={Logo} alt="logo" width={70} />
  
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === "catalog") {
                        handleCatalogClick();
                      }
                      else {
                        handleSectionClick(item.id);
                        scrollToSection(item.id);
                      }
                    }}
                    className={cn(
                      "relative text-sm transition-colors px-2 py-1 rounded-md",
                      activeSection === item.id
                        ? item.id === "catalog"
                          ? "bg-red-600 text-white"
                          : "text-primary hover:text-primary after:absolute after:left-0 after:top-12 after:bottom-0 after:h-[3px] after:w-full after:bg-red-600 after:rounded-full after:content-[''] after:transition-all after:duration-600 after:ease-out"
                        : item.id === "catalog"
                        ? "bg-red-600 text-white"
                        : "text-muted-foreground hover:text-primary after:absolute after:left-1/2 after:top-12 after:bottom-0 after:h-[3px] after:w-0 after:bg-red-600 after:rounded-full after:content-[''] after:transition-all after:duration-600 after:ease-out hover:after:w-full hover:after:left-0"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <ThemeToggle />
              </div>
  
              {/* Mobile Navigation Button */}
              <div className="md:hidden flex items-center gap-4">
                <ThemeToggle />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
  
            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div className="md:hidden pb-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === "catalog") {
                          handleCatalogClick();
                        }
                        else {
                          handleSectionClick(item.id);
                          scrollToSection(item.id);
                        }
                      }}
                      className={cn(
                        "relative block px-2 py-1 text-base w-full text-left transition-colors rounded-md",
                        activeSection === item.id || (path === '/catalog' && item.id === 'catalog')
                          ? "text-primary after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-red-600 after:rounded-full after:content-[''] after:transition-all after:duration-600 after:ease-out"
                          : "text-muted-foreground after:absolute after:left-1/2 after:bottom-0 after:h-[3px] after:w-0 after:bg-red-600 after:rounded-full after:content-[''] after:transition-all after:duration-600 after:ease-out hover:after:w-full hover:after:left-0"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
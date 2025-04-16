"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      const viewportHeight = window.innerHeight;

      if (scrollPosition < 100) {
        setActiveSection("home");
        return;
      }

      const currentSection = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.pageYOffset;
          
          const isActive = elementTop <= scrollPosition + (viewportHeight * 0.3);

          return {
            id,
            isActive,
            top: elementTop
          };
        })
        .filter((item): item is { id: string; isActive: boolean; top: number } => item !== null)
        .sort((a, b) => b.top - a.top)
        .find(item => item.isActive);

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
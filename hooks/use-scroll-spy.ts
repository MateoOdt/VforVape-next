"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Special case for the top of the page
      if (scrollPosition < 100) {
        setActiveSection("home");
        return;
      }

      // Find the last section that has been scrolled past
      const currentSection = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          return {
            id,
            offset: element.offsetTop,
          };
        })
        .filter((item): item is { id: string; offset: number } => item !== null)
        .reverse()
        .find((item) => scrollPosition >= item.offset);

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
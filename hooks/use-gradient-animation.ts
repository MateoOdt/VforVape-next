"use client";

import { useState, useEffect } from "react";

export function useGradientAnimation() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => (prev >= 100 ? 0 : prev + 0.5));
    };

    const interval = setInterval(animate, 20);
    return () => clearInterval(interval);
  }, []);

  return position;
}
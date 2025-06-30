"use client";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export function AosInit() {
  useEffect(() => {
    Aos.init({
      duration: 600,
      once: true,
    });
  }, []);

  return null;
}

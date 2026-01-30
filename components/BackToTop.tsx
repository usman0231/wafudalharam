"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0, autoKill: false },
      ease: "power3.inOut"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-500 hover:shadow-2xl hover:scale-110 group ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <svg
        className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>

      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100"></span>
    </button>
  );
}

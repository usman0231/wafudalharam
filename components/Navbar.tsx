"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
        : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Wafud Al Haram"
            width={200}
            height={60}
            className={`h-12 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
            priority
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "About Us", "Packages", "Gallery", "Contact Us"].map((item, index) => (
            <Link
              key={index}
              href={item === "Home" ? "/" : item === "About Us" ? "/about" : `/${item.toLowerCase().replace(/ /g, "-")}`}
              className={`font-medium transition-all duration-300 relative group ${
                scrolled ? "text-gray-800 hover:text-[#b8956a]" : "text-white hover:text-[#b8956a]"
              }`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b8956a] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
        >
          <svg
            className={`w-6 h-6 transition-colors ${scrolled ? "text-gray-800" : "text-white"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
        mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="container mx-auto px-6 py-4 space-y-4">
          {["Home", "About Us", "Packages", "Gallery", "Contact Us"].map((item, index) => (
            <Link
              key={index}
              href={item === "Home" ? "/" : item === "About Us" ? "/about" : `/${item.toLowerCase().replace(/ /g, "-")}`}
              className="block text-gray-800 hover:text-[#b8956a] font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

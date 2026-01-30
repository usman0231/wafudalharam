"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch {
      alert("Failed to subscribe. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current.querySelectorAll('.footer-col'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white pt-20 pb-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#b8956a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0d6e6e]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2 footer-col">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="Wafud Al Haram"
                width={180}
                height={60}
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4 flex items-start gap-2">
              <svg className="w-5 h-5 text-[#b8956a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Jl. Hasanuddin No. 27, RT 05/RW 01, Kel. Seturan, Kec. Depok, Kota Sleman
            </p>
            <a href="tel:+6285012345678" className="text-[#b8956a] text-sm mb-3 hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +6285012345678
            </a>
            <a href="mailto:wafudalharam@example.com" className="text-gray-400 text-sm mb-6 hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              wafudalharam@example.com
            </a>
            <p className="text-gray-500 text-xs mb-8 leading-relaxed">
              Serving with all our heart, Wafud Al Haram is here as a loyal companion for your Hajj and Umrah journey. Entrust your precious spiritual moments to us for a memorable worship experience.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                { name: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#b8956a] hover:to-[#0d6e6e] flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="text-white font-bold mb-6 text-lg">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Packages', href: '/packages' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Contact Us', href: '/contact-us' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-[#b8956a] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#b8956a] group-hover:w-3 transition-all duration-300"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div className="footer-col">
            <h4 className="text-white font-bold mb-6 text-lg">Packages</h4>
            <ul className="space-y-3">
              {[
                { name: 'Umrah Regular', href: '/packages' },
                { name: 'Umrah Plus', href: '/packages' },
                { name: 'Umrah VIP', href: '/packages' },
                { name: 'Hajj Packages', href: '/packages' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-[#b8956a] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#b8956a] group-hover:w-3 transition-all duration-300"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-3">
              {[
                { name: 'FAQ', href: '/faq' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms-conditions' },
                { name: 'Contact Support', href: '/contact-us' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-[#b8956a] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#b8956a] group-hover:w-3 transition-all duration-300"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-col mt-16 p-8 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold text-xl mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 text-sm">Get the latest updates on packages, promotions, and spiritual journey tips.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-3 bg-green-500/20 border border-green-500/30 px-6 py-3 rounded-full">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-green-400 font-medium text-sm">Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 md:w-72 px-5 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#b8956a] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-3 bg-gradient-to-r from-[#b8956a] to-[#a07d5a] text-white font-semibold text-sm rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubscribing ? (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  ) : (
                    <>
                      Subscribe
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Wafud Al Haram. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-gray-500 text-sm hover:text-[#b8956a] transition-colors">Privacy Policy</Link>
              <Link href="/terms-conditions" className="text-gray-500 text-sm hover:text-[#b8956a] transition-colors">Terms & Conditions</Link>
              <Link href="/faq" className="text-gray-500 text-sm hover:text-[#b8956a] transition-colors">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

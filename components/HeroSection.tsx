"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HeroSection() {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasSnapped, setHasSnapped] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/final2.mp4");

  // Handle responsive video source
  useEffect(() => {
    const updateVideoSource = () => {
      const width = window.innerWidth;
      let newSrc = "/final2.mp4"; // desktop default

      if (width < 640) {
        newSrc = "/final2_mobile.mp4";
      } else if (width < 1024) {
        newSrc = "/final2_tab.mp4";
      }

      if (newSrc !== videoSrc) {
        setVideoSrc(newSrc);
      }
    };

    updateVideoSource();
    window.addEventListener("resize", updateVideoSource);
    return () => window.removeEventListener("resize", updateVideoSource);
  }, [videoSrc]);

  // Handle video source change
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {
        // Ignore AbortError - happens when video is interrupted
      });
    }
  }, [videoSrc]);

  useEffect(() => {
    // Auto-scroll snap when user scrolls a little
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 15; // Scroll 50px to trigger snap
      const targetScroll = window.innerHeight + 600; // Scroll to cut off plane image

      if (scrollY > threshold && scrollY < targetScroll && !hasSnapped) {
        setHasSnapped(true);
        gsap.to(window, {
          duration: 2,
          scrollTo: { y: targetScroll, autoKill: false },
          ease: "power2.out"
        });
      }

      // Reset snap state when user scrolls back to top
      if (scrollY < 10) {
        setHasSnapped(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll-triggered opacity fade for the entire section
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top -50%",   // Start fading after 50% of the page is scrolled
          end: "bottom top",   // End fading when the section's bottom reaches the top of the viewport
          scrub: 1,            // Smooth animation over scroll
          markers: false,      // Set to true for debugging purposes
        }
      });
    }

    // Animate buttons
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }

    // Animate stats cards
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 80, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 1
        }
      );
    }

    // Animate counter numbers
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach((counter) => {
      const target = counter.getAttribute('data-target');
      if (target) {
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: parseInt(target),
            duration: 2,
            delay: 1.5,
            snap: { innerText: 1 },
            ease: "power2.out"
          }
        );
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasSnapped]);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden sticky top-0">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"></div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#b8956a]/30 rounded-full float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/20 rounded-full float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-[#0d6e6e]/20 rounded-full float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Content - Buttons Only */}
      <div ref={buttonsRef} className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 mt-32 sm:mt-[-8rem] md:mt-64">
        <Link
          href="/contact"
          className="btn-shine bg-white/95 backdrop-blur-md text-gray-800 px-6 py-2.5 rounded-full font-medium text-sm flex items-center justify-between w-[170px] hover:bg-white transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border border-white/50 pulse-glow"
        >
          <span>Contact Us</span>
          <div className="bg-gray-900 rounded-full p-1.5 ml-auto">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
        </Link>
        <Link
          href="/explore"
          className="btn-shine bg-white/20 backdrop-blur-xl text-white px-6 py-2.5 rounded-full font-medium text-sm flex items-center justify-between w-[170px] hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border border-white/40"
        >
          <span>Explore</span>
          <div className="bg-white rounded-full p-1.5 ml-auto">
            <svg className="w-3.5 h-3.5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-3 sm:px-4">
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <div className="card-hover bg-white/95 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-[#b8956a]/20">
            <h3 className="text-xl sm:text-3xl font-bold text-gradient mb-1 sm:mb-2">
              <span className="counter-number" data-target="10">0</span>+
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Years of Experience</p>
            <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed hidden sm:block">
              Over the years we have been accompanying pilgrims from all over the country.
            </p>
          </div>
          <div className="card-hover bg-white/95 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-[#b8956a]/20">
            <h3 className="text-xl sm:text-3xl font-bold text-gradient mb-1 sm:mb-2">
              <span className="counter-number" data-target="1200">0</span>+
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Hajj & Umrah</p>
            <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed hidden sm:block">
              Thousands of pilgrims have journeyed with us and are still in contact.
            </p>
          </div>
          <div className="card-hover bg-white/95 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-[#b8956a]/20">
            <h3 className="text-xl sm:text-3xl font-bold text-gradient mb-1 sm:mb-2">
              <span className="counter-number" data-target="100">0</span>%
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Depart</p>
            <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed hidden sm:block">
              We have not left anyone behind on any of our departures.
            </p>
          </div>
          <div className="card-hover bg-white/95 backdrop-blur-md p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-[#b8956a]/20">
            <h3 className="text-xl sm:text-3xl font-bold text-gradient mb-1 sm:mb-2">
              <span className="counter-number" data-target="4">0</span>.7
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Rating</p>
            <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed hidden sm:block">
              A high rating that makes us feel we have fulfilled our mission.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

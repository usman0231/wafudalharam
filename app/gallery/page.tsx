"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: "/IMG_8873.JPG.jpeg", title: "Masjid al-Haram", category: "makkah" },
  { src: "/IMG_8895.JPG.jpeg", title: "Kaaba View", category: "makkah" },
  { src: "/IMG_8005.JPG.jpeg", title: "Sacred Moments", category: "makkah" },
  { src: "/IMG_8568.JPG.jpeg", title: "Pilgrimage Journey", category: "journey" },
  { src: "/IMG_8573.JPG.jpeg", title: "Spiritual Experience", category: "journey" },
  { src: "/IMG_8575.JPG.jpeg", title: "Holy Land", category: "makkah" },
  { src: "/IMG_8579.JPG.jpeg", title: "Together in Faith", category: "pilgrims" },
  { src: "/IMG_8580.JPG.jpeg", title: "Blessed Moments", category: "pilgrims" },
  { src: "/IMG_8581.JPG.jpeg", title: "Divine Connection", category: "makkah" },
  { src: "/IMG_8592.JPG.jpeg", title: "Sacred Journey", category: "journey" },
  { src: "/madina visit.jpeg", title: "Madinah Visit", category: "madinah" },
  { src: "/makkah_journey.jpeg", title: "Makkah Journey", category: "makkah" },
  { src: "/night_prayers.jpeg", title: "Night Prayers", category: "makkah" },
  { src: "/sacred_memories.jpeg", title: "Sacred Memories", category: "pilgrims" },
  { src: "/Together in Faith.jpeg", title: "Unity in Worship", category: "pilgrims" },
  { src: "/journey.png", title: "The Journey Begins", category: "journey" },
];

const categories = [
  { key: "all", label: "All Photos" },
  { key: "makkah", label: "Makkah" },
  { key: "madinah", label: "Madinah" },
  { key: "journey", label: "Journey" },
  { key: "pilgrims", label: "Pilgrims" },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredImages = activeFilter === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  useEffect(() => {
    // Hero parallax
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.hero-bg'), {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Gallery animation
    if (galleryRef.current) {
      gsap.fromTo(
        galleryRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [activeFilter]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="hero-bg absolute inset-0 scale-110">
          <Image
            src="/IMG_8873.JPG.jpeg"
            alt="Gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 font-medium text-sm mb-6 border border-white/20">
            Memories & Moments
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Capturing the sacred moments of our pilgrims&apos; spiritual journeys
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeFilter === cat.key
                    ? "bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image.src)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className={`relative ${index % 5 === 0 ? "h-[400px] md:h-[500px]" : "h-[200px] md:h-[250px]"}`}>
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-white font-semibold text-lg text-center">{image.title}</h3>
                    <span className="text-white/70 text-sm capitalize">{image.category}</span>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Gallery Image"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Own Memories?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Join us on a spiritual journey and be part of our growing family
          </p>
          <a
            href="/packages"
            className="inline-flex items-center gap-3 bg-white text-[#b8956a] px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View Our Packages
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

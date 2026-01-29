"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Documentation() {
  const titleRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ image: string; label: string } | null>(null);

  const photosRow1 = [
    { id: 1, image: "/makkah_journey.jpeg", label: "Makkah Journey" },
    { id: 2, image: "/madina visit.jpeg", label: "Madinah Visit" },
    { id: 3, image: "/sacred_memories.jpeg", label: "Sacred Memories" },
  ];

  const photosRow2 = [
    { id: 4, image: "/night_prayers.jpeg", label: "Night Prayer" },
    { id: 5, image: "/Together in Faith.jpeg", label: "Together in Faith" },
  ];

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );
    }

    if (row1Ref.current) {
      gsap.fromTo(
        row1Ref.current.children,
        { opacity: 0, scale: 0.8, rotateY: -20 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: row1Ref.current,
            start: "top 75%",
          }
        }
      );
    }

    if (row2Ref.current) {
      gsap.fromTo(
        row2Ref.current.children,
        { opacity: 0, scale: 0.8, rotateY: -20 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: row2Ref.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const PhotoCard = ({ photo, onClick }: { photo: { id: number; image: string; label: string }; onClick: () => void }) => (
    <div
      className="card-hover relative aspect-square rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
      onClick={onClick}
    >
      {/* Image */}
      <Image
        src={photo.image}
        alt={photo.label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* Label at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-white font-semibold text-lg">{photo.label}</p>
        <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to view</p>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </div>
    </div>
  );

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#b8956a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#0d6e6e]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div ref={titleRef} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
              Gallery
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-gradient">Documentation</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Sacred memories are immortalized with every step, bearing witness to your spiritual journey.
            </p>
          </div>

          {/* Row 1 - 3 Images */}
          <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {photosRow1.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => setSelectedImage({ image: photo.image, label: photo.label })}
              />
            ))}
          </div>

          {/* Row 2 - 2 Images Centered */}
          <div ref={row2Ref} className="flex justify-center gap-6">
            {photosRow2.map((photo) => (
              <div key={photo.id} className="w-full md:w-[calc(33.333%-0.5rem)] max-w-md">
                <PhotoCard
                  photo={photo}
                  onClick={() => setSelectedImage({ image: photo.image, label: photo.label })}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.image}
              alt={selectedImage.label}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl"
            />

            {/* Label */}
            <div className="mt-4 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
              <p className="text-white font-semibold text-lg">{selectedImage.label}</p>
            </div>
          </div>

          {/* Navigation hint */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            Press ESC or click outside to close
          </p>
        </div>
      )}
    </>
  );
}

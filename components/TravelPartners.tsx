"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "Pullman", logo: "/flyingPartners/pullman.png" },
  { name: "Emirates", logo: "/flyingPartners/emirates.png" },
  { name: "Saudia", logo: "/flyingPartners/Saudi Arabian Airlines Logo.png" },
  { name: "Etihad", logo: "/flyingPartners/etihad-airways-logo-png_seeklogo-177330.png" },
  { name: "Al Massa", logo: "/flyingPartners/d0d3ae_c15d4cc44a3a4e9f9338aceae3e75acb~mv2.png" },
  { name: "Scoot", logo: "/flyingPartners/Scoot-Logo.wine.png" },
  { name: "Garuda Indonesia", logo: "/flyingPartners/garuda-indonesia-logo.avif" },
  { name: "Oman Air", logo: "/flyingPartners/Oman_Air-Logo.png" },
];

export default function TravelPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

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

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="">
      {/* Background Decoration */}
      <div className="h-[50vh] relative">
        <div ref={planeRef} className="absolute bottom-[-24rem] left-1/2 transform -translate-x-1/2">
          <Image src="/finalPlane.png" alt="plane image" height={760} width={760} />
        </div>
      </div>

      <div className="py-16 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#b8956a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0d6e6e]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div ref={titleRef}>
            <h2 className="text-5xl font-bold text-center text-gray-900 mb-4 pt-60">
              Our Travel <span className="text-gradient">Partner</span>
            </h2>
            <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg">
              Together with the best partners, we present a more comfortable and reliable worship experience.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="card-hover bg-white rounded-2xl p-6 flex items-center justify-center border border-gray-100 shadow-sm min-h-[140px] group"
              >
                <div className="relative w-full h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

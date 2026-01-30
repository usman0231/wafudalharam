"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    title: "Experienced & Trusted",
    description: "With more than 10 years of experience, Wafud Al Haram has served thousands of pilgrims from various regions. Our commitment is to provide the best service that is trustworthy, professional, and always prioritizes your satisfaction and comfort during worship."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
      </svg>
    ),
    title: "Experienced Worship Mentor",
    description: "Each trip you will be accompanied by knowledgeable, experienced and friendly worship guides. They are ready to help, guide and answer your spiritual questions to make your worship more calm and solemn."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
    title: "Comfortable & Strategic Accommodation",
    description: "We only choose lodgings that are clean, comfortable, and close to the Grand Mosque and the Prophet's Mosque. The strategic location makes it easy for you to worship without having to travel long distances or feel tired in the middle of worship."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    ),
    title: "Definite Departure Schedule",
    description: "Your departure is our priority. With an organized system and clear legality, every pilgrim we make sure departs on time without delay, so you can worship with peace of mind from the start."
  }
];

export default function WhyChooseUs() {
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pin the image while scrolling through the section
    if (imageRef.current && sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: imageRef.current,
        pinSpacing: false,
      });
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          }
        }
      );
    }

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#b8956a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0d6e6e]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left - Pinned Image */}
          <div className="relative md:h-auto">
            <div ref={imageRef} className="md:pt-24">
              <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/IMG_8873.JPG.jpeg"
                  alt="Kaaba - Masjid al-Haram"
                  fill
                  className="object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Text Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white/90 text-sm leading-relaxed">
                    At Wafud Al Haram, we understand that Hajj and Umrah is a spiritual journey
                    that requires more than just ordinary travel services. That&apos;s why we deliver
                    the best experience that prioritizes comfort, safety, and devotion in every process.
                  </p>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute right-2 md:-right-6 top-1/4 bg-white rounded-2xl shadow-xl p-4 float hidden md:block">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">10+</p>
                  <p className="text-xs text-gray-500">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="md:min-h-[800px]">
            <div ref={contentRef} className="bg-white/50 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none mb-6 md:mb-0">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Why Choose <span className="text-gradient">Wafud Al Haram?</span>
              </h2>
              <p className="text-gray-600 text-lg mb-10">
                Because we don&apos;t just drive, but accompany you every step of the way with all our hearts.
              </p>
            </div>

            {/* Features List */}
            <div ref={featuresRef} className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex gap-5 p-5 rounded-2xl bg-white/50 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer border border-transparent hover:border-[#b8956a]/20"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-2xl flex items-center justify-center text-[#b8956a] group-hover:from-[#b8956a] group-hover:to-[#0d6e6e] group-hover:text-white transition-all duration-500">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#b8956a] transition-colors">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

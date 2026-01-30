"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          }
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#b8956a]/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/journey.png"
                alt="Pilgrims Journey"
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="p-8 w-full">
                  <p className="text-white/90 text-sm leading-relaxed">
                    Experience the journey of a lifetime with Wafud Al Haram - where every step is guided by faith and excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 right-2 sm:-right-6 bg-white rounded-2xl shadow-xl p-4 float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Trusted</p>
                  <p className="text-xs text-gray-500">10+ Years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
              Wafud Al Haram
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              A Meaningful Journey with <span className="text-gradient">Wafud Al Haram</span> Expertise
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
              Wafud Al Haram understands that Hajj and Umrah journeys are not just ordinary trips - they
              are sacred moments that only happen in a lifetime for many people.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              With more than a decade of experience, as well as a professional and
              friendly team, we are ready to accompany you from departure, to returning to your
              homeland with a calm heart and perfect worship.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#b8956a]/10 transition-colors">
                <div className="w-10 h-10 bg-[#b8956a]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Professional Team</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#0d6e6e]/10 transition-colors">
                <div className="w-10 h-10 bg-[#0d6e6e]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d6e6e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#b8956a]/10 transition-colors">
                <div className="w-10 h-10 bg-[#b8956a]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Best Hotels</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#0d6e6e]/10 transition-colors">
                <div className="w-10 h-10 bg-[#0d6e6e]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0d6e6e]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Expert Guides</span>
              </div>
            </div>

            <Link
              href="/about"
              className="btn-shine inline-flex items-center gap-3 bg-gradient-to-r from-[#b8956a] to-[#a07d5a] text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              More About Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

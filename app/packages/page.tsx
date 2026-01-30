"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PackageInquiryModal from "@/components/PackageInquiryModal";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    id: 1,
    name: "Umrah Regular",
    subtitle: "9 Days Journey",
    price: "Rp 28.500.000",
    oldPrice: "Rp 38.500.000",
    dpStart: "DP start from 5 Million",
    days: "9 Days",
    date: "02 December 2024",
    hotel: "4-Star Hotel Near Haram",
    roomType: "Quad Room",
    features: ["Return Flight Tickets", "4-Star Accommodation", "Daily Meals", "Umrah Visa", "Transport"],
    popular: false,
    icon: "mosque",
    category: "umrah"
  },
  {
    id: 2,
    name: "Umrah Plus",
    subtitle: "12 Days Journey",
    price: "Rp 35.500.000",
    oldPrice: "Rp 45.500.000",
    dpStart: "DP start from 7 Million",
    days: "12 Days",
    date: "15 December 2024",
    hotel: "5-Star Hotel Near Haram",
    roomType: "Triple Room",
    features: ["Return Flight Tickets", "5-Star Accommodation", "Full Board Meals", "Umrah Visa", "City Tour", "Ziyarah"],
    popular: true,
    icon: "star",
    category: "umrah"
  },
  {
    id: 3,
    name: "Umrah VIP",
    subtitle: "14 Days Journey",
    price: "Rp 55.000.000",
    oldPrice: "Rp 65.000.000",
    dpStart: "DP start from 10 Million",
    days: "14 Days",
    date: "20 December 2024",
    hotel: "5-Star Premium Hotel",
    roomType: "Double Room",
    features: ["Business Class Flight", "Premium 5-Star Hotel", "Private Transport", "Personal Guide", "All Meals", "Exclusive Ziyarah"],
    popular: false,
    icon: "crown",
    category: "umrah"
  },
  {
    id: 4,
    name: "Hajj Regular",
    subtitle: "40 Days Journey",
    price: "Rp 180.000.000",
    oldPrice: "Rp 200.000.000",
    dpStart: "DP start from 50 Million",
    days: "40 Days",
    date: "June 2025",
    hotel: "Standard Mina Tent & Hotels",
    roomType: "Shared Room",
    features: ["Complete Hajj Service", "Standard Accommodation", "All Rituals Guided", "Experienced Mutawwif", "Medical Support", "Full Board"],
    popular: false,
    icon: "kaaba",
    category: "hajj"
  },
  {
    id: 5,
    name: "Hajj Plus",
    subtitle: "45 Days Journey",
    price: "Rp 250.000.000",
    oldPrice: "Rp 280.000.000",
    dpStart: "DP start from 70 Million",
    days: "45 Days",
    date: "June 2025",
    hotel: "Premium Mina Tent & 5-Star Hotels",
    roomType: "Triple Room",
    features: ["Complete Hajj Service", "Premium Accommodation", "All Rituals Guided", "Senior Mutawwif", "24/7 Medical Support", "Full Board", "Exclusive Ziyarah"],
    popular: true,
    icon: "kaaba",
    category: "hajj"
  },
  {
    id: 6,
    name: "Hajj VIP",
    subtitle: "50 Days Journey",
    price: "Rp 350.000.000",
    oldPrice: "Rp 400.000.000",
    dpStart: "DP start from 100 Million",
    days: "50 Days",
    date: "June 2025",
    hotel: "VIP Mina Tent & Luxury Hotels",
    roomType: "Double Room",
    features: ["Complete Hajj Service", "VIP Accommodation", "Private Guide", "Personal Mutawwif", "Premium Medical", "Private Transport", "All Inclusive"],
    popular: false,
    icon: "crown",
    category: "hajj"
  }
];

export default function PackagesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    id: number;
    name: string;
    price: string;
    days: string;
  } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredPackages = activeFilter === "all"
    ? packages
    : packages.filter(pkg => pkg.category === activeFilter);

  const handleChoosePackage = (pkg: typeof packages[0]) => {
    setSelectedPackage({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      days: pkg.days,
    });
    setIsModalOpen(true);
  };

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

    // Cards animation
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%"
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
            alt="Packages"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 font-medium text-sm mb-6 border border-white/20">
            Hajj & Umrah Packages
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-gradient">Packages</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Choose the perfect package for your spiritual journey to the Holy Land
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40 backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center gap-4">
            {[
              { key: "all", label: "All Packages" },
              { key: "umrah", label: "Umrah" },
              { key: "hajj", label: "Hajj" }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#b8956a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0d6e6e]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  pkg.popular ? "ring-2 ring-[#b8956a]" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#b8956a] to-[#d4a574] text-white text-xs font-bold py-2.5 text-center z-10">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className={`${pkg.popular ? "pt-14" : "pt-8"} px-8 pb-6 bg-gradient-to-br from-[#faf6f1] to-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {pkg.icon === "mosque" && (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.6.8 3 2 3.8V11H3v2h2v8h14v-8h2v-2h-6.5v-.7c1.2-.8 2-2.2 2-3.8C16.5 4 14.5 2 12 2zm0 2c1.4 0 2.5 1.1 2.5 2.5S13.4 9 12 9s-2.5-1.1-2.5-2.5S10.6 4 12 4z"/>
                        </svg>
                      )}
                      {pkg.icon === "star" && (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      {pkg.icon === "crown" && (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                        </svg>
                      )}
                      {pkg.icon === "kaaba" && (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L3 7v14h18V7l-9-5zm0 2.2L18 8v2H6V8l6-3.8zM6 12h12v7H6v-7z"/>
                        </svg>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      pkg.category === "hajj"
                        ? "bg-[#0d6e6e]/10 text-[#0d6e6e]"
                        : "bg-[#b8956a]/10 text-[#b8956a]"
                    }`}>
                      {pkg.category === "hajj" ? "Hajj" : "Umrah"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                  <p className="text-[#b8956a] font-medium">{pkg.subtitle}</p>
                </div>

                {/* Price */}
                <div className="px-8 py-6 border-t border-gray-100">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-sm text-red-400 line-through">{pkg.oldPrice}</span>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">Save 25%</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{pkg.price}</p>
                  <p className="text-sm text-[#0d6e6e] font-medium mt-1">{pkg.dpStart}</p>
                </div>

                {/* Details */}
                <div className="px-8 py-4 space-y-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-800">{pkg.days}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Accommodation</p>
                      <p className="font-semibold text-gray-800">{pkg.hotel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Departure</p>
                      <p className="font-semibold text-gray-800">{pkg.date}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="px-8 py-5 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What&apos;s Included</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#0d6e6e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {pkg.features.length > 4 && (
                    <p className="text-xs text-[#b8956a] font-medium mt-3">+{pkg.features.length - 4} more benefits</p>
                  )}
                </div>

                {/* CTA */}
                <div className="p-6">
                  <button
                    onClick={() => handleChoosePackage(pkg)}
                    className="btn-shine w-full bg-gradient-to-r from-[#b8956a] to-[#a07d5a] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300 group-hover:from-[#a07d5a] group-hover:to-[#b8956a]"
                  >
                    Choose Package
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Book With <span className="text-gradient">Us?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "shield", title: "100% Secure", desc: "Licensed & certified travel agency" },
              { icon: "support", title: "24/7 Support", desc: "Round the clock assistance" },
              { icon: "price", title: "Best Prices", desc: "Competitive & transparent pricing" },
              { icon: "experience", title: "10+ Years", desc: "Trusted experience in pilgrimage" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-[#b8956a]/5 hover:to-[#0d6e6e]/5 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon === "shield" && (
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.icon === "support" && (
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  )}
                  {item.icon === "price" && (
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.icon === "experience" && (
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Choosing a Package?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Our team is ready to help you find the perfect package for your spiritual journey
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-3 bg-white text-[#b8956a] px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Contact Us Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
      <BackToTop />

      {/* Package Inquiry Modal */}
      <PackageInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}

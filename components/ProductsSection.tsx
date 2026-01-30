"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PackageInquiryModal from "./PackageInquiryModal";

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
    icon: "mosque"
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
    icon: "star"
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
    icon: "crown"
  },
  {
    id: 4,
    name: "Hajj Package",
    subtitle: "40 Days Journey",
    price: "Rp 180.000.000",
    oldPrice: "Rp 200.000.000",
    dpStart: "DP start from 50 Million",
    days: "40 Days",
    date: "June 2025",
    hotel: "Premium Mina Tent & Hotels",
    roomType: "Shared Room",
    features: ["Complete Hajj Service", "Premium Accommodation", "All Rituals Guided", "Experienced Mutawwif", "Medical Support", "Full Board"],
    popular: false,
    icon: "kaaba"
  }
];

export default function ProductsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    id: number;
    name: string;
    price: string;
    days: string;
  } | null>(null);

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
        { opacity: 0, y: 80, rotateY: -10 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-[#b8956a]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0d6e6e]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
            Our Packages
          </span>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Products</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Together with the best partners, we present a more comfortable and reliable worship experience.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`card-hover relative bg-[#faf6f1] rounded-3xl overflow-hidden border border-[#b8956a]/20 shadow-lg hover:shadow-2xl transition-all duration-500 ${pkg.popular ? 'ring-2 ring-[#b8956a]' : ''}`}
            >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#b8956a] to-[#d4a574] text-white text-xs font-bold py-2 text-center">
                    Most Popular
                  </div>
                )}

                {/* Header with Icon */}
                <div className={`${pkg.popular ? 'pt-12' : 'pt-6'} px-6 pb-4`}>
                  <div className="w-14 h-14 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    {pkg.icon === "mosque" && (
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.6.8 3 2 3.8V11H3v2h2v8h14v-8h2v-2h-6.5v-.7c1.2-.8 2-2.2 2-3.8C16.5 4 14.5 2 12 2zm0 2c1.4 0 2.5 1.1 2.5 2.5S13.4 9 12 9s-2.5-1.1-2.5-2.5S10.6 4 12 4z"/>
                      </svg>
                    )}
                    {pkg.icon === "star" && (
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                    {pkg.icon === "crown" && (
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
                      </svg>
                    )}
                    {pkg.icon === "kaaba" && (
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L3 7v14h18V7l-9-5zm0 2.2L18 8v2H6V8l6-3.8zM6 12h12v7H6v-7z"/>
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                  <p className="text-sm text-[#b8956a] font-medium">{pkg.subtitle}</p>
                </div>

                {/* Price Section */}
                <div className="px-6 py-4 border-t border-[#b8956a]/10">
                  <p className="text-xs text-red-400 line-through">{pkg.oldPrice}</p>
                  <p className="text-3xl font-bold text-gray-900">{pkg.price}</p>
                  <p className="text-sm text-[#0d6e6e] font-medium mt-1">{pkg.dpStart}</p>
                </div>

                {/* Package Details */}
                <div className="px-6 py-4 space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-semibold text-gray-800">{pkg.days}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Accommodation</p>
                      <p className="text-sm font-semibold text-gray-800">{pkg.hotel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Departure</p>
                      <p className="text-sm font-semibold text-gray-800">{pkg.date}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 py-4 bg-[#f5f0ea]">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Includes</p>
                  <div className="space-y-2">
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#b8956a]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {pkg.features.length > 4 && (
                      <p className="text-xs text-[#0d6e6e] font-medium pl-7">+{pkg.features.length - 4} more benefits</p>
                    )}
                  </div>
                </div>

                {/* Choose Package Button */}
                <div className="p-6 pt-4">
                  <button
                    onClick={() => handleChoosePackage(pkg)}
                    className="btn-shine w-full bg-gradient-to-r from-[#b8956a] to-[#a07d5a] text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    Choose Package
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Inquiry Modal */}
      <PackageInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </section>
  );
}

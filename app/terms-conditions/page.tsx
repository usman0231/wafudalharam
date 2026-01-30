"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Booking & Reservations",
    content: [
      "All bookings are subject to availability and confirmation by Wafud Al Haram.",
      "A deposit is required to secure your booking. The deposit amount varies by package.",
      "Full payment must be received before the specified deadline, typically 30 days before departure.",
      "Booking confirmations will be sent via email within 48 hours of receiving your deposit.",
      "All prices are quoted in Indonesian Rupiah (IDR) unless otherwise specified."
    ]
  },
  {
    title: "Payment Terms",
    content: [
      "We accept bank transfers, credit cards, and installment payment plans.",
      "Installment plans are available for selected packages with prior approval.",
      "All payments are non-refundable unless otherwise stated in our cancellation policy.",
      "Additional fees may apply for currency conversion or international transactions.",
      "Payment receipts will be issued for all transactions."
    ]
  },
  {
    title: "Cancellation Policy",
    content: [
      "Cancellations made 60+ days before departure: 75% refund (minus admin fees)",
      "Cancellations made 30-59 days before departure: 50% refund",
      "Cancellations made 15-29 days before departure: 25% refund",
      "Cancellations made less than 15 days before departure: No refund",
      "All cancellation requests must be submitted in writing.",
      "Refunds will be processed within 14 business days."
    ]
  },
  {
    title: "Travel Documents",
    content: [
      "Pilgrims are responsible for ensuring valid passports with at least 6 months validity.",
      "We will assist with visa applications but cannot guarantee approval.",
      "Any visa rejection due to incomplete or false information is the pilgrim's responsibility.",
      "Additional documentation may be required by Saudi authorities.",
      "Lost or stolen travel documents during the trip are the pilgrim's responsibility."
    ]
  },
  {
    title: "Health & Medical Requirements",
    content: [
      "Pilgrims must meet all health requirements set by Saudi Arabian authorities.",
      "Required vaccinations must be completed before departure.",
      "Pilgrims with medical conditions must inform us in advance.",
      "Travel insurance with medical coverage is mandatory for all pilgrims.",
      "We reserve the right to refuse service if health requirements are not met."
    ]
  },
  {
    title: "Accommodation & Services",
    content: [
      "Hotel accommodations are subject to availability and may be substituted with equivalent options.",
      "Room sharing arrangements will be made unless private rooms are specifically booked.",
      "Meal plans are as specified in your package details.",
      "Transportation services are shared unless private transfers are booked.",
      "Itinerary changes may occur due to circumstances beyond our control."
    ]
  },
  {
    title: "Liability & Responsibility",
    content: [
      "Wafud Al Haram acts as an intermediary between pilgrims and service providers.",
      "We are not liable for delays, cancellations, or changes made by airlines, hotels, or authorities.",
      "Personal belongings and valuables are the pilgrim's responsibility.",
      "We recommend purchasing comprehensive travel insurance.",
      "Force majeure events release us from contractual obligations."
    ]
  },
  {
    title: "Code of Conduct",
    content: [
      "Pilgrims must respect Islamic values and Saudi Arabian laws at all times.",
      "Inappropriate behavior may result in immediate termination of services without refund.",
      "Group schedules and guidelines must be followed for the benefit of all pilgrims.",
      "Respect for fellow pilgrims and staff is expected.",
      "Any illegal activities will be reported to relevant authorities."
    ]
  }
];

export default function TermsConditionsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.terms-section'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 font-medium text-sm mb-6 border border-white/20">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & <span className="text-gradient">Conditions</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before booking your pilgrimage with us.
          </p>
          <p className="text-white/50 text-sm mt-6">
            Last updated: January 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Introduction */}
          <div className="mb-12 p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
            <p className="text-gray-600 leading-relaxed">
              By booking a Hajj or Umrah package with Wafud Al Haram, you agree to be bound by these
              Terms and Conditions. These terms constitute a legally binding agreement between you
              (&quot;the Pilgrim&quot;) and Wafud Al Haram (&quot;the Company&quot;). Please ensure you understand
              and accept all terms before proceeding with your booking.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="mb-12 p-8 bg-gradient-to-br from-[#b8956a]/5 to-[#0d6e6e]/5 rounded-3xl border border-[#b8956a]/20">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#b8956a] transition-colors py-1"
                >
                  <span className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-xs font-bold text-[#b8956a]">
                    {index + 1}
                  </span>
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div ref={contentRef} className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                id={`section-${index}`}
                className="terms-section p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#b8956a]/20 transition-all duration-300 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-xl flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b8956a] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Agreement Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#0d6e6e]/10 to-[#b8956a]/10 rounded-3xl border border-[#0d6e6e]/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Agreement</h2>
                <p className="text-gray-600">
                  By proceeding with a booking, you confirm that you have read, understood, and agree to
                  be bound by these Terms and Conditions. If you do not agree with any part of these terms,
                  please do not proceed with your booking.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Have questions about our terms?</p>
            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] rounded-full text-white font-semibold hover:shadow-xl transition-all"
            >
              Contact Our Team
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

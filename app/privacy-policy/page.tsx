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
    title: "Information We Collect",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    content: [
      "Personal identification information (Name, email address, phone number, passport details)",
      "Travel preferences and history",
      "Payment and billing information",
      "Communication records between you and our team",
      "Website usage data and cookies"
    ]
  },
  {
    title: "How We Use Your Information",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
    content: [
      "To process and manage your Hajj/Umrah bookings",
      "To communicate important travel information and updates",
      "To process payments and send invoices",
      "To provide customer support and respond to inquiries",
      "To improve our services and personalize your experience",
      "To comply with legal and regulatory requirements"
    ]
  },
  {
    title: "Data Protection & Security",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    content: [
      "We implement industry-standard encryption for all data transmissions",
      "Your payment information is processed through secure, PCI-compliant payment gateways",
      "Access to personal data is restricted to authorized personnel only",
      "Regular security audits and updates are performed",
      "We maintain secure backup systems to prevent data loss"
    ]
  },
  {
    title: "Information Sharing",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
      </svg>
    ),
    content: [
      "Airlines and hotels for booking confirmations",
      "Saudi Arabian authorities for visa processing",
      "Payment processors for transaction handling",
      "Legal authorities when required by law",
      "We never sell your personal information to third parties"
    ]
  },
  {
    title: "Your Rights",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
    content: [
      "Access your personal data we hold",
      "Request correction of inaccurate information",
      "Request deletion of your data (subject to legal requirements)",
      "Opt-out of marketing communications",
      "Lodge a complaint with relevant authorities"
    ]
  },
  {
    title: "Cookies Policy",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
      </svg>
    ),
    content: [
      "We use essential cookies to ensure website functionality",
      "Analytics cookies help us understand how visitors use our site",
      "You can manage cookie preferences through your browser settings",
      "Disabling cookies may affect some website features"
    ]
  }
];

export default function PrivacyPolicyPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.policy-section'),
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
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
              Wafud Al Haram (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              use our services for Hajj and Umrah pilgrimages. Please read this policy carefully to understand
              our practices regarding your personal data.
            </p>
          </div>

          {/* Sections */}
          <div ref={contentRef} className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="policy-section p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#b8956a]/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-2xl flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#0d6e6e] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-3xl border border-[#b8956a]/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About This Policy?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:privacy@wafudalharam.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-[#b8956a] font-medium hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                privacy@wafudalharam.com
              </a>
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] rounded-full text-white font-medium hover:shadow-lg transition-all"
              >
                Contact Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

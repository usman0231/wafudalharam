"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

gsap.registerPlugin(ScrollTrigger);

const faqCategories = [
  {
    name: "General",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    faqs: [
      {
        q: "What is Wafud Al Haram?",
        a: "Wafud Al Haram is a trusted Hajj and Umrah travel agency with over 10 years of experience. We provide comprehensive pilgrimage services including visa processing, flights, accommodation, and guided tours to help Muslims fulfill their religious obligations."
      },
      {
        q: "How do I book a package?",
        a: "You can book through our website by selecting a package and filling out the booking form, calling our office directly, or visiting us in person. Our team will guide you through the entire booking process and answer any questions you may have."
      },
      {
        q: "What makes Wafud Al Haram different from other agencies?",
        a: "We pride ourselves on personalized service, experienced guides, premium accommodations close to the holy sites, transparent pricing with no hidden fees, and a 100% departure success rate. Our pilgrims become part of our extended family."
      },
      {
        q: "Do you offer group or private packages?",
        a: "Yes, we offer both group packages and private/family packages. Group packages are more economical, while private packages offer more flexibility and personalized attention. Contact us to discuss which option suits you best."
      }
    ]
  },
  {
    name: "Booking & Payment",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers, credit/debit cards, and offer installment payment plans for selected packages. All payments are processed securely. You will receive a receipt for every transaction."
      },
      {
        q: "How much deposit is required?",
        a: "The deposit amount varies by package, typically ranging from Rp 5 million to Rp 50 million. This deposit secures your booking and is deducted from the total package price. Full payment is required 30 days before departure."
      },
      {
        q: "Can I pay in installments?",
        a: "Yes, we offer flexible installment plans for most packages. You can spread your payments over several months leading up to your departure. Contact our team to discuss an installment plan that works for you."
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellation refunds depend on timing: 75% for 60+ days before departure, 50% for 30-59 days, 25% for 15-29 days, and no refund for less than 15 days. We recommend travel insurance for added protection."
      },
      {
        q: "Is travel insurance included?",
        a: "Basic travel insurance is included in most packages. However, we recommend purchasing additional comprehensive coverage for medical emergencies, trip cancellation, and lost belongings."
      }
    ]
  },
  {
    name: "Documents & Visa",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
    faqs: [
      {
        q: "What documents are required for Umrah?",
        a: "You need a valid passport with at least 6 months validity, passport-sized photos with white background, completed application forms, proof of relationship for family groups, and vaccination certificates as required by Saudi authorities."
      },
      {
        q: "How long does visa processing take?",
        a: "Umrah visa processing typically takes 3-7 business days after submitting all required documents. We recommend starting the process at least 2-3 weeks before your intended departure date."
      },
      {
        q: "Do you handle visa applications?",
        a: "Yes, our team handles the entire visa application process on your behalf. We prepare and submit all necessary documents to the Saudi consulate and keep you informed of the progress."
      },
      {
        q: "What if my visa is rejected?",
        a: "Visa rejections are rare when documents are complete and accurate. If a rejection occurs due to issues beyond our control, we will assist with reapplication or offer alternative solutions including rescheduling or refund according to our policy."
      }
    ]
  },
  {
    name: "Travel & Accommodation",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
    faqs: [
      {
        q: "How close are the hotels to the holy mosques?",
        a: "Our standard packages include hotels within 500-800 meters of the holy mosques. Premium and VIP packages offer hotels within 200-300 meters or with direct views of the Kaaba and Prophet's Mosque."
      },
      {
        q: "What type of rooms are provided?",
        a: "Room types vary by package: Quad (4 persons) for Regular packages, Triple (3 persons) for Plus packages, and Double (2 persons) for VIP packages. Private rooms can be arranged at additional cost."
      },
      {
        q: "Are meals included?",
        a: "Most packages include daily meals. Regular packages include breakfast and dinner, while Plus and VIP packages include full board (breakfast, lunch, and dinner) with more dining options."
      },
      {
        q: "What airlines do you use?",
        a: "We partner with major airlines including Saudi Arabian Airlines (Saudia), Emirates, Etihad, and Garuda Indonesia. VIP packages may include business class options on select routes."
      }
    ]
  },
  {
    name: "During the Trip",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    ),
    faqs: [
      {
        q: "Will there be a guide with the group?",
        a: "Yes, all groups are accompanied by experienced religious guides (Mutawwif) who lead prayers, explain rituals, and provide spiritual guidance throughout the journey. They are available 24/7 for assistance."
      },
      {
        q: "What if I have a medical emergency?",
        a: "We have medical support staff available and maintain connections with local hospitals. All pilgrims are covered by travel insurance, and our team will assist with any medical needs including hospital visits and medication."
      },
      {
        q: "Can I extend my stay?",
        a: "Extensions may be possible depending on visa validity and availability. Please inform us as early as possible if you wish to extend, and we will do our best to accommodate your request at additional cost."
      },
      {
        q: "What should I pack for the trip?",
        a: "We provide a comprehensive packing list upon booking confirmation. Essentials include Ihram garments for men, comfortable modest clothing, prayer items, medications, and personal toiletries. Detailed guidelines will be shared."
      }
    ]
  },
  {
    name: "Hajj Specific",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    faqs: [
      {
        q: "How far in advance should I book for Hajj?",
        a: "We recommend booking at least 6-12 months in advance for Hajj, as quotas fill up quickly. Early booking also gives you more payment flexibility and better accommodation options."
      },
      {
        q: "What is included in the Hajj package?",
        a: "Our Hajj packages include visa processing, round-trip flights, accommodation in Makkah, Madinah, Mina, and Arafat, all transportation, meals, Qurbani (sacrifice), and guidance for all Hajj rituals."
      },
      {
        q: "How do you handle the Hajj quotas?",
        a: "We work closely with the Ministry of Religious Affairs to secure Hajj quotas. Bookings are processed on a first-come, first-served basis. We maintain a waiting list if quotas are filled."
      },
      {
        q: "What are the accommodation arrangements during Hajj rituals?",
        a: "During Mina days, you will stay in air-conditioned tents. In Arafat, we provide comfortable tent arrangements with food and water. In Muzdalifah, we arrange for organized overnight stays as per Hajj requirements."
      }
    ]
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.faq-item'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out"
        }
      );
    }
  }, [activeCategory]);

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
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our Hajj and Umrah services.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
                {faqCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveCategory(index);
                      setOpenFaq(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeCategory === index
                        ? "bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
                    }`}
                  >
                    <span className={activeCategory === index ? "text-white" : "text-[#b8956a]"}>
                      {category.icon}
                    </span>
                    <span className="font-medium">{category.name}</span>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                      activeCategory === index ? "bg-white/20" : "bg-gray-100"
                    }`}>
                      {category.faqs.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-[#b8956a]">{faqCategories[activeCategory].icon}</span>
                  {faqCategories[activeCategory].name}
                </h2>
              </div>

              <div ref={contentRef} className="space-y-4">
                {faqCategories[activeCategory].faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="faq-item bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#b8956a]/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openFaq === index
                          ? "bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] text-white rotate-180"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}>
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Our team is ready to help you with any questions about your pilgrimage journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 bg-white text-[#b8956a] px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="tel:+622112345678"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

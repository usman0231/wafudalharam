"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    ),
    title: "Our Office",
    details: ["Jl. Sudirman No. 123", "Jakarta Pusat, 10220", "Indonesia"]
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    ),
    title: "Phone",
    details: ["+62 21 1234 5678", "+62 812 3456 7890"]
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
    title: "Email",
    details: ["info@wafudalharam.com", "booking@wafudalharam.com"]
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
    title: "Working Hours",
    details: ["Monday - Friday: 9AM - 6PM", "Saturday: 9AM - 3PM", "Sunday: Closed"]
  }
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%"
          }
        }
      );
    }

    // Info cards animation
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="hero-bg absolute inset-0 scale-110">
          <Image
            src="/IMG_8873.JPG.jpeg"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 font-medium text-sm mb-6 border border-white/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            We&apos;re here to help you plan your sacred journey. Reach out to us anytime.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#b8956a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0d6e6e]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
                  Send Message
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Let&apos;s Start a <span className="text-gradient">Conversation</span>
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder="+62 xxx xxxx xxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all appearance-none cursor-pointer text-gray-900"
                    >
                      <option value="" className="text-gray-400">Select subject</option>
                      <option value="umrah">Umrah Package Inquiry</option>
                      <option value="hajj">Hajj Package Inquiry</option>
                      <option value="booking">Booking Assistance</option>
                      <option value="general">General Question</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all resize-none text-gray-900 placeholder:text-gray-400"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-shine w-full bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                {submitted && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Message sent successfully!</p>
                      <p className="text-sm text-green-600">We&apos;ll get back to you soon.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div ref={infoRef} className="space-y-6 mb-10">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#b8956a]/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-2xl flex items-center justify-center text-[#b8956a] group-hover:from-[#b8956a] group-hover:to-[#0d6e6e] group-hover:text-white transition-all duration-300 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="p-6 bg-gradient-to-br from-[#b8956a]/5 to-[#0d6e6e]/5 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex items-center gap-4">
                  {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                    <a
                      key={social}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:bg-gradient-to-br hover:from-[#b8956a] hover:to-[#0d6e6e] hover:text-white transition-all duration-300 shadow-sm"
                    >
                      {social === "facebook" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                        </svg>
                      )}
                      {social === "instagram" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
                        </svg>
                      )}
                      {social === "twitter" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      )}
                      {social === "youtube" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.5,3.5,12,3.5,12,3.5s-7.5,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.56,31.56,0,0,0,0,12a31.56,31.56,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14c1.88.55,9.38.55,9.38.55s7.5,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.56,31.56,0,0,0,24,12,31.56,31.56,0,0,0,23.5,6.19ZM9.54,15.57V8.43L15.82,12Z"/>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 h-[250px] bg-gray-200 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#b8956a]/10 to-[#0d6e6e]/10">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-8 h-8 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="font-semibold text-gray-700">View on Google Maps</p>
                    <p className="text-sm text-gray-500">Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How do I book a package?", a: "You can book directly through our website, call our office, or visit us in person. Our team will guide you through the entire process." },
              { q: "What documents are required for Umrah?", a: "You'll need a valid passport with at least 6 months validity, passport-sized photos, and completed application forms. We'll assist you with visa processing." },
              { q: "Can I customize my package?", a: "Yes! We offer flexible packages that can be customized based on your preferences, budget, and travel dates." },
              { q: "What is the payment process?", a: "We accept various payment methods including bank transfer and installment plans. A deposit is required to confirm your booking." }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-2xl hover:bg-gradient-to-br hover:from-[#b8956a]/5 hover:to-[#0d6e6e]/5 transition-colors">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-lg flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 pl-11">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

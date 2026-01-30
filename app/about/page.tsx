"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    title: "Sincerity",
    description: "Every service we provide is based on sincerity and a genuine desire to help pilgrims achieve perfect worship."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    title: "Trust",
    description: "We build long-term relationships with our pilgrims based on trust, transparency, and consistent quality service."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
    title: "Togetherness",
    description: "We create a family atmosphere among pilgrims, making the spiritual journey more meaningful and memorable."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
      </svg>
    ),
    title: "Excellence",
    description: "We continuously strive for excellence in every aspect of our service, from planning to execution."
  }
];

const milestones = [
  { year: "2014", title: "Foundation", description: "Wafud Al Haram was established with a vision to provide exceptional Hajj and Umrah services." },
  { year: "2016", title: "First 100 Pilgrims", description: "Reached our first milestone of successfully guiding 100 pilgrims to the Holy Land." },
  { year: "2019", title: "Expanded Services", description: "Introduced premium packages and personalized pilgrimage experiences." },
  { year: "2024", title: "1200+ Pilgrims", description: "Celebrated serving over 1200 satisfied pilgrims from across the country." }
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero parallax effect
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.hero-image'), {
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

    // Story section animation
    if (storyRef.current) {
      gsap.fromTo(
        storyRef.current.querySelectorAll('.animate-item'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 70%"
          }
        }
      );
    }

    // Values cards animation
    if (valuesRef.current) {
      gsap.fromTo(
        valuesRef.current.querySelectorAll('.value-card'),
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 75%"
          }
        }
      );
    }

    // Timeline animation
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.querySelectorAll('.timeline-item'),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%"
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
      <div ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="hero-image absolute inset-0 scale-110">
          <Image
            src="/IMG_8873.JPG.jpeg"
            alt="About Wafud Al Haram"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 font-medium text-sm mb-6 border border-white/20">
            Established Since 2014
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            About <span className="text-gradient">Wafud Al Haram</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            Your trusted partner for a meaningful and spiritually enriching Hajj and Umrah journey
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section ref={storyRef} className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#b8956a]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0d6e6e]/5 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="animate-item relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/journey.png"
                  alt="Our Journey"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gradient">1200+</p>
                    <p className="text-sm text-gray-500">Happy Pilgrims</p>
                  </div>
                </div>
              </div>

              {/* Another floating element */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0d6e6e]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0d6e6e]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Certified</p>
                    <p className="text-xs text-gray-500">Licensed Agency</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="animate-item inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-6">
                Our Story
              </span>
              <h2 className="animate-item text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                A Journey of <span className="text-gradient">Faith & Service</span>
              </h2>
              <p className="animate-item text-gray-600 text-lg leading-relaxed mb-6">
                Wafud Al Haram was born from a deep passion to serve Muslims in their most sacred journey.
                Founded in 2014, we started with a simple mission: to make Hajj and Umrah accessible,
                comfortable, and spiritually fulfilling for everyone.
              </p>
              <p className="animate-item text-gray-600 leading-relaxed mb-8">
                Over the years, we have grown from a small team of dedicated individuals to a
                full-service travel agency specializing in religious pilgrimages. Our success is
                measured not in numbers, but in the countless stories of spiritual transformation
                and the lasting relationships we have built with our pilgrims.
              </p>

              {/* Mission & Vision */}
              <div className="animate-item grid sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#b8956a]/5 to-[#b8956a]/10 border border-[#b8956a]/20">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#b8956a] rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Our Vision
                  </h3>
                  <p className="text-sm text-gray-600">
                    To be the most trusted and beloved Hajj & Umrah travel partner for Muslims worldwide.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0d6e6e]/5 to-[#0d6e6e]/10 border border-[#0d6e6e]/20">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#0d6e6e] rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Our Mission
                  </h3>
                  <p className="text-sm text-gray-600">
                    To provide exceptional pilgrimage services that nurture spiritual growth and lasting memories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
              Our Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What We <span className="text-gradient">Stand For</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              These values guide everything we do and shape how we serve our pilgrims
            </p>
          </div>

          <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card group p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#b8956a]/30 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-2xl flex items-center justify-center text-[#b8956a] mb-6 group-hover:from-[#b8956a] group-hover:to-[#0d6e6e] group-hover:text-white transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#b8956a] transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#b8956a]/20 to-transparent"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Milestones & <span className="text-gradient">Achievements</span>
            </h2>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#b8956a] to-[#0d6e6e]"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`timeline-item relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'} pl-20 md:pl-0`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#b8956a]/20 transition-all duration-300 inline-block">
                      <span className="text-[#b8956a] font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Circle */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-[#b8956a] to-[#0d6e6e] rounded-full ring-4 ring-white shadow-lg"></div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "1200+", label: "Happy Pilgrims" },
              { value: "100%", label: "Departure Rate" },
              { value: "4.7", label: "Customer Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Begin Your <span className="text-gradient">Sacred Journey?</span>
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Let us guide you through a transformative pilgrimage experience. Contact us today to start planning your Hajj or Umrah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="btn-shine bg-gradient-to-r from-[#b8956a] to-[#a07d5a] text-white px-10 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/our-product"
              className="px-10 py-4 rounded-full font-semibold border-2 border-gray-200 text-gray-700 hover:border-[#b8956a] hover:text-[#b8956a] transition-all duration-300"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

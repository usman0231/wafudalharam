"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Angga Gunawan",
    location: "Jakarta",
    avatar: "/avatars/avatar1.svg",
    text: "Alhamdulillah, the Umrah trip with Wafud Al Haram went very smoothly. Starting from rituals to returning to the country, everything was very well organized. The escort team is friendly, the hotel is near the Grand Mosque, and all the needs of the congregation are very well taken care of. Thank you Wafud Al Haram, hopefully more success."
  },
  {
    id: 2,
    name: "Andi Prasetyo",
    location: "Depok",
    avatar: "/avatars/avatar2.svg",
    text: "The Umrah experience with Wafud Al Haram was truly amazing! Everything was well organized, from departure to return. I felt very well taken care of. Thank you, Wafud Al Haram!"
  },
  {
    id: 3,
    name: "Siti Nurhalida",
    location: "Bandung",
    avatar: "/avatars/avatar3.svg",
    text: "I have just returned from a Hajj trip with Wafud Al Haram. The service provided was very satisfying and the guide was very experienced. I felt calm and comfortable during the trip. Highly recommended!"
  },
  {
    id: 4,
    name: "Jaka Hadi",
    location: "Jakarta",
    avatar: "/avatars/avatar4.svg",
    text: "This year's Hajj trip was an unforgettable spiritual experience thanks to Wafud Al Haram. The guides were very patient in guiding us through each of the rituals. I felt very helped and could be more solemn in performing each ritual. Highly recommended for those who want a worry-free worship journey."
  },
  {
    id: 5,
    name: "Dimas Aji",
    location: "Jakarta",
    avatar: "/avatars/avatar5.svg",
    text: "I am very grateful to choose Wafud Al Haram for my Umrah trip. Starting from departure, accommodation, to services in the Holy Land, everything was very satisfying. There was no confusion at all because everything was clearly directed. Hopefully Wafud Al Haram continues to be the first choice of pilgrims."
  },
  {
    id: 6,
    name: "Putri",
    location: "Jakarta",
    avatar: "/avatars/avatar6.svg",
    text: "Wafud Al Haram really made it easy for us in all processes, from paperwork, visa, to departure. The staff is ready to help whenever needed, even in the middle of the night. This sense of security and comfort means a lot to us as a family."
  },
  {
    id: 7,
    name: "Budi Santoso",
    location: "Sragen",
    avatar: "/avatars/avatar7.svg",
    text: "My first Umrah with Wafud Al Haram was memorable! The whole process was easy and enjoyable. I really appreciate the team's attention to every detail. Will definitely be back again!"
  },
  {
    id: 8,
    name: "Lia",
    location: "Jakarta",
    avatar: "/avatars/avatar8.svg",
    text: "The first time I went on Umrah, I was nervous at first. But with Wafud Al Haram's guidance and services, I was able to go through all the series of worship smoothly. Very memorable and InshaAllah will come back again with Wafud Al Haram."
  },
  {
    id: 9,
    name: "Anisa",
    location: "Jakarta",
    avatar: "/avatars/avatar9.svg",
    text: "I would like to thank you for a wonderful Hajj experience with Wafud Al Haram. All facilities were as promised, if not more. We were always guided with patience and care. Wafud Al Haram really prioritizes the comfort of the pilgrims."
  }
];

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      const cards = cardsRef.current.querySelectorAll('.testimonial-card');
      gsap.fromTo(
        cards,
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
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#b8956a]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#0d6e6e]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#b8956a]/10 to-[#0d6e6e]/10 rounded-full text-[#b8956a] font-semibold text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Stories from the <span className="text-gradient">Pilgrims</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            True stories from pilgrims who have entrusted their sacred journey with Wafud Al Haram.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card break-inside-avoid bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg className="w-8 h-8 text-[#b8956a]/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {testimonial.text}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#b8956a]/20 group-hover:ring-[#b8956a]/50 transition-all">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

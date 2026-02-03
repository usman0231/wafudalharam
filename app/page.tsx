import Script from "next/script";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TravelPartners from "@/components/TravelPartners";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Documentation from "@/components/Documentation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      {/* Spacer for fixed hero section */}
      <div className="h-screen" />
      {/* Main content with higher z-index to overlay fixed hero */}
      <div className="relative z-10">
        <TravelPartners />
        <AboutSection />
        <ProductsSection />
        <WhyChooseUs />
        <Testimonials />
        <Documentation />
        <Footer />
      </div>
      <BackToTop />
      <Script id="chatbase-script" strategy="lazyOnload">
        {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="W7PTdh0R6kTHkW479Sl3w";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
      </Script>
    </div>
  );
}

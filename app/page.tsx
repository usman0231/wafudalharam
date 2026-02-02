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
    </div>
  );
}

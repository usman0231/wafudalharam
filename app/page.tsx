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
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TravelPartners />
      <AboutSection />
      <ProductsSection />
      <WhyChooseUs />
      <Testimonials />
      <Documentation />
      <Footer />
      <BackToTop />
    </div>
  );
}

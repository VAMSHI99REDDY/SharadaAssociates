import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LoanCards from "@/components/LoanCards";
import CountriesSection from "@/components/CountriesSection";
import UniversitiesSection from "@/components/UniversitiesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import FinancialPartners from "@/components/FinancialPartners";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <LoanCards />
      <CountriesSection />
      <UniversitiesSection />
      <WhyChooseUs />
      <FinancialPartners />
      <CTASection />
      <Testimonials />
      <FAQ />
    </>
  );
}

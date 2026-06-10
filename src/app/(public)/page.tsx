import { HeroSection } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhoIsThisFor } from "@/components/sections/who-is-this-for";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ResultsSection } from "@/components/sections/results-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { BookingProcess } from "@/components/sections/booking-process";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <WhoIsThisFor />
      <ServicesOverview />
      <ResultsSection />
      <CTASection
        dark={false}
        headline="Limited Sessions Available This Month"
        subheadline="Don't miss your slot. Book now and get your podcast off the ground."
      />
      <PricingSection />
      <TestimonialsSection />
      <BookingProcess />
      <FAQSection />
      <CTASection />
    </>
  );
}

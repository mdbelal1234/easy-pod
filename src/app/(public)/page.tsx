import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { StudioTour } from "@/components/sections/studio-tour";
import { EquipmentShowcase } from "@/components/sections/equipment-showcase";
import { WhyChoose } from "@/components/sections/why-choose";
import { PricingSection } from "@/components/sections/pricing-section";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { BookingProcess } from "@/components/sections/booking-process";
import { FAQSection } from "@/components/sections/faq-section";
import { faqs } from "@/components/sections/faqs-data";
import { LocationSection } from "@/components/sections/location";
import { CTASection } from "@/components/sections/cta-section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Podcast Studio Dhaka | Video Podcast Recording & Production",
  description:
    "EasyPod is Bangladesh's premium video podcast studio in Dhaka. Multi-camera recording, studio-grade audio, expert lighting, editing, and short-form content — all in one place. Book your session.",
  alternates: { canonical: "/" },
  keywords: [
    "podcast studio dhaka",
    "video podcast studio bangladesh",
    "podcast recording studio dhaka",
    "podcast production bangladesh",
    "podcast editing services dhaka",
    "multi camera podcast studio",
    "cinematic podcast recording",
    "sony a7 iv podcast studio",
    "rodecaster duo recording",
    "youtube podcast studio",
  ],
  openGraph: {
    title:
      "Podcast Studio Dhaka | EasyPod Video Podcast Recording & Production",
    description:
      "Record your podcast in a professionally equipped Dhaka studio with multi-camera video, studio-grade audio, and full production support.",
    url: site.url,
  },
};

function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#business`,
        name: site.name,
        description:
          "Premium video podcast recording and production studio in Dhaka, Bangladesh offering Sony & DJI multi-camera recording, RodeCaster Duo studio-grade audio, Godox cinematic lighting, professional editing, and short-form content.",
        url: site.url,
        email: site.email,
        telephone: site.phone,
        image: `${site.url}/og-image.jpg`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        areaServed: "Dhaka, Bangladesh",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "50",
        },
        sameAs: Object.values(site.social),
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <HeroSection />
      <TrustBar />
      <StudioTour />
      <EquipmentShowcase />
      <WhyChoose />
      <PricingSection />
      <TestimonialsSection />
      <BookingProcess />
      <FAQSection />
      <LocationSection />
      <CTASection consultation />
    </>
  );
}

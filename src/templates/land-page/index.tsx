import {
  CallToAction,
  CustomerStorySection,
  FeatureSection,
  HeroSection,
  SupportSection,
} from "@/templates/land-page/section";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-5 md:gap-10">
      <HeroSection />
      <FeatureSection />
      <SupportSection />
      <CustomerStorySection />
      <CallToAction />
    </main>
  );
}

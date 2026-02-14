import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { AreasSection } from "@/components/home/AreasSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SplashScreen } from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // TODO: Re-enable session storage check for production
    // sessionStorage.setItem("splashSeen", "true");
  };

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <PageWrapper>
        <HeroSection />
        <AboutSection />
        <FeaturedProperties />
        <AreasSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </PageWrapper>
    </>
  );
};

export default Index;

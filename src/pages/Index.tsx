import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { AreasSection } from "@/components/home/AreasSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { SplashScreen } from "@/components/SplashScreen";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <SEOHead title="Travio | GPS Vehicle Tracking & Fleet Management UK" description="Travio provides real-time GPS vehicle tracking, dash cams, and fleet management software for UK businesses. Cut costs, boost productivity, and protect your fleet." />
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <PageWrapper>
        <HeroSection />
        <StatsSection />
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

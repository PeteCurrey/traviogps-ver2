import type { Metadata } from "next";
import { VehiclePageTemplate } from "@/components/pages/VehiclePageTemplate";

export const metadata: Metadata = {
  title: "Motorcycle GPS Trackers | Covert Tracking | Travio",
  description:
    "Premium GPS tracking for high-value motorcycles. Covert installation, ultra-low power draw, motion alerts and 24/7 monitoring. Ride with confidence.",
};

export default function MotorcyclesPage() {
  return (
    <VehiclePageTemplate
      overline="MOTORCYCLE PROTECTION"
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
      h1Line1="Ride with"
      h1Line2="total"
      h1Gold="confidence."
      heroCopy="Motorcycles are lightweight, highly desirable, and dangerously easy to steal. A premium sports bike can be lifted into a van in under 20 seconds. Travio provides covert, ultra-low power GPS tracking designed specifically to protect high-value motorcycles."
      threats={[
        {
          title: "Van Thefts",
          desc: "The most common method of motorcycle theft. Thieves simply lift the bike into a waiting van, bypassing alarms and steering locks.",
        },
        {
          title: "Parts Stripping",
          desc: "Stolen sports bikes are frequently dismantled within hours. The frame is discarded, and the high-value components are sold online.",
        },
        {
          title: "Vulnerable Parking",
          desc: "Even in secure urban car parks or outside cafes, bikes remain exposed. You need an alert the second someone touches it.",
        },
      ]}
      uniqueFeature={{
        title: "Ultra-Low Power Draw & Covert Installation",
        desc: "Motorcycle batteries are small. The Travio device uses advanced power management to ensure it won't drain your battery during winter storage. Its miniature size allows our engineers to hide it deep within the fairing or frame.",
      }}
      testimonial={{
        quote:
          "I park my Ducati Panigale on the street in London occasionally. The Travio app sends me a push notification if anyone even moves the handlebars. Essential kit.",
        name: "Marcus L.",
        vehicle: "Ducati Panigale V4 Owner",
      }}
      faqs={[
        {
          q: "Will the tracker drain my motorcycle battery?",
          a: "No. Our devices are specifically configured for motorcycles with an ultra-low power sleep mode. If the bike is stored over winter, we recommend a trickle charger, but the tracker itself draws negligible current.",
        },
        {
          q: "Where is the tracker hidden?",
          a: "Our accredited engineers are experts in covert installation. They will strip back fairings, seats, or tanks to hide the device where a thief cannot easily find or access it. The exact location is kept confidential.",
        },
        {
          q: "Are the trackers waterproof?",
          a: "Yes. The devices used for motorcycle installations are IP67-rated, meaning they are fully waterproof and dustproof, designed to withstand the harshest riding conditions.",
        },
        {
          q: "Do you offer remote immobilisation for bikes?",
          a: "Due to safety regulations, remote immobilisation is not typically enabled on motorcycles, as shutting off an engine mid-corner could be fatal. We focus on instant motion alerts and rapid police recovery instead.",
        },
      ]}
    />
  );
}

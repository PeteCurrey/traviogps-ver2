import type { Metadata } from "next";
import { VehiclePageTemplate } from "@/components/pages/VehiclePageTemplate";

export const metadata: Metadata = {
  title: "Motorhome & Caravan GPS Trackers | Thatcham Approved | Travio",
  description:
    "Protect your home on the road with Thatcham-approved GPS tracking for motorhomes and caravans. Nationwide installation, 24/7 monitoring, remote immobilisation.",
};

export default function MotorhomesPage() {
  return (
    <VehiclePageTemplate
      overline="MOTORHOME & CARAVAN PROTECTION"
      heroImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80"
      h1Line1="Protect your"
      h1Line2="home on"
      h1Gold="the road."
      heroCopy="Your motorhome isn't just a vehicle — it's an investment and your passport to freedom. Unfortunately, high-value leisure vehicles are increasingly targeted by organised thieves. Protect it with a Thatcham-approved Travio tracker, monitored 24/7."
      threats={[
        {
          title: "Storage Site Risks",
          desc: "Many motorhomes and caravans are stolen from storage facilities while owners are away, meaning the theft might go unnoticed for days without a tracker.",
        },
        {
          title: "High Value Export",
          desc: "Premium motorhomes are highly desirable overseas. If stolen, they are often loaded onto ferries within hours.",
        },
        {
          title: "Contents Loss",
          desc: "It's not just the vehicle — it's all your personal belongings inside. Fast recovery is essential to preventing total loss.",
        },
      ]}
      uniqueFeature={{
        title: "Battery Health Monitoring",
        desc: "Crucial for leisure vehicles in storage. The Travio app monitors your vehicle battery level and alerts you before it goes flat, ensuring your tracker (and vehicle) remains active when you need it most.",
      }}
      testimonial={{
        quote:
          "We tour the UK in our Bürstner motorhome. Knowing Travio is monitoring it 24/7 while we sleep, and even when it's in winter storage, is priceless. The battery alerts are incredibly useful.",
        name: "Sandra & Keith R.",
        vehicle: "Bürstner Motorhome Owners",
      }}
      faqs={[
        {
          q: "Is it suitable for caravans without engines?",
          a: "Yes. Our S7 tracker is perfect for towed caravans, providing GPS tracking and motion alerts. The S5 (which includes engine immobilisation) is designed for drivable motorhomes.",
        },
        {
          q: "What happens if the vehicle battery goes flat in storage?",
          a: "Travio trackers have a built-in backup battery that keeps them operating for a period even if the main vehicle battery is disconnected. The app will also send you a low-battery alert before the main vehicle battery dies.",
        },
        {
          q: "Can you install it at my storage site?",
          a: "Yes, our engineers offer nationwide installation. As long as there is safe access to the vehicle, we can install the tracker at your home, dealership, or secure storage facility.",
        },
      ]}
    />
  );
}

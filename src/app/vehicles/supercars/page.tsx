import type { Metadata } from "next";
import { VehiclePageTemplate } from "@/components/pages/VehiclePageTemplate";

export const metadata: Metadata = {
  title: "GPS Tracker for Supercars & Sports Cars | Thatcham S5 | Travio",
  description:
    "Travio Thatcham S5 GPS protection for supercars. Porsche, Ferrari, McLaren, Lamborghini. Real-time tracking, remote immobilisation, 94% recovery rate. Installed at your door.",
};

export default function SupercarsPage() {
  return (
    <VehiclePageTemplate
      overline="SUPERCAR PROTECTION"
      heroImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80"
      h1Line1="Your supercar"
      h1Line2="deserves the"
      h1Gold="best defence."
      heroCopy="High-performance vehicles are the number one target for organised theft gangs. In 2025, over 90,000 vehicles were stolen in the UK — and supercars are disproportionately targeted for export. Thatcham S5 protection isn't optional. It's essential."
      threats={[
        {
          title: "Relay Theft",
          desc: "Criminals use signal amplifiers to clone your keyless fob and drive away in under 60 seconds.",
        },
        {
          title: "Shipped Overseas",
          desc: "Professional gangs have export networks. Without a tracker, your car leaves the country within 24 hours.",
        },
        {
          title: "Insurance Voidance",
          desc: "Most specialist insurers now require S5 for vehicles above £50,000. Without it, your claim may be rejected.",
        },
      ]}
      testimonial={{
        quote:
          "My Ferrari 296 needed an S5 tracker for insurance — Travio had an engineer at my home in 24 hours. The app is genuinely beautiful.",
        name: "James W.",
        vehicle: "Ferrari 296 GTB Owner",
      }}
      faqs={[
        {
          q: "Does my insurer require Thatcham S5 for my car?",
          a: "Most specialist insurers including Adrian Flux, Footman James, and Hagerty require Thatcham S5 for vehicles valued over £50,000. Check with your insurer — we can provide your certificate immediately after installation.",
        },
        {
          q: "Can a tracker stop relay theft?",
          a: "A tracker doesn't prevent relay theft but ensures rapid recovery. With Travio S5, our Control Centre receives instant alerts if your vehicle moves without Driver ID authorisation, enabling immediate police coordination.",
        },
        {
          q: "Will it affect my car's warranty?",
          a: "No. Our Thatcham-accredited engineers install the device without affecting your manufacturer's warranty. The installation is fully reversible.",
        },
        {
          q: "How is Travio different from the tracker built into my car?",
          a: "Manufacturer trackers are known to thieves and are the first thing disabled. Travio is a professionally hidden, independently powered device — unknown to thieves, monitored 24/7 by our Secure Control Centre.",
        },
      ]}
    />
  );
}

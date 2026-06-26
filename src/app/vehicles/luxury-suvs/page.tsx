import type { Metadata } from "next";
import { VehiclePageTemplate } from "@/components/pages/VehiclePageTemplate";

export const metadata: Metadata = {
  title: "GPS Tracker for Luxury SUVs | Range Rover, G-Wagon | Travio",
  description:
    "Protect your luxury SUV with Thatcham S5 GPS tracking. Essential for Range Rover, Defender, G-Wagon and premium saloons. 94% recovery rate.",
};

export default function LuxurySuvsPage() {
  return (
    <VehiclePageTemplate
      overline="LUXURY SUV PROTECTION"
      heroImage="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1400&q=80"
      h1Line1="Secure your"
      h1Line2="luxury"
      h1Gold="lifestyle."
      heroCopy="Luxury SUVs like the Range Rover and Mercedes G-Wagon are the most stolen vehicles in the UK. Targeted by organised gangs for export or parts, they are often taken from driveways while the owners sleep. A Thatcham-certified tracker from Travio is your strongest line of defence."
      threats={[
        {
          title: "The #1 Target",
          desc: "Range Rovers and premium SUVs are statistically the most stolen vehicles in the UK, often taken to order by professional gangs.",
        },
        {
          title: "Driveway Theft",
          desc: "Keyless entry cloning allows thieves to unlock and start your vehicle without ever entering your home or taking your keys.",
        },
        {
          title: "Parts Stripping",
          desc: "If not recovered quickly, luxury SUVs are often taken to 'chop shops' and stripped for highly valuable parts within hours.",
        },
      ]}
      testimonial={{
        quote:
          "My Range Rover SVR is my daily driver, but I was constantly worried about leaving it parked. The Travio S5 system gives me total peace of mind, and the geofence alerts are brilliant.",
        name: "Eleanor T.",
        vehicle: "Range Rover SVR Owner",
      }}
      faqs={[
        {
          q: "Are Range Rovers really that easy to steal?",
          a: "Without additional security, yes. Keyless entry systems have made it easier for criminals using relay devices to steal luxury SUVs. Travio's Driver ID technology ensures that even if the key is cloned, the vehicle will alert our control centre the moment it moves.",
        },
        {
          q: "Can I use Travio on a leased vehicle?",
          a: "Yes. Our installation is non-invasive and fully reversible. We can remove the tracker when your lease ends and transfer it to your next vehicle.",
        },
        {
          q: "Is it suitable for electric SUVs?",
          a: "Absolutely. Travio trackers are fully compatible with EVs including the Porsche Macan Electric, Audi Q8 e-tron, and BMW iX, with ultra-low power draw.",
        },
      ]}
    />
  );
}

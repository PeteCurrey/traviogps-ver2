import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Travio | Premium GPS Tracking for Supercars, Luxury Cars & Motorhomes",
  description:
    "Thatcham-certified GPS tracking for supercars, luxury SUVs, motorhomes, caravans, and motorcycles. Real-time tracking, remote immobilisation, 24/7 monitoring. Installed at your door.",
  openGraph: {
    title: "Travio | Premium GPS Tracking",
    description:
      "Thatcham-certified GPS tracking for supercars, luxury cars & motorhomes. Installed at your door.",
  },
};

export default function IndexPage() {
  return <HomePage />;
}

import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/pages/HowItWorksPage";

export const metadata: Metadata = {
  title: "How It Works | Travio GPS Tracking",
  description: "Simple. Seamless. Certain. Learn how our Thatcham-certified trackers are installed and monitored.",
};

export default function HowItWorksRoute() {
  return <HowItWorksPage />;
}

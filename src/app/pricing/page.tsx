import type { Metadata } from "next";
import { PricingPage } from "@/components/pages/PricingPage";

export const metadata: Metadata = {
  title: "Pricing | Thatcham S5 & S7 GPS Trackers | Travio",
  description:
    "Honest pricing. No surprises. One-off hardware cost and simple annual subscriptions. Nationwide engineer installation is always included.",
};

export default function PricingPageRoute() {
  return <PricingPage />;
}

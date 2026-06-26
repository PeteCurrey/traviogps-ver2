import type { Metadata } from "next";
import { TheftRiskScorePage } from "@/components/pages/TheftRiskScorePage";

export const metadata: Metadata = {
  title: "AI Vehicle Theft Risk Score | Travio",
  description:
    "Check your vehicle's true theft risk score based on make, model, location, and overnight parking using our AI-powered analysis tool.",
};

export default function RiskScorePageRoute() {
  return <TheftRiskScorePage />;
}

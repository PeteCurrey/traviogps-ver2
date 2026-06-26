import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us | Travio GPS Tracking",
  description: "We are Travio. Protecting the UK's most valuable vehicles with cutting-edge Thatcham GPS tracking technology and 24/7 monitoring.",
};

export default function AboutPageRoute() {
  return <AboutPage />;
}

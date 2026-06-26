import type { Metadata } from "next";
import { AppPage } from "@/components/pages/AppPage";

export const metadata: Metadata = {
  title: "The Travio App | GPS Tracking for Supercars & Luxury Vehicles",
  description:
    "The Travio app gives you complete control of your vehicle. Live map, instant alerts, remote immobilisation, trip history. Coming to iOS and Android.",
};

export default function AppPageRoute() {
  return <AppPage />;
}

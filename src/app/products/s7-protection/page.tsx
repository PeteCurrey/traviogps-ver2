import type { Metadata } from "next";
import { S7ProtectionPage } from "@/components/pages/S7ProtectionPage";

export const metadata: Metadata = {
  title: "Thatcham S7 GPS Tracker | Essential Vehicle Protection | Travio",
  description:
    "Thatcham S7 GPS tracking — insurance-approved protection for cars, motorcycles, caravans and classic vehicles. 24/7 monitoring, geofencing, app control.",
};

export default function S7Page() {
  return <S7ProtectionPage />;
}

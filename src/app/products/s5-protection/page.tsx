import type { Metadata } from "next";
import { S5ProtectionPage } from "@/components/pages/S5ProtectionPage";

export const metadata: Metadata = {
  title: "Thatcham S5 GPS Tracker | Premium Supercar Protection | Travio",
  description:
    "Category S5 is the highest Thatcham security certification. Required by most insurers for vehicles over £50,000. GPS tracking, Driver ID, remote immobilisation, 24/7 monitoring.",
};

export default function S5Page() {
  return <S5ProtectionPage />;
}

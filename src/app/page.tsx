import { IndexClient } from "@/components/home/IndexClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travio | GPS Vehicle Tracking & Fleet Management UK",
  description: "Travio provides real-time GPS vehicle tracking, dash cams, and fleet management software for UK businesses. Cut costs, boost productivity, and protect your fleet.",
};

export default function IndexPage() {
  return <IndexClient />;
}

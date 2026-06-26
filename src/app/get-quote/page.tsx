import type { Metadata } from "next";
import { GetQuotePage } from "@/components/pages/GetQuotePage";

export const metadata: Metadata = {
  title: "Get a Quote | Thatcham GPS Trackers | Travio",
  description:
    "Get a personalised security recommendation and quote for your vehicle. Thatcham approved trackers installed nationwide.",
};

export default function GetQuotePageRoute() {
  return <GetQuotePage />;
}

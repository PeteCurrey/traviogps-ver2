import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Travio GPS Tracking",
  description: "Get in touch with the Travio team for sales, support, or installation enquiries.",
};

export default function ContactPageRoute() {
  return <ContactPage />;
}

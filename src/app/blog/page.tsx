import type { Metadata } from "next";
import { BlogPage } from "@/components/pages/BlogPage";

export const metadata: Metadata = {
  title: "Security Insights & News | Travio",
  description: "The latest news, tips, and insights on vehicle security, Thatcham trackers, and protecting your supercar or motorhome.",
};

export default function BlogPageRoute() {
  return <BlogPage />;
}

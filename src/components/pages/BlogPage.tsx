"use client";

import { useEffect, useRef } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const posts = [
  {
    title: "Why Keyless Entry is the Biggest Threat to Your Supercar",
    category: "Security Insights",
    date: "March 15, 2026",
    excerpt: "Relay attacks have made stealing a £200,000 vehicle easier than ever. We explain how thieves operate and how to stop them.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80"
  },
  {
    title: "Thatcham S5 vs S7: Which Tracker Does Your Insurer Require?",
    category: "Guides",
    date: "February 28, 2026",
    excerpt: "Demystifying Thatcham categories. Find out exactly what level of protection you need to satisfy your specialist insurance policy.",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80"
  },
  {
    title: "Protecting Your Motorhome During Winter Storage",
    category: "Tips",
    date: "January 10, 2026",
    excerpt: "Leisure vehicles are highly vulnerable when stored away from home. Here's how to ensure your motorhome is safe until spring.",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80"
  }
];

export function BlogPage() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 85%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <PageWrapper>
      <section className="bg-[#0B0F19] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#262D3D]">
        <div className="container-premium text-center">
          <p className="overline mb-4">TRAVIO JOURNAL</p>
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Security <span className="text-[#FF6B1A]">Insights.</span>
          </h1>
          <p className="text-[#999999] max-w-2xl mx-auto leading-relaxed text-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>
            The latest news, tips, and insights on vehicle security, Thatcham categories, and protecting your most valuable assets.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#111625]" ref={ref}>
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article key={i} className="bg-[#0B0F19] rounded-2xl overflow-hidden border border-[#262D3D] hover:border-[#FF6B1A] transition-colors group cursor-pointer flex flex-col" data-reveal>
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${post.image})` }} />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 bg-[#0B0F19]/80 backdrop-blur text-[#FF6B1A] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[#555555] text-xs mb-3" style={{ fontFamily: "DM Sans, sans-serif" }}>{post.date}</div>
                  <h2 className="text-xl mb-3 text-[#F5F5F5] group-hover:text-[#FF6B1A] transition-colors" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{post.title}</h2>
                  <p className="text-[#999999] text-sm leading-relaxed mb-6 flex-1" style={{ fontFamily: "DM Sans, sans-serif" }}>{post.excerpt}</p>
                  <div className="flex items-center text-[#FF6B1A] text-sm font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

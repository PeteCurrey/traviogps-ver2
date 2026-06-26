"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navigation, Bell, Clock, Zap, Star, Users, Battery, Smartphone, MapPin } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useScrollReveal() {
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
  return ref;
}

const features = [
  { icon: MapPin, title: "Live Map", desc: "Dark-mode map with real-time vehicle pin. Always know exactly where your vehicle is." },
  { icon: Bell, title: "Instant Alerts", desc: "Push notifications for ignition on, unexpected movement, and geofence breach." },
  { icon: Clock, title: "Trip History", desc: "Every journey logged with route, speed, and time. Review any trip at any time." },
  { icon: Zap, title: "Remote Immobilise", desc: "One tap. Engine off. Stop your vehicle from anywhere in the world." },
  { icon: Star, title: "Driver Scoring", desc: "AI-powered analysis of acceleration, braking, and cornering to protect your vehicle." },
  { icon: Users, title: "Family Access", desc: "Share access with up to 4 authorised users. Perfect for household vehicles." },
];

export function AppPage() {
  const featuresRef = useScrollReveal();
  const mockupRef = useScrollReveal();
  const [email, setEmail] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, vehicle_type: vehicleType }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-[#0B0F19]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?w=1200&q=80)" }} />
        <div className="relative z-10 container-premium py-32 text-center">
          <p className="overline mb-5">THE TRAVIO APP</p>
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            Your vehicle.
            <span className="text-[#FF6B1A] block">Always in your hand.</span>
          </h1>
          <p className="text-[#999999] max-w-xl mx-auto leading-relaxed mb-4" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Available iOS and Android — coming soon.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-[#0B0F19]" ref={featuresRef}>
        <div className="container-premium">
          <div className="text-center mb-14" data-reveal>
            <p className="overline mb-4">APP FEATURES</p>
            <h2 className="text-4xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Everything you need</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="glass-card p-8" data-reveal>
                <feat.icon className="h-8 w-8 text-[#FF6B1A] mb-5" />
                <h3 className="text-xl mb-3" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{feat.title}</h3>
                <p className="text-[#555555] leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* iPhone mockup */}
      <section className="section-padding bg-[#111625]" ref={mockupRef}>
        <div className="container-premium">
          <div className="flex justify-center" data-reveal>
            <div className="relative w-64 md:w-80">
              <div className="relative bg-[#0B0F19] rounded-[3rem] border-2 border-[#262D3D] overflow-hidden shadow-2xl" style={{ aspectRatio: "9/19.5" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0B0F19] rounded-b-2xl z-10" />
                <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden bg-[#0D0D0D]">
                  <div className="px-4 pt-8 pb-2">
                    <div className="bg-[#111625] rounded-xl p-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-pulse" />
                        <span className="text-[8px] text-[#FF6B1A] font-medium tracking-widest uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>PROTECTED · STATIONARY</span>
                      </div>
                    </div>
                    <div className="bg-[#0F1923] rounded-xl h-32 mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        {[...Array(6)].map((_, i) => <div key={i} className="absolute left-0 right-0 border-b border-[#1A2A3A]" style={{ top: `${i * 20}%` }} />)}
                        {[...Array(8)].map((_, i) => <div key={i} className="absolute top-0 bottom-0 border-r border-[#1A2A3A]" style={{ left: `${i * 14}%` }} />)}
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 rounded-full bg-[#FF6B1A] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#0B0F19]" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["Live View", "Geofence", "Immobilise"].map((a) => (
                        <div key={a} className="bg-[#111625] rounded-lg p-2 text-center border border-[#262D3D]">
                          <div className="text-[7px] text-[#999999]" style={{ fontFamily: "DM Sans, sans-serif" }}>{a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-[3rem] bg-[#FF6B1A]/5 blur-xl -z-10 scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="section-padding bg-[#0B0F19]">
        <div className="container-premium max-w-lg">
          <div className="text-center mb-10">
            <p className="overline mb-4">BE FIRST</p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>
              Be first to know when Travio launches.
            </h2>
          </div>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-[#FF6B1A] text-5xl mb-4">✓</div>
              <p className="text-[#F5F5F5] text-lg" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>You&apos;re on the list!</p>
              <p className="text-[#999999] mt-2" style={{ fontFamily: "DM Sans, sans-serif" }}>We&apos;ll be in touch as soon as the app launches.</p>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-[#111625] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] transition-colors"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              />
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full bg-[#111625] border border-[#262D3D] rounded-xl px-4 py-3 text-[#999999] focus:outline-none focus:border-[#FF6B1A] transition-colors appearance-none"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                <option value="">Vehicle type (optional)</option>
                <option value="supercar">Supercar</option>
                <option value="luxury-suv">Luxury SUV</option>
                <option value="motorhome">Motorhome</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="other">Other</option>
              </select>
              <button type="submit" disabled={loading} className="btn-gold w-full justify-center py-4">
                {loading ? "Joining..." : "Join the Waitlist"}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

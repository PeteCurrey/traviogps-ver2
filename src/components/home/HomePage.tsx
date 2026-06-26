"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Shield,
  MapPin,
  Home,
  Zap,
  AlertTriangle,
  ChevronRight,
  Star,
  Check,
  Smartphone,
  Bell,
  Navigation,
  Clock,
  Battery,
  Users,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Scroll animation hook ────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}

/* ─── Section 1: Hero ───────────────────────── */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const cards = heroRef.current.querySelectorAll("[data-hero-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 }
    );
  }, []);

  const panels = [
    {
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      overline: "THATCHAM S5 CERTIFIED",
      line1: "Supercar",
      line2: "Protection",
      href: "/vehicles/supercars",
    },
    {
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
      overline: "NATIONWIDE INSTALLATION",
      line1: "Adventure",
      line2: "Secured",
      href: "/vehicles/motorhomes-caravans",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      overline: "24/7 MONITORING",
      line1: "Ride with",
      line2: "Confidence",
      href: "/vehicles/motorcycles",
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] pt-20 lg:pt-[104px] pb-48 md:pb-56" ref={heroRef}>
      <div className="h-[calc(100vh-280px)] md:h-[calc(100vh-320px)] lg:h-[calc(100vh-340px)] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-8">
        {panels.map((panel, i) => (
          <div key={i} data-hero-card className="relative h-full">
            <Link
              href={panel.href}
              className="group relative block h-full overflow-hidden rounded-xl"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${panel.image})` }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C9A84C] transition-all duration-300 pointer-events-none z-10 rounded-xl" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C9A84C]/80 group-hover:text-[#C9A84C] mb-3 transition-colors" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {panel.overline}
                </span>
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl text-[#F5F5F5] leading-tight"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                >
                  {panel.line1}
                  <br />
                  <span className="text-[#C9A84C]">{panel.line2}</span>
                </h3>

                <div className="mt-8 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                  <span className="btn-gold py-2 px-6 text-xs uppercase tracking-wider font-semibold rounded-lg">
                    Get Protected
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Header Statement at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#2A2A2A]">
        <div className="container-premium py-6 md:py-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#999999] mb-2 md:mb-3" style={{ fontFamily: "DM Sans, sans-serif" }}>
              TRAVIO VEHICLE SECURITY
            </p>
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-[#F5F5F5] px-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
              The ultimate protection <span className="text-[#C9A84C]">for your vehicle.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden md:flex absolute bottom-32 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#555555]" style={{ fontFamily: "DM Sans, sans-serif" }}>Scroll</span>
        <div className="w-6 h-10 rounded-full border border-[#2A2A2A] flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Trust Marquee ──────────────── */
function TrustMarquee() {
  const items = [
    "Thatcham S5 Certified",
    "24/7 Secure Control Centre",
    "Police Integrated Recovery",
    "Insurance Premium Reduction",
    "Nationwide Engineer Installation",
    "Remote Immobilisation",
    "5,000+ Vehicles Protected",
    "Anti-Keyless Theft",
    "App Controlled",
    "Same-Week Installation",
  ];

  const doubled = [...items, ...items];

  return (
    <section className="bg-[#111111] border-y border-[#2A2A2A] py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="text-[#999999] uppercase tracking-widest text-[11px] px-6"
              style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500 }}
            >
              {item}
            </span>
            <span className="text-[#C9A84C] text-base flex-shrink-0">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 3: Brand Statement ───────────── */
function BrandStatement() {
  const ref = useScrollReveal();

  const stats = [
    { value: "S5", label: "Thatcham Certified" },
    { value: "94%", label: "Recovery Rate" },
    { value: "£6.5M+", label: "Value Protected Per Week" },
    { value: "48hr", label: "Average Installation" },
  ];

  return (
    <section className="section-padding bg-[#0A0A0A]" ref={ref}>
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div data-reveal>
            <p className="overline mb-4">01 — WHAT IS TRAVIO</p>
            <div className="relative">
              <span
                className="absolute -left-4 -top-10 text-[180px] leading-none select-none pointer-events-none"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  color: "#C9A84C",
                  opacity: 0.06,
                }}
              >
                01
              </span>
              <h2
                className="text-4xl md:text-5xl mb-8 relative z-10"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
              >
                Protection that matches
                <span className="text-[#C9A84C]"> your vehicle.</span>
              </h2>
            </div>
            <div className="space-y-5" style={{ fontFamily: "DM Sans, sans-serif" }}>
              <p className="text-[#999999] leading-relaxed">
                Your car is an investment. Whether it&apos;s a Porsche 911 on the
                driveway, a McLaren in the garage, or a £120,000 motorhome on
                tour — it deserves more than a standard tracker. Travio delivers
                Thatcham-certified, insurance-approved GPS protection built for
                high-value vehicles.
              </p>
              <p className="text-[#999999] leading-relaxed">
                We combine real-time location tracking, remote immobilisation,
                driver identification, and 24/7 monitoring from our Secure
                Control Centre — all controlled from a beautifully simple app.
              </p>
            </div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-6" data-reveal>
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6"
              >
                <div
                  className="text-4xl md:text-5xl text-[#C9A84C] mb-2 leading-none"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                >
                  {stat.value}
                </div>
                <div className="overline text-[#555555] text-[10px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 4: Product Categories Grid ───── */
function ProductCategoriesGrid() {
  const ref = useScrollReveal();

  const categories = [
    {
      icon: Shield,
      name: "Supercars & Sports Cars",
      desc: "Thatcham S5 protection for high-performance vehicles.",
      href: "/vehicles/supercars",
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    },
    {
      icon: MapPin,
      name: "Luxury SUVs & Saloons",
      desc: "Real-time tracking for Range Rover, G-Wagon, and more.",
      href: "/vehicles/luxury-suvs",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    },
    {
      icon: Home,
      name: "Motorhomes & Caravans",
      desc: "Nationwide protection for your home on the road.",
      href: "/vehicles/motorhomes-caravans",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    },
    {
      icon: Zap,
      name: "Motorcycles & Scooters",
      desc: "Compact, covert tracking for two wheels.",
      href: "/vehicles/motorcycles",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    },
  ];

  return (
    <section className="section-padding bg-[#0A0A0A]" ref={ref}>
      <div className="container-premium">
        <div className="text-center mb-14" data-reveal>
          <p className="overline mb-4">BUILT FOR YOUR VEHICLE</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            What do you want to protect?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="glass-card group relative overflow-hidden"
              data-reveal
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="relative z-10 p-8">
                <cat.icon className="h-8 w-8 text-[#C9A84C] mb-5" />
                <h3
                  className="text-2xl mb-2"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
                >
                  {cat.name}
                </h3>
                <p
                  className="text-[#555555] mb-5"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {cat.desc}
                </p>
                <span className="text-[#C9A84C] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 5: Threat Reality ─────────────── */
function ThreatReality() {
  const ref = useScrollReveal();

  return (
    <section className="section-padding bg-[#0A0A0A]" ref={ref}>
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" data-reveal>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
          </div>

          {/* Right: content */}
          <div data-reveal>
            <p className="overline text-[#FF4444] mb-4">THE THREAT IS REAL</p>
            <h2
              className="text-3xl md:text-4xl mb-6"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            >
              A car is stolen every{" "}
              <span className="text-[#C9A84C]">3 minutes</span> in the UK.
            </h2>
            <p
              className="text-[#999999] leading-relaxed mb-8"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Organised crime gangs target high-value vehicles specifically. They
              use relay devices to clone your keyless entry signal and are gone in
              under 60 seconds. Without a Thatcham-approved tracker, your insurer
              may not cover you — and your vehicle may never be seen again.
            </p>

            {/* Inline stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-[#2A2A2A]">
              {[
                { val: "90,000+", label: "vehicles stolen last year" },
                { val: "60 sec", label: "to steal a keyless car" },
                { val: "58%", label: "never recovered without a tracker" },
              ].map((s) => (
                <div key={s.val} className="text-center">
                  <div
                    className="text-xl md:text-2xl text-[#C9A84C] mb-1"
                    style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  >
                    {s.val}
                  </div>
                  <div className="text-[#555555] text-xs" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/get-quote" className="btn-gold inline-flex">
              Get Protected Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 6: How It Works ───────────────── */
function HowItWorks() {
  const ref = useScrollReveal();

  const steps = [
    {
      num: "01",
      icon: Shield,
      title: "Choose Your Protection",
      desc: "Select the Thatcham category right for your vehicle and insurer. S7 for peace of mind, S5 for maximum security.",
    },
    {
      num: "02",
      icon: MapPin,
      title: "We Install It",
      desc: "A Thatcham-accredited Travio engineer comes to you — at home, work, or your dealership — usually within 48 hours.",
    },
    {
      num: "03",
      icon: Smartphone,
      title: "Complete Control",
      desc: "Monitor your vehicle live, set geofences, receive instant alerts, and immobilise remotely — all from the Travio app.",
    },
  ];

  return (
    <section className="section-padding bg-[#111111]" ref={ref}>
      <div className="container-premium">
        <div className="text-center mb-14" data-reveal>
          <p className="overline mb-4">SIMPLE. SEAMLESS. CERTAIN.</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            How Travio Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting dashed line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-px border-t border-dashed border-[#C9A84C]/30 z-0" />

          {steps.map((step) => (
            <div key={step.num} className="relative text-center" data-reveal>
              {/* Step number circle */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <span
                  className="absolute text-[80px] leading-none select-none"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    color: "#C9A84C",
                    opacity: 0.08,
                  }}
                >
                  {step.num}
                </span>
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#C9A84C]/50 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-[#C9A84C]" />
                </div>
              </div>
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
              >
                {step.title}
              </h3>
              <p className="text-[#555555] text-sm leading-relaxed max-w-xs mx-auto" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 7: App Preview ─────────────────── */
function AppPreview() {
  const ref = useScrollReveal();

  const features = [
    { icon: Navigation, text: "Real-time location on a beautifully dark map" },
    { icon: Bell, text: "Instant alerts: movement, ignition, geofence breach" },
    { icon: Zap, text: "One-tap remote immobilisation" },
    { icon: Clock, text: "Trip history and driver scoring" },
    { icon: Battery, text: "Battery and signal health monitoring" },
    { icon: Users, text: "Shared access for family members" },
  ];

  return (
    <section className="section-padding bg-[#0A0A0A]" ref={ref}>
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* iPhone mockup */}
          <div className="flex justify-center" data-reveal>
            <div className="relative w-64 md:w-72">
              {/* Phone frame */}
              <div
                className="relative bg-[#0A0A0A] rounded-[3rem] border-2 border-[#2A2A2A] overflow-hidden shadow-2xl"
                style={{ aspectRatio: "9/19.5" }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0A0A0A] rounded-b-2xl z-10" />
                {/* Screen */}
                <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden bg-[#0D0D0D]">
                  {/* Status bar */}
                  <div className="px-4 pt-8 pb-2">
                    <div className="bg-[#111111] rounded-xl p-3 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                        <span className="text-[8px] text-[#C9A84C] font-medium tracking-widest uppercase" style={{ fontFamily: "DM Sans, sans-serif" }}>
                          PROTECTED · STATIONARY · LONDON, SW3
                        </span>
                      </div>
                    </div>
                    {/* Map area */}
                    <div className="bg-[#0F1923] rounded-xl h-28 mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        {/* Grid lines simulating a map */}
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute left-0 right-0 border-b border-[#1A2A3A]"
                            style={{ top: `${i * 20}%` }}
                          />
                        ))}
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-0 bottom-0 border-r border-[#1A2A3A]"
                            style={{ left: `${i * 14}%` }}
                          />
                        ))}
                      </div>
                      {/* Location pin */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 rounded-full bg-[#C9A84C] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-3 bg-[#C9A84C]" />
                      </div>
                    </div>
                    {/* Quick actions */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {["Live View", "Geofence", "Immobilise"].map((action) => (
                        <div
                          key={action}
                          className="bg-[#111111] rounded-lg p-2 text-center border border-[#2A2A2A]"
                        >
                          <div className="text-[7px] text-[#999999] font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                            {action}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-[3rem] bg-[#C9A84C]/5 blur-xl -z-10 scale-110" />
            </div>
          </div>

          {/* Right content */}
          <div data-reveal>
            <p className="overline mb-4">THE TRAVIO APP</p>
            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
            >
              Total control.{" "}
              <span className="text-[#C9A84C]">One app.</span>
            </h2>

            <ul className="space-y-4 mb-10">
              {features.map((feat) => (
                <li key={feat.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <feat.icon className="h-4 w-4 text-[#C9A84C]" />
                  </div>
                  <span className="text-[#999999] text-sm leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {feat.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {["App Store", "Google Play"].map((store) => (
                <div
                  key={store}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] border border-[#2A2A2A] rounded-xl hover:border-[#C9A84C] transition-colors duration-200 cursor-not-allowed opacity-60"
                >
                  <Smartphone className="h-4 w-4 text-[#999999]" />
                  <div>
                    <div className="text-[9px] text-[#555555]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      Coming to
                    </div>
                    <div className="text-xs text-[#F5F5F5] font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      {store}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section 8: Vehicle Marquee ─────────────── */
function VehicleMarquee() {
  const vehicles = [
    "Porsche 911",
    "Ferrari SF90",
    "Range Rover SVR",
    "Lamborghini Urus",
    "Aston Martin DB12",
    "McLaren 720S",
    "Bentley Continental",
    "Mercedes G-Class",
    "BMW M5",
    "Rolls-Royce Ghost",
    "Airstream Interstate",
    "Bailey Motorhome",
    "Ducati Panigale",
    "Honda Goldwing",
    "Swift Caravan",
  ];
  const doubled = [...vehicles, ...vehicles];

  return (
    <section className="py-12 bg-[#111111] border-y border-[#2A2A2A] overflow-hidden">
      <div className="flex animate-marquee-reverse whitespace-nowrap">
        {doubled.map((v, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className={`text-2xl px-8 flex-shrink-0 ${
                i % 3 === 0 ? "text-[#C9A84C]" : "text-[#2A2A2A]"
              }`}
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 400 }}
            >
              {v}
            </span>
            <span className="text-[#2A2A2A] text-lg flex-shrink-0">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 9: Testimonials ────────────────── */
function Testimonials() {
  const ref = useScrollReveal();

  const testimonials = [
    {
      quote:
        "My Ferrari 296 needed an S5 tracker for insurance — Travio had an engineer at my home in 24 hours. The app is genuinely beautiful.",
      name: "James W.",
      vehicle: "Ferrari 296 GTB Owner",
    },
    {
      quote:
        "We tour the UK in our Bürstner motorhome. Knowing Travio is monitoring it 24/7 while we sleep is priceless.",
      name: "Sandra & Keith R.",
      vehicle: "Motorhome Owners",
    },
    {
      quote:
        "The immobilisation feature alone is worth it. My Lamborghini Urus is in a public car park every day — I wouldn't leave it without Travio.",
      name: "Daniel M.",
      vehicle: "Lamborghini Urus Owner",
    },
  ];

  return (
    <section className="section-padding bg-[#0A0A0A]" ref={ref}>
      <div className="container-premium">
        <div className="text-center mb-14" data-reveal>
          <p className="overline mb-4">TRUSTED BY OWNERS</p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
          >
            What our customers say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 relative hover:border-[#C9A84C]/30 transition-colors duration-300"
              data-reveal
            >
              {/* Gold quote mark */}
              <div
                className="absolute top-6 right-8 text-6xl leading-none select-none text-[#C9A84C] opacity-20"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
              >
                "
              </div>
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>
              <p
                className="text-[#F5F5F5] italic leading-relaxed mb-6 relative z-10"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div
                  className="text-[#C9A84C] font-bold"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
                >
                  {t.name}
                </div>
                <div
                  className="text-[#555555] text-sm"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {t.vehicle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section 10: Final CTA ──────────────────── */
function FinalCTA() {
  const ref = useScrollReveal();

  return (
    <section className="relative py-32 md:py-40 overflow-hidden" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 container-premium text-center" data-reveal>
        <p className="overline mb-5">GET STARTED TODAY</p>
        <h2
          className="text-5xl md:text-6xl lg:text-7xl mb-6 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
        >
          Your vehicle deserves{" "}
          <span className="text-[#C9A84C]">the best protection.</span>
        </h2>
        <p
          className="text-[#999999] text-lg mb-10 max-w-lg mx-auto"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Thatcham-certified. App-controlled. Installed at your door.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/get-quote" className="btn-gold text-base py-4 px-8">
            Get a Quote
          </Link>
          <Link href="/book-installation" className="btn-ghost text-base py-4 px-8">
            Book a Free Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Homepage Component ─────────────────── */
export function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <TrustMarquee />
      <BrandStatement />
      <ProductCategoriesGrid />
      <ThreatReality />
      <HowItWorks />
      <AppPreview />
      <VehicleMarquee />
      <Testimonials />
      <FinalCTA />
    </PageWrapper>
  );
}

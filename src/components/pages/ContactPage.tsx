"use client";

import { useEffect, useRef } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactPage() {
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
      <section className="bg-[#0A0A0A] pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#2A2A2A]">
        <div className="container-premium text-center">
          <p className="overline mb-4">GET IN TOUCH</p>
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
            We're here to <span className="text-[#C9A84C]">help.</span>
          </h1>
          <p className="text-[#999999] max-w-2xl mx-auto leading-relaxed text-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>
            Whether you need a bespoke quote for a fleet of supercars, or support with your existing tracker, our UK-based team is ready.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#111111]" ref={ref}>
        <div className="container-premium max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8" data-reveal>
              <div>
                <h2 className="text-3xl mb-6" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#F5F5F5] font-medium mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>Sales & Support</p>
                      <p className="text-[#999999] text-sm">0800 123 4567</p>
                      <p className="text-[#555555] text-xs mt-1">Mon-Fri: 9am - 6pm</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#F5F5F5] font-medium mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>Email</p>
                      <p className="text-[#999999] text-sm">hello@travio.co.uk</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#F5F5F5] font-medium mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>Head Office</p>
                      <p className="text-[#999999] text-sm">Travio Security Ltd<br/>100 Premium Way<br/>London, SW1A 1AA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#0A0A0A] rounded-2xl border border-[#2A2A2A]">
                <h3 className="text-xl mb-2 text-[#FF4444]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Stolen Vehicle?</h3>
                <p className="text-[#999999] text-sm mb-4" style={{ fontFamily: "DM Sans, sans-serif" }}>If your vehicle has been stolen, please contact our 24/7 Secure Control Centre immediately using the emergency number provided in your app.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-[#2A2A2A]" data-reveal>
              <h2 className="text-2xl mb-6" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Send us a message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C9A84C]" />
                  <input type="text" placeholder="Last Name" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C9A84C]" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C9A84C]" />
                <select className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#999999] focus:outline-none focus:border-[#C9A84C] appearance-none">
                  <option value="">Enquiry Type</option>
                  <option value="sales">Sales & Pricing</option>
                  <option value="support">Technical Support</option>
                  <option value="partners">Partnerships</option>
                </select>
                <textarea rows={4} placeholder="Your message..." className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#C9A84C]"></textarea>
                <button type="submit" className="btn-gold w-full justify-center">Send Message</button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

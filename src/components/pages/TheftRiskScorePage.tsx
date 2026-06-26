"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShieldAlert, Crosshair, Map, Key, Car, Search, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";

export function TheftRiskScorePage() {
  const [step, setStep] = useState<"form" | "analyzing" | "result">("form");
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    parking: "driveway",
    postcode: "",
    keyless: "yes"
  });

  const [score, setScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high" | "critical">("low");
  const [analysisText, setAnalysisText] = useState("");

  const analyzeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("analyzing");
    
    // Simulate AI analysis steps with GSAP
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 3,
        ease: "power2.inOut",
        onComplete: generateResult
      });
    } else {
      setTimeout(generateResult, 3000);
    }
  };

  const generateResult = () => {
    // Generate a mock score based on inputs
    const make = formData.make.toLowerCase();
    let calculatedScore = 50;
    
    // High risk makes
    if (["land rover", "range rover", "porsche", "ferrari", "lamborghini", "mercedes", "bmw"].includes(make)) {
      calculatedScore += 30;
    }
    
    if (formData.keyless === "yes") calculatedScore += 15;
    if (formData.parking === "street") calculatedScore += 10;
    if (formData.parking === "driveway") calculatedScore += 5;
    if (formData.parking === "garage") calculatedScore -= 10;
    
    // Cap at 98
    calculatedScore = Math.min(98, Math.max(12, calculatedScore));
    setScore(calculatedScore);
    
    if (calculatedScore >= 80) setRiskLevel("critical");
    else if (calculatedScore >= 60) setRiskLevel("high");
    else if (calculatedScore >= 40) setRiskLevel("medium");
    else setRiskLevel("low");

    // Generate text
    const text = `Based on our AI analysis of national crime statistics, the ${formData.year} ${formData.make} ${formData.model} has a ${calculatedScore >= 80 ? "critical" : "significant"} theft risk profile. Keyless entry models parked on a ${formData.parking} are highly susceptible to relay attacks, where thieves can clone the signal in under 60 seconds. A Thatcham S5 tracker with Driver ID is strongly recommended to protect this asset.`;
    setAnalysisText(text);
    
    setStep("result");
  };

  return (
    <PageWrapper>
      <section className="min-h-[85vh] bg-[#0B0F19] pt-32 pb-16 flex items-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B1A]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-premium relative z-10">
          <div className="max-w-3xl mx-auto">
            
            {step === "form" && (
              <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 bg-[#111625] border border-[#262D3D] px-4 py-2 rounded-full mb-6">
                  <Activity className="h-4 w-4 text-[#FF6B1A]" />
                  <span className="text-xs uppercase tracking-widest text-[#999999]" style={{ fontFamily: "DM Sans, sans-serif" }}>AI-Powered Analysis</span>
                </div>
                <h1 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
                  What is your vehicle's <span className="text-[#FF6B1A]">true theft risk?</span>
                </h1>
                <p className="text-[#999999] mb-10 text-lg leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                  Our AI engine analyzes national crime databases, local postcode data, and model-specific vulnerabilities to calculate the exact theft probability of your vehicle.
                </p>
                
                <div className="bg-[#111625] border border-[#262D3D] rounded-2xl p-6 md:p-10 text-left relative overflow-hidden shadow-2xl">
                  <form onSubmit={handleAnalyze} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-[#999999] uppercase tracking-wider" style={{ fontFamily: "DM Sans, sans-serif" }}>Make</label>
                        <input required value={formData.make} onChange={(e)=>setFormData({...formData, make: e.target.value})} placeholder="e.g. Range Rover" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-[#999999] uppercase tracking-wider" style={{ fontFamily: "DM Sans, sans-serif" }}>Model</label>
                        <input required value={formData.model} onChange={(e)=>setFormData({...formData, model: e.target.value})} placeholder="e.g. Sport SVR" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-[#999999] uppercase tracking-wider" style={{ fontFamily: "DM Sans, sans-serif" }}>Year</label>
                        <input required value={formData.year} onChange={(e)=>setFormData({...formData, year: e.target.value})} placeholder="e.g. 2023" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-[#999999] uppercase tracking-wider" style={{ fontFamily: "DM Sans, sans-serif" }}>Postcode (First half)</label>
                        <input required value={formData.postcode} onChange={(e)=>setFormData({...formData, postcode: e.target.value})} placeholder="e.g. SW3" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-[#999999] uppercase tracking-wider" style={{ fontFamily: "DM Sans, sans-serif" }}>Overnight Parking</label>
                        <select value={formData.parking} onChange={(e)=>setFormData({...formData, parking: e.target.value})} className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] transition-colors appearance-none">
                          <option value="garage">Secure Garage</option>
                          <option value="driveway">Driveway</option>
                          <option value="street">Public Street</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-[#999999] uppercase tracking-wider" style={{ fontFamily: "DM Sans, sans-serif" }}>Keyless Entry / Start?</label>
                        <select value={formData.keyless} onChange={(e)=>setFormData({...formData, keyless: e.target.value})} className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] transition-colors appearance-none">
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn-gold w-full justify-center py-4 text-lg mt-8 flex items-center gap-2">
                      <Search className="h-5 w-5" /> Calculate Risk Score
                    </button>
                  </form>
                </div>
              </div>
            )}

            {step === "analyzing" && (
              <div className="text-center py-20 animate-in fade-in duration-500">
                <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-[#262D3D] rounded-full" />
                  <div className="absolute inset-0 border-4 border-[#FF6B1A] rounded-full border-t-transparent animate-spin" />
                  <Activity className="h-10 w-10 text-[#FF6B1A] animate-pulse" />
                </div>
                <h2 className="text-3xl mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>AI is analyzing your risk...</h2>
                <div className="h-6 overflow-hidden">
                  <div className="animate-[slideUp_2s_ease-in-out_infinite] flex flex-col text-[#999999]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    <span>Cross-referencing DVLA theft statistics...</span>
                    <span>Analyzing postcode crime rates...</span>
                    <span>Checking known keyless vulnerabilities...</span>
                    <span>Evaluating export desirability...</span>
                  </div>
                </div>
                <div className="w-full max-w-md mx-auto mt-8 h-1 bg-[#1E2533] rounded-full overflow-hidden">
                  <div ref={progressRef} className="h-full bg-[#FF6B1A] w-0" />
                </div>
              </div>
            )}

            {step === "result" && (
              <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-[#111625] border border-[#262D3D] rounded-3xl p-8 md:p-14 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 ${riskLevel === 'critical' || riskLevel === 'high' ? 'bg-[#FF4444]' : riskLevel === 'medium' ? 'bg-orange-400' : 'bg-green-500'}`} />
                  
                  <p className="overline mb-6">RISK ANALYSIS COMPLETE</p>
                  
                  <div className="flex flex-col items-center justify-center mb-8">
                    <div className="text-[120px] leading-none mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
                      <span className={riskLevel === 'critical' || riskLevel === 'high' ? 'text-[#FF4444]' : 'text-[#FF6B1A]'}>
                        {score}
                      </span>
                      <span className="text-3xl text-[#555555]">/100</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#0B0F19]" style={{ 
                      borderColor: riskLevel === 'critical' || riskLevel === 'high' ? '#FF4444' : '#FF6B1A'
                    }}>
                      <ShieldAlert className={`h-4 w-4 ${riskLevel === 'critical' || riskLevel === 'high' ? 'text-[#FF4444]' : 'text-[#FF6B1A]'}`} />
                      <span className="text-xs uppercase tracking-widest text-[#F5F5F5]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                        {riskLevel} RISK
                      </span>
                    </div>
                  </div>

                  <p className="text-[#F5F5F5] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {analysisText}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/get-quote?plan=s5" className="btn-gold w-full justify-center">
                      Get S5 Protection <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <button onClick={() => setStep("form")} className="btn-ghost w-full justify-center">
                      Recalculate
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html:`
          @keyframes slideUp {
            0%, 20% { transform: translateY(0); }
            25%, 45% { transform: translateY(-24px); }
            50%, 70% { transform: translateY(-48px); }
            75%, 100% { transform: translateY(-72px); }
          }
        `}} />
      </section>
    </PageWrapper>
  );
}

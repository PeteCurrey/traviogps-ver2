"use client";

import { useState, useRef, useEffect } from "react";
import { Car, Home, User, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { gsap } from "gsap";

export function GetQuotePage() {
  const [step, setStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Form State
  const [vehicleType, setVehicleType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [value, setValue] = useState(50000);
  const [keyless, setKeyless] = useState("");
  
  const [postcode, setPostcode] = useState("");
  const [storage, setStorage] = useState("");
  const [existingTracker, setExistingTracker] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactTime, setContactTime] = useState("");

  const goToStep = (nextStep: number) => {
    if (!containerRef.current) return;
    const direction = nextStep > step ? -100 : 100;
    
    gsap.to(containerRef.current, {
      x: direction,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setStep(nextStep);
        gsap.fromTo(containerRef.current, 
          { x: -direction, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const isStep1Valid = vehicleType && make && model && year && keyless;
  const isStep2Valid = postcode && storage && existingTracker;
  const isStep3Valid = firstName && lastName && email && phone && contactTime;

  return (
    <PageWrapper>
      <section className="min-h-screen bg-[#0B0F19] pt-32 pb-24">
        <div className="container-premium max-w-3xl">
          
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {[1,2,3,4].map(s => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-[#FF6B1A] text-[#0B0F19]' : 'bg-[#111625] text-[#555555] border border-[#262D3D]'}`} style={{ fontFamily: "Syne, sans-serif" }}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  <span className={`text-xs uppercase tracking-wider hidden sm:block ${step >= s ? 'text-[#FF6B1A]' : 'text-[#555555]'}`} style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {s === 1 ? "Vehicle" : s === 2 ? "Location" : s === 3 ? "Details" : "Recommendation"}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1 bg-[#111625] rounded-full overflow-hidden">
              <div className="h-full bg-[#FF6B1A] transition-all duration-500 ease-in-out" style={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>

          <div ref={containerRef} className="bg-[#111625] border border-[#262D3D] rounded-3xl p-8 md:p-12 shadow-2xl">
            
            {/* STEP 1: VEHICLE */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl mb-2" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Your Vehicle</h2>
                  <p className="text-[#999999]" style={{ fontFamily: "DM Sans, sans-serif" }}>Tell us what you need to protect.</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#999999] mb-3">Vehicle Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {["Supercar", "Luxury SUV", "Motorhome", "Motorcycle", "Classic Car", "Other"].map(type => (
                        <button key={type} onClick={() => setVehicleType(type)} className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${vehicleType === type ? 'bg-[#FF6B1A]/10 border-[#FF6B1A] text-[#FF6B1A]' : 'bg-[#0B0F19] border-[#262D3D] text-[#999999] hover:border-[#555555]'}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#999999] mb-2">Make</label>
                      <input value={make} onChange={(e)=>setMake(e.target.value)} type="text" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A]" placeholder="e.g. Porsche" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#999999] mb-2">Model</label>
                      <input value={model} onChange={(e)=>setModel(e.target.value)} type="text" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A]" placeholder="e.g. 911 GT3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#999999] mb-2">Year</label>
                      <select value={year} onChange={(e)=>setYear(e.target.value)} className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] appearance-none">
                        <option value="">Select Year</option>
                        {Array.from({length: 25}, (_, i) => new Date().getFullYear() - i).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-[#999999] mb-2">Keyless Entry?</label>
                      <select value={keyless} onChange={(e)=>setKeyless(e.target.value)} className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] appearance-none">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#999999] mb-2">Estimated Value: £{value.toLocaleString()}</label>
                    <input type="range" min="5000" max="500000" step="5000" value={value} onChange={(e)=>setValue(Number(e.target.value))} className="w-full accent-[#FF6B1A]" />
                  </div>
                </div>

                <div className="pt-6 border-t border-[#262D3D] flex justify-end">
                  <button disabled={!isStep1Valid} onClick={() => goToStep(2)} className="btn-gold flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: LOCATION */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl mb-2" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Your Location</h2>
                  <p className="text-[#999999]" style={{ fontFamily: "DM Sans, sans-serif" }}>Where will the vehicle be kept?</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#999999] mb-2">Postcode</label>
                    <input value={postcode} onChange={(e)=>setPostcode(e.target.value)} type="text" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A] uppercase" placeholder="e.g. SW1A 1AA" />
                  </div>

                  <div>
                    <label className="block text-sm text-[#999999] mb-3">Overnight Storage</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Garage", "Driveway", "Public Road", "Storage Site"].map(type => (
                        <button key={type} onClick={() => setStorage(type)} className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors text-left ${storage === type ? 'bg-[#FF6B1A]/10 border-[#FF6B1A] text-[#FF6B1A]' : 'bg-[#0B0F19] border-[#262D3D] text-[#999999] hover:border-[#555555]'}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#999999] mb-3">Existing Tracker?</label>
                    <div className="flex gap-4">
                      <button onClick={() => setExistingTracker("Yes")} className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${existingTracker === "Yes" ? 'bg-[#FF6B1A]/10 border-[#FF6B1A] text-[#FF6B1A]' : 'bg-[#0B0F19] border-[#262D3D] text-[#999999] hover:border-[#555555]'}`}>Yes</button>
                      <button onClick={() => setExistingTracker("No")} className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${existingTracker === "No" ? 'bg-[#FF6B1A]/10 border-[#FF6B1A] text-[#FF6B1A]' : 'bg-[#0B0F19] border-[#262D3D] text-[#999999] hover:border-[#555555]'}`}>No</button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#262D3D] flex justify-between">
                  <button onClick={() => goToStep(1)} className="btn-ghost flex items-center">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </button>
                  <button disabled={!isStep2Valid} onClick={() => goToStep(3)} className="btn-gold flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                    Next Step <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DETAILS */}
            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl mb-2" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Your Details</h2>
                  <p className="text-[#999999]" style={{ fontFamily: "DM Sans, sans-serif" }}>Where should we send your quote?</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#999999] mb-2">First Name</label>
                      <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A]" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#999999] mb-2">Last Name</label>
                      <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#999999] mb-2">Email</label>
                      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A]" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#999999] mb-2">Phone</label>
                      <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="tel" className="w-full bg-[#0B0F19] border border-[#262D3D] rounded-xl px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#FF6B1A]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#999999] mb-3">Preferred Contact Time</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Morning", "Afternoon", "Evening"].map(time => (
                        <button key={time} onClick={() => setContactTime(time)} className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors text-center ${contactTime === time ? 'bg-[#FF6B1A]/10 border-[#FF6B1A] text-[#FF6B1A]' : 'bg-[#0B0F19] border-[#262D3D] text-[#999999] hover:border-[#555555]'}`}>
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#262D3D] flex justify-between">
                  <button onClick={() => goToStep(2)} className="btn-ghost flex items-center">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </button>
                  <button disabled={!isStep3Valid} onClick={() => goToStep(4)} className="btn-gold flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
                    Get Recommendation <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: RECOMMENDATION */}
            {step === 4 && (
              <div className="space-y-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF6B1A]/10 text-[#FF6B1A] mb-2">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>Your Recommendation</h2>
                  <p className="text-[#F5F5F5] text-lg max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    Based on your {value >= 50000 ? `£${value.toLocaleString()}` : ""} {make} {model}, insurers will likely require a <span className="text-[#FF6B1A] font-bold">Thatcham Category S5</span> tracker.
                  </p>
                </div>
                
                <div className="bg-[#0B0F19] border-2 border-[#FF6B1A] rounded-2xl p-6 md:p-8 max-w-md mx-auto relative text-left">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF6B1A] text-[#0B0F19] text-xs font-bold py-1 px-4 rounded-full tracking-wider" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    PRIMARY RECOMMENDATION
                  </div>
                  <h3 className="text-2xl mb-2 text-[#FF6B1A]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>S5 Premium</h3>
                  <p className="text-[#999999] text-sm mb-6 pb-6 border-b border-[#262D3D]">Includes Driver ID, remote immobilisation, and 24/7 monitoring.</p>
                  
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-4xl text-[#F5F5F5]" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>£349</span>
                    <span className="text-[#555555] text-sm mb-1 uppercase tracking-wider font-semibold">Fully Installed</span>
                  </div>
                  <button className="btn-gold w-full justify-center">Book Installation</button>
                </div>
                
                <p className="text-[#555555] text-sm">One of our security experts will call you in the {contactTime.toLowerCase()} to finalize your booking.</p>
              </div>
            )}

          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

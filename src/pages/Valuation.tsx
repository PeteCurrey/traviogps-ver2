import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Home, MapPin, Bed, User, Mail, Phone, Check } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Property Type", icon: Home },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Details", icon: Bed },
  { id: 4, title: "Your Info", icon: User },
];

const propertyTypes = [
  { id: "detached", label: "Detached", icon: "🏠" },
  { id: "semi-detached", label: "Semi-Detached", icon: "🏘️" },
  { id: "terraced", label: "Terraced", icon: "🏘️" },
  { id: "flat", label: "Flat / Apartment", icon: "🏢" },
  { id: "bungalow", label: "Bungalow", icon: "🏡" },
  { id: "cottage", label: "Cottage", icon: "🛖" },
];

const bedroomOptions = [1, 2, 3, 4, 5, "6+"];

const timeframes = [
  { id: "asap", label: "As soon as possible" },
  { id: "1-3months", label: "1-3 months" },
  { id: "3-6months", label: "3-6 months" },
  { id: "6months+", label: "6+ months" },
  { id: "curious", label: "Just curious" },
];

export default function Valuation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    address: "",
    postcode: "",
    bedrooms: "",
    timeframe: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(prev => prev + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // TODO: Submit to database
    setIsSubmitted(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.propertyType !== "";
      case 2: return formData.address !== "" && formData.postcode !== "";
      case 3: return formData.bedrooms !== "" && formData.timeframe !== "";
      case 4: return formData.firstName !== "" && formData.email !== "";
      default: return false;
    }
  };

  if (isSubmitted) {
    return (
      <PageWrapper>
        <section className="min-h-screen flex items-center justify-center bg-background py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg mx-auto px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="h-10 w-10 text-accent" />
            </motion.div>
            <h1 className="font-serif text-display-3 text-foreground mb-4">
              Thank <span className="italic-accent">you</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              We've received your valuation request. One of our local experts will be in touch within 24 hours to arrange a convenient time.
            </p>
            <Button asChild className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="/">Return Home</a>
            </Button>
          </motion.div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-card overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-[128px]" />
        </div>
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              Free Property Valuation
            </p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Discover what <span className="italic-accent">your</span> home is worth
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Get an accurate, no-obligation valuation from our local property experts. 
              We'll provide you with a comprehensive market appraisal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            {/* Progress */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center">
                    <motion.div
                      animate={{
                        backgroundColor: currentStep >= step.id ? "hsl(var(--accent))" : "hsl(var(--secondary))",
                        scale: currentStep === step.id ? 1.1 : 1,
                      }}
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                        currentStep >= step.id ? "text-accent-foreground" : "text-muted-foreground"
                      )}
                    >
                      <step.icon className="h-5 w-5" />
                    </motion.div>
                    {idx < steps.length - 1 && (
                      <div className="hidden sm:block w-16 lg:w-24 h-px bg-border mx-2">
                        <motion.div
                          className="h-full bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Step {currentStep} of {steps.length}
                </p>
                <p className="font-serif text-lg text-foreground">
                  {steps[currentStep - 1].title}
                </p>
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-card border border-border rounded-sm p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {/* Step 1: Property Type */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-foreground mb-6 text-center">
                      What type of property do you have?
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {propertyTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => updateFormData("propertyType", type.id)}
                          className={cn(
                            "p-6 rounded-sm border-2 transition-all text-center",
                            formData.propertyType === type.id
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-3xl mb-2 block">{type.icon}</span>
                          <span className="text-foreground">{type.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Location */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-foreground mb-6 text-center">
                      Where is your property located?
                    </h2>
                    <div className="space-y-4 max-w-md mx-auto">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Property Address</label>
                        <Input
                          value={formData.address}
                          onChange={(e) => updateFormData("address", e.target.value)}
                          placeholder="Enter your full address"
                          className="bg-secondary border-border text-lg py-6"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Postcode</label>
                        <Input
                          value={formData.postcode}
                          onChange={(e) => updateFormData("postcode", e.target.value)}
                          placeholder="e.g. S11 8TH"
                          className="bg-secondary border-border text-lg py-6"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Details */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-foreground mb-6 text-center">
                      Tell us a bit more
                    </h2>
                    <div className="space-y-8 max-w-md mx-auto">
                      <div>
                        <label className="text-sm text-muted-foreground mb-3 block">Number of Bedrooms</label>
                        <div className="flex gap-3 justify-center">
                          {bedroomOptions.map((num) => (
                            <motion.button
                              key={num}
                              onClick={() => updateFormData("bedrooms", String(num))}
                              className={cn(
                                "w-14 h-14 rounded-full border-2 flex items-center justify-center font-medium transition-all",
                                formData.bedrooms === String(num)
                                  ? "border-accent bg-accent text-accent-foreground"
                                  : "border-border text-foreground hover:border-accent/50"
                              )}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {num}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-3 block">When are you looking to sell?</label>
                        <div className="space-y-2">
                          {timeframes.map((tf) => (
                            <motion.button
                              key={tf.id}
                              onClick={() => updateFormData("timeframe", tf.id)}
                              className={cn(
                                "w-full p-4 rounded-sm border-2 text-left transition-all",
                                formData.timeframe === tf.id
                                  ? "border-accent bg-accent/10"
                                  : "border-border hover:border-accent/50"
                              )}
                              whileHover={{ x: 5 }}
                            >
                              {tf.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Info */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-foreground mb-6 text-center">
                      Your contact details
                    </h2>
                    <div className="space-y-4 max-w-md mx-auto">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">First Name *</label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => updateFormData("firstName", e.target.value)}
                            placeholder="John"
                            className="bg-secondary border-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => updateFormData("lastName", e.target.value)}
                            placeholder="Smith"
                            className="bg-secondary border-border"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          placeholder="john@example.com"
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Phone Number</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          placeholder="07700 900000"
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Anything else we should know?</label>
                        <Textarea
                          value={formData.notes}
                          onChange={(e) => updateFormData("notes", e.target.value)}
                          placeholder="Optional notes about your property..."
                          className="bg-secondary border-border"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-10 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="btn-premium bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                >
                  {currentStep === 4 ? "Submit Request" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

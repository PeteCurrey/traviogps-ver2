import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Monitor, Clock, Users, CheckCircle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const benefits = [
  { icon: Monitor, title: "Live Platform Walkthrough", description: "See the tracking dashboard in action with real fleet data." },
  { icon: Clock, title: "30-Minute Session", description: "Quick, focused demo tailored to your business needs." },
  { icon: Users, title: "No Obligation", description: "Ask questions, explore features — zero pressure." },
  { icon: CheckCircle, title: "Expert Guidance", description: "Our fleet specialists will recommend the best solution for you." },
];

const BookDemo = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        message: form.message,
        lead_type: "viewing",
        source: "book-demo",
      });
      if (error) throw error;
      toast.success("Demo booked! We'll confirm your session shortly.");
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <SEOHead title="Book a Demo | See Travio Fleet Tracking in Action" description="Book a free 30-minute demo of Travio's GPS tracking, dash cams, and fleet management platform. No obligation, tailored to your business." />
      <section className="relative pt-32 lg:pt-44 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container-premium relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Benefits */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Book a Demo</p>
              <h1 className="font-bold text-display-3 md:text-display-2 text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                See Travio <span className="text-accent">in Action</span>
              </h1>
              <p className="text-muted-foreground mb-10">
                Book a free, no-obligation demo and discover how Travio can help you manage your fleet smarter.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <b.icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{b.title}</h3>
                      <p className="text-xs text-muted-foreground">{b.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-card border border-border/50 rounded-2xl p-8">
                <h3 className="font-bold text-lg text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Book Your Free Demo</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="message">Anything specific you'd like to see?</Label>
                    <Textarea id="message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
                    {loading ? "Submitting..." : "Book My Free Demo"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default BookDemo;

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, Clock } from "lucide-react";

const GetQuote = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    fleetSize: "",
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
        message: `Company: ${form.companyName}\nFleet Size: ${form.fleetSize}\n\n${form.message}`,
        lead_type: "enquiry",
        source: "get-quote",
      });
      if (error) throw error;
      toast.success("Quote request submitted! We'll be in touch shortly.");
      setForm({ firstName: "", lastName: "", email: "", phone: "", companyName: "", fleetSize: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <section className="relative pt-32 lg:pt-44 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="container-premium relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Get a Quote</p>
              <h1 className="font-bold text-display-3 md:text-display-2 text-foreground mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get Your <span className="text-accent">Free Quote</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Tell us about your fleet and we'll put together a tailored quote within 24 hours.
              </p>

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
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="fleetSize">Fleet Size</Label>
                  <Select value={form.fleetSize} onValueChange={(v) => setForm({ ...form, fleetSize: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fleet size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1–5 vehicles</SelectItem>
                      <SelectItem value="6-15">6–15 vehicles</SelectItem>
                      <SelectItem value="16-50">16–50 vehicles</SelectItem>
                      <SelectItem value="51-100">51–100 vehicles</SelectItem>
                      <SelectItem value="100+">100+ vehicles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Tell Us More</Label>
                  <Textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What are you looking for?" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
                  {loading ? "Submitting..." : "Get My Free Quote"}
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-8">
                <h3 className="font-bold text-xl text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Why Travio?</h3>
                <ul className="space-y-4 text-muted-foreground text-sm">
                  <li>✓ No long-term contracts — cancel anytime</li>
                  <li>✓ Free professional installation available</li>
                  <li>✓ UK-based support team</li>
                  <li>✓ Trusted by 22,000+ businesses</li>
                  <li>✓ Average 15% fuel savings</li>
                </ul>
                <div className="border-t border-border/50 pt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-accent" />
                    <span>0330 060 0499</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-accent" />
                    <span>info@travio.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>Mon–Fri, 8am–6pm</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default GetQuote;

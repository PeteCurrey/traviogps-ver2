import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, Check, Headphones, MessageSquare } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SEOHead } from "@/components/SEOHead";

const enquiryTypes = [
  { id: "tracking", label: "Vehicle Tracking" },
  { id: "dashcams", label: "Dash Cams" },
  { id: "fleet", label: "Fleet Management" },
  { id: "pricing", label: "Pricing & Plans" },
  { id: "support", label: "Technical Support" },
  { id: "general", label: "General Enquiry" },
];

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "0114 268 4242",
    sub: "Mon–Fri: 8am–6pm, Sat: 9am–1pm",
    href: "tel:01142684242",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "info@travio.com",
    sub: "We respond within 4 hours",
    href: "mailto:info@travio.com",
  },
  {
    icon: Headphones,
    title: "Live Chat",
    detail: "Chat with our team",
    sub: "Available during business hours",
    href: "#",
  },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    enquiryType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    fleetSize: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <PageWrapper>
      <SEOHead title="Contact Us | Get in Touch with Travio" description="Contact Travio for GPS vehicle tracking, dash cams, and fleet management enquiries. Call, email, or visit us. UK-based support available 24/7." />
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-card">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">Get In Touch</p>
            <h1 className="font-serif text-display-3 md:text-display-2 text-foreground mb-4">
              Let's talk about your <span className="italic-accent">fleet</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Whether you need a quick quote, a product demo, or just want to ask a question — our UK-based team is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, idx) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-6 bg-card border border-border rounded-sm hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <method.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-1">{method.title}</h3>
                  <p className="text-foreground font-medium text-sm">{method.detail}</p>
                  <p className="text-muted-foreground text-xs mt-1">{method.sub}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-sm p-12 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-accent" />
                  </motion.div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground">Thanks for getting in touch. A member of our team will respond within 4 hours.</p>
                </motion.div>
              ) : (
                <div className="bg-card border border-border rounded-sm p-8">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Enquiry Type */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-3 block">What's your enquiry about?</label>
                      <div className="flex flex-wrap gap-2">
                        {enquiryTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, enquiryType: type.id }))}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm border transition-all",
                              formData.enquiryType === type.id
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border text-muted-foreground hover:border-accent/50"
                            )}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">First Name *</label>
                        <Input required value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} className="bg-secondary border-border" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Last Name *</label>
                        <Input required value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} className="bg-secondary border-border" />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Email *</label>
                        <Input type="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="bg-secondary border-border" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                        <Input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="bg-secondary border-border" />
                      </div>
                    </div>

                    {/* Company & Fleet */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Company Name</label>
                        <Input value={formData.company} onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))} className="bg-secondary border-border" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Fleet Size</label>
                        <Input placeholder="e.g. 5 vehicles" value={formData.fleetSize} onChange={(e) => setFormData(prev => ({ ...prev, fleetSize: e.target.value }))} className="bg-secondary border-border" />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Your Message *</label>
                      <Textarea required value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} placeholder="Tell us about your fleet and what you're looking for..." className="bg-secondary border-border min-h-[150px]" />
                    </div>

                    <Button type="submit" className="w-full btn-premium bg-accent hover:bg-accent/90 text-accent-foreground">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Office */}
              <div className="p-6 bg-card border border-border rounded-sm mb-6">
                <h3 className="font-serif text-xl text-foreground mb-4">Our Office</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Travio Ltd, 742 Ecclesall Road, Sheffield, S11 8TB</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                    <a href="tel:01142684242" className="text-foreground hover:text-accent transition-colors">0114 268 4242</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                    <a href="mailto:info@travio.com" className="text-foreground hover:text-accent transition-colors">info@travio.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">Mon–Fri: 8am–6pm, Sat: 9am–1pm</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 bg-card border border-border rounded-sm mb-6">
                <h3 className="font-serif text-xl text-foreground mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a href="/get-quote" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                    <ArrowRight className="h-3 w-3" /> Get a free quote
                  </a>
                  <a href="/book-demo" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                    <ArrowRight className="h-3 w-3" /> Book a live demo
                  </a>
                  <a href="/pricing" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                    <ArrowRight className="h-3 w-3" /> View pricing plans
                  </a>
                </div>
              </div>

              {/* FAQ teaser */}
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-sm">
                <MessageSquare className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-serif text-lg text-foreground mb-2">Need a quick answer?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Most questions about installation, contracts and pricing are covered in our FAQ.
                </p>
                <Button asChild variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">
                  <a href="/pricing">View Pricing & FAQ</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

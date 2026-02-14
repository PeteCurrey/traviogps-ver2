import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const enquirySchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[0-9\s+()-]*$/, "Phone number contains invalid characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface DevelopmentEnquiryFormProps {
  developmentName: string;
  developmentSlug: string;
}

export function DevelopmentEnquiryForm({
  developmentName,
  developmentSlug,
}: DevelopmentEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        message: data.message
          ? `[Development Enquiry: ${developmentName}]\n\n${data.message}`
          : `[Development Enquiry: ${developmentName}]\n\nInterested in receiving more information.`,
        lead_type: "enquiry",
        source: `development-${developmentSlug}`,
      });

      if (error) throw error;

      setIsSuccess(true);
      form.reset();
      toast.success("Thank you for your enquiry! We'll be in touch soon.");
    } catch (error: any) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl p-8">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-serif text-2xl text-foreground mb-3">
              Thank You!
            </h3>
            <p className="text-muted-foreground mb-6">
              We've received your enquiry about {developmentName} and will be in
              touch shortly.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSuccess(false)}
              className="text-accent border-accent hover:bg-accent/10"
            >
              Submit Another Enquiry
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h3 className="font-serif text-2xl text-foreground mb-2">
              Register Your Interest
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Complete the form below to receive the brochure, price list, and
              priority viewing invitations.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Smith"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.smith@example.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="07123 456789"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your requirements or ask any questions..."
                          rows={4}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Enquiry
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  By submitting this form, you agree to our{" "}
                  <a href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

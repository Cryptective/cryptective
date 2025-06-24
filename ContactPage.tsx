import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import { insertContactInquirySchema } from "@shared/schema";
import { cn } from "@/lib/utils";

const formSchema = insertContactInquirySchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Message Sent Successfully!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for contacting us. We've received your message and will get back to you 
                within 24 hours. For urgent matters, please call us directly.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>• Response time: 2-4 hours during business hours</p>
                <p>• Emergency support: Available 24/7</p>
                <p>• Phone support: +1 (305) 239-4673</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Contact Our Experts</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our crypto recovery and investment specialists. 
              We're here to help you secure and grow your digital assets.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Get detailed assistance via email
              </p>
              <a 
                href="mailto:support@cryptective.xyz" 
                className="text-primary hover:text-primary/80 font-medium"
              >
                support@cryptective.xyz
              </a>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Direct line to our experts
              </p>
              <a 
                href="tel:+13052394673" 
                className="text-primary hover:text-primary/80 font-medium"
              >
                +1 (305) 239-4673
              </a>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">24/7 Emergency</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Urgent recovery assistance
              </p>
              <span className="text-primary font-medium">
                Always Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      {...form.register("name")}
                      className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      {...form.register("email")}
                      className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...form.register("subject")}
                    className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="Crypto Recovery Inquiry">Crypto Recovery Inquiry</option>
                    <option value="Investment Consultation">Investment Consultation</option>
                    <option value="Wallet Linking Support">Wallet Linking Support</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership Inquiry">Partnership Inquiry</option>
                    <option value="General Question">General Question</option>
                  </select>
                  {form.formState.errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Please describe your inquiry in detail..."
                    {...form.register("message")}
                    className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={cn(
                    "w-full btn-primary",
                    mutation.isPending && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {mutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>

                {mutation.error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <p className="text-red-400">Failed to send message. Please try again.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Info */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p className="text-muted-foreground text-sm">
                        Miami Financial District<br />
                        Miami, FL 33131<br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                        Saturday: 10:00 AM - 4:00 PM EST<br />
                        Sunday: Emergency support only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sm mb-1">How long does crypto recovery take?</p>
                    <p className="text-muted-foreground text-sm">
                      Recovery timeframes vary, but most cases are resolved within 2-4 weeks.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">What information do you need?</p>
                    <p className="text-muted-foreground text-sm">
                      Wallet addresses, transaction hashes, and a detailed description of the incident.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Are consultations free?</p>
                    <p className="text-muted-foreground text-sm">
                      Yes, initial consultations and case evaluations are completely free.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Do you work internationally?</p>
                    <p className="text-muted-foreground text-sm">
                      Yes, we provide services globally with 24/7 support coverage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-2">Emergency Recovery</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're experiencing an active security breach or urgent asset loss:
                </p>
                <div className="space-y-2">
                  <a 
                    href="tel:+13052394673" 
                    className="block text-red-400 hover:text-red-300 font-medium"
                  >
                    📞 +1 (305) 239-4673
                  </a>
                  <a 
                    href="mailto:emergency@cryptective.xyz" 
                    className="block text-red-400 hover:text-red-300 font-medium"
                  >
                    📧 emergency@cryptective.xyz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
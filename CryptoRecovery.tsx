import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Shield, FileText, Search, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import { insertRecoveryCaseSchema } from "@shared/schema";
import { cn } from "@/lib/utils";

const formSchema = insertRecoveryCaseSchema.extend({
  userId: z.string().min(1, "User ID is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function CryptoRecovery() {
  const [submitted, setSubmitted] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "demo-user", // In real app, get from auth
      assetType: "",
      amount: "",
      description: "",
      walletAddress: "",
      transactionHash: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("/api/recovery-cases", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/recovery-cases"] });
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
              <h1 className="text-2xl font-bold mb-4">Recovery Case Submitted</h1>
              <p className="text-muted-foreground mb-6">
                Your crypto recovery case has been successfully submitted. Our expert team will begin 
                investigating your case within 24 hours.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>• You will receive email updates on case progress</p>
                <p>• Initial analysis typically takes 2-3 business days</p>
                <p>• Our success rate for recoverable assets is 98.5%</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary"
              >
                Submit Another Case
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
              <span className="gradient-text">Crypto Asset Recovery</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional blockchain investigation and asset recovery services. 
              Report your lost cryptocurrency and let our experts help you recover it.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">$2.5B+</div>
              <div className="text-muted-foreground">Total Assets Recovered</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">98.5%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">24-48h</div>
              <div className="text-muted-foreground">Initial Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Form */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Submit Recovery Case</h2>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Asset Type */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Asset Type <span className="text-red-400">*</span>
                </label>
                <select
                  {...form.register("assetType")}
                  className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select asset type</option>
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="usdt">Tether (USDT)</option>
                  <option value="usdc">USD Coin (USDC)</option>
                  <option value="bnb">Binance Coin (BNB)</option>
                  <option value="other">Other</option>
                </select>
                {form.formState.errors.assetType && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.assetType.message}</p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Estimated Amount Lost
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1.5 BTC or $50,000"
                  {...form.register("amount")}
                  className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {form.formState.errors.amount && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.amount.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Case Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Please describe how you lost access to your crypto assets. Include as much detail as possible..."
                  {...form.register("description")}
                  className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {form.formState.errors.description && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>

              {/* Wallet Address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Wallet Address (if known)
                </label>
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  {...form.register("walletAddress")}
                  className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                />
                {form.formState.errors.walletAddress && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.walletAddress.message}</p>
                )}
              </div>

              {/* Transaction Hash */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Known Transaction Hash (if available)
                </label>
                <input
                  type="text"
                  placeholder="Enter transaction hash"
                  {...form.register("transactionHash")}
                  className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                />
                {form.formState.errors.transactionHash && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.transactionHash.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className={cn(
                  "w-full btn-primary",
                  mutation.isPending && "opacity-50 cursor-not-allowed"
                )}
              >
                {mutation.isPending ? "Submitting..." : "Submit Recovery Case"}
              </button>

              {mutation.error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400">Failed to submit recovery case. Please try again.</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Process Steps */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">1. Case Review</h3>
              <p className="text-muted-foreground text-sm">
                Our experts review your case details and determine the best recovery approach.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Search className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">2. Investigation</h3>
              <p className="text-muted-foreground text-sm">
                Advanced blockchain analysis to trace and locate your lost assets.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">3. Recovery</h3>
              <p className="text-muted-foreground text-sm">
                Execute recovery plan and securely return your assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Wallet, Shield, Link2, Trash2, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { z } from "zod";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import { insertWalletConnectionSchema } from "@shared/schema";
import { cn, truncateAddress } from "@/lib/utils";

const formSchema = insertWalletConnectionSchema.extend({
  userId: z.string().min(1, "User ID is required"),
});

type FormData = z.infer<typeof formSchema>;

const walletTypes = [
  { id: "metamask", name: "MetaMask", icon: "🦊" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "🔵" },
  { id: "trust", name: "Trust Wallet", icon: "🛡️" },
  { id: "ledger", name: "Ledger", icon: "📱" },
  { id: "trezor", name: "Trezor", icon: "🔐" },
  { id: "other", name: "Other", icon: "💼" },
];

export default function WalletLinking() {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const userId = "demo-user"; // In real app, get from auth

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId,
      walletAddress: "",
      walletType: "",
    },
  });

  // Fetch user's connected wallets
  const { data: wallets, isLoading } = useQuery({
    queryKey: ["/api/wallets", userId],
    queryFn: () => apiRequest(`/api/wallets/${userId}`),
  });

  // Add wallet mutation
  const addWalletMutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("/api/wallets", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallets", userId] });
      form.reset();
      setShowForm(false);
    },
  });

  // Remove wallet mutation
  const removeWalletMutation = useMutation({
    mutationFn: (walletId: string) => apiRequest(`/api/wallets/${walletId}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wallets", userId] });
    },
  });

  const onSubmit = (data: FormData) => {
    addWalletMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Secure Wallet Linking</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect your crypto wallets securely with enterprise-grade encryption. 
              Monitor your assets and enable advanced recovery features.
            </p>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-muted-foreground text-sm">Your wallet data is encrypted with military-grade security</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Link2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Read-Only Access</h3>
              <p className="text-muted-foreground text-sm">We only view your wallet balance, never access your funds</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Instant Verification</h3>
              <p className="text-muted-foreground text-sm">Automatic verification and asset discovery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Connected Wallets */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Connected Wallets</h2>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Wallet
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg"></div>
                      <div>
                        <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-32"></div>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : wallets && wallets.length > 0 ? (
            <div className="space-y-4">
              {wallets.map((wallet: any) => (
                <div key={wallet.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                        {walletTypes.find(t => t.id === wallet.walletType)?.icon || "💼"}
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {walletTypes.find(t => t.id === wallet.walletType)?.name || "Unknown Wallet"}
                        </h3>
                        <p className="text-muted-foreground font-mono text-sm">
                          {truncateAddress(wallet.walletAddress)}
                        </p>
                        <p className="text-xs text-green-400">Connected</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeWalletMutation.mutate(wallet.id)}
                      disabled={removeWalletMutation.isPending}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Wallets Connected</h3>
              <p className="text-muted-foreground mb-6">
                Connect your first wallet to enable advanced features and monitoring.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Connect Your First Wallet
              </button>
            </div>
          )}

          {/* Add Wallet Form */}
          {showForm && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Add New Wallet</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Wallet Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      {...form.register("walletType")}
                      className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select wallet type</option>
                      {walletTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.icon} {type.name}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.walletType && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.walletType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Wallet Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your wallet address"
                      {...form.register("walletAddress")}
                      className="w-full p-3 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                    />
                    {form.formState.errors.walletAddress && (
                      <p className="text-red-400 text-sm mt-1">{form.formState.errors.walletAddress.message}</p>
                    )}
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="text-blue-400 font-medium mb-1">Security Note</p>
                        <p className="text-muted-foreground">
                          We only require your wallet address for read-only access. 
                          Never share your private keys or seed phrases.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={addWalletMutation.isPending}
                      className={cn(
                        "flex-1 btn-primary",
                        addWalletMutation.isPending && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {addWalletMutation.isPending ? "Adding..." : "Add Wallet"}
                    </button>
                  </div>

                  {addWalletMutation.error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <p className="text-red-400 text-sm">Failed to add wallet. Please try again.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Enhanced Security</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Real-time security monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Suspicious activity alerts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Advanced threat detection</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Recovery Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Automatic asset discovery</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Transaction history analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Priority recovery support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
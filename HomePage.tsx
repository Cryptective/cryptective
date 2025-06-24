import { Link } from "wouter";
import { Shield, Zap, Lock, TrendingUp, Users, Award, ArrowRight, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatCurrency, formatPercentage } from "@/lib/utils";

function CryptoWidget() {
  const { data: cryptoData, isLoading } = useQuery({
    queryKey: ["/api/crypto-data"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading || !cryptoData) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-6 bg-muted rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Bitcoin</p>
            <p className="text-lg font-semibold">{formatCurrency(cryptoData.bitcoin.price)}</p>
            <p className={`text-xs ${cryptoData.bitcoin.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(cryptoData.bitcoin.changePercent24h)}
            </p>
          </div>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            ₿
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Ethereum</p>
            <p className="text-lg font-semibold">{formatCurrency(cryptoData.ethereum.price)}</p>
            <p className={`text-xs ${cryptoData.ethereum.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(cryptoData.ethereum.changePercent24h)}
            </p>
          </div>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            Ξ
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Fear & Greed</p>
            <p className="text-lg font-semibold">{cryptoData.fearGreedIndex}</p>
            <p className="text-xs text-primary">Greed</p>
          </div>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            📊
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="pattern-grid absolute inset-0 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block">Secure Your</span>
              <span className="block gradient-text">Crypto Future</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional crypto asset recovery, smart investment opportunities, and secure wallet management. 
              Recover lost cryptocurrency with our blockchain-powered platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/crypto-recovery" className="btn-primary">
                Start Recovery Process
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href="/investment-solutions" className="btn-secondary">
                Explore Investments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Crypto Data */}
      <section className="py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Live Market Data</h2>
            <p className="text-muted-foreground">Real-time cryptocurrency prices and market sentiment</p>
          </div>
          <CryptoWidget />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose <span className="gradient-text">Cryptective AI</span>
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Advanced blockchain technology meets professional crypto services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-card border border-border rounded-lg p-6 card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Asset Recovery</h3>
              <p className="text-muted-foreground">
                Professional crypto asset recovery with advanced blockchain analysis and investigation techniques.
              </p>
              <Link href="/crypto-recovery" className="inline-flex items-center text-primary hover:text-primary/80 mt-4">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="group bg-card border border-border rounded-lg p-6 card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Investments</h3>
              <p className="text-muted-foreground">
                Curated investment opportunities with risk analysis and beginner-friendly guidance.
              </p>
              <Link href="/investment-solutions" className="inline-flex items-center text-primary hover:text-primary/80 mt-4">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="group bg-card border border-border rounded-lg p-6 card-hover">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Wallet Linking</h3>
              <p className="text-muted-foreground">
                Safe and encrypted connections to your crypto wallets with enterprise-grade security.
              </p>
              <Link href="/wallet-linking" className="inline-flex items-center text-primary hover:text-primary/80 mt-4">
                Learn more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">$2.5B+</div>
              <div className="text-muted-foreground mt-2">Assets Recovered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">98.5%</div>
              <div className="text-muted-foreground mt-2">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground mt-2">Cases Resolved</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground mt-2">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Simple steps to recover your lost crypto assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Report Loss", desc: "Submit details about your lost crypto assets" },
              { step: "02", title: "Investigation", desc: "Our experts analyze blockchain transactions" },
              { step: "03", title: "Recovery Plan", desc: "Develop a customized recovery strategy" },
              { step: "04", title: "Asset Return", desc: "Securely return recovered assets to you" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-16 w-full h-0.5 bg-border"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Recover Your Assets?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your crypto recovery process today with our expert team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/crypto-recovery" className="btn-primary">
              Start Recovery Process
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
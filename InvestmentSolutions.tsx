import { TrendingUp, Shield, Zap, Info, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatCurrency, formatPercentage, getRiskColor } from "@/lib/utils";
import { Link } from "wouter";

export default function InvestmentSolutions() {
  const { data: investments, isLoading } = useQuery({
    queryKey: ["/api/investments"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-6 bg-muted rounded w-1/3 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-6">
                    <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                ))}
              </div>
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
              <span className="gradient-text">Smart Investment Solutions</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Carefully curated cryptocurrency investment opportunities with professional risk analysis 
              and beginner-friendly guidance.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Risk Management</h3>
              <p className="text-muted-foreground text-sm">Professional risk assessment and portfolio diversification</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">High Returns</h3>
              <p className="text-muted-foreground text-sm">Carefully selected opportunities with strong growth potential</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Easy Access</h3>
              <p className="text-muted-foreground text-sm">Simple onboarding process designed for all experience levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Available Investment Opportunities</h2>
            <p className="text-muted-foreground">
              Each investment opportunity has been thoroughly vetted by our expert team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {investments?.map((investment: any) => (
              <div key={investment.id} className="bg-card border border-border rounded-lg p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{investment.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(investment.riskLevel)} bg-opacity-10`}>
                      {investment.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">
                      {formatPercentage(investment.expectedReturn)}
                    </div>
                    <div className="text-xs text-muted-foreground">Expected APY</div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {investment.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Minimum Investment</span>
                    <span className="font-medium">{formatCurrency(investment.minimumInvestment)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <span className={`font-medium ${getRiskColor(investment.riskLevel)}`}>
                      {investment.riskLevel.charAt(0).toUpperCase() + investment.riskLevel.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Expected Return</span>
                    <span className="font-medium text-green-400">
                      {formatPercentage(investment.expectedReturn)} APY
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full btn-primary">
                    Invest Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                  <button className="w-full btn-secondary">
                    View Details
                    <Info className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Investment Process */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              How to <span className="gradient-text">Get Started</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Choose Investment",
                  description: "Select an investment opportunity that matches your risk tolerance"
                },
                {
                  step: "02", 
                  title: "Fund Account",
                  description: "Securely deposit funds using crypto or traditional payment methods"
                },
                {
                  step: "03",
                  title: "Monitor Performance",
                  description: "Track your investment performance through our dashboard"
                },
                {
                  step: "04",
                  title: "Withdraw Profits",
                  description: "Withdraw your profits anytime with our flexible terms"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mb-4 mx-auto">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Disclaimer */}
          <div className="mt-16 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-400 mb-2">Investment Risk Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  All investments carry risk of loss. Cryptocurrency investments are particularly volatile 
                  and can result in significant losses. Past performance does not guarantee future results. 
                  Please invest responsibly and only invest amounts you can afford to lose. Consider 
                  consulting with a financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Investing?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of investors who trust Cryptective AI for their crypto investments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary">
                Open Dashboard
              </Link>
              <Link href="/contact" className="btn-secondary">
                Speak with Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
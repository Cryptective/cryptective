import { Link } from "wouter";
import { Home, ArrowLeft, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to exploring our crypto recovery and investment solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/" className="btn-primary">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="btn-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Crypto Recovery</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Report lost cryptocurrency and start your recovery process
              </p>
              <Link href="/crypto-recovery" className="text-primary hover:text-primary/80 text-sm font-medium">
                Start Recovery →
              </Link>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Investment Solutions</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Explore curated crypto investment opportunities
              </p>
              <Link href="/investment-solutions" className="text-primary hover:text-primary/80 text-sm font-medium">
                View Investments →
              </Link>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Trading Dashboard</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Monitor your crypto portfolio and trading performance
              </p>
              <Link href="/dashboard" className="text-primary hover:text-primary/80 text-sm font-medium">
                Open Dashboard →
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-12 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-secondary">
                Contact Support
              </Link>
              <a 
                href="mailto:support@cryptective.xyz" 
                className="btn-secondary"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
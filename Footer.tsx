import { Link } from "wouter";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { SiTwitter, SiTelegram, SiDiscord } from "react-icons/si";
import cryptectiveLogo from "@assets/IMG_9376_1750726213225.png";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={cryptectiveLogo} 
                alt="Cryptective AI" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold gradient-text">
                Cryptective AI
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Professional crypto asset recovery and investment solutions powered by advanced blockchain technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiTelegram className="w-5 h-5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiDiscord className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/crypto-recovery" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Crypto Recovery
                </Link>
              </li>
              <li>
                <Link href="/investment-solutions" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Investment Solutions
                </Link>
              </li>
              <li>
                <Link href="/wallet-linking" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Wallet Linking
                </Link>
              </li>
              <li>
                <Link href="/recovery-reports" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Recovery Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Trading Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Security Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Status Page
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:support@cryptective.xyz" className="text-muted-foreground hover:text-primary transition-colors">
                  support@cryptective.xyz
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+13052394673" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (305) 239-4673
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  Miami, FL<br />
                  United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Cryptective AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
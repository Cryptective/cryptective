import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Pages
import HomePage from "@/pages/HomePage";
import CryptoRecovery from "@/pages/CryptoRecovery";
import InvestmentSolutions from "@/pages/InvestmentSolutions";
import WalletLinking from "@/pages/WalletLinking";
import RecoveryReports from "@/pages/RecoveryReports";
import TradingDashboard from "@/pages/TradingDashboard";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/crypto-recovery" component={CryptoRecovery} />
            <Route path="/investment-solutions" component={InvestmentSolutions} />
            <Route path="/wallet-linking" component={WalletLinking} />
            <Route path="/recovery-reports" component={RecoveryReports} />
            <Route path="/dashboard" component={TradingDashboard} />
            <Route path="/contact" component={ContactPage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
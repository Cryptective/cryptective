import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, RefreshCw, Eye, EyeOff } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";

export default function TradingDashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [timeframe, setTimeframe] = useState("24h");
  const userId = "demo-user"; // In real app, get from auth

  const { data: portfolio, isLoading: portfolioLoading } = useQuery({
    queryKey: ["/api/portfolio", userId],
  });

  const { data: cryptoData, isLoading: cryptoLoading } = useQuery({
    queryKey: ["/api/crypto-data"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const mockAssets = [
    { symbol: "BTC", name: "Bitcoin", amount: 2.5, value: 113125.80, change: 5.46, allocation: 45 },
    { symbol: "ETH", name: "Ethereum", amount: 15.2, value: 43087.38, change: -1.57, allocation: 30 },
    { symbol: "USDT", name: "Tether", amount: 25000, value: 25000.00, change: 0.02, allocation: 15 },
    { symbol: "BNB", name: "Binance Coin", amount: 45.8, value: 12674.56, change: 3.21, allocation: 10 },
  ];

  const mockTransactions = [
    { id: 1, type: "buy", asset: "BTC", amount: 0.5, price: 45200, time: "2h ago", status: "completed" },
    { id: 2, type: "sell", asset: "ETH", amount: 2.0, price: 2834, time: "5h ago", status: "completed" },
    { id: 3, type: "buy", asset: "USDT", amount: 5000, price: 1.00, time: "1d ago", status: "completed" },
    { id: 4, type: "swap", asset: "BNB→ETH", amount: 10, price: 276.8, time: "2d ago", status: "completed" },
  ];

  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = 12450.32; // Mock daily change
  const totalChangePercent = (totalChange / totalValue) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Dashboard Header */}
      <section className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Trading Dashboard</h1>
              <p className="text-muted-foreground">Monitor your crypto portfolio and trading performance</p>
            </div>
            <button className="btn-secondary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Balance */}
            <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Portfolio Balance</h2>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {balanceVisible ? formatCurrency(totalValue) : "••••••••"}
                </div>
                <div className="flex items-center space-x-2">
                  {totalChangePercent >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                  <span className={totalChangePercent >= 0 ? "text-green-400" : "text-red-400"}>
                    {balanceVisible ? formatPercentage(totalChangePercent) : "••••"}
                  </span>
                  <span className="text-muted-foreground">
                    ({balanceVisible ? formatCurrency(totalChange) : "••••••"} today)
                  </span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-400">
                    {balanceVisible ? "+$8,240" : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">24h Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">
                    {balanceVisible ? "12" : "••"}
                  </div>
                  <div className="text-xs text-muted-foreground">Active Positions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-400">
                    {balanceVisible ? "+15.3%" : "••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">Total ROI</div>
                </div>
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
              {cryptoLoading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-12"></div>
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </div>
                  ))}
                </div>
              ) : cryptoData ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">BTC</div>
                      <div className="text-sm text-muted-foreground">Bitcoin</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(cryptoData.bitcoin.price)}</div>
                      <div className={cn(
                        "text-sm",
                        cryptoData.bitcoin.changePercent24h >= 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {formatPercentage(cryptoData.bitcoin.changePercent24h)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ETH</div>
                      <div className="text-sm text-muted-foreground">Ethereum</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(cryptoData.ethereum.price)}</div>
                      <div className={cn(
                        "text-sm",
                        cryptoData.ethereum.changePercent24h >= 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {formatPercentage(cryptoData.ethereum.changePercent24h)}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Market Cap</span>
                      <span className="font-medium">{cryptoData.marketCap}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">Fear & Greed</span>
                      <span className="font-medium text-primary">{cryptoData.fearGreedIndex}</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Assets and Transactions */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Assets */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Your Assets</h2>
                <button className="text-primary hover:text-primary/80 text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {mockAssets.map((asset) => (
                  <div key={asset.symbol} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-sm">{asset.symbol}</span>
                      </div>
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {asset.amount} {asset.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {balanceVisible ? formatCurrency(asset.value) : "••••••"}
                      </div>
                      <div className={cn(
                        "text-sm",
                        asset.change >= 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {balanceVisible ? formatPercentage(asset.change) : "••••"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <button className="text-primary hover:text-primary/80 text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                        tx.type === "buy" ? "bg-green-500/10 text-green-400" :
                        tx.type === "sell" ? "bg-red-500/10 text-red-400" :
                        "bg-blue-500/10 text-blue-400"
                      )}>
                        {tx.type === "buy" ? "B" : tx.type === "sell" ? "S" : "↔"}
                      </div>
                      <div>
                        <div className="font-medium">
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.asset}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tx.amount} • {tx.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {balanceVisible ? formatCurrency(tx.price * tx.amount) : "••••••"}
                      </div>
                      <div className="text-xs text-green-400">Completed</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Portfolio Performance</h2>
              <div className="flex space-x-2">
                {["24h", "7d", "30d", "90d", "1y"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={cn(
                      "px-3 py-1 rounded-md text-sm transition-colors",
                      timeframe === period 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive portfolio chart</p>
                <p className="text-sm text-muted-foreground">Historical performance data visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, Clock, CheckCircle, AlertCircle, Eye, FileText } from "lucide-react";
import { useState } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatCurrency, getStatusColor, cn } from "@/lib/utils";

const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "investigating", label: "Investigating" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
];

export default function RecoveryReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const userId = "demo-user"; // In real app, get from auth

  const { data: cases, isLoading } = useQuery({
    queryKey: ["/api/recovery-cases", userId],
    queryFn: () => fetch(`/api/recovery-cases?userId=${userId}`).then(res => res.json()),
  });

  const filteredCases = cases?.filter((case_: any) => {
    const matchesSearch = case_.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.assetType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || case_.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "investigating":
        return <Search className="w-4 h-4 text-blue-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case "pending": return 10;
      case "investigating": return 50;
      case "completed": return 100;
      case "failed": return 100;
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Recovery Reports</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Track the status of your crypto asset recovery cases and view detailed investigation reports.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-muted-foreground text-sm">Total Cases</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-400">8</div>
              <div className="text-muted-foreground text-sm">Completed</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400">3</div>
              <div className="text-muted-foreground text-sm">In Progress</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary">$2.1M</div>
              <div className="text-muted-foreground text-sm">Total Recovered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases List */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-8 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCases.length > 0 ? (
            <div className="space-y-4">
              {filteredCases.map((case_: any) => (
                <div key={case_.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {case_.assetType.toUpperCase()} Recovery Case
                        </h3>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(case_.status)}
                          <span className={`text-sm font-medium ${getStatusColor(case_.status)}`}>
                            {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2 line-clamp-2">
                        {case_.description}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span>Case ID: {case_.id.slice(0, 8)}...</span>
                        {case_.amount && (
                          <span>Amount: {formatCurrency(case_.amount)}</span>
                        )}
                        <span>Created: {new Date(case_.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCase(case_)}
                      className="btn-secondary"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        case_.status === "completed" ? "bg-green-400" :
                        case_.status === "failed" ? "bg-red-400" : "bg-primary"
                      )}
                      style={{ width: `${getProgressPercentage(case_.status)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Recovery Cases Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter ? 
                  "No cases match your current search criteria." :
                  "You haven't submitted any recovery cases yet."
                }
              </p>
              {!searchTerm && !statusFilter && (
                <button
                  onClick={() => window.location.href = '/crypto-recovery'}
                  className="btn-primary"
                >
                  Submit Your First Case
                </button>
              )}
            </div>
          )}

          {/* Case Details Modal */}
          {selectedCase && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Case Details</h3>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status and Progress */}
                  <div className="bg-muted/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedCase.status)}
                        <span className={`font-medium ${getStatusColor(selectedCase.status)}`}>
                          {selectedCase.status.charAt(0).toUpperCase() + selectedCase.status.slice(1)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {getProgressPercentage(selectedCase.status)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          selectedCase.status === "completed" ? "bg-green-400" :
                          selectedCase.status === "failed" ? "bg-red-400" : "bg-primary"
                        )}
                        style={{ width: `${getProgressPercentage(selectedCase.status)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Case Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Case ID</h4>
                      <p className="text-muted-foreground font-mono text-sm">{selectedCase.id}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Asset Type</h4>
                      <p className="text-muted-foreground">{selectedCase.assetType.toUpperCase()}</p>
                    </div>
                    {selectedCase.amount && (
                      <div>
                        <h4 className="font-medium mb-2">Estimated Amount</h4>
                        <p className="text-muted-foreground">{formatCurrency(selectedCase.amount)}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium mb-2">Created Date</h4>
                      <p className="text-muted-foreground">{new Date(selectedCase.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-2">Case Description</h4>
                    <p className="text-muted-foreground text-sm bg-muted/20 p-3 rounded-lg">
                      {selectedCase.description}
                    </p>
                  </div>

                  {/* Technical Details */}
                  {(selectedCase.walletAddress || selectedCase.transactionHash) && (
                    <div>
                      <h4 className="font-medium mb-3">Technical Details</h4>
                      <div className="space-y-2">
                        {selectedCase.walletAddress && (
                          <div>
                            <span className="text-sm text-muted-foreground">Wallet Address:</span>
                            <p className="font-mono text-sm bg-muted/20 p-2 rounded mt-1 break-all">
                              {selectedCase.walletAddress}
                            </p>
                          </div>
                        )}
                        {selectedCase.transactionHash && (
                          <div>
                            <span className="text-sm text-muted-foreground">Transaction Hash:</span>
                            <p className="font-mono text-sm bg-muted/20 p-2 rounded mt-1 break-all">
                              {selectedCase.transactionHash}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Investigation Timeline */}
                  <div>
                    <h4 className="font-medium mb-3">Investigation Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Case Submitted</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(selectedCase.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {selectedCase.status !== "pending" && (
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Investigation Started</p>
                            <p className="text-xs text-muted-foreground">
                              Investigation began within 24 hours
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedCase.status === "completed" && (
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Recovery Completed</p>
                            <p className="text-xs text-muted-foreground">
                              Assets successfully recovered and returned
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="btn-primary w-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
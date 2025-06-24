import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertRecoveryCaseSchema,
  insertWalletConnectionSchema,
  insertContactInquirySchema,
} from "../shared/schema.js";

export function registerRoutes(app: Express): Server {
  // Recovery cases routes
  app.get("/api/recovery-cases", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }
      const cases = await storage.getRecoveryCases(userId);
      res.json(cases);
    } catch (error) {
      console.error("Error fetching recovery cases:", error);
      res.status(500).json({ message: "Failed to fetch recovery cases" });
    }
  });

  app.post("/api/recovery-cases", async (req, res) => {
    try {
      const validatedData = insertRecoveryCaseSchema.parse(req.body);
      const recoveryCase = await storage.createRecoveryCase(validatedData);
      res.json(recoveryCase);
    } catch (error) {
      console.error("Error creating recovery case:", error);
      res.status(400).json({ message: "Invalid data provided" });
    }
  });

  app.get("/api/recovery-cases/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recoveryCase = await storage.getRecoveryCase(id);
      if (!recoveryCase) {
        return res.status(404).json({ message: "Recovery case not found" });
      }
      res.json(recoveryCase);
    } catch (error) {
      console.error("Error fetching recovery case:", error);
      res.status(500).json({ message: "Failed to fetch recovery case" });
    }
  });

  app.patch("/api/recovery-cases/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status required" });
      }
      const updatedCase = await storage.updateRecoveryCaseStatus(id, status);
      res.json(updatedCase);
    } catch (error) {
      console.error("Error updating recovery case:", error);
      res.status(500).json({ message: "Failed to update recovery case" });
    }
  });

  // Investment routes
  app.get("/api/investments", async (req, res) => {
    try {
      const investments = await storage.getActiveInvestments();
      res.json(investments);
    } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ message: "Failed to fetch investments" });
    }
  });

  // Portfolio routes
  app.get("/api/portfolio/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      let portfolio = await storage.getUserPortfolio(userId);
      
      // Create default portfolio if none exists
      if (!portfolio) {
        portfolio = await storage.createPortfolio({
          userId,
          totalValue: "0",
          totalReturn: "0",
          totalReturnPercentage: "0",
        });
      }
      
      res.json(portfolio);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      res.status(500).json({ message: "Failed to fetch portfolio" });
    }
  });

  app.patch("/api/portfolio/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;
      const portfolio = await storage.updatePortfolio(userId, updateData);
      res.json(portfolio);
    } catch (error) {
      console.error("Error updating portfolio:", error);
      res.status(500).json({ message: "Failed to update portfolio" });
    }
  });

  // Wallet connection routes
  app.get("/api/wallets/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const wallets = await storage.getUserWallets(userId);
      res.json(wallets);
    } catch (error) {
      console.error("Error fetching wallets:", error);
      res.status(500).json({ message: "Failed to fetch wallets" });
    }
  });

  app.post("/api/wallets", async (req, res) => {
    try {
      const validatedData = insertWalletConnectionSchema.parse(req.body);
      const wallet = await storage.createWalletConnection(validatedData);
      res.json(wallet);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      res.status(400).json({ message: "Invalid wallet data provided" });
    }
  });

  app.delete("/api/wallets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const wallet = await storage.deactivateWallet(id);
      res.json(wallet);
    } catch (error) {
      console.error("Error deactivating wallet:", error);
      res.status(500).json({ message: "Failed to deactivate wallet" });
    }
  });

  // Contact inquiry routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.json(inquiry);
    } catch (error) {
      console.error("Error creating contact inquiry:", error);
      res.status(400).json({ message: "Invalid contact data provided" });
    }
  });

  // Mock crypto data endpoint for dashboard
  app.get("/api/crypto-data", async (req, res) => {
    try {
      // Real-time crypto data simulation
      const cryptoData = {
        bitcoin: {
          price: 45250.32,
          change24h: 2.34,
          changePercent24h: 5.46,
        },
        ethereum: {
          price: 2834.67,
          change24h: -45.23,
          changePercent24h: -1.57,
        },
        marketCap: "2.1T",
        dominance: {
          btc: 42.3,
          eth: 18.7,
        },
        fearGreedIndex: 73,
      };
      res.json(cryptoData);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      res.status(500).json({ message: "Failed to fetch crypto data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
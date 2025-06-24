import {
  users,
  recoveryCases,
  investments,
  portfolios,
  walletConnections,
  contactInquiries,
  type User,
  type UpsertUser,
  type RecoveryCase,
  type InsertRecoveryCase,
  type Investment,
  type InsertInvestment,
  type Portfolio,
  type InsertPortfolio,
  type WalletConnection,
  type InsertWalletConnection,
  type ContactInquiry,
  type InsertContactInquiry,
} from "../shared/schema.js";
import { nanoid } from "nanoid";

// Interface for storage operations
export interface IStorage {
  // User operations (required for auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Recovery cases
  createRecoveryCase(data: InsertRecoveryCase): Promise<RecoveryCase>;
  getRecoveryCases(userId: string): Promise<RecoveryCase[]>;
  getRecoveryCase(id: string): Promise<RecoveryCase | undefined>;
  updateRecoveryCaseStatus(id: string, status: string): Promise<RecoveryCase>;
  
  // Investments
  getInvestments(): Promise<Investment[]>;
  getActiveInvestments(): Promise<Investment[]>;
  createInvestment(data: InsertInvestment): Promise<Investment>;
  
  // Portfolios
  getUserPortfolio(userId: string): Promise<Portfolio | undefined>;
  createPortfolio(data: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(userId: string, data: Partial<InsertPortfolio>): Promise<Portfolio>;
  
  // Wallet connections
  getUserWallets(userId: string): Promise<WalletConnection[]>;
  createWalletConnection(data: InsertWalletConnection): Promise<WalletConnection>;
  deactivateWallet(id: string): Promise<WalletConnection>;
  
  // Contact inquiries
  createContactInquiry(data: InsertContactInquiry): Promise<ContactInquiry>;
  getContactInquiries(): Promise<ContactInquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private recoveryCases: Map<string, RecoveryCase> = new Map();
  private investments: Map<string, Investment> = new Map();
  private portfolios: Map<string, Portfolio> = new Map();
  private walletConnections: Map<string, WalletConnection> = new Map();
  private contactInquiries: Map<string, ContactInquiry> = new Map();

  constructor() {
    // Seed with sample investments
    this.seedInvestments();
  }

  private seedInvestments() {
    const sampleInvestments: Investment[] = [
      {
        id: "inv-1",
        name: "Bitcoin Strategic Reserve",
        description: "Conservative Bitcoin investment strategy with institutional-grade security and quarterly rebalancing.",
        riskLevel: "low",
        expectedReturn: "12.5",
        minimumInvestment: "1000",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "inv-2", 
        name: "DeFi Yield Farming Pool",
        description: "High-yield farming opportunities across top DeFi protocols with automated compound interest.",
        riskLevel: "medium",
        expectedReturn: "35.8",
        minimumInvestment: "500",
        isActive: true,
        createdAt: new Date(),
      },
      {
        id: "inv-3",
        name: "Altcoin Growth Portfolio",
        description: "Diversified portfolio of emerging altcoins with strong fundamentals and growth potential.",
        riskLevel: "high",
        expectedReturn: "85.2",
        minimumInvestment: "250",
        isActive: true,
        createdAt: new Date(),
      },
    ];

    sampleInvestments.forEach(inv => this.investments.set(inv.id, inv));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = this.users.get(userData.id);
    const user: User = {
      ...userData,
      createdAt: existingUser?.createdAt || new Date(),
      updatedAt: new Date(),
    } as User;
    this.users.set(userData.id, user);
    return user;
  }

  // Recovery cases
  async createRecoveryCase(data: InsertRecoveryCase): Promise<RecoveryCase> {
    const id = nanoid();
    const recoveryCase: RecoveryCase = {
      ...data,
      id,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.recoveryCases.set(id, recoveryCase);
    return recoveryCase;
  }

  async getRecoveryCases(userId: string): Promise<RecoveryCase[]> {
    return Array.from(this.recoveryCases.values()).filter(
      case_ => case_.userId === userId
    );
  }

  async getRecoveryCase(id: string): Promise<RecoveryCase | undefined> {
    return this.recoveryCases.get(id);
  }

  async updateRecoveryCaseStatus(id: string, status: string): Promise<RecoveryCase> {
    const recoveryCase = this.recoveryCases.get(id);
    if (!recoveryCase) {
      throw new Error("Recovery case not found");
    }
    const updated = { ...recoveryCase, status, updatedAt: new Date() };
    this.recoveryCases.set(id, updated);
    return updated;
  }

  // Investments
  async getInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values());
  }

  async getActiveInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(inv => inv.isActive);
  }

  async createInvestment(data: InsertInvestment): Promise<Investment> {
    const id = nanoid();
    const investment: Investment = {
      ...data,
      id,
      createdAt: new Date(),
    };
    this.investments.set(id, investment);
    return investment;
  }

  // Portfolios
  async getUserPortfolio(userId: string): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(p => p.userId === userId);
  }

  async createPortfolio(data: InsertPortfolio): Promise<Portfolio> {
    const id = nanoid();
    const portfolio: Portfolio = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async updatePortfolio(userId: string, data: Partial<InsertPortfolio>): Promise<Portfolio> {
    const existing = await this.getUserPortfolio(userId);
    if (!existing) {
      throw new Error("Portfolio not found");
    }
    const updated = { ...existing, ...data, updatedAt: new Date() };
    this.portfolios.set(existing.id, updated);
    return updated;
  }

  // Wallet connections
  async getUserWallets(userId: string): Promise<WalletConnection[]> {
    return Array.from(this.walletConnections.values()).filter(
      wallet => wallet.userId === userId && wallet.isActive
    );
  }

  async createWalletConnection(data: InsertWalletConnection): Promise<WalletConnection> {
    const id = nanoid();
    const connection: WalletConnection = {
      ...data,
      id,
      isActive: true,
      createdAt: new Date(),
    };
    this.walletConnections.set(id, connection);
    return connection;
  }

  async deactivateWallet(id: string): Promise<WalletConnection> {
    const wallet = this.walletConnections.get(id);
    if (!wallet) {
      throw new Error("Wallet connection not found");
    }
    const updated = { ...wallet, isActive: false };
    this.walletConnections.set(id, updated);
    return updated;
  }

  // Contact inquiries
  async createContactInquiry(data: InsertContactInquiry): Promise<ContactInquiry> {
    const id = nanoid();
    const inquiry: ContactInquiry = {
      ...data,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values());
  }
}

export const storage = new MemStorage();
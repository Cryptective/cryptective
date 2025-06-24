import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  integer,
  decimal,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Recovery cases table
export const recoveryCases = pgTable("recovery_cases", {
  id: text("id").primaryKey().notNull(),
  userId: varchar("user_id").notNull(),
  assetType: varchar("asset_type").notNull(),
  amount: decimal("amount"),
  description: text("description").notNull(),
  walletAddress: varchar("wallet_address"),
  transactionHash: varchar("transaction_hash"),
  status: varchar("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Investment opportunities table
export const investments = pgTable("investments", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  riskLevel: varchar("risk_level").notNull(),
  expectedReturn: decimal("expected_return"),
  minimumInvestment: decimal("minimum_investment"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// User portfolios table
export const portfolios = pgTable("portfolios", {
  id: text("id").primaryKey().notNull(),
  userId: varchar("user_id").notNull(),
  totalValue: decimal("total_value").default("0"),
  totalReturn: decimal("total_return").default("0"),
  totalReturnPercentage: decimal("total_return_percentage").default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Wallet connections table
export const walletConnections = pgTable("wallet_connections", {
  id: text("id").primaryKey().notNull(),
  userId: varchar("user_id").notNull(),
  walletAddress: varchar("wallet_address").notNull(),
  walletType: varchar("wallet_type").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact inquiries table
export const contactInquiries = pgTable("contact_inquiries", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  subject: varchar("subject").notNull(),
  message: text("message").notNull(),
  status: varchar("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Type definitions
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type RecoveryCase = typeof recoveryCases.$inferSelect;
export type InsertRecoveryCase = typeof recoveryCases.$inferInsert;

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = typeof investments.$inferInsert;

export type Portfolio = typeof portfolios.$inferSelect;
export type InsertPortfolio = typeof portfolios.$inferInsert;

export type WalletConnection = typeof walletConnections.$inferSelect;
export type InsertWalletConnection = typeof walletConnections.$inferInsert;

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = typeof contactInquiries.$inferInsert;

// Zod schemas
export const insertRecoveryCaseSchema = createInsertSchema(recoveryCases).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
});

export const insertPortfolioSchema = createInsertSchema(portfolios).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWalletConnectionSchema = createInsertSchema(walletConnections).omit({
  id: true,
  createdAt: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

// Form validation schemas
export type InsertRecoveryCaseForm = z.infer<typeof insertRecoveryCaseSchema>;
export type InsertInvestmentForm = z.infer<typeof insertInvestmentSchema>;
export type InsertPortfolioForm = z.infer<typeof insertPortfolioSchema>;
export type InsertWalletConnectionForm = z.infer<typeof insertWalletConnectionSchema>;
export type InsertContactInquiryForm = z.infer<typeof insertContactInquirySchema>;
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  insuranceType: text("insurance_type").notNull(),
  registrationNumber: text("registration_number").notNull(),
  mobileNumber: text("mobile_number").notNull(),
  pinCode: text("pin_code").notNull(),
  policyExpiryDate: text("policy_expiry_date").notNull(),
  registrationYear: text("registration_year").notNull(),
  carModel: text("car_model").notNull(),
  partnerId: text("partner_id").notNull(),
  partnerName: text("partner_name").notNull(),
  partnerUrl: text("partner_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ id: true, createdAt: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;

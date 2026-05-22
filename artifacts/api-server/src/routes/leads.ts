import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import {
  SubmitLeadBody,
  ListLeadsResponse,
  GetLeadStatsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = SubmitLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [lead] = await db
    .insert(leadsTable)
    .values({
      insuranceType: parsed.data.insuranceType,
      registrationNumber: parsed.data.registrationNumber,
      mobileNumber: parsed.data.mobileNumber,
      pinCode: parsed.data.pinCode,
      policyExpiryDate: parsed.data.policyExpiryDate,
      registrationYear: parsed.data.registrationYear,
      carModel: parsed.data.carModel,
      partnerId: parsed.data.partnerId,
      partnerName: parsed.data.partnerName,
      partnerUrl: parsed.data.partnerUrl,
    })
    .returning();

  res.status(201).json({
    id: lead.id,
    insuranceType: lead.insuranceType,
    registrationNumber: lead.registrationNumber,
    mobileNumber: lead.mobileNumber,
    pinCode: lead.pinCode,
    policyExpiryDate: lead.policyExpiryDate,
    registrationYear: lead.registrationYear,
    carModel: lead.carModel,
    partnerId: lead.partnerId,
    partnerName: lead.partnerName,
    partnerUrl: lead.partnerUrl,
    createdAt: lead.createdAt.toISOString(),
  });
});

router.get("/leads", async (req, res): Promise<void> => {
  const leads = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt));

  res.json(
    ListLeadsResponse.parse(
      leads.map((l) => ({
        ...l,
        createdAt: l.createdAt.toISOString(),
      }))
    )
  );
});

router.get("/leads/stats", async (req, res): Promise<void> => {
  const allLeads = await db.select().from(leadsTable);

  const totalLeads = allLeads.length;
  const carLeads = allLeads.filter((l) => l.insuranceType === "car").length;
  const bikeLeads = allLeads.filter((l) => l.insuranceType === "bike").length;

  const partnerCounts: Record<string, number> = {};
  for (const lead of allLeads) {
    partnerCounts[lead.partnerName] = (partnerCounts[lead.partnerName] ?? 0) + 1;
  }

  const partnerBreakdown = Object.entries(partnerCounts).map(
    ([partnerName, count]) => ({ partnerName, count })
  );

  res.json(
    GetLeadStatsResponse.parse({
      totalLeads,
      carLeads,
      bikeLeads,
      partnerBreakdown,
    })
  );
});

export default router;

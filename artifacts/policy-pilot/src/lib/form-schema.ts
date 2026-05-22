import { z } from "zod";

export const formSchema = z.object({
  insuranceType: z.enum(["car", "bike"]),
  registrationNumber: z.string().min(4, "Registration number is required").toUpperCase(),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "Must be a valid 6-digit pin code"),
  policyExpiryDate: z.string().optional(),
  registrationYear: z.string().min(4, "Year is required"),
  carModel: z.string().min(1, "Model is required"),
  carVariant: z.string().optional(),
  previousYearClaim: z.enum(["yes", "no"]).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

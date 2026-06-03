import { z } from "zod";

export const formSchema = z.object({
  insuranceType: z.enum(["car", "bike"]),

  // Indian vehicle registration: XX00XX0000 (state code + district + series + number)
  // Strip spaces/hyphens before validating so MH-12-AB-1234 and MH 12 AB 1234 both work
  registrationNumber: z
    .string()
    .transform((val) => val.replace(/[\s-]/g, "").toUpperCase())
    .pipe(
      z
        .string()
        .regex(
          /^([A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}|[0-9]{2}BH[0-9]{4}[A-Z]{2})$/,
          "Enter a valid registration number (e.g. MH12AB1234 or 22BH1234AB)"
        )
    ),

  // Valid Indian mobile: 10 digits starting with 6, 7, 8 or 9
  mobileNumber: z
    .string()
    .regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Indian mobile number"),

  email: z.string().email("Enter a valid email address"),

  // Valid Indian pincode: 6 digits, first digit 1–9
  pinCode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit Indian pin code"),

  policyExpiryDate: z.string().optional(),
  registrationYear: z.string().min(4, "Year is required"),
  carModel: z.string().min(1, "Model is required"),
  carVariant: z.string().optional(),
  previousYearClaim: z.enum(["yes", "no"]).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

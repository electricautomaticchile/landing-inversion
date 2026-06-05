import { z } from "zod";
import { submitLead } from "@/lib/api/client";

export const turnstileEnabled = Boolean(import.meta.env.VITE_TURNSTILE_SITE_KEY);

const turnstileToken = z.string().trim().max(2048).optional().or(z.literal(""));

export const investorSchema = z
  .object({
    name: z.string().trim().min(2, "Ingresa tu nombre").max(120),
    email: z.string().trim().email("Email no válido").max(255),
    organization: z.string().trim().max(200).optional().or(z.literal("")),
    ticket: z.string().trim().max(60).optional().or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    turnstileToken,
  })
  .superRefine((value, ctx) => {
    if (turnstileEnabled && !value.turnstileToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["turnstileToken"],
        message: "Completa la verificación",
      });
    }
  });

export type InvestorInput = z.infer<typeof investorSchema>;

export const distributorSchema = z
  .object({
    name: z.string().trim().min(2, "Ingresa tu nombre").max(120),
    role: z.string().trim().max(120).optional().or(z.literal("")),
    organization: z.string().trim().min(2, "Indica la distribuidora").max(200),
    email: z.string().trim().email("Email no válido").max(255),
    meterCount: z.string().trim().max(60).optional().or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    turnstileToken,
  })
  .superRefine((value, ctx) => {
    if (turnstileEnabled && !value.turnstileToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["turnstileToken"],
        message: "Completa la verificación",
      });
    }
  });

export type DistributorInput = z.infer<typeof distributorSchema>;

export async function submitInvestorLead(input: InvestorInput) {
  await submitLead({
    type: "investor",
    name: input.name,
    email: input.email,
    organization: input.organization || null,
    message: input.message || null,
    extra: { ticket: input.ticket || null },
    turnstileToken: input.turnstileToken || "",
  });
}

export async function submitDistributorLead(input: DistributorInput) {
  await submitLead({
    type: "distributor",
    name: input.name,
    email: input.email,
    organization: input.organization,
    message: input.message || null,
    extra: {
      role: input.role || null,
      meterCount: input.meterCount || null,
    },
    turnstileToken: input.turnstileToken || "",
  });
}

import { z } from "zod";
import { packageSlugs } from "@/lib/packages";

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter an email like name@example.com"),
  phone: z.string().trim().min(10, "Enter a phone number we can reach you on"),
  company: z.string().optional(),
  package: z.union([z.enum(packageSlugs), z.literal("")]).optional(),
  recordingType: z.enum([
    "PODCAST",
    "VIDEO_PODCAST",
    "INTERVIEW",
    "LIVESTREAM",
    "SHORTS_REELS",
    "CORPORATE",
    "OTHER",
  ], { error: "Choose what you're recording" }),
  preferredDate: z.string().min(1, "Pick a date"),
  preferredTime: z.string({ error: "Pick a start time" }).min(1, "Pick a start time"),
  notes: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

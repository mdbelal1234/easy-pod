import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  company: z.string().optional(),
  packageId: z.string().optional(),
  recordingType: z.enum([
    "PODCAST",
    "VIDEO_PODCAST",
    "INTERVIEW",
    "LIVESTREAM",
    "SHORTS_REELS",
    "CORPORATE",
    "OTHER",
  ]),
  preferredDate: z.string().min(1, "Date is required"),
  preferredTime: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
  source: z
    .enum([
      "CONTACT_FORM",
      "BOOKING_FORM",
      "QUOTE_REQUEST",
      "WHATSAPP",
      "PHONE",
      "REFERRAL",
      "SOCIAL_MEDIA",
      "OTHER",
    ])
    .optional()
    .default("CONTACT_FORM"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
export type LeadFormData = z.infer<typeof leadSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

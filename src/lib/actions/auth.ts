"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import type { LoginFormData } from "@/lib/validations";

export async function adminLogin(data: LoginFormData) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong. Please try again." };
      }
    }
    throw error;
  }
}

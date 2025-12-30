import { handlers } from "@/auth/auth";

export const runtime = "nodejs";

console.log("✅ NextAuth route.ts loaded");

export const { GET, POST } = handlers;



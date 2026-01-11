import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[]; // oder role?: string, je nach Modell
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    roles?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
  }
}
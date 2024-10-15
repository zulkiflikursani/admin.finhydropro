import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      nama: string;
      email: string;
      level: string | null;
      company: string | null;
    };
    message?: string;
  }
}

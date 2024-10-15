import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credensials",
      credentials: {
        username: {
          label: "Email:",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Passowod:",
          type: "password",
          placeholder: "Passoword",
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}auth/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
          }
        );
        const user = await res.json();

        console.log(user);

        if (user.status === 500) {
          console.log(user.error);
          return null;
        } else {
          console.log(user.message);
          cookies().set("jwt", user.accessToken);
          return user.message;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    // signOut: "/signOut",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/admin";
    },
  },
};

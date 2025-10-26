import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
      accessToken?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    accessToken?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Email and password are required");

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const result = await res.json();
        if (!res.ok || !result?.success) {
          throw new Error(result?.message || "Login failed");
        }


        return {
  id: String(result.data.user.id),
  name: result.data.user.name,
  email: result.data.user.email,
  role: result.data.user.role,
  accessToken: result.data.accessToken, 
};

      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken; // ✅ Keep accessToken
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string; // ✅ Include token in session
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
};
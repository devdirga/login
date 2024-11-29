import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { LoginSchema } from "@/schemas";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("STEP:::1");
        const validatedFields = LoginSchema.safeParse(credentials);
        if(validatedFields.success){
          console.log("STEP:::2");
          console.log(process.env.FRONT_URL);
          const { email, password } = validatedFields.data;
          console.log("STEP:::3");
          const res = await fetch(process.env.FRONT_URL + '/api/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          console.log("STEP:::4");
          const datares = await res.json();
          if (!datares.error) {
            return {
              email: email,
              name: datares.data.user.name,
              token: datares.data.token,
              // role: datares.data.user.role,
            };
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const res = await fetch(process.env.BACK_URL+"google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });

        const datares = await res.json();
        if (!datares.error) {
          user.token = datares.data.token;
          user.name = datares.data.name;

          return true;
        }
        return false;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.token;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.token = token.accessToken;
        session.user.name = token.name;
      }
      return session;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;

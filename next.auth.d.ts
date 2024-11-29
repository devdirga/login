import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token?: string; // Add the token field to the User type
  }

  interface Session {
    user: {
      token?: string; // Add token to the user in Session type
    } & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
  }
}

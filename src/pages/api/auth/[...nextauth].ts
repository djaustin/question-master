import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials({
      id: "credentials",
      name: "Network Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      authorize: async ({ username, password }) => {
        if (!username || !password) return null;
        if (
          username === process.env.ADMIN_USERNAME &&
          password === process.env.ADMIN_PASSWORD
        )
          return { name: "Local Administrator" };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
};

export default NextAuth(options);

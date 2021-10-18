import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import {authenticate} from 'ldap-authentication'

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

        const ldapAuthConfig = {
          ldapOpts: {
            url: process.env.LDAP_URL
          },
          adminDn: process.env.LDAP_ADMIN_DN,
          adminPassword: process.env.LDAP_ADMIN_PASSWORD,
          username,
          userPassword: password,
          userSearchBase: process.env.LDAP_USER_SEARCH_BASE,
          usernameAttribute: process.env.LDAP_USERNAME_ATTRIBUTE
        }
        try {
          const user = await authenticate(ldapAuthConfig)
          return {...user, name: user.displayName || user.gecos}
        } catch (err) {
          console.log(err)
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
};

export default NextAuth(options);

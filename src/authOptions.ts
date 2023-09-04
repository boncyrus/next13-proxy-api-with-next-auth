import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        // This is where you get your user from your database or API.
        // You usually don't need this if you're using an oauth2 or openid-connect provider.
        // We're using credentials provider for simplicity.
        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          const user = {
            id: "1",
            name: "Admin user",
            email: "admin@example.com",
          };

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Usual oauth / oidc proviers, will set the account and profile parameters and will usually contain the access token
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

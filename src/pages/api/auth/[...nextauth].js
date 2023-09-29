import { authUser } from "@/services/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "appCredentials",
      name: "Credentials Authentication",
      credentials: {
        username: { label: "Usuário", type: "text", placeholder: "" },
        password: { label: "Senha", type: "password" },
      },
      type: "credentials",
      async authorize(credentials, req) {
        try {
          const user = await authUser(
            credentials.username,
            credentials.password
          );
          if (user) return user;
        } catch (error) {
          return false;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
  },
  jwt: {
    encryption: true,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.idUser;
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          username: token.username,
          name: token.name,
        },
      };
    },
    redirect: async ({ baseUrl }) => {
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV == "development",
};

export default NextAuth(authOptions);

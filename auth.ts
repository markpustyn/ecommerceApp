import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { verifyPassword } from "./utils/password";
import getUserFromDb from "./utils/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email);

          if (!user) {
            return null;
          }

          const isValidPassword = await verifyPassword(
            password,
            user.password
          );

          if (!isValidPassword) {
            return null;
          }

          if (!user.email) {
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role as string;

      return session;
    },
  },
});
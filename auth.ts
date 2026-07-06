import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import {verifyPassword } from "./utils/password"
import getUserFromDb from "./utils/db"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {

          const { email, password } = await signInSchema.parseAsync(credentials)



          const user = await getUserFromDb(email);
 
          if (!user) {
            return null
          }
    
        const isValidPassword = await verifyPassword(
            password,
            user.password
          );

        if (!isValidPassword) {
        return null
        }
        
        return {id: user.id.toString(), name: user.name, email: user.email}

        

        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
        return null
      },
    }),
  ],
})
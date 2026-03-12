// auth.js configuration
// Auth.js handles the entire authentication flow for your application.
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// configuration with Google provider;
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
};
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);

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
  //if user exists, return true, allow access otherwise deny access. handle authorization.
  //
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/signIn",
  },
};

// auth → function you call in server code to read session
// handlers (GET/POST) → functions Next.js uses to run the auth API routes

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

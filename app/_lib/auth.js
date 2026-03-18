// auth.js configuration
// Auth.js handles the entire authentication flow for your application.
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

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
    // Checks if the signed-in Google user already exists in the database, creates them if not, and returns true to allow or false to deny the sign-in.
    async signIn({ user, profile, account }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
    // In the session callback, the app uses the logged-in user’s email to fetch their guest record from Supabase, adds that record’s database ID as session.user.guestId, and returns the updated session so the rest of the app can identify the user by ID.
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      // attaches the database ID to the session object.
      session.user.guestId = guest.id;
      return session;
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
